const { getRedisClient } = require('../config/redis');
const logger = require('../utils/logger');

const get = async (key) => {
  try {
    const redisClient = await getRedisClient();

    if (!redisClient) {
      return null;
    }

    const cachedValue = await redisClient.get(key);

    if (!cachedValue) {
      return null;
    }

    return JSON.parse(cachedValue);
  } catch (error) {
    logger.warn({ err: error, key }, 'Cache read failed');
    return null;
  }
};

const set = async (key, value, ttlSeconds) => {
  try {
    const redisClient = await getRedisClient();

    if (!redisClient) {
      return;
    }

    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  } catch (error) {
    logger.warn({ err: error, key }, 'Cache write failed');
  }
};

module.exports = {
  get,
  set,
};
