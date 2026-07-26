const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    region: {
      type: String,
      enum: [
        "Bengaluru",
        "Mysuru",
        "Belagavi",
        "Kalaburagi",
        "Coastal Karnataka",
      ],
    },
    population: {
      type: Number,
      default: 0,
    },
    totalPoliceStations: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("District", districtSchema);