/**
 * Configuration used to classify errors.
 * CLIENT_TYPE: The client will use this key to properly classify errors, it could also be a number
 * HTTP_CODE: Http response status code
 */
const ERROR_CONFIG = {
  GENERIC_ERROR: {
    CLIENT_TYPE: 'GENERIC_ERROR',
    HTTP_CODE: 500,
  },
  VALIDATION_ERROR: {
    CLIENT_TYPE: 'VALIDATION_ERROR',
    HTTP_CODE: 400,
  },
  UNAUTHORIZED_ERROR: {
    CLIENT_TYPE: 'UNAUTHORIZED_ERROR',
    HTTP_CODE: 401,
  },
  FORBIDDEN_ERROR: {
    CLIENT_TYPE: 'FORBIDDEN_ERROR',
    HTTP_CODE: 403,
  },
  NOT_FOUND_ERROR: {
    CLIENT_TYPE: 'NOT_FOUND_ERROR',
    HTTP_CODE: 404,
  },
  JSON_PARSE_ERROR: {
    CLIENT_TYPE: 'JSON_PARSE_ERROR',
    HTTP_CODE: 400,
  },
};

module.exports = ERROR_CONFIG;
