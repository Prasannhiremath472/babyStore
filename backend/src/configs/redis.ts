import Redis from 'ioredis';
import { logger } from './logger';

let redis: Redis;

export function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 10) return null;
        return Math.min(times * 200, 3000);
      },
    });

    redis.on('connect', () => logger.info('Redis connected'));
    redis.on('error', (err) => logger.error('Redis error', err));
    redis.on('close', () => logger.warn('Redis connection closed'));
  }
  return redis;
}

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await getRedis().get(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    try {
      await getRedis().setex(key, ttlSeconds, JSON.stringify(value));
    } catch {
      // Redis unavailable — degrade gracefully
    }
  },

  async del(key: string): Promise<void> {
    try {
      await getRedis().del(key);
    } catch {}
  },

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await getRedis().keys(pattern);
      if (keys.length) await getRedis().del(...keys);
    } catch {}
  },
};
