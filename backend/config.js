const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const config = {
  ENV: process.env.WEBAPP_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  API_SWAGGER: process.env.API_SWAGGER || '/api/v1/api-docs',
  HMAC_KEY: process.env.HMAC_KEY || '80ad72b8f44d82d583b4559a99b721aab5eda178',
  JWT_TOKEN_VALIDITY: process.env.JWT_TOKEN_VALIDITY || 60 * 60 * 2, // 2 hours lifetime
  JWT_TOKEN_VALIDITY_EXTERNAL: process.env.JWT_TOKEN_VALIDITY || 60 * 60 * 6, // 6 hours lifetime
  STARTING_PAGE_NUM: process.env.STARTING_PAGE_NUM || 0,
  PAGE_SIZE: process.env.PAGE_SIZE || 3,
  BASE_MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  CONNECTION_URIS: {},
};

// Assign all process.env.MONGODB_URI_XXX to config
Object.keys(process.env)
  .filter(k => k.startsWith('MONGODB_URI'))
  .forEach(k => {
    config.CONNECTION_URIS[k] = process.env[k];
  });

module.exports = config;
