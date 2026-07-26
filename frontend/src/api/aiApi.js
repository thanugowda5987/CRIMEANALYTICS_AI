import axiosInstance from './axiosInstance';

// Placeholder API integration only — no AI logic implemented on the frontend.
export const sendChatMessage = (data) => axiosInstance.post('/ai/chat', data);
export const getPrediction = (data) => axiosInstance.post('/ai/predict', data);
export const getRecommendation = (data) => axiosInstance.post('/ai/recommend', data);
export const getAIReport = (params) => axiosInstance.get('/ai/report', { params });
export const getAIAnalytics = (params) => axiosInstance.get('/ai/analytics', { params });