import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import adminUiReducer from './slices/adminUiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
    adminAuth: adminAuthReducer,
    adminUi: adminUiReducer,
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
