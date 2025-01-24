import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/productAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '../contexts/CartContext';
import 'swiper/css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error('Error fetching product details:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading product details.
      </div>
    );
  }

  const imageUrl = product.images?.length
    ? product.images[0]
    : 'https://via.placeholder.com/600x400';


  const { addToCart } = useCart(); // Use the useCart hook

  const handleAddToCart = () => {
    addToCart(product); // Call addToCart when the button is clicked
    alert(`${product.title} added to cart!`); // Optional: Provide feedback
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image Carousel */}
        <div>
          <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}>
            {product.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index}`}
                  className="w-full rounded-lg shadow-md object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">{product.title}</h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <p className="text-3xl font-semibold text-blue-600 mb-6">
            ${product.price.toLocaleString()}
          </p>

          {/* Add to Cart Button */}
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 shadow-lg transition-transform transform hover:scale-105 w-full"
            title="Add to Cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
