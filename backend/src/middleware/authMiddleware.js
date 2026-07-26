const jwt = require("jsonwebtoken");
const env = require("../config/env");
const ApiResponse = require("../utils/apiResponse");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return ApiResponse.error(res, 401, "Not authorized, no token provided");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return ApiResponse.error(res, 401, "Not authorized, user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.error(res, 401, "Not authorized, token invalid or expired");
  }
});

module.exports = { protect };