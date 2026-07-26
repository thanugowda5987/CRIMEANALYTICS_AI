const express = require("express");
const router = express.Router();

const {
  getAllCriminals,
  getCriminalById,
  createCriminal,
  updateCriminal,
  deleteCriminal,
} = require("../controllers/criminalController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getAllCriminals);
router.get("/:id", protect, getCriminalById);
router.post("/", protect, authorizeRoles("admin", "investigator"), createCriminal);
router.put("/:id", protect, authorizeRoles("admin", "investigator"), updateCriminal);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCriminal);

module.exports = router;