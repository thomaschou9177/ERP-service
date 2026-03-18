import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [filters, setFilters] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(filters).toString();
        navigate(`/results?${params}`); // This "jumps" to the results page
    };

    return (
        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input name="id" placeholder="ID" onChange={handleChange} />
            <input name="pn" placeholder="Part Number (PN)" onChange={handleChange} />
            <input name="mLot" placeholder="M_Lot" onChange={handleChange} />
            <input name="expiredDate" type="date" onChange={handleChange} />
            <input name="cost" type="number" step="0.01" placeholder="Cost" onChange={handleChange} />
            <input name="stockQt" type="number" placeholder="Stock Quantity" onChange={handleChange} />
            <input name="price" type="number" step="0.01" placeholder="Price" onChange={handleChange} />
            <input name="salesQt" type="number" placeholder="Sales Quantity" onChange={handleChange} />
            <input name="addQt" type="number" placeholder="Add Quantity" onChange={handleChange} />
            <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
                Search & View Results
            </button>
        </form>
    );
};

export default SearchForm;