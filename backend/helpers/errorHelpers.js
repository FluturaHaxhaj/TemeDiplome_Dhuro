const ValidationError = require("../errorTypes/ValidationError");
const HttpError = require("../errorTypes/HttpError");

module.exports = {
  handlePromiseRejectionError(err, res) {
    if (err instanceof ValidationError) {
      return res.status(422).json({
        status: 422,
        errors: err.errors,
        type: "validation-error",
      });
    }

    if (err instanceof HttpError) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
        type: "http-error",
      });
    }

    return res.status(err.status || 400).json({
      message: err.message || "An error occured",
      status: err.status || 400,
      type: "http-error",
    });
  },
};
