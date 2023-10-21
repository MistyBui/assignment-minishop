import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from '../types';

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.products.find(item => item.product.ean === action.payload.ean);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({ product: action.payload, quantity: 1 });
      }
    },

    reduceFromCart: (state, action: PayloadAction<string>) => {
      const item = state.products.find(item => item.product.ean === action.payload);

      if (item) {
        item.quantity -= 1;

        if (item.quantity === 0) {
          // Remove the item if quantity becomes 0
          state.products = state.products.filter(cartItem => cartItem !== item);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(item => item.product.ean !== action.payload);
    },

    clearCart: state => {
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
