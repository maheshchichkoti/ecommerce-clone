import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './components/ProductDetails'; // Assuming you'll create this
import Cart from './components/Cart'; // Assuming you'll create this
import Checkout from './components/Checkout'; // Assuming you'll create this
import './index.css'; // Import global styles
import { AuthProvider } from './contexts/AuthContext.jsx'; // Import AuthProvider
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<Home />} /> {/* Category route */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products/:id" element={<ProductDetails />} /> {/* Route for product details */}
              <Route path="/cart" element={<Cart />} /> {/* Route for cart */}
              <Route path="/checkout" element={<Checkout />} /> {/* Route for checkout */}
            </Routes>
          </div>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" /> {/* Add ToastContainer */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;