const crypto = require('crypto');
const env = require('../config/env');
const ApiError = require('../utils/api-error');

const safeCompare = (left, right) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const apiKeyAuth = (req, res, next) => {
  if (env.apiKeys.length === 0) {
    next(
      new ApiError(
        500,
        'API key authentication is not configured',
        'Set API_KEYS in your environment variables',
      ),
    );
    return;
  }

  const apiKey = req.get('x-api-key');

  if (!apiKey) {
    next(new ApiError(401, 'API key is required'));
    return;
  }

  const isValidApiKey = env.apiKeys.some((validApiKey) =>
    safeCompare(apiKey, validApiKey),
  );

  if (!isValidApiKey) {
    next(new ApiError(403, 'Invalid API key'));
    return;
  }

  next();
};

module.exports = apiKeyAuth;
