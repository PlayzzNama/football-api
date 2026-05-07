const { Router } = require('express');
const competitionController = require('../controllers/competition.controller');
const validateRequest = require('../middleware/validate-request.middleware');
const asyncHandler = require('../utils/async-handler');
const competitionValidation = require('../validations/competition.validation');

const router = Router();

router.get(
  '/competitions',
  validateRequest(competitionValidation.getCompetitionsSchema),
  asyncHandler(competitionController.getCompetitions),
);

module.exports = router;
