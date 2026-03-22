import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], bill_details: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/api/cart/';

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id: productId })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'low product quantity') {
          alert('low product quantity');
        }
        return false;
      }
      await fetchCart();
      return true;
    } catch (err) {
      console.error('Add to cart failed', err);
      return false;
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const res = await fetch(`${API_URL}update/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product_id: productId, action })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'low product quantity') {
          alert('low product quantity');
        }
        return false;
      }
      await fetchCart();
      return true;
    } catch (err) {
      console.error('Update cart failed', err);
      return false;
    }
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find(i => i.product_id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ cart, loading, error, addToCart, updateQuantity, getItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
