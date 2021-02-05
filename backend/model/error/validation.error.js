const { VALIDATION_ERROR } = require('./config.error');
const GenericError = require('./generic.error');

class ValidationError extends GenericError {
  constructor(errors) {
    const b = errors.reduce((acc, x) => `${acc}{target:${x.path}, message:${x.message}},`, '');
    super(b, VALIDATION_ERROR, true);
  }
}

module.exports = ValidationError;
