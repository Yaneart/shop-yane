import { configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { cartReducer } from '@entities/cart';
import { wishlistReducer } from '@entities/wishlist';
import { filterReducer } from '@features/catalo-filter';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    filter: filterReducer,
  },
});

let previousCart = store.getState().cart.items;
let previousWishlist = store.getState().wishlist.items;
store.subscribe(() => {
  const state = store.getState();
  if (state.cart.items !== previousCart) {
    previousCart = state.cart.items;
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  }
  if (state.wishlist.items !== previousWishlist) {
    previousWishlist = state.wishlist.items;
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist.items));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
