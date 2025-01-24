import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/productAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '../contexts/CartContext';
import 'swiper/css';
import Reviews from './Reviews';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
        console.log(data)
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-4xl font-bold text-blue-600 mb-4 animate-bounce">
          Shopi
          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-0.5 animate-pulse"></span>
        </div>
        <div className="w-12 h-0.5 bg-blue-600/30 animate-pulse"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600">We couldn't find the product you're looking for.</p>
      </div>
    );
  }

  // Parse the images array properly since it's coming as a string
  const processedImages = product.images?.map(img => {
    try {
      return JSON.parse(img)[0];
    } catch {
      return img;
    }
  }) || [];



  const handleAddToCart = () => {
    addToCart(product); // Call addToCart when the button is clicked
    alert(`${product.title} added to cart!`); // Optional: Provide feedback
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="p-6 bg-gray-50">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="rounded-lg overflow-hidden aspect-square"
            >
              {processedImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={image || 'https://via.placeholder.com/600x600'}
                      alt={`${product.title} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Information */}
          <div className="p-8 flex flex-col">
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-sm text-gray-500">
                  Added {new Date(product.creationAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-1">
                  ${product.price.toLocaleString()}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "No description available"}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                <p className="text-gray-600">
                  {product.category?.name || "Uncategorized"}
                </p>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="border-t pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section - Add Reviews component here */}
        <Reviews productId={Number(id)} /> {/* Pass productId to Reviews component */}
      </div>
    </div>
  );
}

export default ProductDetails;
