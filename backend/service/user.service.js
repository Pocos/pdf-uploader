const log = require('../lib/logger.lib').getLogger('user.service');
const { getModel } = require('../config/db.config');
const { collectionName } = require('../model/entity');
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

    const result = await User.create(body);
    return {
      data: result,
    };
  } catch (e) {
    log.error(e.message);
    throw new GenericError('Unable to create company', ERROR_CONFIG.GENERIC_ERROR, true);
  }
};

exports.listUsers = listUsers;
exports.createUser = createUser;
