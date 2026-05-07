const { Router } = require('express');
const matchController = require('../controllers/match.controller');
const validateRequest = require('../middleware/validate-request.middleware');
const asyncHandler = require('../utils/async-handler');
const matchValidation = require('../validations/match.validation');

const router = Router();

router.get(
  '/matches',
  validateRequest(matchValidation.getMatchesSchema),
  asyncHandler(matchController.getMatches),
);

module.exports = router;
