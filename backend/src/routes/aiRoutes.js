const express = require('express');
const router = express.Router();

const { chat, predict, recommend, report, analytics } = require('../controllers/aiProxyController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/chat', chat);
router.post('/predict', predict);
router.post('/recommend', recommend);
router.get('/report', report);
router.get('/analytics', analytics);

module.exports = router;