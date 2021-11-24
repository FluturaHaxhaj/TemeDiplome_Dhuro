const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");

const appReviewService = require("../services/appReviewService");

const createReview = async (req, res) => {
  try {
    validateRequest(req);
    const review = await appReviewService.createReview(req.body, req.user.id);

    return res.json({ review });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const updateReview = async (req, res) => {
  try {
    validateRequest(req);
    const updatedReview = await appReviewService.updateReview(
      req.query.review_id,
      req.body,
      req.user.id
    );
    return res.json({ updatedReview });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAllReviews = async (req, res) => {
  try {
    validateRequest(req);
    const allReviews = await appReviewService.getAllReviews();

    return res.json({ allReviews });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAverageReview = async (req, res) => {
  try {
    validateRequest(req, res);

    const averageReview = await appReviewService.getAverageReview();

    return res.json({ averageReview });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteReview = async (req, res) => {
  try {
    validateRequest(req);

    const deletedReview = await appReviewService.deleteReview(
      req.user.id,
      req.query.review_id
    );

    return res.json({ deletedReview });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

module.exports = {
  createReview,
  updateReview,
  getAllReviews,
  getAverageReview,
  deleteReview,
};
