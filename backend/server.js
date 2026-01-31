const express=require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { verifyEmailConfig } = require("./utils/email");
const leadsRouter = require("./routes/leadRoutes");
const authRouter = require("./routes/authRoutes");
const admissionRouter = require("./routes/admissionRoutes");
const dotenv=require("dotenv").config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use(express.json());

connectDB();

verifyEmailConfig();

app.get("/api/health",(req,res)=>{
    res.status(200).json({message:"Server is up and running"});
})

app.get("/api/test-email", async (req,res)=>{
    try {
        const { sendEmail } = require("./utils/email");
        await sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: "Test Email from SITM Backend",
            html: "<h1>Test Email</h1><p>If you receive this, email configuration is working!</p>"
        });
        res.status(200).json({message:"Test email sent successfully"});
    } catch (error) {
        console.error("Test email failed:", error);
        res.status(500).json({
            message:"Test email failed", 
            error: error.message,
            details: {
                code: error.code,
                response: error.response
            }
        });
    }
})

app.use("/api/leads",leadsRouter);
app.use("/api/auth",authRouter);
app.use("/api/admission",admissionRouter);

app.use((err,req,res,next)=>{
    console.log("Global error:",err);
    res.status(500).json({message:"Internal Server Error"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
