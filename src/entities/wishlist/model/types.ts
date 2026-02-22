export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
}

export interface WishlistState {
  items: WishlistItem[];
}
