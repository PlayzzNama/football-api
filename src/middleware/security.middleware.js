const cors = require('cors');
const helmet = require('helmet');
const env = require('../config/env');

const securityMiddleware = [
  helmet(),
  cors({
    origin: env.corsOrigin,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
  }),
];

module.exports = securityMiddleware;
