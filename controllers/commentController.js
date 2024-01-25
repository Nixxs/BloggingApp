// comments controller
const Comment = require('../models/comment');

/*
 *
 * @returns {Promise<Array<Comment>>}
 */
const getComments = async () => {
    const data = await Comment.findAll({});
    return data;
}

/*
 *
 * @param {number} id - comment id
 * @returns {Promise<Comment>}
 **/
const getComment = async (id) => {
    const data = await Comment.findOne({ where: { id: id } });
    return data;
}

/*
 *
 * @param {number} id - comment id
 * @returns {Promise<Comment>}
 */
const getCommentIncludeAll = async (id) => {
    const data = await Comment.findOne({ where: { id: id }, include: { all: true } });
    return data;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Array<Comment>>}
 * */
const getCommentsByPost = async (id) => {
    const data = await Comment.findAll({ where: { postId: id } });
    return data;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Array<Comment>>}
 */
const getCommentsByUser = async (id) => {
    const data = await Comment.findAll({ where: { userId: id } });
    return data;
}

/*
 *
 * @param {object} data
 * @returns {Promise<Comment>}
 */
const createComment = async (data) => {
    const comment = await Comment.create(data);
    return comment;
}

/*
 *
 * @param {int} id
 * @param {object} data
 * @returns {Promise<Comment>}
 */
const updateComment = async (id, data) => {
    const comment = await Comment.update(data, { where: { id: id } });
    return comment;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Comment>}
 */
const deleteComment = async (id) => {
    const comment = await Comment.destroy({ where: { id: id } });
    return comment;
}

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getComment,
    getCommentIncludeAll,
    getCommentsByPost,
    getCommentsByUser,
};