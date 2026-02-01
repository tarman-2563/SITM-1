const logger = require("../utils/logger");

const validateEnv = () => {
  const required = [
    'MONGO_URI',
    'JWT_SECRET',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'ADMIN_EMAIL'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    logger.error('Missing required environment variables', { missing: missing.join(', ') });
    process.exit(1);
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    logger.error('JWT_SECRET must be at least 32 characters long');
    process.exit(1);
  }

  logger.info('Environment validation passed');
};

module.exports = validateEnv;