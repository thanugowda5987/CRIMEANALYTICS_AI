const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    badgeNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    rank: {
      type: String,
      enum: [
        "Constable",
        "Head Constable",
        "ASI",
        "SI",
        "PSI",
        "Inspector",
        "DySP",
        "SP",
        "DIG",
        "IG",
      ],
      required: true,
    },
    policeStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliceStation",
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Officer", officerSchema);