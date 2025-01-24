import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getCategories } from "../api/productAPI";
import Cart from "./Cart";
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { getItemCount, getCartTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMoreCategoriesOpen, setIsMoreCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const itemCount = getItemCount();
  const total = getCartTotal();
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsMoreCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      setIsProfileMenuOpen(false); // Close profile menu after logout
    } catch (firebaseError) {
      setError(firebaseError.message);
      console.error("Logout error:", firebaseError.message);
    }
  };
  const [error, setError] = useState('');

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-2 sm:px-6 py-3">
          {/* Logo and Categories */}
          <div className="flex items-center space-x-2 sm:space-x-8">
            <Link to="/" className="font-bold text-xl text-gray-800">
              Shopi
            </Link>

            {/* Categories */}
            <ul className="flex space-x-3 sm:space-x-4 text-gray-600">
              <li>
                <Link to="/" className="hover:underline text-base sm:text-lg">
                  All
                </Link>
              </li>
              {categories.slice(0, 3).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}
                    className="hover:underline text-base sm:text-lg"
                    onClick={() => setIsMoreCategoriesOpen(false)} // Close dropdown on click
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {categories.length > 3 && (
                <li className="relative" ref={dropdownRef}>
                  <button
                    className="hover:underline text-base sm:text-lg focus:outline-none"
                    onClick={() =>
                      setIsMoreCategoriesOpen(!isMoreCategoriesOpen)
                    }
                  >
                    More
                  </button>
                  {isMoreCategoriesOpen && (
                    <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                      {categories.slice(3).map((category) => (
                        <li key={category.id}>
                          <Link
                            to={`/category/${category.name.toLowerCase()}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsMoreCategoriesOpen(false)} // Close dropdown on click
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button
              className="md:hidden text-gray-600 hover:text-gray-800 text-2xl"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <i className="fas fa-user-circle"></i>
            </button>

            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? ( // Show user info and logout if logged in
                <>
                  <span className="text-gray-600 text-sm lg:text-lg">{currentUser.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:underline text-sm lg:text-lg px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    Log Out
                  </button>
                </>
              ) : ( // Show Login/Signup links if logged out
                <>
                  <Link to="/login" className="text-gray-600 hover:underline text-sm lg:text-lg px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200">
                    Log In
                  </Link>
                  <Link to="/signup" className="text-gray-600 hover:underline text-sm lg:text-lg px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200">
                    Sign Up
                  </Link>
                </>
              )}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-600 hover:text-gray-800"
              >
                <i className="fas fa-shopping-cart text-2xl"></i>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 transform translate-x-2 translate-y-[-50%]">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Dropdown for Smaller Screens */}
        {isProfileMenuOpen && (
          <div className="absolute top-16 right-6 w-64 bg-white border rounded-lg shadow-lg z-50">
            <ul className="flex flex-col divide-y divide-gray-200 text-gray-700">
              {currentUser ? (
                <>
                  {/* User Information */}
                  <li className="px-4 py-3">
                    <span className="block text-sm font-medium text-gray-800">
                      {currentUser.email}
                    </span>
                    <span className="block text-xs text-gray-500">Logged in</span>
                  </li>

                  {/* Logout Option */}
                  <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 text-gray-600 focus:outline-none hover:text-gray-800"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="text-sm">Log Out</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Login Option */}
                  <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                    <Link
                      to="/login"
                      className="w-full flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      <span className="text-sm">Log In</span>
                    </Link>
                  </li>

                  {/* Sign Up Option */}
                  <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                    <Link
                      to="/signup"
                      className="w-full flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                    >
                      <i className="fas fa-user-plus"></i>
                      <span className="text-sm">Sign Up</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Cart Option */}
              <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full flex items-center space-x-2 text-gray-600 focus:outline-none hover:text-gray-800"
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span className="text-sm">
                    Cart <span className="font-semibold">({itemCount})</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        )}

      </nav>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          backgroundColor: isCartOpen ? "rgba(0, 0, 0, 0.3)" : "transparent",
          pointerEvents: isCartOpen ? "all" : "none",
        }}
        onClick={() => setIsCartOpen(false)}
      >
        <div
          className={`bg-white w-full md:w-1/3 h-full shadow-lg transform transition-transform duration-500 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold">My Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              &#x2715;
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-120px)] px-6 py-4">
            <Cart />
          </div>
          <div className="sticky bottom-0 bg-white p-6 border-t shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={() => {
                  setIsCartOpen(false); // Close the cart drawer
                  navigate('/checkout'); // Navigate to the checkout page
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;