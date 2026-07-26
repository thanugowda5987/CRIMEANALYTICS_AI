import axiosInstance from "./axiosInstance";

export const getAllEvidence = (params) => axiosInstance.get("/evidence", { params });

export const getEvidenceById = (id) => axiosInstance.get(`/evidence/${id}`);

export const createEvidence = (data) => axiosInstance.post("/evidence", data);

export const updateEvidence = (id, data) => axiosInstance.put(`/evidence/${id}`, data);

export const deleteEvidence = (id) => axiosInstance.delete(`/evidence/${id}`);