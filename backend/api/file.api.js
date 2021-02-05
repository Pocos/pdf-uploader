const express = require('express');
const fileService = require('../service/file.service');

const middleware = require('./middleware');

/**
 * Inner router, where all api are defined
 */
const fileRouter = express.Router();

const init = (app) => {
  app.use('/file', fileRouter);
  // fileRouter.use(middleware.checkAuthAndExtractRole);

  /**
   * @swagger
   *
   *   /api/v1/file:
   *       get:
   *           tags:
   *           - "file"
   *           summary: Get all files
   *           security:
   *            - BearerAuth: []
   *           operationId: getAllFiles
   *           parameters: []
   *           responses:
   *             200:
   *               description: Returns all files
   *               content:
   *                application/json:
   *                  schema:
   *                    $ref: '#/components/schemas/FileResponse'
   */
  fileRouter.get('/', async (req, res, next) => {
    try {
      const serviceData = await fileService.listFiles();
      res.json(serviceData);
    } catch (e) {
      next(e);
    }
  });

  /**
   * @swagger
   *
   *   /api/v1/file:
   *       post:
   *           tags:
   *           - "file"
   *           summary: Create new file
   *           security:
   *            - BearerAuth: []
   *           operationId: createfile
   *           parameters: []
   *           requestBody:
   *             description: Upload logo to s3
   *             required: true
   *             content:
   *               multipart/form-data:
   *                 schema:
   *                   type: object
   *                   required:
   *                    - file
   *                   properties:
   *                    file:
   *                      type: string
   *                      format: binary
   *           responses:
   *             204:
   *               description: UploadSuccessful
   */
  fileRouter.post('/', async (req, res, next) => {
    try {
      const result = await fileService.createFile({ file: req.files[0] });
      res.status(204).end();
    } catch (e) {
      next(e);
    } finally {
      next();
    }
  });
};

module.exports.init = init;
