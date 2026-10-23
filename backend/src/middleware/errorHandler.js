const { errorResponse } = require('../utils/response');

function errorHandler(err, req, res, next) {
  // Always log detailed stack trace to server console (Render logs)
  console.error(`❌ [SERVER ERROR] [${req.method}] ${req.originalUrl}:`, {
    message: err.message,
    code: err.code,
    stack: err.stack,
    details: err.details,
    query: req.query,
    ip: req.ip,
  });

  const status = err.statusCode || err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  // In production / for 500 errors, never show technical raw database / server internals to real users
  const isServerFault = status >= 500;
  const clientMessage = isServerFault
    ? 'Something went wrong on our end. Please try again shortly.'
    : (err.message || 'Request failed.');

  return errorResponse(res, code, clientMessage, status);
}

module.exports = { errorHandler };
