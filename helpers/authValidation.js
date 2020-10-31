const { check } = require("express-validator/check");

const SignUpValidation = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("User name must be at least 5 characters long")
    .exists()
    .withMessage("Username filed must be provided"),
  check("email", "Email is Invalid")
    .isEmail()
    .exists()
    .withMessage("Email field must be provided"),
  check("password", "Password must not be less than 5")
    .isLength({ min: 5 })
    .exists()
    .withMessage("Password filed must be provided")
];

const LogInValidation = [
  check("email", "Email is Invalid")
    .isEmail()
    .exists()
    .withMessage("Email field must be provided"),
  check("password")
    .exists()
    .withMessage("Password filed must be provided")
];
module.exports = {
  SignUpValidation,
  LogInValidation
};
