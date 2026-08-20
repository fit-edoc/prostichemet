require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiV1Router = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const { successResponse } = require('./utils/response');
const ragService = require('./services/ragService');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API v1 versioned routes (docs/14-api-design.md)
app.use('/api/v1', apiV1Router);

// Legacy root route aliases for backward-compatibility
app.use('/api', apiV1Router);

// Health check endpoint
app.get('/api/health', (req, res) => {
  return successResponse(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Postrichment AI GTM Backend',
    version: '1.0.0',
  });
});

app.get('/api/v1/health', (req, res) => {
  return successResponse(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Postrichment AI GTM Backend',
    version: '1.0.0',
  });
});

// Centralized error handling
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`=========================================`);
  console.log(`🚀 Postrichment Backend running on port ${port}`);
  console.log(`📡 API Base: http://localhost:${port}/api/v1`);
  console.log(`=========================================`);

  // Initialize RAG knowledge base with B2B outbound frameworks
  try {
    await ragService.seedDefaultKnowledge();
  } catch (err) {
    console.warn('Initial RAG seed notice:', err.message);
  }
});
