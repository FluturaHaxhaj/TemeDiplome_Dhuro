const router = require("express").Router();

const validator = require("../validation/categoryValidation");
const categoryController = require("../controllers/categoryController");

router.post(
  "/create",
  validator.validate("createCategory"),
  categoryController.createCategory
);

router.put(
  "/update",
  validator.validate("updateCategory"),
  categoryController.updateCategory
);

router.get("/all", categoryController.getAllCategories);

router.get(
  "/one",
  validator.validate("getCategory"),
  categoryController.getOneCategory
);

router.delete(
  "/delete",
  validator.validate("deleteCategory"),
  categoryController.deleteCategory
);

module.exports = router;
