const { body, param } = require("express-validator");

const postValidator = [
  body("userId", "userId is required").not().isEmpty(),
  body("userId", "userId should be numeric").isNumeric(),
  body("title", "title is required").not().isEmpty(),
  body("content", "content is required").not().isEmpty(),
];

const postUpdateValidator = [
  param("id", "Post id is required").not().isEmpty(),
  param("id", "Post id should be numeric").isNumeric(),
  body("userId", "userId is required").not().isEmpty(),
  body("userId", "userId should be numeric").isNumeric(),
  body("title", "title is required").not().isEmpty(),
  body("content", "content is required").not().isEmpty(),
];

module.exports = {
  postValidator,
  postUpdateValidator,
};
