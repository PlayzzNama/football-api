const { createClient } = require('redis');
const env = require('./env');
const logger = require('../utils/logger');

let redisClient;
let connectPromise;
let disabledUntil = 0;

const REDIS_RETRY_DELAY_MS = 30000;
const REDIS_CONNECT_TIMEOUT_MS = 500;

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Redis connection timed out')), timeoutMs);
    }),
  ]);

const getRedisClient = async () => {
  if (!env.redisUrl) {
    return null;
  }

  if (Date.now() < disabledUntil) {
    return null;
  }

  if (!redisClient) {
    redisClient = createClient({
      url: env.redisUrl,
      socket: {
        connectTimeout: REDIS_CONNECT_TIMEOUT_MS,
        reconnectStrategy: false,
      },
    });

    redisClient.on('error', (error) => {
      logger.warn({ err: error }, 'Redis client error');
    });
  }

  if (!redisClient.isOpen) {
    connectPromise ||= redisClient.connect().finally(() => {
      connectPromise = null;
    });

    try {
      await withTimeout(connectPromise, REDIS_CONNECT_TIMEOUT_MS);
    } catch (error) {
      disabledUntil = Date.now() + REDIS_RETRY_DELAY_MS;
      logger.warn({ err: error }, 'Redis unavailable, cache temporarily disabled');
      return null;
    }
  }

  return redisClient;
};

const disconnectRedis = async () => {
  if (redisClient?.isOpen) {
    await redisClient.quit();
  }
};

module.exports = {
  disconnectRedis,
  getRedisClient,
};
