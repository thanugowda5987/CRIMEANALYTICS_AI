const FIR = require("../models/FIR");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllFIRs = asyncHandler(async (req, res) => {
  const { district, status, crimeCategory, page = 1, limit = 20, search } = req.query;

  const filter = {};
  if (district) filter.district = district;
  if (status) filter.status = status;
  if (crimeCategory) filter.crimeCategory = crimeCategory;
  if (search) {
    filter.$or = [
      { firNumber: { $regex: search, $options: "i" } },
      { complainantName: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [firs, total] = await Promise.all([
    FIR.find(filter)
      .populate("district", "name")
      .populate("policeStation", "name")
      .populate("crimeCategory", "name severity")
      .populate("investigatingOfficer", "name badgeNumber")
      .sort({ dateFiled: -1 })
      .skip(skip)
      .limit(Number(limit)),
    FIR.countDocuments(filter),
  ]);

  return ApiResponse.success(res, 200, "FIRs fetched successfully", {
    firs,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  });
});

const getFIRById = asyncHandler(async (req, res) => {
  const fir = await FIR.findById(req.params.id)
    .populate("district", "name")
    .populate("policeStation", "name")
    .populate("crimeCategory", "name severity")
    .populate("investigatingOfficer", "name badgeNumber")
    .populate("victims")
    .populate("accused");

  if (!fir) {
    return ApiResponse.error(res, 404, "FIR not found");
  }
  return ApiResponse.success(res, 200, "FIR fetched successfully", fir);
});

const createFIR = asyncHandler(async (req, res) => {
  const existing = await FIR.findOne({ firNumber: req.body.firNumber });
  if (existing) {
    return ApiResponse.error(res, 400, "FIR with this number already exists");
  }

  const fir = await FIR.create(req.body);
  return ApiResponse.success(res, 201, "FIR created successfully", fir);
});

const updateFIR = asyncHandler(async (req, res) => {
  const fir = await FIR.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!fir) {
    return ApiResponse.error(res, 404, "FIR not found");
  }
  return ApiResponse.success(res, 200, "FIR updated successfully", fir);
});

const deleteFIR = asyncHandler(async (req, res) => {
  const fir = await FIR.findById(req.params.id);
  if (!fir) {
    return ApiResponse.error(res, 404, "FIR not found");
  }
  await fir.deleteOne();
  return ApiResponse.success(res, 200, "FIR deleted successfully");
});

module.exports = { getAllFIRs, getFIRById, createFIR, updateFIR, deleteFIR };