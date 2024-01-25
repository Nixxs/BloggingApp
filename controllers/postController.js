// posts controller
const Post = require('../models/post');

/*
 *
 * @returns Array<Post>
 */
const getPosts = async () => {
    const data = await Post.findAll({});
    return data;
}

/*
 *
 * @param {number} id - post id
 * @returns {Promise<Post>}
 */
const getPost = async (id) => {
    const data = await Post.findOne({ where: { id: id } });
    return data;
}

/*
 *
 * @param {number} id - post id
 * @returns {Promise<Post>}
 */
const getPostIncludeAll = async (id) => {
    const data = await Post.findOne({ where: { id: id }, include: { all: true } });
    return data;
}

/*
 *
 * @param {number} id - user id
 * @returns {Promise<Array<Post>>}
 */
const getPostsByUser = async (id) => {
    const data = await Post.findAll({ where: { userId: id } });
    return data;
}

/*
 *
 * @param {Post} data - post data
 * @returns {Promise<Post>}
 */
const createPost = async (data) => {
    const post = await Post.create(data);
    return post;
}

/*
 *
 * @param {number} id - post id
 * @param {Post} data - post data
 * @returns {Promise<Post>}
 */
const updatePost = async (id, data) => {
    const post = await Post.update(data, { where: { id: id } });
    return post;
}

/*
 *
 * @param {number} id - post id
 * @returns {Promise<number>}
 */
const deletePost = async (id) => {
    const post = await Post.destroy({ where: { id: id } });
    return post;
};

module.exports = {
    getPost,
    getPostIncludeAll,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPostsByUser,
};