const env = require('../config/env');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const logLevel = statusCode >= 500 ? 'error' : 'warn';

  logger[logLevel](
    {
      err,
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      statusCode,
    },
    err.message,
  );

  const response = {
    success: false,
    error: {
      message: err.message || 'Internal server error',
    },
  };

  if (err.details && (env.nodeEnv !== 'production' || statusCode < 500)) {
    response.error.details = err.details;
  }

  if (env.nodeEnv !== 'production') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
