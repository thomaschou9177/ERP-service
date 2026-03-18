import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // FIX: Define the logout function
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    !isAuthenticated ?
                    <Login onLoginSuccess={() => setIsAuthenticated(true)} /> :
                    <Navigate replace to="/dashboard" />
                } />

                <Route path="/dashboard" element={
                    isAuthenticated ?
                    <Dashboard onLogout={handleLogout} /> :
                    <Navigate replace to="/" />
                 } />

                <Route path="/results" element={
                    isAuthenticated ? <ResultsPage /> : <Navigate replace to="/" />
                } />
            </Routes>
        </Router>
    );
}

export default App;