const mongoose = require("mongoose");

const firSchema = new mongoose.Schema(
  {
    firNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    policeStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliceStation",
      required: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    dateFiled: {
      type: Date,
      default: Date.now,
    },
    incidentDate: {
      type: Date,
    },
    incidentLocation: {
      type: String,
      trim: true,
    },
    crimeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrimeCategory",
      required: true,
    },
    complainantName: {
      type: String,
      trim: true,
    },
    complainantContact: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    victims: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Victim",
      },
    ],
    accused: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CriminalRecord",
      },
    ],
    investigatingOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Officer",
    },
    status: {
      type: String,
      enum: ["Filed", "Under Investigation", "Chargesheet Filed", "Closed", "Solved"],
      default: "Filed",
    },
    section: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FIR", firSchema);