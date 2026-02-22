import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import type { WishlistItem, WishlistState } from './types';

const STORAGE_KEY = 'wishlist';

const loadWishlist = (): WishlistItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const initialState: WishlistState = {
  items: loadWishlist(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistCount = (state: RootState) =>
  state.wishlist.items.length;

export const selectIsInWishlist = (id: number) => (state: RootState) =>
  state.wishlist.items.some((i) => i.id === id);

export default wishlistSlice.reducer;
