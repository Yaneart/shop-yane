import { configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { cartReducer } from '@entities/cart';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

let previousItems = store.getState().cart.items;
store.subscribe(() => {
  const currentItems = store.getState().cart.items;
  if (currentItems !== previousItems) {
    previousItems = currentItems;
    localStorage.setItem('cart', JSON.stringify(currentItems));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
