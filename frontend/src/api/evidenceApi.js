import axiosInstance from './axiosInstance';

export const getEvidenceByCase = (caseId) => axiosInstance.get(`/evidence/case/${caseId}`);
export const getEvidenceById = (id) => axiosInstance.get(`/evidence/${id}`);
export const createEvidence = (data) => axiosInstance.post('/evidence', data);
export const addCustodyRecord = (id, data) => axiosInstance.post(`/evidence/${id}/custody`, data);
export const deleteEvidence = (id) => axiosInstance.delete(`/evidence/${id}`);