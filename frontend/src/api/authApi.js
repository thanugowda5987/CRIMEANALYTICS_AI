import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) => axiosInstance.post("/auth/login", credentials);

export const registerUser = (data) => axiosInstance.post("/auth/register", data);

export const getCurrentUser = () => axiosInstance.get("/auth/me");

export const logoutUser = () => axiosInstance.post("/auth/logout");