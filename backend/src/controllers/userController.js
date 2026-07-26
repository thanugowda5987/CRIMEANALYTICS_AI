const User = require("../models/User");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  return ApiResponse.success(res, 200, "Users fetched successfully", users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return ApiResponse.error(res, 404, "User not found");
  }
  return ApiResponse.success(res, 200, "User fetched successfully", user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, role, district, policeStation, isActive } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return ApiResponse.error(res, 404, "User not found");
  }

  if (name !== undefined) user.name = name;
  if (role !== undefined) user.role = role;
  if (district !== undefined) user.district = district;
  if (policeStation !== undefined) user.policeStation = policeStation;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  return ApiResponse.success(res, 200, "User updated successfully", user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return ApiResponse.error(res, 404, "User not found");
  }
  await user.deleteOne();
  return ApiResponse.success(res, 200, "User deleted successfully");
});

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };