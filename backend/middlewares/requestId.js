const crypto = require('crypto');

const requestId = (req, res, next) => {
  req.id = crypto.randomBytes(16).toString('hex');
  res.setHeader('X-Request-ID', req.id);
  next();
};

module.exports = requestId;