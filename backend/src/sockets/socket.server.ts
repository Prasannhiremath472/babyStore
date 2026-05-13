import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from '../configs/logger';

let io: SocketServer;

export function initSocketServer(httpServer: Server) {
  io = new SocketServer(httpServer, {
    cors: {
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        process.env.ADMIN_URL || 'http://localhost:3001',
      ],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      (socket as any).user = payload;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const user = (socket as any).user;
    logger.debug(`Socket connected: ${user.id}`);
    socket.join(`user:${user.id}`);

    if (['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(user.role)) {
      socket.join('admin');
    }

    socket.on('disconnect', () => {
      logger.debug(`Socket disconnected: ${user.id}`);
    });
  });

  logger.info('Socket.IO server initialized');
  return io;
}

export function emitToUser(userId: string, event: string, data: unknown) {
  io?.to(`user:${userId}`).emit(event, data);
}

export function emitToAdmins(event: string, data: unknown) {
  io?.to('admin').emit(event, data);
}

export function emitOrderUpdate(orderId: string, status: string, userId: string) {
  emitToUser(userId, 'order:updated', { orderId, status });
  emitToAdmins('admin:order:updated', { orderId, status, userId });
}
