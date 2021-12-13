const categoryService = require("../services/categoryService");

const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");

const createCategory = async (req, res) => {
  try {
    validateRequest(req);

    const category = await categoryService.createCategory(req.body);

    return res.json({ category });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    validateRequest(req);

    const updatedCategory = await categoryService.updateCategory(
      req.query.category_id,
      req.body.name
    );

    return res.json({ updatedCategory });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    validateRequest(req);

    const allCategories = await categoryService.getAllCategories();

    return res.json({ allCategories });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getOneCategory = async (req, res) => {
  try {
    validateRequest(req);

    const category = await categoryService.categoryExist(req.query.category_id);
    return res.json({ category });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    validateRequest(req);

    const category = await categoryService.deleteCategory(
      req.query.category_id
    );

    return res.json({ category });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getOneCategory,
  deleteCategory,
};
