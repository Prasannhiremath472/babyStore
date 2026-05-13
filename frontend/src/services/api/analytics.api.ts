import apiClient from './client';
export const analyticsApi = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
  getRevenue: (params?: any) => apiClient.get('/analytics/revenue', { params }),
  getInventory: () => apiClient.get('/analytics/inventory'),
  getCustomers: (params?: any) => apiClient.get('/analytics/customers', { params }),
};
