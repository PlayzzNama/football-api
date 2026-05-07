const database = require('../config/database');
const logger = require('../utils/logger');

const checkDatabaseHealth = async () => {
  try {
    const result = await database.query('SELECT 1 AS ok');

    if (!result) {
      return {
        configured: false,
        status: 'not_configured',
      };
    }

    return {
      configured: true,
      status: result.rows[0]?.ok === 1 ? 'ok' : 'error',
    };
  } catch (error) {
    logger.warn({ err: error }, 'Database health check failed');

    return {
      configured: true,
      status: 'error',
    };
  }
};

module.exports = {
  checkDatabaseHealth,
};
