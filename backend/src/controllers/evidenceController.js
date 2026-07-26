const Evidence = require('../models/Evidence');
const Case = require('../models/Case');
const ApiResponse = require('../utils/apiResponse');

const createEvidence = async (req, res, next) => {
  try {
    const evidence = await Evidence.create({
      ...req.body,
      collectedBy: req.user._id,
      chainOfCustody: [{ handledBy: req.user._id, action: 'collected' }],
    });

    await Case.findByIdAndUpdate(req.body.caseId, { $push: { evidence: evidence._id } });

    return ApiResponse.success(res, 201, 'Evidence recorded successfully', { evidence });
  } catch (error) {
    next(error);
  }
};

const getEvidenceByCase = async (req, res, next) => {
  try {
    const evidence = await Evidence.find({ caseId: req.params.caseId })
      .populate('collectedBy', 'name badgeNumber')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 200, 'Evidence fetched successfully', { evidence });
  } catch (error) {
    next(error);
  }
};

const getEvidenceById = async (req, res, next) => {
  try {
    const evidence = await Evidence.findById(req.params.id)
      .populate('collectedBy', 'name badgeNumber')
      .populate('chainOfCustody.handledBy', 'name badgeNumber');

    if (!evidence) {
      return ApiResponse.error(res, 404, 'Evidence not found');
    }

    return ApiResponse.success(res, 200, 'Evidence fetched successfully', { evidence });
  } catch (error) {
    next(error);
  }
};

const addCustodyRecord = async (req, res, next) => {
  try {
    const { action } = req.body;

    const evidence = await Evidence.findByIdAndUpdate(
      req.params.id,
      { $push: { chainOfCustody: { handledBy: req.user._id, action } } },
      { new: true }
    );

    if (!evidence) {
      return ApiResponse.error(res, 404, 'Evidence not found');
    }

    return ApiResponse.success(res, 200, 'Custody record added successfully', { evidence });
  } catch (error) {
    next(error);
  }
};

const deleteEvidence = async (req, res, next) => {
  try {
    const evidence = await Evidence.findByIdAndDelete(req.params.id);

    if (!evidence) {
      return ApiResponse.error(res, 404, 'Evidence not found');
    }

    return ApiResponse.success(res, 200, 'Evidence deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvidence,
  getEvidenceByCase,
  getEvidenceById,
  addCustodyRecord,
  deleteEvidence,
};