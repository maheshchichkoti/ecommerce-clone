import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const imageUrl = product.images?.length
    ? product.images[0]
    : 'https://via.placeholder.com/400x300';

  const { addToCart } = useCart(); // Use the useCart hook to get addToCart function

  const handleAddToCart = () => {
    addToCart(product); // Call addToCart when the button is clicked
    alert(`${product.title} added to cart!`); // Optional: Provide feedback to the user
  };


  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4 shadow-md w-60 hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="w-full relative">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-40 object-cover mb-4 rounded-md hover:scale-105 transition-transform duration-300"
        />
        {/* Badge for Promotions */}
        {product.isOnSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            Sale
          </span>
        )}
      </Link>

      {/* Product Details */}
      <h3 className="text-md font-semibold text-gray-800 mb-2 text-center">{product.title}</h3>
      <p className="text-gray-600 text-lg font-bold">${product.price}</p>

      {/* Add to Cart Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 mt-4 w-full hover:scale-105"
        title="Add to Cart"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>

  );
}

export default ProductCard;
