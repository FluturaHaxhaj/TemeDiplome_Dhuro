const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");
const validator = require("../validation/productValidation");
const productController = require("../controllers/productController");
const { upload } = require("../middlewares/fileUpload");

router.post(
  "/create",
  isAuthenticated,
  upload.array("images"),
  validator.validate("createProduct"),
  productController.createProduct
);

router.get("/all", isAuthenticated, productController.getAllProducts);

router.get(
  "/one",
  isAuthenticated,
  validator.validate("getProduct"),
  productController.getOneProduct
);

router.put(
  "/update",
  isAuthenticated,
  upload.array("images"),
  validator.validate("updateProduct"),
  productController.updateProduct
);

router.delete(
  "/delete",
  isAuthenticated,
  validator.validate("getProduct"),
  productController.deleteProduct
);

router.delete(
  "/delete_images",
  isAuthenticated,
  validator.validate("deleteImage"),
  productController.deleteProductImages
);

module.exports = router;
