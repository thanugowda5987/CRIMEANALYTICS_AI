const express = require("express");
const router = express.Router();

const {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} = require("../controllers/caseController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getAllCases);
router.get("/:id", protect, getCaseById);
router.post("/", protect, authorizeRoles("admin", "investigator"), createCase);
router.put("/:id", protect, authorizeRoles("admin", "investigator"), updateCase);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCase);

module.exports = router;