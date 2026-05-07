const crypto = require('crypto');
const database = require('../config/database');
const env = require('../config/env');
const logger = require('../utils/logger');

const hashApiKey = (apiKey) =>
  crypto.createHash('sha256').update(apiKey).digest('hex');

const safeCompare = (left, right) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const validateApiKeyFromEnv = (apiKey) => {
  const isValidApiKey = env.apiKeys.some((validApiKey) =>
    safeCompare(apiKey, validApiKey),
  );

  if (!isValidApiKey) {
    return null;
  }

  return {
    id: null,
    name: 'env-api-key',
    source: 'env',
    plan: {
      name: 'development',
      monthlyRequestLimit: null,
      rateLimitWindowMs: env.rateLimitWindowMs,
      rateLimitMaxRequests: env.rateLimitMaxRequests,
    },
  };
};

const validateApiKeyFromDatabase = async (apiKey) => {
  const apiKeyHash = hashApiKey(apiKey);

  const result = await database.query(
    `
      SELECT
        api_keys.id,
        api_keys.name,
        plans.name AS plan_name,
        plans.monthly_request_limit,
        plans.rate_limit_window_ms,
        plans.rate_limit_max_requests
      FROM api_keys
      INNER JOIN plans ON plans.id = api_keys.plan_id
      WHERE api_keys.key_hash = $1
        AND api_keys.is_active = TRUE
      LIMIT 1
    `,
    [apiKeyHash],
  );

  if (!result) {
    return null;
  }

  const row = result.rows[0];

  if (!row) {
    return null;
  }

  await database.query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1', [
    row.id,
  ]);

  return {
    id: row.id,
    name: row.name,
    source: 'database',
    plan: {
      name: row.plan_name,
      monthlyRequestLimit: row.monthly_request_limit,
      rateLimitWindowMs: row.rate_limit_window_ms,
      rateLimitMaxRequests: row.rate_limit_max_requests,
    },
  };
};

const validateApiKey = async (apiKey) => {
  try {
    const databaseApiKey = await validateApiKeyFromDatabase(apiKey);

    if (databaseApiKey) {
      return databaseApiKey;
    }
  } catch (error) {
    logger.warn({ err: error }, 'API key database validation failed');
  }

  return validateApiKeyFromEnv(apiKey);
};

module.exports = {
  hashApiKey,
  validateApiKey,
};
