import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isMiniCartOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isMiniCartOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) { state.isMobileMenuOpen = !state.isMobileMenuOpen; },
    closeMobileMenu(state) { state.isMobileMenuOpen = false; },
    toggleSearch(state) { state.isSearchOpen = !state.isSearchOpen; },
    closeSearch(state) { state.isSearchOpen = false; },
    toggleMiniCart(state) { state.isMiniCartOpen = !state.isMiniCartOpen; },
    closeMiniCart(state) { state.isMiniCartOpen = false; },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) { state.theme = action.payload; },
  },
});

export const { toggleMobileMenu, closeMobileMenu, toggleSearch, closeSearch, toggleMiniCart, closeMiniCart, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
