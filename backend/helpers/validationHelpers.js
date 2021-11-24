const { validationResult } = require("express-validator");
const ValidationError = require("../errorTypes/ValidationError");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return msg;
};

module.exports = {
  validateRequest(req, dontThrowError = false) {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (dontThrowError || errors.isEmpty()) {
      return errors;
    }
    throw new ValidationError(errors.mapped());
  },

  xkPhoneNumberValidator(value) {
    const xkNrStarts = [
      //fax
      "038",

      // Vala
      "044",
      "045",
      "046",

      // IPKO
      "043",
      "048",
      "049",
    ];
    if (value.length !== 9) {
      return Promise.reject("Invalid phone number XK!");
    }
    for (let i in xkNrStarts) {
      if (value.startsWith(xkNrStarts[i])) {
        return true;
      }
    }
    return Promise.reject("Invalid phone number XK!");
  },
};
