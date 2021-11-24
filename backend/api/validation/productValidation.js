const categoryService = require("../services/categoryService");
const { body, query } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createProduct":
      return [
        body("product_name")
          .notEmpty()
          .withMessage("Product name is required!"),
        body("address").notEmpty().withMessage("Address is required!"),
        body("category_id").notEmpty().withMessage("Payment ID is required!"),
        body("category_id").custom(async (value) => {
          await categoryService.categoryExist(value);
        }),
      ];
    case "getProduct":
      return [
        query("product_id").notEmpty().withMessage("Product id is required!"),
      ];

    case "deleteImage":
      return [
        query("product_id").notEmpty().withMessage("Product id is required!"),
        body("medias").notEmpty().withMessage("Medias should not be empty!"),
        body("medias").custom(async (value) => {
          if (value.length == 0) {
            throw new Error("There should be at least one image");
          }
        }),
      ];

    case "updateProduct":
      return [
        body("product_name")
          .notEmpty()
          .withMessage("Product name is required!"),
        body("description").notEmpty().withMessage("Description is required!"),
        body("address").notEmpty().withMessage("Address is required!"),
        query("product_id").notEmpty().withMessage("Product id is required!"),
      ];
  }
};

module.exports = { validate };
