const { Router } = require('express');
const competitionRoutes = require('./competition.routes');
const healthRoutes = require('./health.routes');
const matchRoutes = require('./match.routes');

const router = Router();

router.use(healthRoutes);
router.use(competitionRoutes);
router.use(matchRoutes);

module.exports = router;
