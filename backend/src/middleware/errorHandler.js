const { errorResponse } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error('Unhandled API Error:', err);

  const status = err.statusCode || err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected internal server error occurred';
  const details = err.details || [];

  return errorResponse(res, code, message, status, details);
}

module.exports = { errorHandler };
