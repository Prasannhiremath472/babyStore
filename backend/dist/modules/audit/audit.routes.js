"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_controller_1 = require("./audit.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN));
router.get('/', audit_controller_1.auditController.getLogs.bind(audit_controller_1.auditController));
router.get('/:id', audit_controller_1.auditController.getLogById.bind(audit_controller_1.auditController));
exports.default = router;
//# sourceMappingURL=audit.routes.js.map