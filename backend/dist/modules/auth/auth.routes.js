"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post('/login', auth_controller_1.authController.login.bind(auth_controller_1.authController));
router.post('/refresh', auth_controller_1.authController.refreshToken.bind(auth_controller_1.authController));
router.post('/logout', auth_middleware_1.authenticate, auth_controller_1.authController.logout.bind(auth_controller_1.authController));
router.get('/verify-email/:token', auth_controller_1.authController.verifyEmail.bind(auth_controller_1.authController));
router.post('/forgot-password', auth_controller_1.authController.forgotPassword.bind(auth_controller_1.authController));
router.post('/reset-password', auth_controller_1.authController.resetPassword.bind(auth_controller_1.authController));
router.put('/change-password', auth_middleware_1.authenticate, auth_controller_1.authController.changePassword.bind(auth_controller_1.authController));
router.get('/me', auth_middleware_1.authenticate, auth_controller_1.authController.me.bind(auth_controller_1.authController));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map