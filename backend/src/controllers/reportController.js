const FIR = require('../models/FIR');
const Case = require('../models/Case');
const generatePDFReport = require('../utils/generatePDF');
const ApiResponse = require('../utils/apiResponse');

const exportFIRReport = async (req, res, next) => {
  try {
    const firs = await FIR.find(req.query.status ? { status: req.query.status } : {});
    generatePDFReport(res, { title: 'FIR Report', data: firs, filename: 'fir-report.pdf' });
  } catch (error) {
    next(error);
  }
};

const exportCaseReport = async (req, res, next) => {
  try {
    const cases = await Case.find(req.query.status ? { status: req.query.status } : {});
    generatePDFReport(res, { title: 'Case Report', data: cases, filename: 'case-report.pdf' });
  } catch (error) {
    next(error);
  }
};

module.exports = { exportFIRReport, exportCaseReport };