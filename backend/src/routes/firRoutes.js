const express = require('express');
const router = express.Router();

const {
  createFIR,
  getFIRs,
  getFIRById,
  updateFIR,
  deleteFIR,
} = require('../controllers/firController');
const { firValidator } = require('../validators/firValidator');
const validate = require('../middlewares/validateMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorizeRoles('admin', 'investigator', 'officer'), firValidator, validate, createFIR);
router.get('/', getFIRs);
router.get('/:id', getFIRById);
router.put('/:id', authorizeRoles('admin', 'investigator', 'officer'), updateFIR);
router.delete('/:id', authorizeRoles('admin'), deleteFIR);

module.exports = router;