export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const APP_NAME = import.meta.env.VITE_APP_NAME || "KSP Crime Analytics Platform";

export const ROLES = {
  ADMIN: "admin",
  INVESTIGATOR: "investigator",
  OFFICER: "officer",
  ANALYST: "analyst",
  VIEWER: "viewer",
};

export const FIR_STATUS = [
  "Filed",
  "Under Investigation",
  "Chargesheet Filed",
  "Closed",
  "Solved",
];

export const CASE_STATUS = ["Open", "Under Investigation", "Pending Trial", "Closed", "Solved"];

export const CASE_PRIORITY = ["Low", "Medium", "High", "Critical"];

export const CRIMINAL_STATUS = ["Wanted", "In Custody", "Released", "Under Trial", "Convicted"];

export const KARNATAKA_DISTRICTS = [
  "Bengaluru Urban",
  "Bengaluru Rural",
  "Mysuru",
  "Dakshina Kannada",
  "Udupi",
  "Belagavi",
  "Ballari",
  "Kalaburagi",
  "Bidar",
  "Vijayapura",
  "Bagalkote",
  "Dharwad",
  "Gadag",
  "Haveri",
  "Shivamogga",
  "Davanagere",
  "Chitradurga",
  "Tumakuru",
  "Kolar",
  "Chikkaballapur",
  "Ramanagara",
  "Mandya",
  "Hassan",
  "Kodagu",
  "Chamarajanagar",
  "Raichur",
  "Koppal",
  "Yadgir",
  "Uttara Kannada",
  "Chikkamagaluru",
  "Vijayanagara",
];

export const AI_ENDPOINTS = {
  CHAT: "/ai/chat",
  PREDICT: "/ai/predict",
  RECOMMEND: "/ai/recommend",
  REPORT: "/ai/report",
  ANALYTICS: "/ai/analytics",
};