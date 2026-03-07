import React from 'react';
import './App.css';
import ExcelUpload from './components/ExcelUpload'; // Import your new component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ERP Inventory System</h1>
      </header>
      <main>
        <ExcelUpload />
      </main>
    </div>
  );
}

export default App;