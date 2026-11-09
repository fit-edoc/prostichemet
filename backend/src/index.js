require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiV1Router = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { successResponse, errorResponse } = require('./utils/response');
const { initDatabase } = require('./db');
const ragService = require('./services/ragService');

const app = express();
const port = process.env.PORT || 4000;

// Trust reverse proxy (e.g. Render, Cloudflare, Nginx, Vercel) for accurate client IP rate limiting
app.set('trust proxy', 1);

// Allowed origins including production, preview environments, and local dev
const defaultOrigins = [
  'https://prospail.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim().replace(/\/$/, ''))
  : [];

const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. server-to-server, curl, health checks)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    if (
      allowedOrigins.includes(cleanOrigin) ||
      allowedOrigins.includes('*') ||
      cleanOrigin.endsWith('.vercel.app') ||
      cleanOrigin.includes('localhost')
    ) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset', 'Retry-After'],
  optionsSuccessStatus: 204,
}));

app.use(express.json());

// Request logging via Morgan for cloud/Render server console visibility
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Root endpoint for Render ping / service discovery
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'online',
    service: 'Prospail AI GTM Backend',
    docs: '/api/v1/health',
    timestamp: new Date().toISOString(),
  });
});

// Render / cloud provider health check probe
app.get('/health', (req, res) => {
  return successResponse(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Prospail AI GTM Backend',
    version: '1.0.0',
  });
});

// =============================================================
// Rate Limiting Middlewares (docs/14-api-design.md & docs/15-security.md)
// =============================================================

// Standard API rate limiter for general platform endpoints
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes default
  limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100, // 100 requests per window
  standardHeaders: true, // draft-6/draft-7 RateLimit-* headers
  legacyHeaders: false, // Disable deprecated X-RateLimit-* headers
  skip: (req) => {
    // Skip CORS preflight checks and health check probes so uptime monitors are not blocked
    return req.method === 'OPTIONS' || req.path === '/health' || req.path.endsWith('/health');
  },
  handler: (req, res) => {
    return errorResponse(
      res,
      'RATE_LIMIT_EXCEEDED',
      'Too many requests from this IP address, please try again later.',
      429
    );
  },
});

// Stricter rate limiter for authentication routes (brute-force protection)
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
  limit: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 10) || 20, // 20 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
  handler: (req, res) => {
    return errorResponse(
      res,
      'AUTH_RATE_LIMIT_EXCEEDED',
      'Too many authentication attempts. Please try again after 15 minutes.',
      429
    );
  },
});

// Stricter rate limiter for expensive AI generation & RAG research endpoints
const aiResearchLimiter = rateLimit({
  windowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
  limit: parseInt(process.env.AI_RATE_LIMIT_MAX_REQUESTS, 10) || 40, // 40 AI operations per window
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
  handler: (req, res) => {
    return errorResponse(
      res,
      'AI_RATE_LIMIT_EXCEEDED',
      'AI research generation limit reached for this window. Please wait a moment before trying again.',
      429
    );
  },
});

// Apply stricter rate limiters to sensitive endpoints first
app.use('/api/v1/auth', authLimiter);
app.use('/api/auth', authLimiter);

// Apply AI rate limiter to heavy LLM and RAG research routes
app.use('/api/v1/research', aiResearchLimiter);
app.use('/api/research', aiResearchLimiter);
app.use('/api/v1/rag', aiResearchLimiter);
app.use('/api/rag', aiResearchLimiter);

// Apply general rate limiter across all API routes
app.use('/api/v1', generalLimiter);
app.use('/api', generalLimiter);

// API v1 versioned routes (docs/14-api-design.md)
app.use('/api/v1', apiV1Router);

// Legacy root route aliases for backward-compatibility
app.use('/api', apiV1Router);

// Versioned health check endpoints
app.get('/api/health', (req, res) => {
  return successResponse(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Prospail AI GTM Backend',
    version: '1.0.0',
  });
});

app.get('/api/v1/health', (req, res) => {
  return successResponse(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Prospail AI GTM Backend',
    version: '1.0.0',
  });
});

// Centralized error handling
app.use(errorHandler);

app.listen(port, '0.0.0.0', async () => {
  console.log(`=========================================`);
  console.log(`🚀 Prospail Backend running on port ${port}`);
  console.log(`📡 API Base: http://localhost:${port}/api/v1`);
  console.log(`=========================================`);

  // Ensure tables exist
  try {
    await initDatabase();
  } catch (err) {
    console.warn('Database table check warning:', err.message);
  }

  // Initialize RAG knowledge base with B2B outbound frameworks
  try {
    await ragService.seedDefaultKnowledge();
  } catch (err) {
    console.warn('Initial RAG seed notice:', err.message);
  }
});
