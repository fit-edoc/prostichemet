const assert = require('assert');
const express = require('express');
const { rateLimit } = require('express-rate-limit');

async function testRateLimiter() {
  const app = express();
  app.set('trust proxy', 1);

  const testLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path.endsWith('/health'),
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' },
      });
    },
  });

  app.use('/api', testLimiter);
  app.get('/api/health', (req, res) => res.json({ status: 'healthy' }));
  app.get('/api/test', (req, res) => res.json({ success: true }));

  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // Health checks must not consume rate limit tokens
    const h1 = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(h1.status, 200, 'Health check 1 must return 200');
    const h2 = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(h2.status, 200, 'Health check 2 must return 200');

    // First request - should succeed
    const r1 = await fetch(`${baseUrl}/api/test`);
    assert.strictEqual(r1.status, 200, 'Request 1 must succeed with 200');
    assert.strictEqual(r1.headers.get('ratelimit-remaining'), '1', 'Remaining should be 1');

    // Second request - should succeed
    const r2 = await fetch(`${baseUrl}/api/test`);
    assert.strictEqual(r2.status, 200, 'Request 2 must succeed with 200');
    assert.strictEqual(r2.headers.get('ratelimit-remaining'), '0', 'Remaining should be 0');

    // Third request - must be throttled with 429
    const r3 = await fetch(`${baseUrl}/api/test`);
    assert.strictEqual(r3.status, 429, 'Request 3 must be blocked with status 429');
    const data3 = await r3.json();
    assert.strictEqual(data3.error.code, 'RATE_LIMIT_EXCEEDED', 'Error code must match RATE_LIMIT_EXCEEDED');

    console.log('✔ Rate limiting test passed');
  } finally {
    server.close();
  }
}

testRateLimiter().catch((err) => {
  console.error('❌ Rate limit test failed:', err);
  process.exit(1);
});

