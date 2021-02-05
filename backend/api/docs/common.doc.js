/**
 * @swagger
 * components:
 *   securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *
 *   parameters:
 *     CommonIdParam:
 *        name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          pattern: ^[0-9a-fA-F]{24}$
 *          description: Company id
 *     CommonPageNumParam:
 *        name: pageNumber
 *        in: query
 *        required: true
 *        schema:
 *          type: integer
 *          description: Page number
 *          minimum: 0
 *     CommonPageSizeParam:
 *        name: pageSize
 *        in: query
 *        required: false
 *        schema:
 *          type: number
 *          description: Set maximum number of elements to return
 *     CommonSortKeyParam:
 *        name: sortKey
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          description: Sort key
 *     CommonSortDirectionParam:
 *        name: sortDirection
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          description: Sort direction
 *          enum:
 *              - asc
 *              - desc
 *
 */
