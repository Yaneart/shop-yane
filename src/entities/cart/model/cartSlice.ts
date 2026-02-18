import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import type { CartItem, CartState } from './types';

const STORAGE_KEY = 'cart';

const PROMO_CODES: Record<string, number> = {
  YANE10: 10,
  YANE20: 20,
  SALE15: 15,
};

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
  promoCode: null,
  promoPercent: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<
        Omit<CartItem, 'quantity'> & { quantity?: number }
      >,
    ) {
      const { quantity = 1, ...rest } = action.payload;
      const existing = state.items.find((item) => item.id === rest.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...rest, quantity });
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
      state.promoCode = null;
      state.promoPercent = 0;
    },
    applyPromo(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase().trim();
      const percent = PROMO_CODES[code];
      if (percent) {
        state.promoCode = code;
        state.promoPercent = percent;
      }
    },
    removePromo(state) {
      state.promoCode = null;
      state.promoPercent = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromo,
  removePromo,
} = cartSlice.actions;

export const AVAILABLE_PROMO_CODES = PROMO_CODES;

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

export const selectPromoCode = (state: RootState) => state.cart.promoCode;
export const selectPromoPercent = (state: RootState) => state.cart.promoPercent;

export default cartSlice.reducer;
