import request from './request';

export const getCustomers = () => request.get('/customers');
export const createCustomer = (data: any) => request.post('/customers', { data });
export const updateCustomer = (id: string, data: any) => request.put(`/customers/${id}`, { data });
export const deleteCustomer = (id: string) => request.delete(`/customers/${id}`);
