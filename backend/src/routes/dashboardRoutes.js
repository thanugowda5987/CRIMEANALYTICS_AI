const express = require('express');
const router = express.Router();

const {
  getStats,
  getCrimeByDistrict,
  getCrimeByMonth,
  getCrimeByCategory,
  getRecentActivity,
} = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/stats', getStats);
router.get('/crime-by-district', getCrimeByDistrict);
router.get('/crime-by-month', getCrimeByMonth);
router.get('/crime-by-category', getCrimeByCategory);
router.get('/recent-activity', getRecentActivity);

module.exports = router;