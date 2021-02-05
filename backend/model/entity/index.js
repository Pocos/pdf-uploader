const userSchema = require('./user.schema');
const fileSchema = require('./file.schema');

const collectionName = {
  USER: 'User',
  FILE: 'File',
};

const models = {
  [collectionName.USER]: {
    schema: userSchema,
    collection: 'users',
  },
  [collectionName.FILE]: {
    schema: fileSchema,
    collection: 'files',
  },
};

module.exports.collectionName = collectionName;
module.exports.models = models;
