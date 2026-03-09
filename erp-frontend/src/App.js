import React, { useState, useEffect } from 'react';
import './App.css';
import ExcelUpload from './components/ExcelUpload';
import ProductList from './components/ProductList';
import axios from 'axios'; // Ensure you have axios installed: npm install axios

function App() {
  const [products, setProducts] = useState([]);

  // Function to fetch products from your backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products'); // Update with your actual API URL
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERP Inventory System</h1>
      </header>
      <main>
        {/* Pass the refresh function to the uploader so it updates the list after upload */}
        <ExcelUpload onUploadSuccess={fetchProducts} />

        <hr />

        {/* Pass the actual products array to the list component */}
        <ProductList products={products} />
      </main>
    </div>
  );
}

export default App;