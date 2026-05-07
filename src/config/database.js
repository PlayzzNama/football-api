const { Pool } = require('pg');
const env = require('./env');
const logger = require('../utils/logger');

let pool;

const getPool = () => {
  if (!env.databaseUrl) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 1000,
      ssl:
        env.nodeEnv === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    });

    pool.on('error', (error) => {
      logger.error({ err: error }, 'Unexpected PostgreSQL pool error');
    });
  }

  return pool;
};

const query = async (text, params = []) => {
  const databasePool = getPool();

  if (!databasePool) {
    return null;
  }

  return databasePool.query(text, params);
};

const closeDatabase = async () => {
  if (pool) {
    await pool.end();
  }
};

module.exports = {
  closeDatabase,
  getPool,
  query,
};
