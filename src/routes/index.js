const { Router } = require('express');
const competitionRoutes = require('./competition.routes');
const docsRoutes = require('./docs.routes');
const healthRoutes = require('./health.routes');
const matchRoutes = require('./match.routes');
const apiKeyAuth = require('../middleware/api-key-auth.middleware');
const apiRateLimiter = require('../middleware/rate-limit.middleware');
const usageTracking = require('../middleware/usage-tracking.middleware');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.use(docsRoutes);
router.use(healthRoutes);
router.use(asyncHandler(apiKeyAuth));
router.use(apiRateLimiter);
router.use(usageTracking);
router.use(competitionRoutes);
router.use(matchRoutes);

module.exports = router;
