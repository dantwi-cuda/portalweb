import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./components/LoginPage";
import Layout from "./components/layout/Layout";
import DashboardPage from "./components/pages/DashboardPage";
import CustomerListPage from "./components/pages/CustomerListPage";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/ui/Loading";

// Lazy load other pages
const MainAppView = React.lazy(() => import("./components/MainPage"));

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <MainAppView />
              </Suspense>
            }
          >
            {/* Default route */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard */}
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Admin and Customer-Admin only routes */}
            <Route path="customers" element={<CustomerListPage />} />

            {/* Add other protected routes here */}
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
