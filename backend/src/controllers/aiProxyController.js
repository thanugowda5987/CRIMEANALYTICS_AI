const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const env = require("../config/env");

/*
  AI Proxy Controller
  --------------------
  This controller only forwards requests to the AI teammate's service.
  No AI/ML logic is implemented here. All endpoints act as integration
  placeholders until the AI service is available at env.AI_SERVICE_BASE_URL.
*/

const aiChat = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 200, "AI chat placeholder response", {
    reply: "AI service not yet connected. This is a placeholder response.",
    endpoint: `${env.AI_SERVICE_BASE_URL}/chat`,
    receivedPayload: req.body,
  });
});

const aiPredict = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 200, "AI predict placeholder response", {
    prediction: null,
    message: "AI prediction service not yet connected.",
    endpoint: `${env.AI_SERVICE_BASE_URL}/predict`,
    receivedPayload: req.body,
  });
});

const aiRecommend = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 200, "AI recommend placeholder response", {
    recommendations: [],
    message: "AI recommendation service not yet connected.",
    endpoint: `${env.AI_SERVICE_BASE_URL}/recommend`,
    receivedPayload: req.body,
  });
});

const aiReport = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 200, "AI report placeholder response", {
    report: null,
    message: "AI report generation service not yet connected.",
    endpoint: `${env.AI_SERVICE_BASE_URL}/report`,
  });
});

const aiAnalytics = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, 200, "AI analytics placeholder response", {
    analytics: null,
    message: "AI analytics service not yet connected.",
    endpoint: `${env.AI_SERVICE_BASE_URL}/analytics`,
  });
});

module.exports = { aiChat, aiPredict, aiRecommend, aiReport, aiAnalytics };