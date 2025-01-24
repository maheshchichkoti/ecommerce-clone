import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();
  const navigate = useNavigate(); // Initialize useNavigate
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login if no currentUser
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    // Render nothing or a message while redirecting, or keep showing "cart empty" message
    return null; // Or return <div>Redirecting to login...</div>;
  }

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!", { // Use toast.success
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    clearCart();
    // Optionally redirect to order confirmation page later
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] p-8 bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="animate-fadeIn text-gray-400 mb-6">
          <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our amazing products!
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Checkout</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h3>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                  <div className="flex items-center">
                    <img src={item.images?.[0]} alt={item.title} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-600 text-sm">Quantity: 1</p> {/* Assuming quantity is always 1 for now */}
                    </div>
                  </div>
                  <span className="font-semibold">${(item.price * 1).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between font-semibold text-xl text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information and Place Order Section */}
        <div className="lg:w-1/3">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Information</h3>
          <div className="bg-white shadow-md rounded-lg p-6">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Shipping Address
                </label>
                <textarea
                  id="address"
                  className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="Your Address"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="City"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="zip"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="Zip Code"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
