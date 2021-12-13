const productService = require("../services/productService");

const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");

const createProduct = async (req, res) => {
  try {
    validateRequest(req);
    const product = await productService.createProduct(
      req.body,
      req.files,
      req.user.id
    );

    return res.json({ product });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const updateProduct = async (req, res) => {
  try {
    validateRequest(req);

    const product = await productService.updateProduct(
      req.query.product_id,
      req.body,
      req.files,
      req.user.id
    );

    return res.json({ product });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAllProducts = async (req, res) => {
  try {
    validateRequest(req);

    const products = await productService.getAllProducts(
      req.query,
      req.user.id
    );

    return res.json({ products });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getOneProduct = async (req, res) => {
  try {
    validateRequest(req);
    const product = await productService.getOneById(req.query.product_id);
    return res.json({ product });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    validateRequest(req);

    const product = await productService.deleteProduct(req.query.product_id);

    return res.json({ product });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteProductImages = async (req, res) => {
  try {
    validateRequest(req);

    const product = await productService.deleteMultiplePicturesPerProduct(
      req.query.product_id,
      req.body.medias
    );

    return res.json({ product });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  deleteProductImages,
};
