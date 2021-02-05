const gm = require('gm');
const fs = require('fs');
const uuid = require('uuid');
const log = require('../lib/logger.lib').getLogger('user.service');
const config = require('../config');
const { getModel } = require('../config/db.config');
const { collectionName } = require('../model/entity');
const ERROR_CONFIG = require('../model/error/config.error');
const GenericError = require('../model/error/generic.error');
const thumbnailLib = require('../lib/thumbnail.lib');
const SORT_DIRECTION = require('../model/sort.model');

/**
 * Private utility functions used to build up filtering query for mongo
 * @param {{sortKey: string, sortDirection: string}} param0
 */
const buildSortKeyFromFilters = (sortKey, sortDirection) => {
  // default sorting
  let $sort = { filename: 1, asc: 1 };
  if (sortKey) {
    $sort = {};
    $sort[sortKey] = sortDirection ? SORT_DIRECTION[sortDirection] : SORT_DIRECTION.asc;
  }
  return { $sort };
};

/**
 * Private utility functions used to build up filtering query for mongo
 * @param {{tenant: any, filters: any}} param0
 */
const buildQueryFromFilters = ({ filters }) => {
  const $match = {};
  const mappedFilters = [];
  // Handle all other filters
  Object.keys(filters).reduce((acc, p) => {
    if (Array.isArray(filters[p])) {
      // Array search is not regex-like by definition
      acc.push({ [p]: { $in: filters[p] } });
    } else {
      acc.push({ [p]: { $regex: filters[p], $options: 'i' } });
    }
    return acc;
  }, mappedFilters);
  if (mappedFilters.length) {
    $match.$and = mappedFilters;
  }
  return { $match };
};

/**
 * List all files
 * @param {*} param0
 */
const listFiles = async (query) => {
  console.log(query);
  // Separate data used for filtering purposes from data used for pagination and sorting ones
  const {
    pageNumber, pageSize = config.PAGE_SIZE, sortKey, sortDirection, ...filters
  } = query;

  const File = getModel(collectionName.FILE);
  const [data] = await File.aggregate([
    buildQueryFromFilters({ filters }),
    {
      $facet: {
        // First facet: It retrieves data and store them in 'results'
        results: [
          buildSortKeyFromFilters(sortKey, sortDirection),
          { $skip: (pageNumber - config.STARTING_PAGE_NUM) * pageSize },
          { $limit: +pageSize },

        ],
        // Second facet: Used to retrieve totalResults basing on prepended matches
        pageInfo: [
          { $count: 'totalResults' },
        ],
      },
    },
  ]);
  const totalResults = data.pageInfo[0] ? data.pageInfo[0].totalResults : 0;

  return {
    currentPage: pageNumber,
    totalResults,
    totalPages: Math.ceil(totalResults / pageSize),
    data: data.results,
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
    console.log(file);

    await File.create({
      filename: file.originalname,
      mimetype: file.mimetype,
      filePath: `/data/${fileId}`,
      fileSize: file.size,
      thumbnailPath,
    });
  } catch (e) {
    log.error(e.message);
    throw new GenericError('Unable to create file', ERROR_CONFIG.GENERIC_ERROR, true);
  }
};

exports.listFiles = listFiles;
exports.createFile = createFile;
