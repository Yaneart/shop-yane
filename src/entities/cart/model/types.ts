export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
