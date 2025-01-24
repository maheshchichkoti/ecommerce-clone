import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, getCartTotal } = useCart(); // Use useCart hook to get cart and getCartTotal
  const total = getCartTotal(); // Calculate total from cart context
  const cartItems = cart; // Get cart items from context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? ( // Display message if cart is empty
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between p-2 border-b">
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        ))
      )}
      <h2 className="text-lg font-semibold mt-4">Total: ${total}</h2>
    </div>
  );
};

export default Cart;
