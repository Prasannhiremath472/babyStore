import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useCartStore = create(
  persist(
    (set, get) => ({
      items:     [],
      subtotal:  0,
      itemCount: 0,
      isLoading: false,

      fetchCart: async () => {
        try {
          const { data } = await api.get('/cart');
          const cart = data.data;
          set({
            items:     cart.items || [],
            subtotal:  cart.subtotal || 0,
            itemCount: cart.itemCount || 0,
          });
        } catch {}
      },

      addItem: async (productId, variantId, quantity = 1) => {
        set({ isLoading: true });
        try {
          await api.post('/cart/items', { productId, variantId, quantity });
          await get().fetchCart();
          set({ isLoading: false });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, message: err.response?.data?.message || 'Failed to add item' };
        }
      },

      updateItem: async (itemId, quantity) => {
        try {
          await api.patch(`/cart/items/${itemId}`, { quantity });
          await get().fetchCart();
        } catch {}
      },

      removeItem: async (itemId) => {
        try {
          await api.delete(`/cart/items/${itemId}`);
          await get().fetchCart();
        } catch {}
      },

      clearCart: async () => {
        try {
          await api.delete('/cart/clear');
          set({ items: [], subtotal: 0, itemCount: 0 });
        } catch {}
      },

      // Optimistic local add (before API call)
      setCart: (cart) => set({
        items:     cart.items || [],
        subtotal:  cart.subtotal || 0,
        itemCount: cart.itemCount || 0,
      }),
    }),
    {
      name: 'mybaby-cart',
      partialize: (state) => ({ itemCount: state.itemCount }),
    }
  )
);

export default useCartStore;
