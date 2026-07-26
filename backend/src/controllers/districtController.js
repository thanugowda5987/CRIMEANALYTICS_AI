const District = require("../models/District");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllDistricts = asyncHandler(async (req, res) => {
  const districts = await District.find().sort({ name: 1 });
  return ApiResponse.success(res, 200, "Districts fetched successfully", districts);
});

const getDistrictById = asyncHandler(async (req, res) => {
  const district = await District.findById(req.params.id);
  if (!district) {
    return ApiResponse.error(res, 404, "District not found");
  }
  return ApiResponse.success(res, 200, "District fetched successfully", district);
});

const createDistrict = asyncHandler(async (req, res) => {
  const district = await District.create(req.body);
  return ApiResponse.success(res, 201, "District created successfully", district);
});

const updateDistrict = asyncHandler(async (req, res) => {
  const district = await District.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!district) {
    return ApiResponse.error(res, 404, "District not found");
  }
  return ApiResponse.success(res, 200, "District updated successfully", district);
});

const deleteDistrict = asyncHandler(async (req, res) => {
  const district = await District.findById(req.params.id);
  if (!district) {
    return ApiResponse.error(res, 404, "District not found");
  }
  await district.deleteOne();
  return ApiResponse.success(res, 200, "District deleted successfully");
});

module.exports = {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};