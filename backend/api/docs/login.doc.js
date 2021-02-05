/**
 * @swagger
 * components:
 *  schemas:
 *
 *    LoginRequest:
 *      type: object
 *      additionalProperties: false
 *      required:
 *        - name
 *        - password
 *      properties:
 *        name:
 *          type: string
 *        password:
 *          type: string
 *
 *    UserDetailResponse:
 *      type: object
 *      properties:
 *       data:
 *         type: object
 *         properties:
 *             name:
 *              type: string
 *             age:
 *              type: number
 */
