export {
  toggleWishlist,
  removeFromWishlist,
  selectWishlistItems,
  selectWishlistCount,
  selectIsInWishlist,
} from './model/wishlistSlice';

export { default as wishlistReducer } from './model/wishlistSlice';

export type { WishlistItem, WishlistState } from './model/types';
