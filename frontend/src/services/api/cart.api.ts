import apiClient from './client';

export const cartApi = {
  get: () => apiClient.get('/cart'),
  addItem: (data: { productId: string; variantId: string; quantity: number }) =>
    apiClient.post('/cart/items', data),
  updateItem: (itemId: string, quantity: number) =>
    apiClient.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: string) => apiClient.delete(`/cart/items/${itemId}`),
  clear: () => apiClient.delete('/cart'),
};
