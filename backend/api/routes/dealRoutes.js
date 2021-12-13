const router = require("express").Router();

const isAuthenticated = require("../middlewares/authorization");

const dealController = require("../controllers/dealController");

const validator = require("../validation/dealValidation");

router.post(
  "/create",
  isAuthenticated,
  validator.validate("createDeal"),
  dealController.createDeal
);

router.get("/all", isAuthenticated, dealController.getDeals);

module.exports = router;
