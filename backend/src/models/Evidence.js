const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
  {
    caseRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    firRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FIR",
    },
    type: {
      type: String,
      enum: ["Physical", "Digital", "Document", "Photo", "Video", "Weapon", "Other"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Officer",
    },
    collectedDate: {
      type: Date,
      default: Date.now,
    },
    storageLocation: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    chainOfCustody: [
      {
        handledBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Officer",
        },
        date: Date,
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evidence", evidenceSchema);