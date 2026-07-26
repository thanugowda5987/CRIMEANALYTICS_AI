const Case = require("../models/Case");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllCases = asyncHandler(async (req, res) => {
  const { district, status, priority, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (district) filter.district = district;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const skip = (Number(page) - 1) * Number(limit);

  const [cases, total] = await Promise.all([
    Case.find(filter)
      .populate("fir", "firNumber")
      .populate("district", "name")
      .populate("assignedOfficers", "name badgeNumber")
      .sort({ openedDate: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Case.countDocuments(filter),
  ]);

  return ApiResponse.success(res, 200, "Cases fetched successfully", {
    cases,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  });
});

const getCaseById = asyncHandler(async (req, res) => {
  const caseItem = await Case.findById(req.params.id)
    .populate("fir")
    .populate("district", "name")
    .populate("assignedOfficers", "name badgeNumber rank");

  if (!caseItem) {
    return ApiResponse.error(res, 404, "Case not found");
  }
  return ApiResponse.success(res, 200, "Case fetched successfully", caseItem);
});

const createCase = asyncHandler(async (req, res) => {
  const existing = await Case.findOne({ caseNumber: req.body.caseNumber });
  if (existing) {
    return ApiResponse.error(res, 400, "Case with this number already exists");
  }

  const caseItem = await Case.create(req.body);
  return ApiResponse.success(res, 201, "Case created successfully", caseItem);
});

const updateCase = asyncHandler(async (req, res) => {
  const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!caseItem) {
    return ApiResponse.error(res, 404, "Case not found");
  }
  return ApiResponse.success(res, 200, "Case updated successfully", caseItem);
});

const deleteCase = asyncHandler(async (req, res) => {
  const caseItem = await Case.findById(req.params.id);
  if (!caseItem) {
    return ApiResponse.error(res, 404, "Case not found");
  }
  await caseItem.deleteOne();
  return ApiResponse.success(res, 200, "Case deleted successfully");
});

module.exports = { getAllCases, getCaseById, createCase, updateCase, deleteCase };