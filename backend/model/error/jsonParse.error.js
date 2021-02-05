const { JSON_PARSE_ERROR } = require('./config.error');
const GenericError = require('./generic.error');

class JsonParseError extends GenericError {
  constructor(message) {
    super(message, JSON_PARSE_ERROR, true);
  }
}

module.exports = JsonParseError;
