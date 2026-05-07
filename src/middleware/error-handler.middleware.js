const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    error: {
      message: err.message || 'Internal server error',
    },
  };

  if (err.details) {
    response.error.details = err.details;
  }

  if (env.nodeEnv !== 'production') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
