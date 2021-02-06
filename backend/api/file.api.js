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
   *   /api/v1/file/data/{id}:
   *       get:
   *           tags:
   *           - "file"
   *           summary: Get file data, thumbnail or pdf
   *           security:
   *            - BearerAuth: []
   *           operationId: getAllFiles
   *           parameters:
   *            - in: path
   *              name: id
   *              required: true
   *              schema:
   *                type: string
   *           responses:
   *             200:
   *               description: Returns file
   */
  fileRouter.get('/data/:id', async (req, res, next) => {
    try {
      res.sendFile(`/data/${req.params.id}`);
    } catch (e) {
      next(e);
    }
  });

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
   *           parameters:
   *            - $ref: '#/components/parameters/CommonPageNumParam'
   *            - $ref: '#/components/parameters/CommonPageSizeParam'
   *            - $ref: '#/components/parameters/CommonSortKeyParam'
   *            - $ref: '#/components/parameters/CommonSortDirectionParam'
   *           responses:
   *             200:
   *               description: Returns all files
   *               content:
   *                application/json:
   *                  schema:
   *                    $ref: '#/components/schemas/FileResponse'
   */
  fileRouter.get('/', middleware.checkAuthAndExtractRole, async (req, res, next) => {
    try {
      const serviceData = await fileService.listFiles({ query: req.query, user: req.user });
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
  fileRouter.post('/', middleware.checkAuthAndExtractRole, async (req, res, next) => {
    try {
      await fileService.createFile({ file: req.files[0], user: req.user });
      res.status(204).end();
    } catch (e) {
      next(e);
    } finally {
      next();
    }
  });

  /**
   * @swagger
   *
   *   /api/v1/file/{id}:
   *       delete:
   *           tags:
   *           - "file"
   *           summary: Delete file info by id
   *           security:
   *            - BearerAuth: []
   *           operationId: getAllFiles
   *           parameters:
   *            - in: path
   *              name: id
   *              required: true
   *              schema:
   *                type: string
   *           responses:
   *             204:
   *               description: Returns all files
   */
  fileRouter.delete('/:id', middleware.checkAuthAndExtractRole, async (req, res, next) => {
    try {
      await fileService.deleteFile({ id: req.params.id, user: req.user });
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  });
};

module.exports.init = init;
