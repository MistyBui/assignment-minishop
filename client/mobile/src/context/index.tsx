import React, { createContext, useContext, useState } from 'react';
import { CartContextType, CartItem, Product } from 'types';

interface Props {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.ean === product.ean);
    if (existingItem) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.ean === product.ean
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart(prevCart => [...prevCart, { product, quantity: 1 }]);
    }
  };

  const reduceFromCart = (product: Product) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.product.ean === product.ean
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const removeFromCart = (ean: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.ean !== ean));
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    reduceFromCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
