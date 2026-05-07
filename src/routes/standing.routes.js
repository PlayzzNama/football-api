const { Router } = require('express');
const standingController = require('../controllers/standing.controller');
const validateRequest = require('../middleware/validate-request.middleware');
const asyncHandler = require('../utils/async-handler');
const standingValidation = require('../validations/standing.validation');

const router = Router();

router.get(
  '/standings',
  validateRequest(standingValidation.getStandingsSchema),
  asyncHandler(standingController.getStandings),
);

module.exports = router;
