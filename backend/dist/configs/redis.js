"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
exports.getRedis = getRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = require("./logger");
let redis;
function getRedis() {
    if (!redis) {
        redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379', {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
            retryStrategy: (times) => {
                if (times > 10)
                    return null;
                return Math.min(times * 200, 3000);
            },
        });
        redis.on('connect', () => logger_1.logger.info('Redis connected'));
        redis.on('error', (err) => logger_1.logger.error('Redis error', err));
        redis.on('close', () => logger_1.logger.warn('Redis connection closed'));
    }
    return redis;
}
exports.cache = {
    async get(key) {
        try {
            const data = await getRedis().get(key);
            return data ? JSON.parse(data) : null;
        }
        catch {
            return null;
        }
    },
    async set(key, value, ttlSeconds = 300) {
        try {
            await getRedis().setex(key, ttlSeconds, JSON.stringify(value));
        }
        catch {
        }
    },
    async del(key) {
        try {
            await getRedis().del(key);
        }
        catch { }
    },
    async delPattern(pattern) {
        try {
            const keys = await getRedis().keys(pattern);
            if (keys.length)
                await getRedis().del(...keys);
        }
        catch { }
    },
};
//# sourceMappingURL=redis.js.map