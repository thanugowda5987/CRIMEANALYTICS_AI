const express = require("express");
const router = express.Router();

const {
  getAllEvidence,
  getEvidenceById,
  createEvidence,
  updateEvidence,
  deleteEvidence,
} = require("../controllers/evidenceController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getAllEvidence);
router.get("/:id", protect, getEvidenceById);
router.post("/", protect, authorizeRoles("admin", "investigator", "officer"), createEvidence);
router.put("/:id", protect, authorizeRoles("admin", "investigator", "officer"), updateEvidence);
router.delete("/:id", protect, authorizeRoles("admin"), deleteEvidence);

module.exports = router;