const gm = require('gm');
const fs = require('fs');
const uuid = require('uuid');
const log = require('../lib/logger.lib').getLogger('user.service');
const { getModel } = require('../config/db.config');
const { collectionName } = require('../model/entity');
const ERROR_CONFIG = require('../model/error/config.error');
const GenericError = require('../model/error/generic.error');
const thumbnailLib = require('../lib/thumbnail.lib');

/**
 * List all files
 * @param {*} param0
 */
const listFiles = async () => {
  const File = getModel(collectionName.FILE);
  const data = await File.find({});
  return {
    data,
  };
};

/**
 * Create new file
 * @param {{body: any}} param0
 * @returns {Promise<{
  *  data: any
  * }}>
  */
const createFile = async ({ file }) => {
  try {
    const fileId = uuid.v4();
    fs.writeFileSync(`/data/${fileId}`, file.buffer);

    const File = getModel(collectionName.FILE);

    let thumbnailPath = null;

    if (file.mimetype === 'application/pdf') {
      thumbnailPath = `/data/${fileId}_thumbnail.png`;
      thumbnailLib.generateThumbnailForPdfByPath(`/data/${fileId}`);
    }

    await File.create({
      filename: file.originalname,
      mimetype: file.mimetype,
      filePath: `/data/${fileId}`,
      thumbnailPath,
    });
  } catch (e) {
    log.error(e.message);
    throw new GenericError('Unable to create file', ERROR_CONFIG.GENERIC_ERROR, true);
  }
};

exports.listFiles = listFiles;
exports.createFile = createFile;
