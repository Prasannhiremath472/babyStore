import apiClient from './client';

export const ordersApi = {
  create: (data: any) => apiClient.post('/orders', data),
  verifyPayment: (data: any) => apiClient.post('/orders/verify-payment', data),
  getMyOrders: (params?: any) => apiClient.get('/orders/my-orders', { params }),
  getMyOrder: (id: string) => apiClient.get(`/orders/my-orders/${id}`),
  cancelOrder: (id: string, reason: string) => apiClient.patch(`/orders/my-orders/${id}/cancel`, { reason }),
  requestReturn: (id: string, data: any) => apiClient.post(`/orders/my-orders/${id}/return`, data),
  // Admin
  adminAll: (params?: any) => apiClient.get('/orders/admin/all', { params }),
  adminGet: (id: string) => apiClient.get(`/orders/admin/${id}`),
  updateStatus: (id: string, data: any) => apiClient.patch(`/orders/admin/${id}/status`, data),
};
