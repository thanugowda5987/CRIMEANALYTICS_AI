import axiosInstance from "./axiosInstance";

export const getDashboardKPIs = () => axiosInstance.get("/analytics/dashboard-kpis");

export const getCrimeByDistrict = () => axiosInstance.get("/analytics/crime-by-district");

export const getCrimeByCategory = () => axiosInstance.get("/analytics/crime-by-category");

export const getMonthlyTrend = (year) =>
  axiosInstance.get("/analytics/monthly-trend", { params: { year } });

export const getCrimeStatistics = (params) =>
  axiosInstance.get("/analytics/crime-statistics", { params });