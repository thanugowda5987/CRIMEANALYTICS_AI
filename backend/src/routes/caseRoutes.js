const express = require('express');
const router = express.Router();

const {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  deleteCase,
} = require('../controllers/caseController');
const { caseValidator } = require('../validators/caseValidator');
const validate = require('../middlewares/validateMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorizeRoles('admin', 'investigator'), caseValidator, validate, createCase);
router.get('/', getCases);
router.get('/:id', getCaseById);
router.put('/:id', authorizeRoles('admin', 'investigator'), updateCase);
router.delete('/:id', authorizeRoles('admin'), deleteCase);

module.exports = router;