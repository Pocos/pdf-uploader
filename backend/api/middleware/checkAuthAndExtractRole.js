// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { UnauthorizedError } = require('../../model/error/auth.error');

const checkAuthAndExtractRole = (req, res, next) => {
  try {
    req.headers.authorization = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '';
    if (!req.headers.authorization) {
      throw new UnauthorizedError();
    }
    try {
      jwt.verify(req.headers.authorization, config.HMAC_KEY);
    } catch (e) {
      throw new UnauthorizedError();
    }
    // Now I'm sure that the token is ok
    const decodedToken = jwt.decode(req.headers.authorization, config.HMAC_KEY);
    req.user = decodedToken;
  } catch (e) {
    next(e);
  } finally {
    next(); // Forward to next middleware
  }
};

module.exports = checkAuthAndExtractRole;
