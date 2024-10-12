// private/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/api/login" />;
};

export default PrivateRoute;