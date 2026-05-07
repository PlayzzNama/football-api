const { hashApiKey } = require('../src/services/api-key.service');

const apiKey = process.argv[2];

if (!apiKey) {
  console.error('Usage: node scripts/hash-api-key.js <api-key>');
  process.exit(1);
}

console.log(hashApiKey(apiKey));
