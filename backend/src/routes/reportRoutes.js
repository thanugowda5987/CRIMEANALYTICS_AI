const express = require('express');
const router = express.Router();

const { exportFIRReport, exportCaseReport } = require('../controllers/reportController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/fir', exportFIRReport);
router.get('/case', exportCaseReport);

module.exports = router;