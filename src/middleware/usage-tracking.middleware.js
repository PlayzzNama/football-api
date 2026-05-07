const usageService = require('../services/usage.service');

const usageTracking = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', () => {
    usageService.recordUsage({
      apiClient: req.apiClient,
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: Date.now() - startedAt,
    });
  });

  next();
};

module.exports = usageTracking;
