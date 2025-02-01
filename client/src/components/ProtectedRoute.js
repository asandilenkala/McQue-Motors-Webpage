import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    return admin && admin.role === 'Admin' ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
