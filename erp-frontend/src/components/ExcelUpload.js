import React, { useState, useRef } from 'react';
import axios from 'axios';

const ExcelUpload = ({ onUploadSuccess }) => {
    const fileInputRef = useRef(null); // 用於引用隱藏的 input
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    // 當英文按鈕被點擊時，觸發隱藏的 input 點擊事件
    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setMessage(`Selected file: ${selectedFile.name}`); // 顯示選中的檔名
        }
    };

    const onUpload = async () => {
        if (!file) {
            setMessage("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setMessage(response.data.message);

            if (onUploadSuccess) {
                onUploadSuccess();
            }

            setFile(null); // 上傳成功後清空
        } catch (error) {
            setMessage("Upload failed: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>ERP Product Import</h3>

            {/* 1. 隱藏原始的 input，並移除原本多餘的 input 標籤 */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={onFileChange}
                accept=".xlsx, .xls"
            />

            {/* 2. 使用您的自定義英文按鈕 */}
            <button
                type="button"
                onClick={handleCustomButtonClick}
                style={{
                    marginRight: '10px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            >
                Choose Excel File
            </button>

            {/* 3. 上傳按鈕 */}
            <button
                onClick={onUpload}
                style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Upload to MySQL
            </button>

            {/* 顯示狀態訊息或檔名 */}
            {message && (
                <p style={{
                    marginTop: '10px',
                    color: message.includes('failed') || message.includes('Please') ? 'red' : 'green'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default ExcelUpload;