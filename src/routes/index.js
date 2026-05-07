const { Router } = require('express');
const competitionRoutes = require('./competition.routes');
const healthRoutes = require('./health.routes');
const matchRoutes = require('./match.routes');
const standingRoutes = require('./standing.routes');
const apiKeyAuth = require('../middleware/api-key-auth.middleware');
const apiRateLimiter = require('../middleware/rate-limit.middleware');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.use(healthRoutes);
router.use(asyncHandler(apiKeyAuth));
router.use(apiRateLimiter);
router.use(competitionRoutes);
router.use(matchRoutes);
router.use(standingRoutes);

module.exports = router;
