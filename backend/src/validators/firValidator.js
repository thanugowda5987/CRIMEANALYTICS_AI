const { body } = require("express-validator");

const createFIRValidator = [
  body("firNumber").trim().notEmpty().withMessage("FIR number is required"),
  body("policeStation").notEmpty().withMessage("Police station is required"),
  body("district").notEmpty().withMessage("District is required"),
  body("crimeCategory").notEmpty().withMessage("Crime category is required"),
  body("incidentDate").optional().isISO8601().withMessage("Invalid incident date"),
  body("complainantName").optional().trim(),
  body("description").optional().trim(),
];

const updateFIRValidator = [
  body("status")
    .optional()
    .isIn(["Filed", "Under Investigation", "Chargesheet Filed", "Closed", "Solved"])
    .withMessage("Invalid status"),
];

module.exports = { createFIRValidator, updateFIRValidator };