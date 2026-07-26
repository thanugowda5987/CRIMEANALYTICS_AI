require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: process.env.PORT || 5000,

  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",

  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 1,

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  AI_SERVICE_BASE_URL:
    process.env.AI_SERVICE_BASE_URL || "http://localhost:6000/api/ai",

  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};