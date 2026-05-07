const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const env = require('../config/env');

const hashValue = (value) =>
  crypto.createHash('sha256').update(value).digest('hex');

const apiRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMaxRequests,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req) => {
    const apiKey = req.get('x-api-key');

    if (apiKey) {
      return hashValue(apiKey);
    }

    return req.ip;
  },
  message: {
    success: false,
    error: {
      message: 'Too many requests',
    },
  },
});

module.exports = apiRateLimiter;
