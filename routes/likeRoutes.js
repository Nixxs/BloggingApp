const express = require('express');
const {validationResult} = require('express-validator');
const { likeValidator, likeUpdateValidator } = require("../validators/likeValidator");
const { idParamValidator } = require("../validators/index");
const router = express.Router();
const likeController = require('../controllers/likeController');

/**
 * @swagger
 * /api/likes:
 *  get:
 *    description: Use to request all likes
 *    tags:
 *      - Likes
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Like not found
 *      '500':
 *          description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const data = await likeController.getLikes();
        res.send({ result: 200, data: data });
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/likes/{id}:
 *  get:
 *    description: Use to request a like by ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of like to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Like not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id', idParamValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const data = await likeController.getLike(req.params.id);
            if (!data) {
                res.status(404).send({ message: 'Like not found' });
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
 * /api/likes/post/{id}:
 *  get:
 *    description: Use to request likes by post ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to fetch likes
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Like not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/post/:id', idParamValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const data = await likeController.getLikesByPost(req.params.id);
            res.send({ result: 200, data: data });
        }
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/likes/user/{id}:
 *  get:
 *    description: Use to request likes by user ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch likes
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Like not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/user/:id', idParamValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const data = await likeController.getLikesByUser(req.params.id);
            res.send({ result: 200, data: data });
        }
    }catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/likes:
 *  post:
 *    description: Use to create a new like
 *    tags:
 *      - Likes
 *    requestBody:
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            postId:
 *              type: integer
 *              description: ID of post to like
 *              example: 1
 *            userId:
 *              type: integer
 *              description: ID of user who liked the post
 *              example: 1
 *    responses:
 *      '201':
 *          description: Like created successfully
 *      '400':
 *          description: Invalid JSON
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.post('/', likeValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            const data = await likeController.createLike(req.body);
            res.status(201).send({ result: 201, data: data });
        }
    }catch (err) {
        next(err);
    }
});

// get single like include all with swagger documentation
/**
 * @swagger
 * /api/likes/include/{id}:
 *  get:
 *    description: Use to request a like by ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of like to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Like not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/include/:id', idParamValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const data = await likeController.getLikeIncludeAll(req.params.id);
            if (!data) {
                res.status(404).send({ message: 'Like not found' });
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
 * /api/likes/{id}:
 *  put:
 *    description: Use to update a like
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of like to update
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
 *            postId:
 *              type: integer
 *              description: ID of post to like
 *              example: 1
 *            userId:
 *              type: integer
 *              description: ID of user who liked the post
 *              example: 1
 *    responses:
 *      '200':
 *          description: Like updated successfully
 *      '400':
 *          description: Invalid JSON
 *      '404':
 *          description: Like not found
 *      '422':
 *         description: Validation error
 *      '500':
 *          description: Server error
 */
router.put('/:id', likeUpdateValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            const data = await likeController.updateLike(req.params.id, req.body);
            if (data[0] === 0) {
                res.status(404).send({ message: 'Like not found' });
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
 * /api/likes/{id}:
 *  delete:
 *    description: Use to delete a like by ID
 *    tags:
 *      - Likes
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of like to delete
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: Like deleted successfully
 *      '404':
 *          description: Like not found
 *      '422':
 *          description: Validation error
 *      '500':
 *          description: Server error
 */
router.delete('/:id', idParamValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        } else {
            const data = await likeController.deleteLike(req.params.id);
            if (!data) {
                res.status(404).send({ message: 'Like not found' });
            } else {
                res.send({ result: 200, data: data });
            }
        }
    }catch (err) {
        next(err);
    }
});

module.exports = router;