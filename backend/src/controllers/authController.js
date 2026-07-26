const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const env = require("../config/env");

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, district, policeStation } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return ApiResponse.error(res, 400, "User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    district,
    policeStation,
  });

  const token = generateToken(user._id);

  return ApiResponse.success(res, 201, "User registered successfully", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return ApiResponse.error(res, 401, "Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return ApiResponse.error(res, 401, "Invalid email or password");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  return ApiResponse.success(res, 200, "Login successful", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 200, "Current user fetched", req.user);
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return ApiResponse.success(res, 200, "Logged out successfully");
});

module.exports = { register, login, getMe, logout };