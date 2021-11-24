const { body, query } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createDeal":
      return [body("post_id").notEmpty().withMessage("Post id is required!")];

    case "getOneDeal":
      return [query("deal_id").notEmpty().withMessage("Deal id is required!")];
  }
};

module.exports = { validate };
