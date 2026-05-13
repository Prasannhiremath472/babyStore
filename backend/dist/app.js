"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./configs/swagger");
const error_middleware_1 = require("./middlewares/error.middleware");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const requestLogger_middleware_1 = require("./middlewares/requestLogger.middleware");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
            fontSrc: ["'self'", 'fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'res.cloudinary.com', '*.amazonaws.com'],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", 'api.razorpay.com'],
        },
    },
    crossOriginEmbedderPolicy: false,
}));
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        process.env.ADMIN_URL || 'http://localhost:3001',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many authentication attempts.' },
    skipSuccessfulRequests: true,
});
app.use('/api', globalLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(requestLogger_middleware_1.requestLogger);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'LittleNest API Docs',
}));
app.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        service: 'LittleNest API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    });
});
app.use('/api/v1', routes_1.default);
app.use(notFound_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map