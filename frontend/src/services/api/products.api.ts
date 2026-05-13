import apiClient from './client';

export const productsApi = {
  list: (params?: any) => apiClient.get('/products', { params }),
  getBySlug: (slug: string) => apiClient.get(`/products/slug/${slug}`),
  getFeatured: (limit?: number) => apiClient.get('/products/featured', { params: { limit } }),
  getBestsellers: (limit?: number) => apiClient.get('/products/bestsellers', { params: { limit } }),
  getRelated: (id: string) => apiClient.get(`/products/${id}/related`),
  create: (data: any) => apiClient.post('/products', data),
  update: (id: string, data: any) => apiClient.put(`/products/${id}`, data),
  approve: (id: string) => apiClient.patch(`/products/${id}/approve`),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
  updateInventory: (variantId: string, data: any) => apiClient.patch(`/products/inventory/${variantId}`, data),
};
