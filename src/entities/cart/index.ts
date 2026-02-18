export {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromo,
  removePromo,
  AVAILABLE_PROMO_CODES,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartDiscount,
  selectIsInCart,
  selectPromoCode,
  selectPromoPercent,
} from './model/cartSlice';

export { default as cartReducer } from './model/cartSlice';

export type { CartItem, CartState } from './model/types';
