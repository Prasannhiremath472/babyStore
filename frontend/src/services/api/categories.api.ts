import apiClient from './client';
export const categoriesApi = {
  getAll: () => apiClient.get('/categories'),
  getTree: () => apiClient.get('/categories/tree'),
  getBySlug: (slug: string) => apiClient.get(`/categories/${slug}`),
};
