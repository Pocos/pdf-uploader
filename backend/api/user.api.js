const express = require('express');

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
      res.json({ a: 'b' });
    } catch (e) {
      next(e);
    }
  });
};

module.exports.init = init;
