const axios = require('axios');
const env = require('../config/env');
const ApiError = require('../utils/api-error');
const logger = require('../utils/logger');

const footballDataClient = axios.create({
  baseURL: env.footballDataBaseUrl,
  timeout: env.footballDataTimeoutMs,
  headers: {
    Accept: 'application/json',
  },
});

const assertFootballDataConfig = () => {
  if (!env.footballDataApiKey) {
    throw new ApiError(
      500,
      'Football data provider is not configured',
      'Set FOOTBALL_DATA_API_KEY in your environment variables',
    );
  }
};

const mapFootballDataError = (error) => {
  if (error.response) {
    const upstreamMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      'Football data provider returned an error';

    logger.warn(
      {
        statusCode: error.response.status,
        upstreamData: error.response.data,
      },
      'Football data provider error',
    );

    return new ApiError(error.response.status, upstreamMessage);
  }

  if (error.request) {
    logger.error({ err: error }, 'Football data provider did not respond');
    return new ApiError(503, 'Football data provider is unavailable');
  }

  logger.error({ err: error }, 'Football data request failed');
  return new ApiError(500, 'Football data request failed');
};

const getFromFootballData = async (path, params = {}) => {
  assertFootballDataConfig();

  try {
    const response = await footballDataClient.get(path, {
      params,
      headers: {
        'X-Auth-Token': env.footballDataApiKey,
      },
    });

    return response.data;
  } catch (error) {
    throw mapFootballDataError(error);
  }
};

module.exports = {
  getFromFootballData,
};
