const { body, query } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createComment":
      return [
        body("post_id").notEmpty().withMessage("Post id is required!"),
        body("comment").notEmpty().withMessage("Comment is required!"),
      ];

    case "updateComment":
      return [
        query("comment_id").notEmpty().withMessage("Comment id is required!"),
        body("comment").notEmpty().withMessage("Comment is required!"),
      ];

    case "getComment":
      return [
        query("comment_id").notEmpty().withMessage("Comment id is required!"),
      ];

    case "commentsPerPost":
      return [query("post_id").notEmpty().withMessage("Post id is required!")];
  }
};

module.exports = { validate };
