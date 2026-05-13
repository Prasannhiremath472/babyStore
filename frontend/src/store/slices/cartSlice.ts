import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  image: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  itemCount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<{ items: CartItem[]; subtotal: number; itemCount: number }>) {
      state.items = action.payload.items;
      state.subtotal = action.payload.subtotal;
      state.itemCount = action.payload.itemCount;
    },
    openCart(state) { state.isOpen = true; },
    closeCart(state) { state.isOpen = false; },
    toggleCart(state) { state.isOpen = !state.isOpen; },
    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
      state.itemCount = 0;
    },
  },
});

export const { setCart, openCart, closeCart, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
