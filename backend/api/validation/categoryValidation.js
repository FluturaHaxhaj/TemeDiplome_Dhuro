const { body, query } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createCategory":
      return [
        body("name").notEmpty().withMessage("Category name is required!"),
      ];
    case "updateCategory":
      return [
        body("name").notEmpty().withMessage("Category name is required!"),
        query("category_id").notEmpty().withMessage("Category id is required!"),
      ];
    case "getCategory":
      return [
        query("category_id").notEmpty().withMessage("Category id is required!"),
      ];
    case "deleteCategory":
      return [
        query("category_id").notEmpty().withMessage("Category id is required!"),
      ];
  }
};
module.exports = { validate };
