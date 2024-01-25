const express = require('express');
const {validationResult} = require('express-validator');
const { commentValidator, commentUpdateValidator } = require("../validators/commentValidator");
const { idParamValidator } = require("../validators/index");
const router = express.Router();
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * /api/comments:
 *  get:
 *    description: Use to request all comments
 *    tags:
 *      - Comments
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Comment not found
 *      '500':
 *          description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const data = await commentController.getComments();
        res.send({ result: 200, data: data });
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/comments/{id}:
 *  get:
 *    description: Use to request a comment by ID
 *    tags:
 *      - Comments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Comment not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id', idParamValidator, async (req, res) => {
    try {
        let data;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            data = await commentController.getComment(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/comments/{id}/include:
 *  get:
 *    description: Use to request a comment by ID with all associations
 *    tags:
 *      - Comments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Comment not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id/include', idParamValidator, async (req, res) => {
    try {
        let data;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            data = await commentController.getCommentIncludeAll(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /api/comments:
 *  post:
 *    description: Use to create a comment
 *    tags:
 *      - Comments
 *    requestBody:
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *           postId:
 *             type: integer
 *             description: ID of post to comment on
 *             example: 1
 *           userId:
 *            type: integer
 *            description: ID of user who commented on the post
 *            example: 1
 *           content:
 *            type: string
 *            description: Content of comment
 *            example: This is a comment
 *    responses:
 *      '200':
 *         description: A successful response
 *      '400':
 *         description: Invalid JSON
 *      '422':
 *         description: Invalid input
 *      '500':
 *         description: Server error
 */
router.post('/', commentValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            // console.log(req.body);
            const data = await commentController.createComment(req.body);
            res.send({ result: 200, data: data });
        }
    }catch (err) {
        next(err);
    }

});

// get comments by post id
/**
 * @swagger
 * /api/comments/post/{id}:
 *  get:
 *    description: Use to request all comments by post id
 *    tags:
 *      - Comments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to fetch comments
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Comment not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/post/:id', idParamValidator, async (req, res) => {
    try {
        let data;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            data = await commentController.getCommentsByPost(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/comments/user/{id}:
 *  get:
 *    description: Use to request all comments by user id
 *    tags:
 *      - Comments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch comments
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Comment not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/user/:id', idParamValidator, async (req, res) => {
    try {
        let data;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            data = await commentController.getCommentsByUser(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /api/comments/{id}:
 *  put:
 *    description: Use to update a comment by ID
 *    tags:
 *      - Comments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to update
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *           postId:
 *             type: integer
 *             description: ID of post to comment on
 *             example: 1
 *           userId:
 *            type: integer
 *            description: ID of user who commented on the post
 *            example: 1
 *           content:
 *            type: string
 *            description: Content of comment
 *            example: This is a comment
 *    responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Invalid JSON
 *      '404':
 *          description: Comment not found
 *      '422':
 *         description: Invalid input
 *      '500':
 *          description: Server error
 */
router.put('/:id', commentUpdateValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            const data = await commentController.updateComment(req.params.id, req.body);
            if (data[0] === 0) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *    description: Use to delete a comment by ID
 *    tags:
 *      - Comments
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to delete
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Comment not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.delete('/:id', idParamValidator, async (req, res) => {
    try {
        let data;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            data = await commentController.deleteComment(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});

module.exports = router;