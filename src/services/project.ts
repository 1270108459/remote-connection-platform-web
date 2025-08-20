import request from './request';

export async function getProjects() {
  return request('/projects');
}

export async function createProjects(data: any) {
  return request.post('/projects', { data });
}

export async function updateProjects(id: string, data: any) {
  return request.put(`/projects/${id}`, { data });
}

export async function deleteProjects(id: string) {
  return request.delete(`/projects/${id}`);
}
