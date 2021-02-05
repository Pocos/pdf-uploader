const express = require('express');
const userService = require('../service/user.service');

const middleware = require('./middleware');

/**
 * Inner router, where all api are defined
 */
const userRouter = express.Router();

const init = (app) => {
  app.use('/user', userRouter);
  // userRouter.use(middleware.checkAuthAndExtractRole);

  /**
   * @swagger
   *
   *   /api/v1/user:
   *       get:
   *           tags:
   *           - "user"
   *           summary: Get all users
   *           security:
   *            - BearerAuth: []
   *           operationId: getAllUsers
   *           parameters: []
   *           responses:
   *             200:
   *               description: Returns all users
   *               content:
   *                application/json:
   *                  schema:
   *                    $ref: '#/components/schemas/UserInfoResponse'
   */
  userRouter.get('/', async (req, res, next) => {
    try {
      const serviceData = await userService.listUsers();
      res.json(serviceData);
    } catch (e) {
      next(e);
    }
  });

  /**
   * @swagger
   *
   *   /api/v1/user:
   *       post:
   *           tags:
   *           - "user"
   *           summary: Create new user
   *           security:
   *            - BearerAuth: []
   *           operationId: createUser
   *           parameters: []
   *           requestBody:
   *             description: Create new user
   *             required: true
   *             content:
   *               application/json:
   *                 schema:
   *                   $ref: '#/components/schemas/CreateUserRequest'
   *           responses:
   *             201:
   *               description: User created
   *               content:
   *                application/json:
   *                  schema:
   *                      $ref: '#/components/schemas/UserDetailResponse'
   */
  userRouter.post('/', async (req, res, next) => {
    try {
      const result = await userService.createUser({ body: req.body });
      res.status(201).json(result);
    } catch (e) {
      next(e);
    } finally {
      next();
    }
  });
};

module.exports.init = init;
