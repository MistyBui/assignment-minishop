export type Product = {
  name: string;
  ean: string;
  imageUrl: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface CartState {
  products: CartItem[];
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  reduceFromCart: (product: Product) => void;
  removeFromCart: (ean: string) => void;
  clearCart: () => void;
};

export interface OrderCard {
  orderId: string;
  timestamp: string;
  totalSum: number;
}
