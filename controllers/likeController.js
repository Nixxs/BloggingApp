const Like = require('../models/like');
/*
 *
 * @returns {Promise<Array<Like>>}
 */
const getLikes = async () => {
    const data = await Like.findAll({});
    return data;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Like>}
 */
const getLike = async (id) => {
    const data = await Like.findOne({ where: { id: id } });
    return data;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Like>}
 */
 const getLikeIncludeAll = async (id) => {
    const data = await Like.findOne({ where: { id: id }, include: { all: true } });
    return data;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Array<Like>>}
 * */
const getLikesByPost = async (id) => {
    const data = await Like.findAll({ where: { postId: id } });
    return data;
}

/*
 *
 * @param {int} id
 * @returns {Promise<Array<Like>>}
 * */
const getLikesByUser = async (id) => {
    const data = await Like.findAll({ where: { userId: id } });
    return data;
}

/*
 *
 * @param {object} data
 * @returns {Promise<Like>}
 */
const createLike = async (data) => {
    const like = await Like.create(data);
    return like;
}

/*
 *
 * @param {int} id - like id
 * @param {object} data - like data
 * @returns {Promise<Like>}
 * */
const updateLike = async (id, data) => {
    const like = await Like.update(data, { where: { id: id } });
    return like;
}

/*
 *
 * @param {int} id - like id
 * @returns {Promise<Like>}
 * */
const deleteLike = async (id) => {
    const like = await Like.destroy({ where: { id: id } });
    return like;
}

module.exports = {
    getLikes,
    createLike,
    updateLike,
    deleteLike,
    getLike,
    getLikeIncludeAll,
    getLikesByPost,
    getLikesByUser,
};