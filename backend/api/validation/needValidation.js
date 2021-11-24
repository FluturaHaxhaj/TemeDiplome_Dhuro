const categoryService = require("../services/categoryService");
const { body, query } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createNeed":
      return [
        body("product_name")
          .notEmpty()
          .withMessage("Product name is required!"),
        body("category_id").notEmpty().withMessage("Payment ID is required!"),
        body("category_id").custom(async (value) => {
          await categoryService.categoryExist(value);
        }),
      ];

    // case "getNeed":
    //   return [query("need_id").notEmpty().withMessage("Need id is required!")];

    case "deleteImage":
      return [
        query("need_id").notEmpty().withMessage("Need id is required!"),
        body("medias").notEmpty().withMessage("Medias should not be empty!"),
        body("medias").custom(async (value) => {
          if (value.length == 0) {
            throw new Error("There should be at least one image");
          }
        }),
      ];

    case "updateNeed":
      return [
        // body("product_name")
        //   .notEmpty()
        //   .withMessage("Product name is required!"),
        // body("description").notEmpty().withMessage("Description is required!"),
        query("need_id").notEmpty().withMessage("Need id is required!"),
      ];
  }
};

module.exports = { validate };
