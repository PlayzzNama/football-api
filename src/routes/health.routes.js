const { Router } = require('express');
const healthController = require('../controllers/health.controller');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get('/health', asyncHandler(healthController.getHealth));

module.exports = router;
