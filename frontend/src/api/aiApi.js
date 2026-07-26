import axiosInstance from "./axiosInstance";
import { AI_ENDPOINTS } from "../utils/constants";

// AI API Integration Layer — calls backend placeholder endpoints only.
// No AI logic implemented here; responses come from backend/AI service.

export const sendChatMessage = (message) =>
  axiosInstance.post(AI_ENDPOINTS.CHAT, { message });

export const getPrediction = (payload) =>
  axiosInstance.post(AI_ENDPOINTS.PREDICT, payload);

export const getRecommendations = (payload) =>
  axiosInstance.post(AI_ENDPOINTS.RECOMMEND, payload);

export const getAIReport = () => axiosInstance.get(AI_ENDPOINTS.REPORT);

export const getAIAnalytics = () => axiosInstance.get(AI_ENDPOINTS.ANALYTICS);