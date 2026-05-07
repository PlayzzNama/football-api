const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const openApiDocument = require('../config/swagger');

const router = Router();

router.get('/openapi.json', (req, res) => {
  res.status(200).json(openApiDocument);
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

module.exports = router;
