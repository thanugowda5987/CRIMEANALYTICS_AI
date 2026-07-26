const Case = require('../models/Case');
const ApiResponse = require('../utils/apiResponse');

const createCase = async (req, res, next) => {
  try {
    const caseDoc = await Case.create({ ...req.body, assignedInvestigator: req.user._id });
    return ApiResponse.success(res, 201, 'Case created successfully', { case: caseDoc });
  } catch (error) {
    next(error);
  }
};

const getCases = async (req, res, next) => {
  try {
    const { district, crimeType, status, priority, page = 1, limit = 20, search } = req.query;

    const filter = {};
    if (district) filter.district = district;
    if (crimeType) filter.crimeType = crimeType;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { caseNumber: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const cases = await Case.find(filter)
      .populate('assignedInvestigator', 'name badgeNumber')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Case.countDocuments(filter);

    return ApiResponse.success(res, 200, 'Cases fetched successfully', {
      cases,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getCaseById = async (req, res, next) => {
  try {
    const caseDoc = await Case.findById(req.params.id)
      .populate('relatedFIRs')
      .populate('suspects', 'name riskLevel isWanted')
      .populate('assignedInvestigator', 'name badgeNumber')
      .populate('evidence');

    if (!caseDoc) {
      return ApiResponse.error(res, 404, 'Case not found');
    }

    return ApiResponse.success(res, 200, 'Case fetched successfully', { case: caseDoc });
  } catch (error) {
    next(error);
  }
};

const updateCase = async (req, res, next) => {
  try {
    const caseDoc = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!caseDoc) {
      return ApiResponse.error(res, 404, 'Case not found');
    }

    return ApiResponse.success(res, 200, 'Case updated successfully', { case: caseDoc });
  } catch (error) {
    next(error);
  }
};

const deleteCase = async (req, res, next) => {
  try {
    const caseDoc = await Case.findByIdAndDelete(req.params.id);

    if (!caseDoc) {
      return ApiResponse.error(res, 404, 'Case not found');
    }

    return ApiResponse.success(res, 200, 'Case deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

module.exports = { createCase, getCases, getCaseById, updateCase, deleteCase };