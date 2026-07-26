const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/apiResponse");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 422, "Validation failed", errors.array());
  }
  next();
};

module.exports = validate;