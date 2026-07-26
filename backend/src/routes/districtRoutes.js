const express = require("express");
const router = express.Router();

const {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/districtController");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", getAllDistricts);
router.get("/:id", getDistrictById);
router.post("/", protect, authorizeRoles("admin"), createDistrict);
router.put("/:id", protect, authorizeRoles("admin"), updateDistrict);
router.delete("/:id", protect, authorizeRoles("admin"), deleteDistrict);

module.exports = router;