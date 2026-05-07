const database = require('../config/database');
const logger = require('../utils/logger');

const recordUsage = async ({
  apiClient,
  method,
  route,
  statusCode,
  responseTimeMs,
}) => {
  if (!apiClient) {
    return;
  }

  try {
    await database.query(
      `
        INSERT INTO usage_events (
          api_key_id,
          api_key_source,
          route,
          method,
          status_code,
          response_time_ms
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        apiClient.id,
        apiClient.source,
        route,
        method,
        statusCode,
        responseTimeMs,
      ],
    );
  } catch (error) {
    logger.warn({ err: error }, 'Failed to record API usage');
  }
};

module.exports = {
  recordUsage,
};
