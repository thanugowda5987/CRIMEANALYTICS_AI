const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const districtRoutes = require("./districtRoutes");
const officerRoutes = require("./officerRoutes");
const firRoutes = require("./firRoutes");
const crimeReportRoutes = require("./crimeReportRoutes");
const criminalRoutes = require("./criminalRoutes");
const evidenceRoutes = require("./evidenceRoutes");
const caseRoutes = require("./caseRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const aiRoutes = require("./aiRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/districts", districtRoutes);
router.use("/officers", officerRoutes);
router.use("/firs", firRoutes);
router.use("/crime-reports", crimeReportRoutes);
router.use("/criminals", criminalRoutes);
router.use("/evidence", evidenceRoutes);
router.use("/cases", caseRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/ai", aiRoutes);

module.exports = router;