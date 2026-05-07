const env = require('../config/env');
const apiKeyService = require('../services/api-key.service');
const ApiError = require('../utils/api-error');

const apiKeyAuth = async (req, res, next) => {
  if (!env.databaseUrl && env.apiKeys.length === 0) {
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

  const apiClient = await apiKeyService.validateApiKey(apiKey);

  if (!apiClient) {
    next(new ApiError(403, 'Invalid API key'));
    return;
  }

  req.apiClient = apiClient;
  next();
};

module.exports = apiKeyAuth;
