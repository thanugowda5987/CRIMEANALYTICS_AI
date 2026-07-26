const express = require("express");
const router = express.Router();

const {
  getAllOfficers,
  getOfficerById,
  createOfficer,
  updateOfficer,
  deleteOfficer,
} = require("../controllers/officerController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getAllOfficers);
router.get("/:id", protect, getOfficerById);
router.post("/", protect, authorizeRoles("admin"), createOfficer);
router.put("/:id", protect, authorizeRoles("admin"), updateOfficer);
router.delete("/:id", protect, authorizeRoles("admin"), deleteOfficer);

module.exports = router;