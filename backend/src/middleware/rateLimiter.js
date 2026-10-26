const requestCounts = new Map();

function simpleRateLimiter({ windowMs = 60000, maxRequests = 100 } = {}) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const clientData = requestCounts.get(ip) || { count: 0, resetAt: now + windowMs };

    if (now > clientData.resetAt) {
      clientData.count = 1;
      clientData.resetAt = now + windowMs;
    } else {
      clientData.count++;
    }

    requestCounts.set(ip, clientData);

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests, please slow down.' },
      });
    }

    next();
  };
}

module.exports = { simpleRateLimiter };
