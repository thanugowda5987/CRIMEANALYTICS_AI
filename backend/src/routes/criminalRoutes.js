const express = require('express');
const router = express.Router();

const {
  createCriminal,
  getCriminals,
  getCriminalById,
  updateCriminal,
  deleteCriminal,
  getNetwork,
} = require('../controllers/criminalController');
const { protect } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorizeRoles('admin', 'investigator'), createCriminal);
router.get('/', getCriminals);
router.get('/:id', getCriminalById);
router.get('/:id/network', getNetwork);
router.put('/:id', authorizeRoles('admin', 'investigator'), updateCriminal);
router.delete('/:id', authorizeRoles('admin'), deleteCriminal);

module.exports = router;