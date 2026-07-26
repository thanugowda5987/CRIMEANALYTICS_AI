import axiosInstance from "./axiosInstance";

export const getAllDistricts = () => axiosInstance.get("/districts");

export const getDistrictById = (id) => axiosInstance.get(`/districts/${id}`);

export const createDistrict = (data) => axiosInstance.post("/districts", data);

export const updateDistrict = (id, data) => axiosInstance.put(`/districts/${id}`, data);

export const deleteDistrict = (id) => axiosInstance.delete(`/districts/${id}`);