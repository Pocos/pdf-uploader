const router = require('express').Router();

const userApi = require('./user.api.js');
const fileApi = require('./file.api.js');

/**
 * @swagger
 *
 *  tags:
 *  - name: "user"
 *    description: "Users section"
 *  - name: "file"
 *    description: "Files section"
 */

// Initialize all routes
userApi.init(router);
fileApi.init(router);

module.exports = router;
