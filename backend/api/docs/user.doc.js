/**
 * @swagger
 * components:
 *  schemas:
 *    UserInfoResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: object
 *        active:
 *          type: boolean
 *        context:
 *          type: array
 *          items:
 *              type: string
 *        username:
 *          type: string
 *        created_at:
 *          type: object
 *        modified_at:
 *          type: object
 *        licence:
 *          type: object
 *        provider:
 *          type: string
 *        scopes:
 *          type: object
 *
 *    CreateUserRequest:
 *      type: object
 *      additionalProperties: false
 *      required:
 *        - name
 *        - age
 *      properties:
 *        name:
 *          type: string
 *          description: name
 *        age:
 *          type: number
 *          description: tel
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
