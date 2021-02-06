const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const log = require('../lib/logger.lib').getLogger('user.service');
const { getModel } = require('../config/db.config');
const { collectionName } = require('../model/entity');
const { UnauthorizedError } = require('../model/error/auth.error');
const ERROR_CONFIG = require('../model/error/config.error');
const GenericError = require('../model/error/generic.error');

/**
 * List all users
 * @param {*} param0
 */
const listUsers = async () => {
  const User = getModel(collectionName.USER);
  const data = await User.find({});
  return {
    data,
  };
};

/**
 * Create new user
 * @param {{body: any}} param0
 * @returns {Promise<{
  *  data: any
  * }}>
  */
const createUser = async ({ body }) => {
  try {
    const User = getModel(collectionName.USER);
    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
    const result = await User.create(body);
    return {
      data: result,
    };
  } catch (e) {
    log.error(e.message);
    throw new GenericError('Unable to create company', ERROR_CONFIG.GENERIC_ERROR, true);
  }
};

/**
 * Login user
 * @param {{body: any}} param0
 * @returns {Promise<{
  *  data: any
  * }}>
  */
const loginUser = async ({ body }) => {
  const User = getModel(collectionName.USER);
  const [user] = await User.find({ name: body.name }).lean();
  if (!user || !bcrypt.compareSync(body.password, user.password)) {
    throw new UnauthorizedError();
  }

  try {
    // Don't put password on jwt
    delete user.password;
    const token = jwt.sign(user, config.HMAC_KEY, { expiresIn: '2h' });
    return {
      token,
    };
  } catch (e) {
    log.error(e.message);
    throw new GenericError('Unable to login user', ERROR_CONFIG.GENERIC_ERROR, true);
  }
};

exports.listUsers = listUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
