const expressWinston = require('express-winston');
const { getLogger } = require('../lib/logger.lib');

const configureExpressLogger = app => {
  app.use(expressWinston.logger({
    winstonInstance: getLogger('express'),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    msg: 'HTTP {{res.statusCode}} {{res.responseTime}}ms - {{req.method}} {{req.url}}',
    // Use the default Express/morgan request formatting. Enabling this will override any msg if true.
    // Will only output colors with colorize set to true
    // expressFormat: rapqhtrue,
    colorize: true,
    ignoredRoutes: ['/api/v1/health', '/api/v1/status'],
  }));
};

module.exports.configureExpressLogger = configureExpressLogger;
