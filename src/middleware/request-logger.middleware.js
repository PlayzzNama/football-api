const pinoHttp = require('pino-http');
const logger = require('../utils/logger');

const requestLogger = pinoHttp({
  logger,
  customProps: (req) => ({
    requestId: req.id,
  }),
});

module.exports = requestLogger;
