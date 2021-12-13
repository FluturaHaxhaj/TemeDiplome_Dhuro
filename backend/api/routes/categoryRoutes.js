const router = require("express").Router();

const categoryController = require("../controllers/categoryController");

const validator = require("../validation/categoryValidation");

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
