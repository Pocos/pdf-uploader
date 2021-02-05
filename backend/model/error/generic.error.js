const ERROR_CONFIG = require('./config.error');
/**
 * Generic Error class. All error inherits from this one
 */
class GenericError extends Error {
  /**
   * Create an error.
   * @param {String} message - Error message
   * @param { {CLIENT_TYPE: string;HTTP_CODE: number;}} type - Error type.
   * @param {boolean} isFunctional - Used to discriminate errors due to a functional issues (Such as user forbidden or
   * user not found) from unexpected ones. In the latter case the error description will be hidden for security purposes
   */
  constructor(message, type = ERROR_CONFIG.GENERIC_ERROR, isFunctional = false) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpStatus = type.HTTP_CODE;
    this.clientType = type.CLIENT_TYPE;
    if (isFunctional) {
      this.description = message;
    }
    // Error.captureStackTrace(this);
  }
}

module.exports = GenericError;
