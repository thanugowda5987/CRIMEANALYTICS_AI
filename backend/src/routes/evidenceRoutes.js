const express = require('express');
const router = express.Router();

const {
  createEvidence,
  getEvidenceByCase,
  getEvidenceById,
  addCustodyRecord,
  deleteEvidence,
} = require('../controllers/evidenceController');
const { protect } = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorizeRoles('admin', 'investigator', 'officer'), createEvidence);
router.get('/case/:caseId', getEvidenceByCase);
router.get('/:id', getEvidenceById);
router.post('/:id/custody', authorizeRoles('admin', 'investigator', 'officer'), addCustodyRecord);
router.delete('/:id', authorizeRoles('admin'), deleteEvidence);

module.exports = router;