const { ZodError } = require('zod');
const ApiError = require('../utils/api-error');

const formatZodErrors = (error) =>
  error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

const validateRequest = (schema) => (req, res, next) => {
  try {
    req.validated = {};

    if (schema.params) {
      req.validated.params = schema.params.parse(req.params);
    }

    if (schema.query) {
      req.validated.query = schema.query.parse(req.query);
    }

    if (schema.body) {
      req.validated.body = schema.body.parse(req.body);
    }

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(new ApiError(400, 'Validation failed', formatZodErrors(error)));
      return;
    }

    next(error);
  }
};

module.exports = validateRequest;
