import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "./layout/Layout";
import CustomerListPage from "./pages/CustomerListPage";

const MainPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  // If user is global admin and viewing customer list, render it directly
  if (user?.role === "admin" && window.location.pathname === "/customers") {
    return <CustomerListPage />;
  }

  // Otherwise render the main layout with navigation
  return <Layout />;
};

export default MainPage;
