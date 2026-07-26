const { body } = require('express-validator');

const caseValidator = [
  body('caseNumber').trim().notEmpty().withMessage('Case number is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
  body('crimeType').trim().notEmpty().withMessage('Crime type is required'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Invalid priority'),
];

module.exports = { caseValidator };