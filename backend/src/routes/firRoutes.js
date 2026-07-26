const express = require("express");
const router = express.Router();

const {
  getAllFIRs,
  getFIRById,
  createFIR,
  updateFIR,
  deleteFIR,
} = require("../controllers/firController");
const {
  createFIRValidator,
  updateFIRValidator,
} = require("../validators/firValidator");
const validate = require("../middleware/validateMiddleware");
const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", protect, getAllFIRs);
router.get("/:id", protect, getFIRById);
router.post(
  "/",
  protect,
  authorizeRoles("admin", "investigator", "officer"),
  createFIRValidator,
  validate,
  createFIR
);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "investigator", "officer"),
  updateFIRValidator,
  validate,
  updateFIR
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteFIR);

module.exports = router;