export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  size?: string;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoPercent: number;
}
