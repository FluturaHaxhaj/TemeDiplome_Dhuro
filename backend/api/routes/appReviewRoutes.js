const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");
const appReviewController = require("../controllers/appReviewController");
const validator = require("../validation/appReviewValidation");

router.post(
  "/create",
  isAuthenticated,
  validator.validate("createReview"),
  appReviewController.createReview
);

router.put(
  "/update",
  isAuthenticated,
  validator.validate("updateReview"),
  appReviewController.updateReview
);

router.get("/all", isAuthenticated, appReviewController.getAllReviews);

router.get("/average", appReviewController.getAverageReview);

router.delete(
  "/delete",
  isAuthenticated,
  validator.validate("updateReview"),
  appReviewController.deleteReview
);

module.exports = router;
