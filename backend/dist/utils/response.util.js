"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendCreated = sendCreated;
exports.sendPaginated = sendPaginated;
exports.paginate = paginate;
exports.getPaginationParams = getPaginationParams;
function sendSuccess(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({ success: true, message, data });
}
function sendCreated(res, data, message = 'Created successfully') {
    return sendSuccess(res, data, message, 201);
}
function sendPaginated(res, data, meta, message = 'Success') {
    return res.status(200).json({ success: true, message, data, meta });
}
function paginate(page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    return {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
}
function getPaginationParams(query) {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}
//# sourceMappingURL=response.util.js.map