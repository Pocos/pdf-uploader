const mongoose = require('mongoose');
const logger = require('../lib/logger.lib').getLogger('db');
const config = require('../config');
const { models } = require('../model/entity/index');
const GenericError = require('../model/error/generic.error');

/**
 * Mongoose model
 * @typedef {typeof import("mongoose").Model} Model
 *
 *
 * Extended moongose model, with new functions
 * @typedef {Object} OtherModelFunctions
 * @property {function(string):Promise<Document>} findByIdOrThrow
 * @property {function(string):Promise<Document>} findOneOrThrowLean
 *
 * @typedef {Model & OtherModelFunctions} ExtendedModel
 */

/**
 * Keep the connection inside this object
 */
let dbConnection = null;

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/content';

/**
 * Get a previously saved connection based on tenant. Create it and attach listeners if not.
 *
 * @param {String} tenant
 * @returns {typeof import("mongoose")}
 */
const getOrCreateMongooseConnection = () => {
  if (!dbConnection) {
    logger.debug('conn', { dbHost, connectionUris: config.CONNECTION_URIS });

    dbConnection = new mongoose.Mongoose();
    dbConnection.connect(dbHost, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    dbConnection.set('debug', (coll, method, query, doc, options) => {
      logger.debug('[DB]', {
        coll, method, query, doc, options,
      });
    });

    const conn = dbConnection.connection;

    conn.on('error', (err) => {
      logger.error('MongoDB Connection Error:', { name: err.name, msg: err.message });
    });

    conn.on('disconnected', () => {
      logger.error('MongoDB disconnected.');
    });

    conn.on('connecting', () => {
      logger.debug('MongoDB connecting...');
    });

    conn.on('connected', async () => {
      logger.info('MongoDB connected.');
    });

    conn.on('open', () => {
      logger.debug('MongoDB connection open.');
    });
  }
  return dbConnection;
};

/*
  Initialize connections based on configs
*/
(() => {
  getOrCreateMongooseConnection();
})();

/**
 * Contains all models, populated as request.
 * Keys are saved in the form of ${modelName}
 */
const modelsCache = {
};

/**
 * get the mongodb model and save it to a cache
 *
 * @param {String} modelName model name corresponding to a mongodb collection
 * @returns {ExtendedModel} mongodb model
 */
const getModel = (modelName) => {
  const modelConfig = models[modelName];
  if (!modelConfig) throw new GenericError(`Unknown model '${modelName}'`);
  let model = modelsCache[modelName];
  if (!model) {
    const mongooseInstance = getOrCreateMongooseConnection();
    model = mongooseInstance.model(modelConfig.collection, modelConfig.schema);
    modelsCache[modelName] = model;
  }

  return model;
};

exports.getModel = getModel;
exports.getOrCreateMongooseConnection = getOrCreateMongooseConnection;
