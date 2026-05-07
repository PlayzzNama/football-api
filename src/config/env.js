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

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsePort(process.env.PORT),
  footballDataApiKey: process.env.FOOTBALL_DATA_API_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || '',
};

module.exports = env;
