const app = require('./app');
const { closeDatabase } = require('./config/database');
const env = require('./config/env');
const { disconnectRedis } = require('./config/redis');
const logger = require('./utils/logger');

const server = app.listen(env.port, () => {
  logger.info({ port: env.port }, 'Football API is running');
});

const shutdown = async (signal) => {
  logger.info({ signal }, 'Shutting down Football API');

  server.close(async () => {
    await closeDatabase();
    await disconnectRedis();
    process.exit(0);
  });
};

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  shutdown('SIGINT');
});
