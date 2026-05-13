import { Router } from 'express';
import { auditController } from './audit.controller';
import { authenticate, isSuperAdmin, authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

router.use(authenticate, authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN));
router.get('/', auditController.getLogs.bind(auditController));
router.get('/:id', auditController.getLogById.bind(auditController));

export default router;
