const userSchema = require('./user.schema');

const collectionName = {
  USER: 'User',
};

const models = {
  [collectionName.USER]: {
    schema: userSchema,
    collection: 'users',
  },
};

module.exports.collectionName = collectionName;
module.exports.models = models;
