const { body, param } = require("express-validator");

const userValidator = [
  body("name", "name is required").not().isEmpty(),
  body("email", "email is required").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body(
    "password",
    "The minimum password length is 6 characters, max 50"
  ).isLength({ min: 6, max: 50 }),
];

const userUpdateValidator = [
  param("id", "User id is required").not().isEmpty(),
  param("id", "User id should be a number").isNumeric(),
  body("name", "Invalid does not Empty").not().isEmpty(),
  body("email", "Invalid does not Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
    max: 50,
  }),
];

module.exports = {
  userValidator,
  userUpdateValidator,
};
