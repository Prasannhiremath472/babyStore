"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.resetPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[0-9]/, 'Must contain a number'),
    firstName: zod_1.z.string().min(2).max(50),
    lastName: zod_1.z.string().min(2).max(50),
    phone: zod_1.z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1, 'Password required'),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1),
    password: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[0-9]/, 'Must contain a number'),
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1),
    newPassword: zod_1.z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[0-9]/, 'Must contain a number'),
});
//# sourceMappingURL=auth.validation.js.map