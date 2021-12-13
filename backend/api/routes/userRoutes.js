const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");
const { upload } = require("../middlewares/fileUpload");

const userController = require("../controllers/userController");

const validator = require("../validation/userValidation");

router.post(
  "/register",
  validator.validate("userRegister"),
  userController.userRegister
);

router.get("/all", isAuthenticated, userController.getAllUsers);

router.post("/login", validator.validate("login"), userController.login);

router.get("/me", isAuthenticated, userController.getLoggedInUser);

router.delete("/delete", isAuthenticated, userController.deleteUser);

router.post(
  "/forgot-password",
  validator.validate("forgotPassword"),
  userController.forgotPassword
);

router.put(
  "/change-password",
  isAuthenticated,
  validator.validate("changePassword"),
  userController.changePassword
);

router.post("/upload", upload.single("image"), userController.uploadProfile);

router.put(
  "/update",
  isAuthenticated,
  upload.single("image"),
  userController.updateProfile
);

module.exports = router;
