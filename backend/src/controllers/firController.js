const FIR = require('../models/FIR');
const ApiResponse = require('../utils/apiResponse');

const createFIR = async (req, res, next) => {
  try {
    const fir = await FIR.create({ ...req.body, assignedOfficer: req.user._id });
    return ApiResponse.success(res, 201, 'FIR created successfully', { fir });
  } catch (error) {
    next(error);
  }
};

const getFIRs = async (req, res, next) => {
  try {
    const { district, crimeType, status, page = 1, limit = 20, search } = req.query;

    const filter = {};
    if (district) filter.district = district;
    if (crimeType) filter.crimeType = crimeType;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { firNumber: { $regex: search, $options: 'i' } },
        { complainantName: { $regex: search, $options: 'i' } },
        { incidentLocation: { $regex: search, $options: 'i' } },
      ];
    }

    const firs = await FIR.find(filter)
      .populate('assignedOfficer', 'name badgeNumber')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await FIR.countDocuments(filter);

    return ApiResponse.success(res, 200, 'FIRs fetched successfully', {
      firs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getFIRById = async (req, res, next) => {
  try {
    const fir = await FIR.findById(req.params.id)
      .populate('assignedOfficer', 'name badgeNumber')
      .populate('linkedCase');

    if (!fir) {
      return ApiResponse.error(res, 404, 'FIR not found');
    }

    return ApiResponse.success(res, 200, 'FIR fetched successfully', { fir });
  } catch (error) {
    next(error);
  }
};

const updateFIR = async (req, res, next) => {
  try {
    const fir = await FIR.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!fir) {
      return ApiResponse.error(res, 404, 'FIR not found');
    }

    return ApiResponse.success(res, 200, 'FIR updated successfully', { fir });
  } catch (error) {
    next(error);
  }
};

const deleteFIR = async (req, res, next) => {
  try {
    const fir = await FIR.findByIdAndDelete(req.params.id);

    if (!fir) {
      return ApiResponse.error(res, 404, 'FIR not found');
    }

    return ApiResponse.success(res, 200, 'FIR deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

module.exports = { createFIR, getFIRs, getFIRById, updateFIR, deleteFIR };