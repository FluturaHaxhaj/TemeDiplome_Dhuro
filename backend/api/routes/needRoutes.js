const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");
const { upload } = require("../middlewares/fileUpload");

const needController = require("../controllers/needController");

const validator = require("../validation/needValidation");

router.post(
  "/create",
  isAuthenticated,
  upload.array("images"),
  validator.validate("createNeed"),
  needController.createNeed
);

router.get("/all", isAuthenticated, needController.getAllNeeds);

router.get("/one", isAuthenticated, needController.getOneNeed);

router.put(
  "/update",
  isAuthenticated,
  upload.array("images"),
  validator.validate("updateNeed"),
  needController.updateNeed
);

router.delete("/delete", isAuthenticated, needController.deleteNeed);

router.delete(
  "/delete_images",
  isAuthenticated,
  validator.validate("deleteImage"),
  needController.deleteNeedImages
);

module.exports = router;
