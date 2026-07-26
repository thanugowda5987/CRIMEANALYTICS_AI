const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fir: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FIR",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
    assignedOfficers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Officer",
      },
    ],
    status: {
      type: String,
      enum: ["Open", "Under Investigation", "Pending Trial", "Closed", "Solved"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    openedDate: {
      type: Date,
      default: Date.now,
    },
    closedDate: {
      type: Date,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);