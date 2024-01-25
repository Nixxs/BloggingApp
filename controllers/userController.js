const User = require("../models/user");

/*
 *
 * @returns {PromiseArray<User>}
 */
const getUsers = async () => {
  const data = await User.findAll({});
  return data;
};

/*
 *
 * @param {number} id - user id
 * @returns {Promise<User>}
 */
const getUser = async (id) => {
  const data = await User.findOne({ where: { id: id } });
  return data;
};

/*
 *
 * @param {User} data - user data
 * @returns {Promise<User>}
 */
const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

/*
 *
 * @param {number} id - user id
 * @param {User} data - user data
 * @returns {Promise<User>}
 */
const updateUser = async (id, data) => {
  const user = await User.update(data, { where: { id: id } });
  return user;
};

/*
 *
 * @param {number} id - user id
 * @returns {Promise<User>}
 */
const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id: id } });
  return user;
};

// exports functions for use in routes
module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
