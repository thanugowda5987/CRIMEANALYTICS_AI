import axiosInstance from "./axiosInstance";

export const getAllCriminals = (params) => axiosInstance.get("/criminals", { params });

export const getCriminalById = (id) => axiosInstance.get(`/criminals/${id}`);

export const createCriminal = (data) => axiosInstance.post("/criminals", data);

export const updateCriminal = (id, data) => axiosInstance.put(`/criminals/${id}`, data);

export const deleteCriminal = (id) => axiosInstance.delete(`/criminals/${id}`);