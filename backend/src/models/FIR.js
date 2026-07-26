const mongoose = require('mongoose');

const firSchema = new mongoose.Schema(
  {
    firNumber: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    policeStation: { type: String, required: true },
    complainantName: { type: String, required: true },
    complainantContact: { type: String },
    incidentDate: { type: Date, required: true },
    incidentLocation: { type: String, required: true },
    crimeType: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['open', 'under_investigation', 'closed', 'solved'],
      default: 'open',
    },
    assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    linkedCase: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FIR', firSchema);