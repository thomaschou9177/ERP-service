import React, { useState, useEffect } from 'react';
import './App.css';
import ExcelUpload from './components/ExcelUpload';
import ProductList from './components/ProductList';
import Login from './components/Login';
import axios from 'axios'; // Ensure you have axios installed: npm install axios

function App() {
  // 1. Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [products, setProducts] = useState([]);

  // 2. Watch for changes in login status and update localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear storage on logout
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <h1>ERP Inventory System</h1>
        <button onClick={handleLogout} style={{ margin: '20px' }}>Logout</button>
      </header>
      <main>
        <ExcelUpload onUploadSuccess={fetchProducts} />
        <hr />
        <ProductList products={products} />
      </main>
    </div>
  );
}

export default App;