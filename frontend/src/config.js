import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../src/contexts/AuthContext';

export const API_URL = 'http://localhost:5000';

// src/components/routing/PrivateRoute.js


const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;