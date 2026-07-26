require("dotenv").config();
const mongoose = require("mongoose");
const env = require("../config/env");
const logger = require("./logger");

const District = require("../models/District");
const CrimeCategory = require("../models/CrimeCategory");
const Officer = require("../models/Officer");
const PoliceStation = require("../models/PoliceStation");
const CriminalRecord = require("../models/CriminalRecord");
const FIR = require("../models/FIR");
const Case = require("../models/Case");
const CrimeReport = require("../models/CrimeReport");
const Evidence = require("../models/Evidence");

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

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const FIRST_NAMES = [
  "Ravi", "Suresh", "Manjunath", "Prakash", "Naveen", "Ganesh", "Anil", "Kiran",
  "Vinay", "Deepak", "Ramesh", "Ashwin", "Nagesh", "Vijay", "Santosh",
];
const LAST_NAMES = [
  "Gowda", "Reddy", "Naik", "Shetty", "Rao", "Kumar", "Hegde", "Patil", "Setty", "Murthy",
];

const genName = () => `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`;

const seed = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("Connected to MongoDB for seeding");

    // Clear all collections this script owns
    await Promise.all([
      District.deleteMany(),
      CrimeCategory.deleteMany(),
      PoliceStation.deleteMany(),
      Officer.deleteMany(),
      CriminalRecord.deleteMany(),
      FIR.deleteMany(),
      Case.deleteMany(),
      CrimeReport.deleteMany(),
      Evidence.deleteMany(),
    ]);

    // Districts + Crime Categories
    const savedDistricts = await District.insertMany(districts);
    const savedCategories = await CrimeCategory.insertMany(crimeCategories);
    logger.info(`${savedDistricts.length} districts seeded`);
    logger.info(`${savedCategories.length} crime categories seeded`);

    // Police Stations (2 per district for first 10 districts)
    const stations = [];
    for (const district of savedDistricts.slice(0, 10)) {
      for (let i = 1; i <= 2; i++) {
        stations.push({
          name: `${district.name} Police Station ${i}`,
          code: `${district.code}-PS${i}`,
          district: district._id,
          address: `${district.name}, Karnataka`,
          contactNumber: `080${randomInt(10000000, 99999999)}`,
        });
      }
    }
    const savedStations = await PoliceStation.insertMany(stations);

    // Officers
    const ranks = ["Constable", "Head Constable", "ASI", "SI", "PSI", "Inspector"];
    const officers = savedStations.map((station, idx) => ({
      name: genName(),
      badgeNumber: `KSP${1000 + idx}`,
      rank: randomFrom(ranks),
      policeStation: station._id,
      district: station.district,
      contactNumber: `9${randomInt(100000000, 999999999)}`,
      email: `officer${idx}@ksp.gov.in`,
    }));
    const savedOfficers = await Officer.insertMany(officers);

    // Criminal Records
    const criminalStatuses = ["Wanted", "In Custody", "Released", "Under Trial", "Convicted"];
    const criminals = Array.from({ length: 25 }).map(() => {
      const district = randomFrom(savedDistricts);
      return {
        name: genName(),
        age: randomInt(19, 55),
        gender: randomFrom(["Male", "Female"]),
        district: district._id,
        status: randomFrom(criminalStatuses),
        identificationMarks: "Scar on left forearm",
        criminalHistory: [
          {
            caseNumber: `KSP-CASE-${randomInt(1000, 9999)}`,
            crimeCategory: randomFrom(savedCategories)._id,
            year: randomInt(2020, 2026),
            outcome: randomFrom(["Convicted", "Acquitted", "Pending Trial"]),
          },
        ],
      };
    });
    const savedCriminals = await CriminalRecord.insertMany(criminals);

    // FIRs
    const firStatuses = ["Filed", "Under Investigation", "Chargesheet Filed", "Closed", "Solved"];
    const firs = [];
    for (let i = 0; i < 40; i++) {
      const station = randomFrom(savedStations);
      const category = randomFrom(savedCategories);
      const officer = randomFrom(savedOfficers);
      const dateFiled = randomDate(new Date("2025-01-01"), new Date("2026-07-01"));

      firs.push({
        firNumber: `FIR-${station.code}-${1000 + i}`,
        policeStation: station._id,
        district: station.district,
        dateFiled,
        incidentDate: dateFiled,
        incidentLocation: `Near ${station.name}`,
        crimeCategory: category._id,
        complainantName: genName(),
        complainantContact: `9${randomInt(100000000, 999999999)}`,
        description: `${category.name} incident reported near ${station.name}.`,
        accused: [randomFrom(savedCriminals)._id],
        investigatingOfficer: officer._id,
        status: randomFrom(firStatuses),
        section: `IPC ${randomInt(100, 500)}`,
      });
    }
    const savedFIRs = await FIR.insertMany(firs);

    // Cases (linked to FIRs)
    const caseStatuses = ["Open", "Under Investigation", "Pending Trial", "Closed", "Solved"];
    const priorities = ["Low", "Medium", "High", "Critical"];
    const cases = savedFIRs.slice(0, 25).map((fir, idx) => ({
      caseNumber: `CASE-${2026}-${1000 + idx}`,
      fir: fir._id,
      title: `Investigation into ${fir.firNumber}`,
      district: fir.district,
      assignedOfficers: [fir.investigatingOfficer],
      status: randomFrom(caseStatuses),
      priority: randomFrom(priorities),
      openedDate: fir.dateFiled,
      remarks: "Auto-generated demo case for hackathon presentation.",
    }));
    const savedCases = await Case.insertMany(cases);

    // Crime Reports (for analytics aggregation)
    const crimeReports = [];
    for (let i = 0; i < 200; i++) {
      const district = randomFrom(savedDistricts);
      const category = randomFrom(savedCategories);
      crimeReports.push({
        district: district._id,
        crimeCategory: category._id,
        date: randomDate(new Date("2025-01-01"), new Date("2026-07-01")),
        victimAge: randomInt(10, 70),
        victimGender: randomFrom(["Male", "Female", "Other"]),
        resolved: Math.random() > 0.4,
      });
    }
    await CrimeReport.insertMany(crimeReports);

    // Evidence (linked to first 15 cases)
    const evidenceTypes = ["Physical", "Digital", "Document", "Photo", "Weapon"];
    const evidenceItems = savedCases.slice(0, 15).map((c) => ({
      caseRef: c._id,
      firRef: c.fir,
      type: randomFrom(evidenceTypes),
      description: "Collected during initial investigation.",
      collectedBy: randomFrom(savedOfficers)._id,
      collectedDate: c.openedDate,
      storageLocation: "District Evidence Locker",
    }));
    await Evidence.insertMany(evidenceItems);

    logger.info("Full demo dataset seeded successfully:");
    logger.info(`- ${savedStations.length} Police Stations`);
    logger.info(`- ${savedOfficers.length} Officers`);
    logger.info(`- ${savedCriminals.length} Criminal Records`);
    logger.info(`- ${savedFIRs.length} FIRs`);
    logger.info(`- ${savedCases.length} Cases`);
    logger.info(`- ${crimeReports.length} Crime Reports`);
    logger.info(`- ${evidenceItems.length} Evidence Items`);

    process.exit(0);
  } catch (error) {
    logger.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seed();