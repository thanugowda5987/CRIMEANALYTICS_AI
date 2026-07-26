const Evidence = require("../models/Evidence");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllEvidence = asyncHandler(async (req, res) => {
  const { caseRef, firRef, type } = req.query;

  const filter = {};
  if (caseRef) filter.caseRef = caseRef;
  if (firRef) filter.firRef = firRef;
  if (type) filter.type = type;

  const evidence = await Evidence.find(filter)
    .populate("caseRef", "caseNumber title")
    .populate("firRef", "firNumber")
    .populate("collectedBy", "name badgeNumber")
    .sort({ collectedDate: -1 });

  return ApiResponse.success(res, 200, "Evidence fetched successfully", evidence);
});

const getEvidenceById = asyncHandler(async (req, res) => {
  const evidence = await Evidence.findById(req.params.id)
    .populate("caseRef", "caseNumber title")
    .populate("firRef", "firNumber")
    .populate("collectedBy", "name badgeNumber")
    .populate("chainOfCustody.handledBy", "name badgeNumber");

  if (!evidence) {
    return ApiResponse.error(res, 404, "Evidence not found");
  }
  return ApiResponse.success(res, 200, "Evidence fetched successfully", evidence);
});

const createEvidence = asyncHandler(async (req, res) => {
  const evidence = await Evidence.create(req.body);
  return ApiResponse.success(res, 201, "Evidence created successfully", evidence);
});

const updateEvidence = asyncHandler(async (req, res) => {
  const evidence = await Evidence.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!evidence) {
    return ApiResponse.error(res, 404, "Evidence not found");
  }
  return ApiResponse.success(res, 200, "Evidence updated successfully", evidence);
});

const deleteEvidence = asyncHandler(async (req, res) => {
  const evidence = await Evidence.findById(req.params.id);
  if (!evidence) {
    return ApiResponse.error(res, 404, "Evidence not found");
  }
  await evidence.deleteOne();
  return ApiResponse.success(res, 200, "Evidence deleted successfully");
});

module.exports = {
  getAllEvidence,
  getEvidenceById,
  createEvidence,
  updateEvidence,
  deleteEvidence,
};