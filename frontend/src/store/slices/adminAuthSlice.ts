import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminApiClient } from '../../services/api/adminClient';

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AdminAuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AdminAuthState = {
  user: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),
  isLoading: false,
};

export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async (creds: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await adminApiClient.post('/auth/login', creds);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('adminToken');
    },
  },
  extraReducers: (b) => {
    b.addCase(loginAdmin.pending, (s) => { s.isLoading = true; });
    b.addCase(loginAdmin.fulfilled, (s, a) => {
      s.isLoading = false;
      s.user = a.payload.user;
      s.token = a.payload.accessToken;
      s.isAuthenticated = true;
      localStorage.setItem('adminToken', a.payload.accessToken);
    });
    b.addCase(loginAdmin.rejected, (s) => { s.isLoading = false; });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
