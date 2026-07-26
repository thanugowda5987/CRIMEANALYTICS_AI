const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameKannada: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      trim: true,
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
    address: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    inChargeOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Officer",
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PoliceStation", policeStationSchema);