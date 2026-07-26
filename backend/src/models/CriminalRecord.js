const mongoose = require("mongoose");

const criminalRecordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    aliasNames: [
      {
        type: String,
        trim: true,
      },
    ],
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    identificationMarks: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
    photoUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Wanted", "In Custody", "Released", "Under Trial", "Convicted"],
      default: "Under Trial",
    },
    associatedCases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
      },
    ],
    criminalHistory: [
      {
        caseNumber: String,
        crimeCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CrimeCategory",
        },
        year: Number,
        outcome: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CriminalRecord", criminalRecordSchema);