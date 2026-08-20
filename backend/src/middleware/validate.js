const { errorResponse } = require('../utils/response');

/**
 * Zod validation middleware
 * @param {import('zod').ZodSchema} schema 
 * @param {'body' | 'query' | 'params'} source
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (err) {
      if (err.errors) {
        const details = err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }));
        return errorResponse(res, 'VALIDATION_ERROR', 'Input validation failed', 400, details);
      }
      return errorResponse(res, 'INVALID_INPUT', err.message || 'Invalid request data', 400);
    }
  };
}

module.exports = { validate };
