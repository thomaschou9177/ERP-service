import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ExcelUpload from './ExcelUpload';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import '../App.css';

const Dashboard = ({ onLogout }) => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        const res = await axios.get('http://localhost:8080/api/products');
        setProducts(res.data);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? date.toISOString().split('T')[0] : '';
        setFilters({ ...filters, expired_date: formattedDate });
    };

    const handleJumpToResults = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(filters).toString();
        navigate(`/results?${query}`);
    };

    return (
        <div className="dashboard-wrapper">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Product Management Center</h2>
                <button onClick={onLogout} style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </header>

            {/* PART 1: EXCEL UPDATE */}
            <div className="dashboard-card">
                <h3>1. Update Inventory via Excel</h3>
                <ExcelUpload onUploadSuccess={fetchInitialData} />
            </div>

            {/* PART 2: FILTER PRODUCT */}
            <div className="dashboard-card">
                <h3>2. Search & Filter</h3>
                <form onSubmit={handleJumpToResults} className="filter-grid">
                    <input name="id" placeholder="ID" onChange={handleFilterChange} />
                    <input name="pn" placeholder="Part Number" onChange={handleFilterChange} />
                    <input name="m_lot" placeholder="M_Lot" onChange={handleFilterChange} />

                    <DatePicker
                        selected={filters.expired_date ? new Date(filters.expired_date) : null}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="yyyy/mm/dd"
                    />

                    <input name="cost" placeholder="Cost" onChange={handleFilterChange} />
                    <input name="stock_qt" placeholder="Stock Quantity" onChange={handleFilterChange} />
                    <input name="price" placeholder="Price" onChange={handleFilterChange} />
                    <input name="sales_qt" placeholder="sales_qt" onChange={handleFilterChange} />
                    <input name="add_qt" placeholder="add_qt" onChange={handleFilterChange} />

                    <button type="submit" className="search-button">
                        Apply Filters & Jump to Results
                    </button>
                </form>
            </div>

            {/* PART 3: PRODUCT TABLE */}
            <div className="dashboard-card" style={{ overflowX: 'auto' }}>
                <h3>3. Live Inventory Overview</h3>
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>PN</th><th>M_Lot</th><th>Expired Date</th>
                            <th>Cost</th><th>Stock</th><th>Price</th><th>Sales_qt</th><th>Add_qt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.pn}</td>
                                <td>{p.mLot || p.m_lot}</td>
                                <td>{p.expiredDate || p.expired_date}</td>
                                <td>{p.cost}</td>
                                <td>{p.stockQt || p.stock_qt}</td>
                                <td>{p.price}</td>
                                <td>{p.salesQt || p.sales_qt || 0}</td>
                                <td>{p.addQt || p.add_qt || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;