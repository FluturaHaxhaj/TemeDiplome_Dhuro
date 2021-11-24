const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");
const validator = require("../validation/needValidation");
const needController = require("../controllers/needController");
const { upload } = require("../middlewares/fileUpload");

router.post(
  "/create",
  isAuthenticated,
  upload.array("images"),
  validator.validate("createNeed"),
  needController.createNeed
);

router.get("/all", isAuthenticated, needController.getAllNeeds);

router.get(
  "/one",
  isAuthenticated,
  // validator.validate("getNeed"),
  needController.getOneNeed
);

router.put(
  "/update",
  isAuthenticated,
  upload.array("images"),
  validator.validate("updateNeed"),
  needController.updateNeed
);

router.delete(
  "/delete",
  isAuthenticated,
  // validator.validate("getNeed"),
  needController.deleteNeed
);

router.delete(
  "/delete_images",
  isAuthenticated,
  validator.validate("deleteImage"),
  needController.deleteNeedImages
);

module.exports = router;
