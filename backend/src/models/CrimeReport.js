const mongoose = require("mongoose");

const crimeReportSchema = new mongoose.Schema(
  {
    fir: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FIR",
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    taluk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Taluk",
    },
    crimeCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrimeCategory",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    victimAge: {
      type: Number,
    },
    victimGender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CrimeReport", crimeReportSchema);