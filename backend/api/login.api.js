const express = require('express');
const userService = require('../service/user.service');

const middleware = require('./middleware');

/**
 * Inner router, where all api are defined
 */
const loginRouter = express.Router();

const init = (app) => {
  app.use('/login', loginRouter);
  // loginRouter.use(middleware.checkAuthAndExtractRole);

  /**
   * @swagger
   *
   *   /api/v1/login:
   *       post:
   *           tags:
   *           - "user"
   *           summary: Login user
   *           security:
   *            - BearerAuth: []
   *           operationId: loginUser
   *           parameters: []
   *           requestBody:
   *             description: Login user
   *             required: true
   *             content:
   *               application/json:
   *                 schema:
   *                   $ref: '#/components/schemas/LoginRequest'
   *           responses:
   *             200:
   *               description: Login ok
   *               content:
   *                application/json:
   *                  schema:
   *                      type: object
   */
  loginRouter.post('/', async (req, res, next) => {
    try {
      const result = await userService.loginUser({ body: req.body });
      res.json(result);
    } catch (e) {
      next(e);
    } finally {
      next();
    }
  });
};

module.exports.init = init;
