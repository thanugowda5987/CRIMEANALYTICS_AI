import axiosInstance from "./axiosInstance";

export const getAllCases = (params) => 
    axiosInstance.get("/cases", { params });


export const getCaseById = (id) => 
    axiosInstance.get(`/cases/${id}`);


export const createCase = (data) => 
    axiosInstance.post("/cases", data);


export const updateCase = (id, data) => 
    axiosInstance.put(`/cases/${id}`, data);


export const deleteCase = (id) => 
    axiosInstance.delete(`/cases/${id}`);