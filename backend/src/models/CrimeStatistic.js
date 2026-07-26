const mongoose = require("mongoose");

const crimeStatisticSchema = new mongoose.Schema(
  {
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
    },
    crimeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrimeCategory",
    },
    totalCases: {
      type: Number,
      default: 0,
    },
    solvedCases: {
      type: Number,
      default: 0,
    },
    pendingCases: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CrimeStatistic", crimeStatisticSchema);