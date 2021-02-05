const { NOT_FOUND_ERROR } = require('./config.error');
const GenericError = require('./generic.error');

class NotFoundError extends GenericError {
  constructor(message) {
    super(message, NOT_FOUND_ERROR, true);
  }
}

module.exports = NotFoundError;
