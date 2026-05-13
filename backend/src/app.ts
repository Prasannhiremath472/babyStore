import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './configs/swagger';
import { errorHandler } from './middlewares/error.middleware';
import { notFound } from './middlewares/notFound.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';
import routes from './routes';

const app: Application = express();

// ========================
// Security Middleware
// ========================
app.use(helmet({
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

// ========================
// CORS
// ========================
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'https://mybabystore.net',
  'https://www.mybabystore.net',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    // Allow any subdomain of mybabystore.net
    if (/^https?:\/\/([a-z0-9-]+\.)*mybabystore\.net$/.test(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Explicitly handle preflight for all routes
app.options('*', cors());

// ========================
// Rate Limiting
// ========================
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
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

// ========================
// Body Parsing
// ========================
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ========================
// Logging
// ========================
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

// ========================
// API Docs
// ========================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'LittleNest API Docs',
}));

// ========================
// Health Check
// ========================
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'LittleNest API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ========================
// Routes
// ========================
app.use('/api/v1', routes);

// ========================
// Error Handling
// ========================
app.use(notFound);
app.use(errorHandler);

export default app;
