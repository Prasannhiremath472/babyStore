"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        issuer: 'littlenest.in',
        audience: 'littlenest-client',
    });
}
function signRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        issuer: 'littlenest.in',
    });
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
}
//# sourceMappingURL=jwt.util.js.map