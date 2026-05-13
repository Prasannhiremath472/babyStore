import apiClient from './client';

export const authApi = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh'),
  forgotPassword: (email: string) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string }) => apiClient.post('/auth/reset-password', data),
  changePassword: (data: any) => apiClient.put('/auth/change-password', data),
  verifyEmail: (token: string) => apiClient.get(`/auth/verify-email/${token}`),
  me: () => apiClient.get('/auth/me'),
};
