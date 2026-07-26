const mongoose = require("mongoose");

const talukSchema = new mongoose.Schema(
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
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Taluk", talukSchema);