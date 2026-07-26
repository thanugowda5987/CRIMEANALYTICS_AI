import axiosInstance from "./axiosInstance";

export const getAllCrimeReports = (params) => axiosInstance.get("/crime-reports", { params });

export const getCrimeReportById = (id) => axiosInstance.get(`/crime-reports/${id}`);

export const createCrimeReport = (data) => axiosInstance.post("/crime-reports", data);

export const updateCrimeReport = (id, data) => axiosInstance.put(`/crime-reports/${id}`, data);

export const deleteCrimeReport = (id) => axiosInstance.delete(`/crime-reports/${id}`);