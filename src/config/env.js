const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const parsePort = (value) => {
  if (value === undefined || value === '') {
    return 3000;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT must be a positive number');
  }

  return port;
};

const parsePositiveInteger = (value, fallback, name) => {
  if (value === undefined || value === '') {
    return fallback;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`${name} must be a positive number`);
  }

  return parsedValue;
};

const parseCorsOrigin = (value) => {
  if (!value || value === '*') {
    return '*';
  }

  return value.split(',').map((origin) => origin.trim());
};

const parseApiKeys = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((apiKey) => apiKey.trim())
    .filter(Boolean);
};

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsePort(process.env.PORT),
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || '100kb',
  apiKeys: parseApiKeys(process.env.API_KEYS),
  footballDataApiKey: process.env.FOOTBALL_DATA_API_KEY || '',
  footballDataBaseUrl:
    process.env.FOOTBALL_DATA_BASE_URL || 'https://api.football-data.org/v4',
  footballDataTimeoutMs: parsePositiveInteger(
    process.env.FOOTBALL_DATA_TIMEOUT_MS,
    10000,
    'FOOTBALL_DATA_TIMEOUT_MS',
  ),
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || '',
};

if (env.nodeEnv === 'production' && env.apiKeys.length === 0) {
  throw new Error('API_KEYS must contain at least one key in production');
}

module.exports = env;
