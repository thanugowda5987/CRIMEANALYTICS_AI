const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const {
  getCrimeByDistrict,
  getCrimeByCategory,
  getMonthlyTrend,
  getDashboardKPIs,
} = require("../services/analyticsService");
const CrimeStatistic = require("../models/CrimeStatistic");

const dashboardKPIs = asyncHandler(async (req, res) => {
  const kpis = await getDashboardKPIs();
  return ApiResponse.success(res, 200, "Dashboard KPIs fetched successfully", kpis);
});

const crimeByDistrict = asyncHandler(async (req, res) => {
  const data = await getCrimeByDistrict();
  return ApiResponse.success(res, 200, "Crime by district fetched successfully", data);
});

const crimeByCategory = asyncHandler(async (req, res) => {
  const data = await getCrimeByCategory();
  return ApiResponse.success(res, 200, "Crime by category fetched successfully", data);
});

const monthlyTrend = asyncHandler(async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const data = await getMonthlyTrend(year);
  return ApiResponse.success(res, 200, "Monthly crime trend fetched successfully", data);
});

const crimeStatistics = asyncHandler(async (req, res) => {
  const { district, year } = req.query;
  const filter = {};
  if (district) filter.district = district;
  if (year) filter.year = Number(year);

  const stats = await CrimeStatistic.find(filter)
    .populate("district", "name")
    .populate("crimeCategory", "name");

  return ApiResponse.success(res, 200, "Crime statistics fetched successfully", stats);
});

module.exports = {
  dashboardKPIs,
  crimeByDistrict,
  crimeByCategory,
  monthlyTrend,
  crimeStatistics,
};