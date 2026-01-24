"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: string;
  slug: string;
  name: string;
  label: string;
  shortDescription: string;
  imageUrl: string;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, 'addedAt'>) => boolean;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nridesikart-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setItems(parsed.map((item: CartItem) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      if (items.length > 0) {
        localStorage.setItem('nridesikart-cart', JSON.stringify(items));
      } else {
        localStorage.removeItem('nridesikart-cart');
      }
    }
  }, [items, isHydrated]);

  const addItem = (item: Omit<CartItem, 'addedAt'>): boolean => {
    const exists = items.find(i => i.id === item.id);
    if (exists) {
      return false; // Item already in cart
    }
    
    const newItem: CartItem = {
      ...item,
      addedAt: new Date()
    };
    
    setItems(prev => [...prev, newItem]);
    return true; // Successfully added
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (id: string): boolean => {
    return items.some(item => item.id === id);
  };

  const count = items.length;

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
