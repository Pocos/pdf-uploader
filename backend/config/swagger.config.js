const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const packageJson = require('../package.json');

const options = {
  swaggerDefinition: {
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    },
    openapi: '3.0.0',
  },
  // List of files to be processes.
  apis: [path.join(__dirname, '../api/*.js'), path.join(__dirname, '../api/docs/*.js')],
};
const specs = swaggerJsdoc(options);
module.exports = specs;
