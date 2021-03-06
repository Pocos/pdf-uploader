/**
 * @swagger
 * components:
 *  schemas:
 *    UserInfoResponse:
 *      type: object
 *
 *    CreateUserRequest:
 *      type: object
 *      additionalProperties: false
 *      required:
 *        - name
 *        - password
 *        - role
 *      properties:
 *        name:
 *          type: string
 *        password:
 *          type: string
 *        role:
 *          type: string
 *          enum: [ADMIN, USER]
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
