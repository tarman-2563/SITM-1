const maintenance = (req, res, next) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return res.status(503).json({
      status: 'error',
      message: 'Service temporarily unavailable for maintenance',
      retryAfter: '3600'
    });
  }
  next();
};

module.exports = maintenance;