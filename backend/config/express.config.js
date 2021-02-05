const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const fileUpload = require('express-fileupload');

const { OpenApiValidator } = require('express-openapi-validator');

const config = require('../config');
const routes = require('../api');
const swaggerSpecs = require('./swagger.config');
const middleware = require('../api/middleware');

const { configureExpressLogger } = require('./logger.config');

const setupExpress = () => {
  const app = express();
  configureExpressLogger(app);

  // Remove headers according to OWASP conventions
  app.use(helmet());
  /* app.use(
    helmet.contentSecurityPolicy({
      directives: {
        'default-src': ["'self'"],
        'style-src': ["'self' 'unsafe-inline'"],
        'img-src': ["'self' data:"],
        'script-src': ["'self'", 'example.com'],
        'object-src': ["'none'"],
      },
    }),
  ); */
  // manage x-forwarded-for header
  app.enable('trust proxy');
  app.set('port', config.PORT);

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
  app.use(cookieParser());

  // Swagger configuration
  app.use(config.API_SWAGGER, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Configure API validation based on swagger. Wait until installation
  new OpenApiValidator({
    apiSpec: swaggerSpecs, // api spec JSON object
    // ... other options
    validateRequests: true,
    validateResponses: true,
    validateSecurity: false,
  }).install(app).then(() => {
    // Load API routes
    app.use(config.API_PREFIX, routes);
    // All middlewares in order
    app.use(
      fileUpload({
        createParentPath: true,
      }),
    );
    // Error handlers
    app.use(middleware.errorHandler);
  });

  return app;
};

module.exports = setupExpress;
