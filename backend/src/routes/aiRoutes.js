const express = require("express");
const router = express.Router();

const {
  aiChat,
  aiPredict,
  aiRecommend,
  aiReport,
  aiAnalytics,
} = require("../controllers/aiProxyController");
const { protect } = require("../middleware/authMiddleware");

// AI API Integration Placeholders — no AI logic implemented here.
router.post("/chat", protect, aiChat);
router.post("/predict", protect, aiPredict);
router.post("/recommend", protect, aiRecommend);
router.get("/report", protect, aiReport);
router.get("/analytics", protect, aiAnalytics);

module.exports = router;