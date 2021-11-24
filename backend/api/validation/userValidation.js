const { body } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "userRegister":
      return [
        // body("special_status")
        //   .notEmpty()
        //   .withMessage("Special status is required!"),
        // body("special_status").custom(async (value) => {
        //   if (value != "true" && value != "false") {
        //     throw new Error("Special status should be a boolean value!");
        //   }
        // }),
        body("email").notEmpty().withMessage("Email is required!"),
        body("address").notEmpty().withMessage("Address is required!"),
        body("email").isEmail().withMessage("Invalid email!"),
        body("password").notEmpty().withMessage("Passoword is required!"),
        body("confirm_password")
          .notEmpty()
          .withMessage("Please confirm your password!"),
        body("password").custom(async (value, { req }) => {
          if (value.length < 6 || value.length > 30) {
            throw new Error("Password must be between 6 and 30 characters!");
          }
        }),
        body("confirm_password").custom(async (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Password confirmation doesn't match password!");
          }
        }),
      ];

    case "login":
      return [
        body("email").notEmpty().withMessage("Email is required!"),
        body("email").isEmail().withMessage("Invalid email address!"),
        body("password").notEmpty().withMessage("Password is required!"),
      ];

    case "changePassword":
      return [
        body("old_password")
          .notEmpty()
          .withMessage("Old password is required!"),
        body("new_password")
          .notEmpty()
          .withMessage("New password is required!"),
        body("confirm_password")
          .notEmpty()
          .withMessage("Please confirm your password!"),
        body("new_password").custom(async (value, { req }) => {
          if (value.length < 5 || value.length > 30) {
            throw new Error("Password must be between 6 and 30 characters!");
          }
        }),
        body("confirm_password").custom(async (value, { req }) => {
          if (value !== req.body.new_password) {
            throw new Error("Password confirmation doesn't match password!");
          }
        }),
      ];

    case "forgotPassword":
      return [body("email").notEmpty().withMessage("Email is required!")];
  }
};

module.exports = { validate };
