require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiV1Router = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { successResponse } = require('./utils/response');
const { initDatabase } = require('./db');
const ragService = require('./services/ragService');

const app = express();
const port = process.env.PORT || 4000;

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
