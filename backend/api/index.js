const router = require('express').Router();

const userApi = require('./user.api.js');

/**
 * @swagger
 *
 *  tags:
 *  - name: "user"
 *    description: "Users section"
 */

// Initialize all routes
userApi.init(router);

module.exports = router;
