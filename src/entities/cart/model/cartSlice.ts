import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import type { CartItem, CartState } from './types';

const STORAGE_KEY = 'cart';

const loadCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartDiscount = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) =>
      sum + (item.oldPrice ? (item.oldPrice - item.price) * item.quantity : 0),
    0,
  );

export const selectIsInCart = (id: number) => (state: RootState) =>
  state.cart.items.some((item) => item.id === id);

export default cartSlice.reducer;
