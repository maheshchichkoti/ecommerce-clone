import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import mockProducts from '../mocks/mockProducts';
import { useParams } from 'react-router-dom'; // Import useParams

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { categoryName } = useParams();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const initialProductCount = 6;
  const productsPerPage = 3;
  const [loadingMore, setLoadingMore] = useState(false);
  const [productCount, setProductCount] = useState(initialProductCount);

  // Fetch products only once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array: fetch only once

  // Filter products based on searchTerm
  const filteredProducts = React.useMemo(() => { // Use useMemo for performance optimization
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]); // Re-calculate when products or searchTerm changes


  // Filter products based on categoryName
  const categoryFilteredProducts = React.useMemo(() => { // Use useMemo for performance optimization
    return categoryName
      ? filteredProducts.filter(product =>
        product.category.name.toLowerCase() === categoryName
      )
      : filteredProducts;
  }, [filteredProducts, categoryName]); // Re-calculate when filteredProducts or categoryName changes


  // Update displayedProducts when categoryFilteredProducts or productCount changes
  useEffect(() => {
    setDisplayedProducts(categoryFilteredProducts.slice(0, productCount));
  }, [categoryFilteredProducts, productCount]);

  // Infinite scroll logic (remains the same)
  useEffect(() => {
    const handleScroll = () => {
      if (loading || loadingMore || categoryFilteredProducts.length <= displayedProducts.length) {
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 200) {
        setLoadingMore(true);
        setTimeout(() => {
          setProductCount(prevCount => prevCount + productsPerPage);
          setLoadingMore(false);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadingMore, displayedProducts.length, categoryFilteredProducts.length, productsPerPage]);


  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading products.</div>;
  }

  return (
    <div className="py-4 px-4 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h2 className="text-center text-2xl font-bold mb-4">Home</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for products..."
          className="border border-gray-300 rounded-full px-5 py-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all text-gray-700 text-sm sm:text-base"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {/* Product Listing */}
      <div className="flex flex-wrap justify-center gap-8">
        {categoryFilteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p>Uh oh! 🙈  Looks like the shelves are empty in this section.</p>
            <p>Our hamsters are working hard to restock!</p>
            <p>Try another category or search for something else. 😉</p>
          </div>
        ) : (
          categoryFilteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      {loadingMore && <div className="text-center py-4 text-gray-600">Loading more products...</div>} {/* "Loading more..." message */}
    </div>
  );
}

export default Home;
