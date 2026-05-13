"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = initSocketServer;
exports.emitToUser = emitToUser;
exports.emitToAdmins = emitToAdmins;
exports.emitOrderUpdate = emitOrderUpdate;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../configs/logger");
let io;
function initSocketServer(httpServer) {
    io = new socket_io_1.Server(httpServer, {
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
        if (!token)
            return next(new Error('Authentication error'));
        try {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            socket.user = payload;
            next();
        }
        catch {
            next(new Error('Invalid token'));
        }
    });
    io.on('connection', (socket) => {
        const user = socket.user;
        logger_1.logger.debug(`Socket connected: ${user.id}`);
        socket.join(`user:${user.id}`);
        if (['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(user.role)) {
            socket.join('admin');
        }
        socket.on('disconnect', () => {
            logger_1.logger.debug(`Socket disconnected: ${user.id}`);
        });
    });
    logger_1.logger.info('Socket.IO server initialized');
    return io;
}
function emitToUser(userId, event, data) {
    io?.to(`user:${userId}`).emit(event, data);
}
function emitToAdmins(event, data) {
    io?.to('admin').emit(event, data);
}
function emitOrderUpdate(orderId, status, userId) {
    emitToUser(userId, 'order:updated', { orderId, status });
    emitToAdmins('admin:order:updated', { orderId, status, userId });
}
//# sourceMappingURL=socket.server.js.map