import axiosInstance from "./axiosInstance";

export const getAllOfficers = (params) => axiosInstance.get("/officers", { params });

export const getOfficerById = (id) => axiosInstance.get(`/officers/${id}`);

export const createOfficer = (data) => axiosInstance.post("/officers", data);

export const updateOfficer = (id, data) => axiosInstance.put(`/officers/${id}`, data);

export const deleteOfficer = (id) => axiosInstance.delete(`/officers/${id}`);