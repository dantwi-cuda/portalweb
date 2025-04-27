import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
// Import New Components
import Layout from './components/layout/Layout'; // Main app layout
import DashboardPage from './components/pages/DashboardPage'; // Dashboard content
import CustomerListPage from './components/pages/CustomerListPage'; // List for super admins
import PrivateRoute from './components/PrivateRoute'; // Keep PrivateRoute as is initially
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

// --- Placeholder Components for Sidebar Links ---
// Create simple placeholders or real components later
const PlaceholderComponent: React.FC<{ title: string }> = ({ title }) => (
  <div>
    <h3>{title}</h3>
    <p>Content for {title} goes here.</p>
  </div>
);

const MaintainCustomers: React.FC = () => <PlaceholderComponent title="Maintain Customers" />;
const MaintainPrograms: React.FC = () => <PlaceholderComponent title="Maintain Programs" />;
// ... create placeholders for ALL sidebar links ...
const ChartOfAccounts: React.FC = () => <PlaceholderComponent title="Chart of Accounts" />;
const ViewReports: React.FC = () => <PlaceholderComponent title="View Reports" />;
const UserProfile: React.FC = () => <PlaceholderComponent title="User Profile" />;
const ChangePassword: React.FC = () => <PlaceholderComponent title="Change Password" />;
 // ... and so on for every link in Sidebar.tsx


// Helper component to decide main view after login
const MainAppView = () => {
    const { isSuperAdmin } = useAuth();

    if (isSuperAdmin) {
        // Render the Customer List page directly (doesn't use the main Layout)
        return <CustomerListPage />;
    } else {
        // Render the main application Layout which includes Header, Sidebar, and Outlet
        return <Layout />;
        
    }
};


function AppContent() {
    const { token, isLoading } = useAuth(); // Get loading state

    if (isLoading) {
        // Show a full-page loader during initial auth check
         return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading Application...</span>
                </Spinner>
            </div>
         );
    }

    return (
        <Router>
            <Routes>
                {/* Public Route: Login Page */}
                <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />

                {/* Protected Routes */}
                <Route path="/" element={<PrivateRoute />}>
                    {/* This Outlet renders based on login status */}

                     {/* MainAppView decides between Customer List or Layout */}
                     <Route path="/" element={<MainAppView />}>
                        {/* --- Nested routes INSIDE the Layout component --- */}
                        {/* These only render if !isSuperAdmin */}
                        <Route index element={<DashboardPage />} /> {/* Dashboard at '/' */}

                        {/* Admin Menu Routes */}
                        <Route path="admin/customers" element={<MaintainCustomers />} />
                        <Route path="admin/programs" element={<MaintainPrograms />} />
                        {/* ... other admin routes */}

                        {/* Shop Info Routes */}
                         <Route path="shop/properties" element={<PlaceholderComponent title="Maintain Shop Properties"/>} />
                        <Route path="shop/kpi" element={<PlaceholderComponent title="Maintain Shop KPI"/>} />

                        {/* Accounting Routes */}
                        <Route path="accounting/coa" element={<ChartOfAccounts />} />
                        <Route path="accounting/upload-gl" element={<PlaceholderComponent title="Upload General Ledger"/>} />

                        {/* Subscription Routes */}
                         <Route path="subscription/maintain" element={<PlaceholderComponent title="Maintain Subscriptions"/>} />
                         <Route path="subscription/add" element={<PlaceholderComponent title="Add Subscriptions"/>} />

                        {/* Reports Route */}
                        <Route path="reports/view" element={<ViewReports />} />

                        {/* User Profile Routes (from header dropdown) */}
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="change-password" element={<ChangePassword />} />

                         {/* --- Add routes for ALL items in Sidebar.tsx --- */}

                     </Route> {/* End of MainAppView routes */}

                </Route> {/* End of PrivateRoute */}

                {/* Optional Catch-all */}
                <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
            </Routes>
        </Router>
    );
}


function App() {
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
}

export default App;