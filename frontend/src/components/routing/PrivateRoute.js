import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div style={{ margin: '2rem auto', maxWidth: 600 }}>
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '1.5rem',
          borderRadius: '8px',
          textAlign: 'center',
          fontWeight: 500
        }}>
          Not authorized to access this route
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
