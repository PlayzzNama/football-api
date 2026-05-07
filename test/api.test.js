const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

const run = async () => {
  const healthResponse = await request(app).get('/health').expect(200);

  assert.equal(healthResponse.body.status, 'ok');
  assert.equal(healthResponse.body.service, 'football-api');

  const authResponse = await request(app).get('/competitions').expect(401);

  assert.equal(authResponse.body.success, false);
  assert.equal(authResponse.body.error.message, 'API key is required');

  const validationResponse = await request(app)
    .get('/matches?dateFrom=2026-99-99')
    .set('x-api-key', 'dev-api-key')
    .expect(400);

  assert.equal(validationResponse.body.error.message, 'Validation failed');
  assert.ok(Array.isArray(validationResponse.body.error.details));

  console.log('API smoke tests passed');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
