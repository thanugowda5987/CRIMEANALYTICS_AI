require("dotenv").config();
const mongoose = require("mongoose");
const env = require("../config/env");
const logger = require("./logger");

const District = require("../models/District");
const CrimeCategory = require("../models/CrimeCategory");

const districts = [
  { name: "Bengaluru Urban", code: "BLR-U", region: "Bengaluru" },
  { name: "Bengaluru Rural", code: "BLR-R", region: "Bengaluru" },
  { name: "Mysuru", code: "MYS", region: "Mysuru" },
  { name: "Dakshina Kannada", code: "DK", region: "Coastal Karnataka" },
  { name: "Udupi", code: "UDP", region: "Coastal Karnataka" },
  { name: "Belagavi", code: "BGM", region: "Belagavi" },
  { name: "Ballari", code: "BLY", region: "Kalaburagi" },
  { name: "Kalaburagi", code: "KLB", region: "Kalaburagi" },
  { name: "Bidar", code: "BDR", region: "Kalaburagi" },
  { name: "Vijayapura", code: "VJP", region: "Kalaburagi" },
  { name: "Bagalkote", code: "BGK", region: "Kalaburagi" },
  { name: "Dharwad", code: "DWD", region: "Belagavi" },
  { name: "Gadag", code: "GDG", region: "Belagavi" },
  { name: "Haveri", code: "HVR", region: "Belagavi" },
  { name: "Shivamogga", code: "SMG", region: "Mysuru" },
  { name: "Davanagere", code: "DVG", region: "Belagavi" },
  { name: "Chitradurga", code: "CTD", region: "Mysuru" },
  { name: "Tumakuru", code: "TMK", region: "Bengaluru" },
  { name: "Kolar", code: "KLR", region: "Bengaluru" },
  { name: "Chikkaballapur", code: "CKB", region: "Bengaluru" },
  { name: "Ramanagara", code: "RMN", region: "Bengaluru" },
  { name: "Mandya", code: "MDY", region: "Mysuru" },
  { name: "Hassan", code: "HSN", region: "Mysuru" },
  { name: "Kodagu", code: "KDG", region: "Mysuru" },
  { name: "Chamarajanagar", code: "CMN", region: "Mysuru" },
  { name: "Raichur", code: "RCR", region: "Kalaburagi" },
  { name: "Koppal", code: "KPL", region: "Kalaburagi" },
  { name: "Yadgir", code: "YDG", region: "Kalaburagi" },
  { name: "Uttara Kannada", code: "UK", region: "Coastal Karnataka" },
  { name: "Chikkamagaluru", code: "CKM", region: "Mysuru" },
  { name: "Vijayanagara", code: "VJN", region: "Kalaburagi" },
];

const crimeCategories = [
  { name: "Theft", severity: "Medium" },
  { name: "Burglary", severity: "Medium" },
  { name: "Robbery", severity: "High" },
  { name: "Assault", severity: "High" },
  { name: "Murder", severity: "Critical" },
  { name: "Cyber Crime", severity: "High" },
  { name: "Fraud", severity: "Medium" },
  { name: "Kidnapping", severity: "Critical" },
  { name: "Domestic Violence", severity: "High" },
  { name: "Drug Trafficking", severity: "Critical" },
  { name: "Missing Person", severity: "High" },
  { name: "Road Accident", severity: "Medium" },
  { name: "Chain Snatching", severity: "Medium" },
  { name: "Vandalism", severity: "Low" },
  { name: "Extortion", severity: "High" },
];

const seed = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("Connected to MongoDB for seeding");

    await District.deleteMany();
    await CrimeCategory.deleteMany();

    await District.insertMany(districts);
    await CrimeCategory.insertMany(crimeCategories);

    logger.info("Karnataka districts and crime categories seeded successfully");
    process.exit(0);
  } catch (error) {
    logger.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seed();