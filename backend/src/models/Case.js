const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema(
  {
    caseNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    district: { type: String, required: true },
    crimeType: { type: String, required: true },
    relatedFIRs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FIR' }],
    suspects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Criminal' }],
    victims: [{ name: String, contact: String }],
    witnesses: [{ name: String, contact: String }],
    assignedInvestigator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['open', 'under_investigation', 'closed', 'solved'],
      default: 'open',
    },
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    evidence: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evidence' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Case', caseSchema);