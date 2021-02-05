const GenericError = require('../../model/error/generic.error');
const ValidationError = require('../../model/error/validation.error');
const ERROR_CONFIG = require('../../model/error/config.error');
const NotFoundError = require('../../model/error/notFound.error');
const JsonParseError = require('../../model/error/jsonParse.error');
const log = require('../../lib/logger.lib').getLogger('error.handler');

// OpenApiValidationMiddleware returns 500 in case of malformed response, 400, 405 415 in case of malformed request.
const openApiErrorStatusCodes = [400, 405, 415];

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  log.error(err);
  log.error(err.message);
  log.error(err.stack);
  let responseError;
  if (err instanceof SyntaxError) {
    // Thrown when json parsing encounter an error
    responseError = new JsonParseError(err.message);
  } else if (err instanceof GenericError) {
    // Errors thrown by coder
    responseError = err;
  } else if (err.errors && openApiErrorStatusCodes.indexOf(err.status) !== -1) {
    // Errors thrown by OpenApiValidationMiddleware if active
    // Hide the first to the client, show the second
    responseError = new ValidationError(err.errors);
  } else if (err.status === 404) {
    responseError = new NotFoundError(err.message);
  } else {
    // Unexpected but catched errors: hide them
    responseError = new GenericError(err.message, ERROR_CONFIG.GENERIC_ERROR, false);
  }

  // Build error json response
  res.status(responseError.httpStatus);
  res.json(responseError);
};

module.exports = errorHandler;
