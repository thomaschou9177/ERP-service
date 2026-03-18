import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResultsPage = () => {
    const [filteredResults, setFilteredResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilteredData = async () => {
            // location.search contains the ?id=...&pn=... string
            const response = await axios.get(`http://localhost:8080/api/search${location.search}`);
            setFilteredResults(response.data);
        };
        fetchFilteredData();
    }, [location.search]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Filtered Results</h2>
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <table border="1" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th><th>PN</th><th>M Lot</th><th>Expired_Date</th><th>Cost</th>
                        <th>Stock_qt</th><th>Price</th><th>Sales_qt</th><th>Add_qt</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.pn}</td>
                            {/* Fix M Lot: checks both naming styles */}
                            <td>{p.mLot || p.m_lot || '-'}</td>
                            <td>{p.expiredDate || p.expired_date || '-'}</td>
                            <td>{p.cost || 0}</td>
                            {/* Fix Stock: checks both naming styles */}
                            <td>{p.stockQt || p.stock_qt || 0}</td>
                            <td>{p.price || 0}</td>
                            {/* Fix Sales and Add: renames to _qt and defaults to 0 */}
                            <td>{p.salesQt || p.sales_qt || 0}</td>
                            <td>{p.addQt || p.add_qt || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsPage;