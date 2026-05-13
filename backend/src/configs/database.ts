import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? [{ emit: 'event', level: 'query' }, { emit: 'stdout', level: 'error' }]
    : [{ emit: 'stdout', level: 'error' }],
});

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}

if (process.env.NODE_ENV === 'development') {
  (prisma as any).$on('query', (e: any) => {
    if (e.duration > 2000) {
      logger.warn(`Slow query (${e.duration}ms): ${e.query}`);
    }
  });
}

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('PostgreSQL connected via Prisma');
  } catch (error) {
    logger.error('Database connection failed', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
  logger.info('Database disconnected');
}
