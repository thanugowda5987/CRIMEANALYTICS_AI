import axiosInstance from "./axiosInstance";

export const getAllFIRs = (params) => axiosInstance.get("/firs", { params });

export const getFIRById = (id) => axiosInstance.get(`/firs/${id}`);

export const createFIR = (data) => axiosInstance.post("/firs", data);

export const updateFIR = (id, data) => axiosInstance.put(`/firs/${id}`, data);

export const deleteFIR = (id) => axiosInstance.delete(`/firs/${id}`);