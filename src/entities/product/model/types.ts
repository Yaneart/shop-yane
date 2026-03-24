export interface Product {
  id: number;
  name: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  category: string;
  sizes: string[];
  stock: number;
}
