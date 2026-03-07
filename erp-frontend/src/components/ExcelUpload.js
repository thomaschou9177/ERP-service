import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onUpload = async () => {
        if (!file) {
            setMessage("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // This "file" key must match @RequestParam("file") in Java

        try {
            const response = await axios.post('http://localhost:8080/api/products/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Upload failed: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>ERP Product Import</h3>
            <input type="file" onChange={onFileChange} accept=".xlsx, .xls" />
            <button onClick={onUpload} style={{ marginLeft: '10px' }}>Upload to MySQL</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ExcelUpload;