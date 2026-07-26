const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['wanted_criminal', 'missing_person', 'emergency', 'cyber_warning', 'general'],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    district: { type: String },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);