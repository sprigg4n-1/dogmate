'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { DogProductCartProps } from '@/types/types';

interface CartContextType {
  products: DogProductCartProps[];
  addToCart: (product: DogProductCartProps) => void;
  removeFromCart: (id: number) => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<DogProductCartProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = (product: DogProductCartProps) => {
    const existingProduct = products.find((item) => item.id === product.id);

    let newArr = [];

    if (existingProduct) {
      if (existingProduct.isAvailable) {
        existingProduct.count += product.count;
      }
      newArr = [...products];
    } else {
      newArr = [...products, { ...product }];
    }

    setProducts(newArr);
  };

  const removeFromCart = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  };

  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        totalAmount,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
