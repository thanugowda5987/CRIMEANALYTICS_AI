const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema(
  {
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    type: {
      type: String,
      enum: ['document', 'image', 'video', 'audio', 'physical', 'digital'],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collectedAt: { type: Date, default: Date.now },
    chainOfCustody: [
      {
        handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evidence', evidenceSchema);