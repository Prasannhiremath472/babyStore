"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
exports.prisma = global.__prisma || new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development'
        ? [{ emit: 'event', level: 'query' }, { emit: 'stdout', level: 'error' }]
        : [{ emit: 'stdout', level: 'error' }],
});
if (process.env.NODE_ENV !== 'production') {
    global.__prisma = exports.prisma;
}
if (process.env.NODE_ENV === 'development') {
    exports.prisma.$on('query', (e) => {
        if (e.duration > 2000) {
            logger_1.logger.warn(`Slow query (${e.duration}ms): ${e.query}`);
        }
    });
}
async function connectDatabase() {
    try {
        await exports.prisma.$connect();
        logger_1.logger.info('PostgreSQL connected via Prisma');
    }
    catch (error) {
        logger_1.logger.error('Database connection failed', error);
        throw error;
    }
}
async function disconnectDatabase() {
    await exports.prisma.$disconnect();
    logger_1.logger.info('Database disconnected');
}
//# sourceMappingURL=database.js.map