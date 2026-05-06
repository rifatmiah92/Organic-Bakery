import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext({
  cart: [],
  saved: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  addToSaved: (item) => {},
  removeFromSaved: (id) => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('bakery_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [saved, setSaved] = useState(() => {
    const savedItems = localStorage.getItem('bakery_saved');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bakery_saved', JSON.stringify(saved));
  }, [saved]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        toast.success(`Another ${item.title} added to basket`);
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`${item.title} added to basket`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast.success('Item removed from basket');
  };

  const addToSaved = (item) => {
    setSaved((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        toast.error('Item already in saved list');
        return prev;
      }
      toast.success(`${item.title} saved for later`);
      return [...prev, item];
    });
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((i) => i.id !== id));
    toast.success('Item removed from saved');
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      saved, 
      addToCart, 
      removeFromCart, 
      addToSaved, 
      removeFromSaved,
      clearCart,
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
