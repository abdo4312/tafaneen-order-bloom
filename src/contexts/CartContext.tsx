import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { supabase } from '@/integrations/supabase/client';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  cartCount: number;
  addToCart?: (item: Omit<CartItem, 'quantity'>) => void; // alias for backward compatibility
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = async (newItem: Omit<CartItem, 'quantity'>, quantityToAdd: number = 1) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + (quantityToAdd || 1) }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: quantityToAdd || 1 }];
    });

    // Track the sale in the database
    // try {
    //   await supabase.rpc('increment_product_sales', {
    //     p_product_id: newItem.id,
    //     p_product_name: newItem.name,
    //     p_product_price: newItem.price,
    //     p_product_image: newItem.image || null
    //   });
    // } catch (error) {
    //   console.error('Error tracking sale:', error);
    //   // Don't prevent adding to cart if tracking fails
    // }
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const itemCount = getItemCount();

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      addToCart: addItem, // alias for backward compatibility
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getItemCount,
      cartCount: itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}