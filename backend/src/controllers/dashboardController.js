const FIR = require('../models/FIR');
const Case = require('../models/Case');
const Criminal = require('../models/Criminal');
const Alert = require('../models/Alert');
const ApiResponse = require('../utils/apiResponse');

const getStats = async (req, res, next) => {
  try {
    const [totalFIRs, solvedCases, pendingCases, activeInvestigations, wantedCriminals, activeAlerts] =
      await Promise.all([
        FIR.countDocuments(),
        Case.countDocuments({ status: 'solved' }),
        Case.countDocuments({ status: { $in: ['open', 'under_investigation'] } }),
        Case.countDocuments({ status: 'under_investigation' }),
        Criminal.countDocuments({ isWanted: true }),
        Alert.countDocuments({ isActive: true }),
      ]);

    return ApiResponse.success(res, 200, 'Dashboard stats fetched successfully', {
      totalFIRs,
      solvedCases,
      pendingCases,
      activeInvestigations,
      wantedCriminals,
      activeAlerts,
    });
  } catch (error) {
    next(error);
  }
};

const getCrimeByDistrict = async (req, res, next) => {
  try {
    const data = await FIR.aggregate([
      { $group: { _id: '$district', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return ApiResponse.success(res, 200, 'Crime by district fetched successfully', { data });
  } catch (error) {
    next(error);
  }
};

const getCrimeByMonth = async (req, res, next) => {
  try {
    const data = await FIR.aggregate([
      {
        $group: {
          _id: { year: { $year: '$incidentDate' }, month: { $month: '$incidentDate' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    return ApiResponse.success(res, 200, 'Crime by month fetched successfully', { data });
  } catch (error) {
    next(error);
  }
};

const getCrimeByCategory = async (req, res, next) => {
  try {
    const data = await FIR.aggregate([
      { $group: { _id: '$crimeType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return ApiResponse.success(res, 200, 'Crime by category fetched successfully', { data });
  } catch (error) {
    next(error);
  }
};

const getRecentActivity = async (req, res, next) => {
  try {
    const recentFIRs = await FIR.find().sort({ createdAt: -1 }).limit(10);
    const recentCases = await Case.find().sort({ createdAt: -1 }).limit(10);

    return ApiResponse.success(res, 200, 'Recent activity fetched successfully', {
      recentFIRs,
      recentCases,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getCrimeByDistrict,
  getCrimeByMonth,
  getCrimeByCategory,
  getRecentActivity,
};