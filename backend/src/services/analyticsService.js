const CrimeReport = require("../models/CrimeReport");
const CrimeStatistic = require("../models/CrimeStatistic");
const FIR = require("../models/FIR");

const getCrimeByDistrict = async () => {
  return CrimeReport.aggregate([
    {
      $group: {
        _id: "$district",
        totalCrimes: { $sum: 1 },
        resolved: { $sum: { $cond: ["$resolved", 1, 0] } },
      },
    },
    {
      $lookup: {
        from: "districts",
        localField: "_id",
        foreignField: "_id",
        as: "district",
      },
    },
    { $unwind: "$district" },
    {
      $project: {
        _id: 0,
        district: "$district.name",
        totalCrimes: 1,
        resolved: 1,
      },
    },
    { $sort: { totalCrimes: -1 } },
  ]);
};

const getCrimeByCategory = async () => {
  return CrimeReport.aggregate([
    {
      $group: {
        _id: "$crimeCategory",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "crimecategories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $project: {
        _id: 0,
        category: "$category.name",
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);
};

const getMonthlyTrend = async (year) => {
  return CrimeReport.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$date" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

const getDashboardKPIs = async () => {
  const [totalFIRs, solvedCases, pendingCases, totalCrimeReports] = await Promise.all([
    FIR.countDocuments(),
    FIR.countDocuments({ status: "Solved" }),
    FIR.countDocuments({ status: { $in: ["Filed", "Under Investigation"] } }),
    CrimeReport.countDocuments(),
  ]);

  return {
    totalFIRs,
    solvedCases,
    pendingCases,
    totalCrimeReports,
  };
};

module.exports = {
  getCrimeByDistrict,
  getCrimeByCategory,
  getMonthlyTrend,
  getDashboardKPIs,
};