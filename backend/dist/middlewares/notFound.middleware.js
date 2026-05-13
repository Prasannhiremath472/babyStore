"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
function notFound(req, res) {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`,
        code: 'ROUTE_NOT_FOUND',
    });
}
//# sourceMappingURL=notFound.middleware.js.map