import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminToken'); // Check if admin is logged in

    return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
