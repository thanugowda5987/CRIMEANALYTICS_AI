const { body } = require('express-validator');

const firValidator = [
  body('firNumber').trim().notEmpty().withMessage('FIR number is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
  body('policeStation').trim().notEmpty().withMessage('Police station is required'),
  body('complainantName').trim().notEmpty().withMessage('Complainant name is required'),
  body('incidentDate').isISO8601().withMessage('Valid incident date is required'),
  body('incidentLocation').trim().notEmpty().withMessage('Incident location is required'),
  body('crimeType').trim().notEmpty().withMessage('Crime type is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

module.exports = { firValidator };