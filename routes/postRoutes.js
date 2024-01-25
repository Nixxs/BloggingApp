const express = require('express');
const {validationResult} = require('express-validator');
const { postValidator, postUpdateValidator } = require("../validators/postValidator");
const { idParamValidator } = require("../validators/index");
const router = express.Router();
const postController = require('../controllers/postController');

/**
 * @swagger
 * /api/posts:
 *  get:
 *    description: Use to request all posts
 *    tags:
 *      - Posts
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Post not found
 *      '500':
 *          description: Server error
 */
router.get('/', async (req, res) => {
    try{
        const data = await postController.getPosts();
        res.send({ result: 200, data: data });
    }
    catch(err){
        next(err);
    }
});

/**
 * @swagger
 * /api/posts/{id}:
 *  get:
 *    description: Use to request a post by ID
 *    tags:
 *      - Posts
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Post not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id', idParamValidator, async (req, res) => {
    try{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await postController.getPost(req.params.id);
            if(!data){
                res.sendStatus(404);
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    }catch(err){
        next(err);
    }
});

/**
 * @swagger
 * /api/posts/{id}/include:
 *  get:
 *    description: Use to request a post by ID with all associations
 *    tags:
 *      - Posts
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Post not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id/include', idParamValidator, async (req, res) => {
    try{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await postController.getPostIncludeAll(req.params.id);
            if(!data){
                res.sendStatus(404);
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    }catch(err){
        next(err);
    }
});

/**
 * @swagger
 * /api/posts/user/{id}:
 *  get:
 *    description: Use to request all posts by user ID
 *    tags:
 *      - Posts
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch posts from
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Post not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/user/:id', idParamValidator, async (req, res) => {
    try{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await postController.getPostsByUser(req.params.id);
            if(!data){
                res.sendStatus(404);
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    }catch(err){
        next(err);
    }
});

/**
 * @swagger
 * /api/posts:
 *  post:
 *    description: Use to create a new post
 *    tags:
 *     - Posts
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - title
 *         - content
 *         - userId
 *        properties:
 *          title:
 *              type: string
 *          content:
 *              type: string
 *          userId:
 *              type: integer
 *              example: 1
 *    responses:
 *       '200':
 *          description: A successful response
 *       '400':
 *          description: Invalid JSON
 *       '404':
 *          description: Post not found
 *       '422':
 *          description: Validation error
 *       '500':
 *          description: Server error
 */
router.post('/', postValidator, async (req, res) => {
    try{
        // console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await postController.createPost(req.body);
            if(!data){
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    }
    catch(err){
        next(err);
    }
});

/**
 * @swagger
 * /api/posts/{id}:
 *  put:
 *    description: Use to update a post by ID
 *    tags:
 *      - Posts
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to update
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - title
 *         - content
 *         - userId
 *        properties:
 *          title:
 *              type: string
 *          content:
 *              type: string
 *          userId:
 *              type: integer
 *              example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Invalid JSON
 *      '404':
 *          description: Post not found
 *      '422':
 *         description: Validation error
 *      '500':
 *          description: Server error
 */
router.put('/:id', postUpdateValidator, async (req, res) => {
    try{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await postController.updatePost(req.params.id, req.body);
            res.send({ result: 200, data: data });
        } else {
            res.status(422).json({errors: errors.array()});
        }
    }catch(err){
        next(err);
    }
});

/**
 * @swagger
 * /api/posts/{id}:
 *  delete:
 *    description: Use to delete a post by ID
 *    tags:
 *      - Posts
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to delete
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Post not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.delete('/:id', idParamValidator, async (req, res) => {
    try{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await postController.deletePost(req.params.id);
            if(!data){
                res.sendStatus(404);
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    }catch(err){
        next(err);
    }
});
module.exports = router;