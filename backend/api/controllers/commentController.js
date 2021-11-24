const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");
const commentService = require("../services/commentService");

const createComment = async (req, res) => {
  try {
    validateRequest(req);
    const comment = await commentService.createComment(req.user.id, req.body);

    return res.json({ comment });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAllCommentsPerPost = async (req, res) => {
  try {
    validateRequest(req);

    const comments = await commentService.getAllCommentsPerPost(
      req.query.post_id
    );

    return res.json({ comments });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getComment = async (req, res) => {
  try {
    validateRequest(req);
    const comment = await commentService.getComment(req.query.comment_id);

    return res.json({ comment });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const updateComment = async (req, res) => {
  try {
    validateRequest(req);

    const updatedComment = await commentService.updateComment(
      req.user.id,
      req.query.comment_id,
      req.body.comment
    );

    return res.json({ updatedComment });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteComment = async (req, res) => {
  try {
    validateRequest(req);
    const deleteComment = await commentService.deleteComment(
      req.query.comment_id
    );

    return res.json({ deleteComment });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

module.exports = {
  createComment,
  getAllCommentsPerPost,
  getComment,
  updateComment,
  deleteComment,
};
