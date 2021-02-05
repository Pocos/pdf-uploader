/* eslint-disable max-classes-per-file */
const { UNAUTHORIZED_ERROR, FORBIDDEN_ERROR } = require('./config.error');
const GenericError = require('./generic.error');

class UnauthorizedError extends GenericError {
  constructor() {
    super('Unauthorized', UNAUTHORIZED_ERROR, true);
  }
}

class ForbiddenError extends GenericError {
  constructor() {
    super('Forbidden', FORBIDDEN_ERROR, true);
  }
}

module.exports = {
  UnauthorizedError, ForbiddenError,
};
