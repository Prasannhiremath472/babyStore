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
    await connectDatabase();

    const httpServer = http.createServer(app);
    initSocketServer(httpServer);

    httpServer.listen(PORT, () => {
      logger.info(`LittleNest API running on port ${PORT} [${process.env.NODE_ENV}]`);
    });

    process.on('SIGTERM', () => gracefulShutdown(httpServer));
    process.on('SIGINT', () => gracefulShutdown(httpServer));
  } catch (error) {
    logger.error('Failed to start server', error);
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
