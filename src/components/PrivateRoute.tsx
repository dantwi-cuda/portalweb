// frontend/src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./ui/Loading";

const PrivateRoute: React.FC = () => {
  const { token, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading size="lg" />;
  }

  if (!token) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role for this route
  // This can be expanded based on route requirements
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
