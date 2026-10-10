import http from './http';

export const authApi = {
  register: (payload) => http.post('/auth/register', payload).then((r) => r.data),
  login: (payload) => http.post('/auth/login', payload).then((r) => r.data),
  me: () => http.get('/auth/me').then((r) => r.data.user),
};

export const templatesApi = {
  list: (params) => http.get('/templates', { params }).then((r) => r.data.templates),
  categories: () => http.get('/templates/categories').then((r) => r.data.categories),
  get: (id) => http.get(`/templates/${id}`).then((r) => r.data.template),
};

export const favoritesApi = {
  list: () => http.get('/favorites').then((r) => r.data.favorites),
  add: (templateId) => http.post(`/favorites/${templateId}`).then((r) => r.data),
  remove: (templateId) => http.delete(`/favorites/${templateId}`).then((r) => r.data),
};
