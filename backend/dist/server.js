"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./configs/logger");
const database_1 = require("./configs/database");
const socket_server_1 = require("./sockets/socket.server");
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    try {
        try {
            await (0, database_1.connectDatabase)();
        }
        catch (dbError) {
            logger_1.logger.error('Database connection failed — check DATABASE_URL env var', dbError);
            logger_1.logger.warn('Server starting without DB — requests will fail until DB is available');
        }
        const httpServer = http_1.default.createServer(app_1.default);
        (0, socket_server_1.initSocketServer)(httpServer);
        httpServer.listen(PORT, () => {
            logger_1.logger.info(`My Baby API running on port ${PORT} [${process.env.NODE_ENV}]`);
            logger_1.logger.info(`DATABASE_URL set: ${!!process.env.DATABASE_URL}`);
            logger_1.logger.info(`REDIS_URL: ${process.env.REDIS_URL || 'not set (using default)'}`);
        });
        process.on('SIGTERM', () => gracefulShutdown(httpServer));
        process.on('SIGINT', () => gracefulShutdown(httpServer));
    }
    catch (error) {
        logger_1.logger.error('Fatal server error', error);
        process.exit(1);
    }
}
function gracefulShutdown(server) {
    logger_1.logger.info('Shutting down gracefully...');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
        process.exit(0);
    });
}
bootstrap();
//# sourceMappingURL=server.js.map