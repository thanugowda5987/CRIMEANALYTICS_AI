const express = require('express');
const router = express.Router();

const { getAuditLogs } = require('../controllers/auditController');
const { protect } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

router.use(protect);

router.get('/', authorizeRoles('admin'), getAuditLogs);

module.exports = router;