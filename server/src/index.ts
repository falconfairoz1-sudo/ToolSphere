import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import dns from 'dns';
import connectDatabase from './config/database';


// Load environment variables
dotenv.config();

// Configure DNS servers for better connectivity
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Import routes
import toolsRouter from './routes/tools';
import analyticsRouter from './routes/analytics';
import healthRouter from './routes/health';
import authRouter from './routes/authRoutes';
import helpRouter from './routes/help';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDatabase();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : process.env.NODE_ENV === 'development'
  ? ['http://localhost:3000']
  : [];

const corsOptions = {
  origin: (origin: any, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like curl or server-to-server requests)
    if (!origin) return callback(null, true);

    // If no allowed origins are configured in production, allow the request
    // and log the situation so the backend can be configured properly.
    if (allowedOrigins.length === 0) {
      console.warn('ALLOWED_ORIGINS is not configured; allowing all origins for CORS.');
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    console.warn(`CORS blocked origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Higher limit in dev
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// More lenient rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 100 : 20, // 100 in dev, 20 in production
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Routes
app.use('/api/health', healthRouter);
app.use('/api/tools', toolsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/help', helpRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ToolSphere API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      tools: '/api/tools',
      analytics: '/api/analytics',
      auth: '/api/auth',
      help: '/api/help',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ToolSphere Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});

export default app;
