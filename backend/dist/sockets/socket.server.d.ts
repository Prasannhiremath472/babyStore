import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
export declare function initSocketServer(httpServer: Server): SocketServer<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export declare function emitToUser(userId: string, event: string, data: unknown): void;
export declare function emitToAdmins(event: string, data: unknown): void;
export declare function emitOrderUpdate(orderId: string, status: string, userId: string): void;
//# sourceMappingURL=socket.server.d.ts.map