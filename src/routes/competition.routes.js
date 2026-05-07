const { Router } = require('express');
const competitionController = require('../controllers/competition.controller');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get('/competitions', asyncHandler(competitionController.getCompetitions));

module.exports = router;
