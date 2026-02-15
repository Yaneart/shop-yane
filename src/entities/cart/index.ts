export {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartDiscount,
  selectIsInCart,
} from './model/cartSlice';

export { default as cartReducer } from './model/cartSlice';

export type { CartItem, CartState } from './model/types';
