import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { APIpaths } from "../API";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("cart-items", []);
  const [loading, setLoading] = useState(true);

  const subTotal = cartItems.reduce(
    (accumulator, current) => accumulator + current.qty * current.price,
    0
  );
  const taxCost = subTotal * 0.13;
  const shippingCost = subTotal > 50 ? 0 : 20;
  const totalCost = subTotal + taxCost + shippingCost;

  async function addToCart(productId) {
    const existingItem = cartItems.find((item) => item._id === productId);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === productId
            ? { ...existingItem, qty: existingItem.qty + 1 }
            : item
        )
      );
    } else {
      try {
        const product = await axios.get(`${APIpaths.getOneItem}${productId}`);
        setCartItems([...cartItems, { ...product.data, qty: 1 }]);
        setLoading(false);
      } catch (error) {
        return;
      }
    }
  }

  function removeFromCart(productId) {
    const existingItem = cartItems.find((item) => item._id === productId);

    if (existingItem.qty === 1) {
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === productId
            ? { ...existingItem, qty: existingItem.qty - 1 }
            : item
        )
      );
    }
  }

  function clearCart() {
    setCartItems([]);
  }

  useEffect(() => {
    setCartItems(cartItems);
    setLoading(false);
  }, [cartItems, setCartItems]);

  const value = {
    cartItems,
    subTotal,
    taxCost,
    shippingCost,
    totalCost,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
}
