import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import mockProducts from '../mocks/mockProducts';
import { useParams, useSearchParams } from 'react-router-dom'; // Import useParams

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
  const [sortOption, setSortOption] = useState('default');
  const [searchParams, setSearchParams] = useSearchParams();

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

  // Sort products based on sortOption (memoized)
  const sortedProducts = React.useMemo(() => {
    let productsToSort = [...categoryFilteredProducts]; // Create a copy to avoid mutating original array
    switch (sortOption) {
      case 'price-low-to-high':
        productsToSort.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        productsToSort.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        productsToSort.sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt));
        break;
      default:
        break; // Default sorting (likely by API default or as fetched)
    }
    return productsToSort;
  }, [categoryFilteredProducts, sortOption]);

  // Update displayedProducts when categoryFilteredProducts or productCount changes
  useEffect(() => {
    setDisplayedProducts(categoryFilteredProducts.slice(0, productCount));
  }, [categoryFilteredProducts, productCount]);

  useEffect(() => {
    setDisplayedProducts(sortedProducts.slice(0, productCount));
  }, [sortedProducts, productCount]);
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

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setSearchParams({ sort: e.target.value }); // Update URL param
  };

  // Read sort option from URL on initial load
  useEffect(() => {
    const urlSortOption = searchParams.get('sort');
    if (urlSortOption) {
      setSortOption(urlSortOption);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-lg text-gray-600 animate-pulse">Loading amazing products for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-4 text-center">We're having trouble loading the products.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
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

      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-8"> {/* Added sorting dropdown container */}
        <div className="relative inline-block text-left">
          <select
            id="sort-by"
            className="block appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-500 text-gray-700 leading-tight"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Sort by Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="flex flex-wrap justify-center gap-8">
        {sortedProducts.length === 0 && searchTerm !== '' ? (
          <div className="text-center py-8 text-gray-600">
            <p>No products found matching your search term.</p>
          </div>
        ) : sortedProducts.length === 0 && categoryName ? (
          <div className="text-center py-8 text-gray-600">
            <p>Uh oh! 🙈  Looks like the shelves are empty in this category.</p>
            <p>Our hamsters are working hard to restock!</p>
            <p>Try another category or search for something else. 😉</p>
          </div>
        ) : sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {loadingMore && <div className="text-center py-4 text-gray-600">Loading more products...</div>} {/* "Loading more..." message */}
    </div>
  );
}

export default Home;
