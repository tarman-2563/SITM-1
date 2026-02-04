const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");
const morgan = require("morgan");
const timeout = require('express-timeout-handler');
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const validateEnv = require("./config/validateEnv");
const { verifyEmailConfig } = require("./utils/email");
const requestId = require("./middlewares/requestId");
const maintenance = require("./middlewares/maintenance");
const leadsRouter = require("./routes/leadRoutes");
const authRouter = require("./routes/authRoutes");
const admissionRouter = require("./routes/admissionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(requestId);
app.use(maintenance);

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(mongoSanitize());
app.use(hpp());

app.use(timeout.handler({
  timeout: 30000,
  onTimeout: function(req, res) {
    res.status(503).json({
      status: 'error',
      message: 'Request timeout'
    });
  }
}));

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ["http://localhost:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "error",
    message: "Too many authentication attempts, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1/", generalLimiter);
app.use("/api/v1/auth/login", authLimiter);
app.use("/api/v1/auth/forgot-password", authLimiter);

validateEnv();
connectDB();
verifyEmailConfig();

app.get("/health", async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      memory: process.memoryUsage(),
      version: process.version
    });
  } catch (error) {
    res.status(503).json({
      status: "ERROR",
      message: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    name: "SITM Backend API",
    version: "1.0.0",
    description: "Scholars Institute of Technology & Management Backend API",
    endpoints: {
      health: "/health",
      api: "/api/v1",
      documentation: "/"
    },
    status: "running"
  });
});

app.use("/api/v1/leads", leadsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admission", admissionRouter);


if (process.env.NODE_ENV !== 'production') {
  app.get("/api/test-email", async (req, res) => {
    try {
      console.log("Testing email configuration...");
      console.log("SMTP_HOST:", process.env.SMTP_HOST);
      console.log("SMTP_PORT:", process.env.SMTP_PORT);
      console.log("SMTP_USER:", process.env.SMTP_USER);
      console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
      
      const { sendEmail } = require("./utils/email");
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Test Email from SITM Backend",
        html: "<h1>Test Email</h1><p>If you receive this, email configuration is working!</p>"
      });
      
      console.log("Test email sent successfully to:", process.env.ADMIN_EMAIL);
      res.status(200).json({ 
        message: "Test email sent successfully",
        to: process.env.ADMIN_EMAIL,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Test email failed:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        response: error.response
      });
      res.status(500).json({
        message: "Test email failed",
        error: error.message,
        code: error.code
      });
    }
  });
}

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

app.use((err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV !== 'production') {
    console.error("Global error:", err);
  }

  if (err.name === 'CastError') {
    error = { message: 'Resource not found', statusCode: 404 };
  }

  if (err.code === 11000) {
    error = { message: 'Duplicate field value entered', statusCode: 400 };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  if (err.name === 'JsonWebTokenError') {
    error = { message: 'Invalid token', statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    error = { message: 'Token expired', statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
