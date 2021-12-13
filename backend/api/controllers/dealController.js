const dealService = require("../services/dealService");

const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");

const createDeal = async (req, res) => {
  try {
    validateRequest(req);

    const deal = await dealService.createDeal(req.body, req.user.id);

    return res.json({ deal });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getDeals = async (req, res) => {
  try {
    validateRequest(req);
    const deals = await dealService.getDeals(req.query);

    return res.json({ deals });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

module.exports = { createDeal, getDeals };
