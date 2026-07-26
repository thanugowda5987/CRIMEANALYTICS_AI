const express = require("express");
const router = express.Router();

const {
  dashboardKPIs,
  crimeByDistrict,
  crimeByCategory,
  monthlyTrend,
  crimeStatistics,
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard-kpis", protect, dashboardKPIs);
router.get("/crime-by-district", protect, crimeByDistrict);
router.get("/crime-by-category", protect, crimeByCategory);
router.get("/monthly-trend", protect, monthlyTrend);
router.get("/crime-statistics", protect, crimeStatistics);

module.exports = router;