/**
 * Standard API Response Utilities (As per docs/14-api-design.md)
 */

function successResponse(res, data, status = 200, meta = null) {
  const payload = {
    success: true,
    data,
  };
  if (meta) {
    payload.meta = meta;
  }
  return res.status(status).json(payload);
}

function errorResponse(res, code, message, status = 400, details = []) {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
      details,
    },
  });
}

module.exports = {
  successResponse,
  errorResponse,
};
