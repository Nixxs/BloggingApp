const { body, param } = require("express-validator");

const commentValidator = [
  body("postId", "postId is required").not().isEmpty(),
  body("postId", "postId should be a number").isNumeric(),
  body("userId", "userId is required").not().isEmpty().isNumeric(),
  body("userId", "userId should be a number").isNumeric(),
  body("content", "content is required").not().isEmpty(),
];

const commentUpdateValidator = [
  param("id", "Comment id is required").not().isEmpty(),
  param("id", "Comment id should be a number").isNumeric(),
  body("postId", "postId is required").not().isEmpty(),
  body("postId", "postId should be a number").isNumeric(),
  body("userId", "userId is required").not().isEmpty(),
  body("userId", "userId should be a number").isNumeric(),
  body("content", "content is required").not().isEmpty(),
];

module.exports = {
  commentValidator,
  commentUpdateValidator,
};
