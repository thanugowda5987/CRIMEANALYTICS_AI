const Officer = require("../models/Officer");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllOfficers = asyncHandler(async (req, res) => {
  const { district, policeStation } = req.query;
  const filter = {};
  if (district) filter.district = district;
  if (policeStation) filter.policeStation = policeStation;

  const officers = await Officer.find(filter)
    .populate("district", "name")
    .populate("policeStation", "name");

  return ApiResponse.success(res, 200, "Officers fetched successfully", officers);
});

const getOfficerById = asyncHandler(async (req, res) => {
  const officer = await Officer.findById(req.params.id)
    .populate("district", "name")
    .populate("policeStation", "name");

  if (!officer) {
    return ApiResponse.error(res, 404, "Officer not found");
  }
  return ApiResponse.success(res, 200, "Officer fetched successfully", officer);
});

const createOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.create(req.body);
  return ApiResponse.success(res, 201, "Officer created successfully", officer);
});

const updateOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!officer) {
    return ApiResponse.error(res, 404, "Officer not found");
  }
  return ApiResponse.success(res, 200, "Officer updated successfully", officer);
});

const deleteOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findById(req.params.id);
  if (!officer) {
    return ApiResponse.error(res, 404, "Officer not found");
  }
  await officer.deleteOne();
  return ApiResponse.success(res, 200, "Officer deleted successfully");
});

module.exports = {
  getAllOfficers,
  getOfficerById,
  createOfficer,
  updateOfficer,
  deleteOfficer,
};