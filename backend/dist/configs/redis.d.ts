import Redis from 'ioredis';
export declare function getRedis(): Redis;
export declare const cache: {
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    delPattern(pattern: string): Promise<void>;
};
//# sourceMappingURL=redis.d.ts.map