const { body, query } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createReview":
      return [
        body("review_score")
          .notEmpty()
          .isNumeric()
          .withMessage("Review Score is required and should be numeric!"),
        body("review_score").custom(async (value) => {
          if (parseFloat(value) < 0 || parseFloat(value) > 5) {
            throw new Error("Review Score shoud be between 0 and 5");
          }
        }),
        body("review_description")
          .notEmpty()
          .withMessage("Review Description is required!"),
      ];

    case "updateReview":
      return [
        query("review_id").notEmpty().withMessage("Review id is required!"),
        body("review_score").custom(async (value) => {
          if (parseFloat(value) < 0 || parseFloat(value) > 5) {
            throw new Error("Review Score shoud be between 0 and 5");
          }
        }),
        body("review_description")
          .notEmpty()
          .withMessage("Review Description is required!"),
      ];
  }
};

module.exports = { validate };
