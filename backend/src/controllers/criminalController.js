const CriminalRecord = require("../models/CriminalRecord");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllCriminals = asyncHandler(async (req, res) => {
  const { district, status, search, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (district) filter.district = district;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { aliasNames: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [criminals, total] = await Promise.all([
    CriminalRecord.find(filter)
      .populate("district", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    CriminalRecord.countDocuments(filter),
  ]);

  return ApiResponse.success(res, 200, "Criminal records fetched successfully", {
    criminals,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  });
});

const getCriminalById = asyncHandler(async (req, res) => {
  const criminal = await CriminalRecord.findById(req.params.id)
    .populate("district", "name")
    .populate("associatedCases")
    .populate("criminalHistory.crimeCategory", "name severity");

  if (!criminal) {
    return ApiResponse.error(res, 404, "Criminal record not found");
  }
  return ApiResponse.success(res, 200, "Criminal record fetched successfully", criminal);
});

const createCriminal = asyncHandler(async (req, res) => {
  const criminal = await CriminalRecord.create(req.body);
  return ApiResponse.success(res, 201, "Criminal record created successfully", criminal);
});

const updateCriminal = asyncHandler(async (req, res) => {
  const criminal = await CriminalRecord.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!criminal) {
    return ApiResponse.error(res, 404, "Criminal record not found");
  }
  return ApiResponse.success(res, 200, "Criminal record updated successfully", criminal);
});

const deleteCriminal = asyncHandler(async (req, res) => {
  const criminal = await CriminalRecord.findById(req.params.id);
  if (!criminal) {
    return ApiResponse.error(res, 404, "Criminal record not found");
  }
  await criminal.deleteOne();
  return ApiResponse.success(res, 200, "Criminal record deleted successfully");
});

module.exports = {
  getAllCriminals,
  getCriminalById,
  createCriminal,
  updateCriminal,
  deleteCriminal,
};