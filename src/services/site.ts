import request from './request';

export const getSites = () => request.get('/sites');
export const createSite = (data: any) => request.post('/sites', { data });
export const updateSite = (id: string, data: any) => request.put(`/sites/${id}`, { data });
export const deleteSite = (id: string) => request.delete(`/sites/${id}`);
