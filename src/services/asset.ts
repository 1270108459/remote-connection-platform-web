import request from './request';

export const getAssets = () => request.get('/assets');
export const createAsset = (data: any) => request.post('/assets', { data });
export const updateAsset = (id: string, data: any) => request.put(`/assets/${id}`, { data });
export const deleteAsset = (id: string) => request.delete(`/assets/${id}`);
