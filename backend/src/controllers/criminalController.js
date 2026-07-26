const Criminal = require('../models/Criminal');
const ApiResponse = require('../utils/apiResponse');

const createCriminal = async (req, res, next) => {
  try {
    const criminal = await Criminal.create(req.body);
    return ApiResponse.success(res, 201, 'Criminal record created successfully', { criminal });
  } catch (error) {
    next(error);
  }
};

const getCriminals = async (req, res, next) => {
  try {
    const { isWanted, riskLevel, crimeCategory, search, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (isWanted !== undefined) filter.isWanted = isWanted === 'true';
    if (riskLevel) filter.riskLevel = riskLevel;
    if (crimeCategory) filter.crimeCategories = crimeCategory;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { aliasNames: { $regex: search, $options: 'i' } },
      ];
    }

    const criminals = await Criminal.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Criminal.countDocuments(filter);

    return ApiResponse.success(res, 200, 'Criminal records fetched successfully', {
      criminals,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getCriminalById = async (req, res, next) => {
  try {
    const criminal = await Criminal.findById(req.params.id)
      .populate('linkedCases')
      .populate('associates', 'name riskLevel isWanted');

    if (!criminal) {
      return ApiResponse.error(res, 404, 'Criminal record not found');
    }

    return ApiResponse.success(res, 200, 'Criminal record fetched successfully', { criminal });
  } catch (error) {
    next(error);
  }
};

const updateCriminal = async (req, res, next) => {
  try {
    const criminal = await Criminal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!criminal) {
      return ApiResponse.error(res, 404, 'Criminal record not found');
    }

    return ApiResponse.success(res, 200, 'Criminal record updated successfully', { criminal });
  } catch (error) {
    next(error);
  }
};

const deleteCriminal = async (req, res, next) => {
  try {
    const criminal = await Criminal.findByIdAndDelete(req.params.id);

    if (!criminal) {
      return ApiResponse.error(res, 404, 'Criminal record not found');
    }

    return ApiResponse.success(res, 200, 'Criminal record deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

const getNetwork = async (req, res, next) => {
  try {
    const criminal = await Criminal.findById(req.params.id).populate(
      'associates',
      'name riskLevel isWanted knownAddresses'
    );

    if (!criminal) {
      return ApiResponse.error(res, 404, 'Criminal record not found');
    }

    const nodes = [
      { id: criminal._id, label: criminal.name, type: 'primary' },
      ...criminal.associates.map((a) => ({ id: a._id, label: a.name, type: 'associate' })),
    ];

    const edges = criminal.associates.map((a) => ({
      from: criminal._id,
      to: a._id,
      relation: 'associate',
    }));

    return ApiResponse.success(res, 200, 'Network graph fetched successfully', { nodes, edges });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCriminal,
  getCriminals,
  getCriminalById,
  updateCriminal,
  deleteCriminal,
  getNetwork,
};