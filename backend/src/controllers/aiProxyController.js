const axios = require('axios');
const { AI_SERVICE_BASE_URL } = require('../config/env');
const ApiResponse = require('../utils/apiResponse');

// Placeholder proxy layer only. No AI logic is implemented here.
// Requests are forwarded to the AI team's service (ai/ folder) once it exposes matching endpoints.

const forwardRequest = async (method, path, req, res, next) => {
  try {
    const response = await axios({
      method,
      url: `${AI_SERVICE_BASE_URL}${path}`,
      data: req.body,
      params: req.query,
    });

    return ApiResponse.success(res, 200, 'AI service response', response.data);
  } catch (error) {
    return ApiResponse.error(res, 503, 'AI service unavailable', [
      { message: 'The AI service is not reachable. Placeholder response returned.' },
    ]);
  }
};

const chat = (req, res, next) => forwardRequest('post', '/chat', req, res, next);
const predict = (req, res, next) => forwardRequest('post', '/predict', req, res, next);
const recommend = (req, res, next) => forwardRequest('post', '/recommend', req, res, next);
const report = (req, res, next) => forwardRequest('get', '/report', req, res, next);
const analytics = (req, res, next) => forwardRequest('get', '/analytics', req, res, next);

module.exports = { chat, predict, recommend, report, analytics };