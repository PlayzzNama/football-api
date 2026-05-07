const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler.middleware');
const notFound = require('./middleware/not-found.middleware');
const requestLogger = require('./middleware/request-logger.middleware');
const securityMiddleware = require('./middleware/security.middleware');
const env = require('./config/env');

const app = express();

app.disable('x-powered-by');
app.use(requestLogger);
app.use(securityMiddleware);
app.use(express.json({ limit: env.jsonBodyLimit }));
app.use(routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
