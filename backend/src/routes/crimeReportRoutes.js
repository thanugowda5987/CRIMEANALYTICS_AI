const express = require("express");
const router = express.Router();

const {
  getAllCrimeReports,
  getCrimeReportById,
  createCrimeReport,
  updateCrimeReport,
  deleteCrimeReport,
} = require("../controllers/crimeReportController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getAllCrimeReports);
router.get("/:id", protect, getCrimeReportById);
router.post("/", protect, authorizeRoles("admin", "investigator", "officer"), createCrimeReport);
router.put("/:id", protect, authorizeRoles("admin", "investigator", "officer"), updateCrimeReport);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCrimeReport);

module.exports = router;