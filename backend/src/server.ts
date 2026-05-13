import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import { logger } from './configs/logger';
import { connectDatabase } from './configs/database';
import { initSocketServer } from './sockets/socket.server';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    // Try DB connection — log error but don't crash so Hostinger keeps the process alive
    try {
      await connectDatabase();
    } catch (dbError) {
      logger.error('Database connection failed — check DATABASE_URL env var', dbError);
      logger.warn('Server starting without DB — requests will fail until DB is available');
    }

    const httpServer = http.createServer(app);
    initSocketServer(httpServer);

    httpServer.listen(PORT, () => {
      logger.info(`My Baby API running on port ${PORT} [${process.env.NODE_ENV}]`);
      logger.info(`DATABASE_URL set: ${!!process.env.DATABASE_URL}`);
      logger.info(`REDIS_URL: ${process.env.REDIS_URL || 'not set (using default)'}`);
    });

    process.on('SIGTERM', () => gracefulShutdown(httpServer));
    process.on('SIGINT', () => gracefulShutdown(httpServer));
  } catch (error) {
    logger.error('Fatal server error', error);
    process.exit(1);
  }
}

function gracefulShutdown(server: http.Server) {
  logger.info('Shutting down gracefully...');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
}

bootstrap();
