import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminUiState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
}

const initialState: AdminUiState = {
  sidebarCollapsed: false,
  theme: 'light',
};

const adminUiSlice = createSlice({
  name: 'adminUi',
  initialState,
  reducers: {
    toggleAdminSidebar(state) { state.sidebarCollapsed = !state.sidebarCollapsed; },
    setAdminTheme(state, action: PayloadAction<'light' | 'dark'>) { state.theme = action.payload; },
  },
});

export const { toggleAdminSidebar, setAdminTheme } = adminUiSlice.actions;
export default adminUiSlice.reducer;
