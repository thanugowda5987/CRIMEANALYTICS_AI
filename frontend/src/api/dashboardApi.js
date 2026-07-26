import axiosInstance from './axiosInstance';

export const getStats = () => axiosInstance.get('/dashboard/stats');
export const getCrimeByDistrict = () => axiosInstance.get('/dashboard/crime-by-district');
export const getCrimeByMonth = () => axiosInstance.get('/dashboard/crime-by-month');
export const getCrimeByCategory = () => axiosInstance.get('/dashboard/crime-by-category');
export const getRecentActivity = () => axiosInstance.get('/dashboard/recent-activity');