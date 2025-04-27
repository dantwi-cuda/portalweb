// frontend/src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRoute: React.FC = () => {
  const { token, isLoading } = useAuth(); // isLoading might be checked earlier now

  // If AppContent already handles global loading, this might be redundant
  // or could be a secondary check.
  if (isLoading) {
    // Or return null if AppContent handles the main loader
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
             <Spinner animation="border" role="status">
                <span className="visually-hidden">Checking Authentication...</span>
            </Spinner>
        </div>
    );
  }

  // If authenticated, render the nested routes via Outlet.
  // The nested routes will then decide between CustomerList or Layout.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;