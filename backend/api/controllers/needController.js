const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");
const needService = require("../services/needService");

const createNeed = async (req, res) => {
  try {
    validateRequest(req);
    const need = await needService.createNeed(req.body, req.files, req.user.id);

    return res.json({ need });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const updateNeed = async (req, res) => {
  try {
    validateRequest(req);

    const need = await needService.updateNeed(
      req.query.need_id,
      req.body,
      req.files,
      req.user.id
    );

    return res.json({ need });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAllNeeds = async (req, res) => {
  try {
    validateRequest(req);

    const needs = await needService.getAllNeeds(req.query);

    return res.json({ needs });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getOneNeed = async (req, res) => {
  try {
    validateRequest(req);
    const product = await needService.getOneById(req.query.product_id);
    return res.json({ product });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteNeed = async (req, res) => {
  try {
    validateRequest(req);

    const need = await needService.deleteNeed(req.query.need_id);

    return res.json({ need });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteNeedImages = async (req, res) => {
  try {
    validateRequest(req);

    const need = await needService.deleteMultiplePicturesPerNeed(
      req.query.need_id,
      req.body.medias
    );

    return res.json({ need });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};
module.exports = {
  createNeed,
  updateNeed,
  getAllNeeds,
  getOneNeed,
  deleteNeed,
  deleteNeedImages,
};
