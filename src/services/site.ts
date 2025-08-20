// src/services/site.ts
import request from './request';

export const getSites = () => request.get('/sites');
// 正确：直接传递 data 作为请求体，而非 { data }
export const createSite = (data: any) => request.post('/sites', data);
export const updateSite = (id: string, data: any) => request.put(`/sites/${id}`, data);
export const deleteSite = (id: string) => request.delete(`/sites/${id}`);