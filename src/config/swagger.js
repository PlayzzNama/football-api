const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const openApiPath = path.join(__dirname, '..', '..', 'docs', 'openapi.yaml');
const openApiDocument = YAML.parse(fs.readFileSync(openApiPath, 'utf8'));

module.exports = openApiDocument;
