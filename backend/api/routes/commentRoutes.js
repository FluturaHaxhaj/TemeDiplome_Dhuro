const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");

const commentController = require("../controllers/commentController");

const validator = require("../validation/commentValidation");

router.post(
  "/create",
  isAuthenticated,
  validator.validate("createComment"),
  commentController.createComment
);

router.get(
  "/all",
  isAuthenticated,
  validator.validate("commentsPerPost"),
  commentController.getAllCommentsPerPost
);

router.get(
  "/one",
  isAuthenticated,
  validator.validate("getComment"),
  commentController.getComment
);

router.put(
  "/update",
  isAuthenticated,
  validator.validate("updateComment"),
  commentController.updateComment
);

router.delete(
  "/delete",
  isAuthenticated,
  validator.validate("getComment"),
  commentController.deleteComment
);

module.exports = router;
