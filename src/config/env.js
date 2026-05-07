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

const parseCorsOrigin = (value) => {
  if (!value || value === '*') {
    return '*';
  }

  return value.split(',').map((origin) => origin.trim());
};

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsePort(process.env.PORT),
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || '100kb',
  footballDataApiKey: process.env.FOOTBALL_DATA_API_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || '',
};

module.exports = env;
