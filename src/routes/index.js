const { Router } = require('express');
const competitionRoutes = require('./competition.routes');
const healthRoutes = require('./health.routes');

const router = Router();

router.use(healthRoutes);
router.use(competitionRoutes);

module.exports = router;
