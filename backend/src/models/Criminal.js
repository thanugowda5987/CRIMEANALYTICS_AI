const mongoose = require('mongoose');

const criminalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    aliasNames: [{ type: String }],
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    photoUrl: { type: String },
    identifiers: {
      aadhaarLast4: { type: String },
      phoneNumbers: [{ type: String }],
      vehicleNumbers: [{ type: String }],
    },
    knownAddresses: [{ type: String }],
    crimeCategories: [{ type: String }],
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    isWanted: { type: Boolean, default: false },
    linkedCases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }],
    associates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Criminal' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Criminal', criminalSchema);