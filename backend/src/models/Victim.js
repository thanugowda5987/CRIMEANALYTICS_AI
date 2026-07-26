const mongoose = require("mongoose");

const victimSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    contactNumber: {
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
    relatedFIR: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FIR",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Victim", victimSchema);