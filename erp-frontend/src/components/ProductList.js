import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Product Inventory</h2>
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        {/* Headers in the exact Excel order */}
                        <th>ID</th>
                        <th>PN</th>
                        <th>M Lot</th>
                        <th>Expired Date</th>
                        <th>Cost</th>
                        <th>Stock Qt</th>
                        <th>Price</th>
                        <th>Sales Qt</th>
                        <th>Add Qt</th>
                    </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id || product.pn}>
                        {/* Use product.id if it exists, otherwise use PN as a backup key */}
                        <td>{product.id}</td>
                        <td>{product.pn}</td>
                        <td>{product.mLot}</td>
                        <td>{product.expiredDate}</td>
                        <td>${product.cost?.toFixed(2)}</td>
                        <td>{product.stockQt}</td>
                        <td>${product.price?.toFixed(2)}</td>
                        <td>{product.salesQt || 0}</td>
                        <td>{product.addQt || 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center' }}>No products found.</td>
                    </tr>
                  )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;