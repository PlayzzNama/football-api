const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler.middleware');
const notFound = require('./middleware/not-found.middleware');
const requestLogger = require('./middleware/request-logger.middleware');

const app = express();

app.disable('x-powered-by');
app.use(requestLogger);
app.use(express.json());
app.use(routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
