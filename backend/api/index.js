const router = require('express').Router();

const userApi = require('./user.api.js');
const fileApi = require('./file.api.js');
const loginApi = require('./login.api.js');

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
loginApi.init(router);

module.exports = router;
