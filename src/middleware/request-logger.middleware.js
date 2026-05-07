const pinoHttp = require('pino-http');
const logger = require('../utils/logger');

const requestLogger = pinoHttp({
  logger,
  redact: {
    paths: [
      'req.headers.x-api-key',
      'req.headers.authorization',
      'req.headers.cookie',
    ],
    censor: '[REDACTED]',
  },
  customProps: (req) => ({
    requestId: req.id,
  }),
});

module.exports = requestLogger;
