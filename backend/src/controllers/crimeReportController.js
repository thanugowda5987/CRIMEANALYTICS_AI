const CrimeReport = require("../models/CrimeReport");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllCrimeReports = asyncHandler(async (req, res) => {
  const { district, crimeCategory, from, to, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (district) filter.district = district;
  if (crimeCategory) filter.crimeCategory = crimeCategory;
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [reports, total] = await Promise.all([
    CrimeReport.find(filter)
      .populate("district", "name")
      .populate("taluk", "name")
      .populate("crimeCategory", "name severity")
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit)),
    CrimeReport.countDocuments(filter),
  ]);

  return ApiResponse.success(res, 200, "Crime reports fetched successfully", {
    reports,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  });
});

const getCrimeReportById = asyncHandler(async (req, res) => {
  const report = await CrimeReport.findById(req.params.id)
    .populate("district", "name")
    .populate("taluk", "name")
    .populate("crimeCategory", "name severity");

  if (!report) {
    return ApiResponse.error(res, 404, "Crime report not found");
  }
  return ApiResponse.success(res, 200, "Crime report fetched successfully", report);
});

const createCrimeReport = asyncHandler(async (req, res) => {
  const report = await CrimeReport.create(req.body);
  return ApiResponse.success(res, 201, "Crime report created successfully", report);
});

const updateCrimeReport = asyncHandler(async (req, res) => {
  const report = await CrimeReport.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!report) {
    return ApiResponse.error(res, 404, "Crime report not found");
  }
  return ApiResponse.success(res, 200, "Crime report updated successfully", report);
});

const deleteCrimeReport = asyncHandler(async (req, res) => {
  const report = await CrimeReport.findById(req.params.id);
  if (!report) {
    return ApiResponse.error(res, 404, "Crime report not found");
  }
  await report.deleteOne();
  return ApiResponse.success(res, 200, "Crime report deleted successfully");
});

module.exports = {
  getAllCrimeReports,
  getCrimeReportById,
  createCrimeReport,
  updateCrimeReport,
  deleteCrimeReport,
};