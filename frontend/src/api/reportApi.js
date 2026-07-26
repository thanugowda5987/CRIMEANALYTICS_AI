import axiosInstance from './axiosInstance';

export const exportFIRReport = (params) =>
  axiosInstance.get('/reports/fir', { params, responseType: 'blob' });

export const exportCaseReport = (params) =>
  axiosInstance.get('/reports/case', { params, responseType: 'blob' });