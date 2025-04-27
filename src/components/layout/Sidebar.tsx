import React from 'react';
import { Nav, Accordion } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import './Sidebar.css'; // For custom styling if needed

// Helper for NavLink className
const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "nav-link active" : "nav-link";
};


const Sidebar: React.FC = () => {
    // Use Accordion for expandable sections
    // defaultActiveKey="0" can be used to open one section by default
    return (
        <Nav className="flex-column bg-light sidebar p-3 vh-100" style={{position: 'sticky', top: '0'}}> {/* Sticky sidebar */}
            <Accordion flush /* alwaysOpen */ > {/* Use alwaysOpen if multiple sections can be open */}
                {/* --- Admin Menu --- */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Admin Menu</Accordion.Header>
                    <Accordion.Body className="p-0"> {/* Remove padding from body */}
                        <Nav className="flex-column ms-3"> {/* Indent sub-items */}
                            <NavLink to="/admin/customers" className={getNavLinkClass}>Maintain Customer</NavLink>
                            <NavLink to="/admin/programs" className={getNavLinkClass}>Maintain Programs</NavLink>
                            <NavLink to="/admin/workspaces" className={getNavLinkClass}>Maintain Workspaces</NavLink>
                            <NavLink to="/admin/reports" className={getNavLinkClass}>Maintain Reports</NavLink>
                            <NavLink to="/admin/report-categories" className={getNavLinkClass}>Maintain Report Categories</NavLink>
                            <NavLink to="/admin/users" className={getNavLinkClass}>Maintain Users</NavLink>
                            <NavLink to="/admin/locations" className={getNavLinkClass}>Maintain Location</NavLink>
                        </Nav>
                    </Accordion.Body>
                </Accordion.Item>

                {/* --- Shop Information --- */}
                 <Accordion.Item eventKey="1">
                    <Accordion.Header>Shop Information</Accordion.Header>
                    <Accordion.Body className="p-0">
                        <Nav className="flex-column ms-3">
                            <NavLink to="/shop/properties" className={getNavLinkClass}>Maintain Shop Properties</NavLink>
                            <NavLink to="/shop/kpi" className={getNavLinkClass}>Maintain Shop KPI</NavLink>
                        </Nav>
                     </Accordion.Body>
                </Accordion.Item>

                 {/* --- Accounting --- */}
                 <Accordion.Item eventKey="2">
                     <Accordion.Header>Accounting</Accordion.Header>
                     <Accordion.Body className="p-0">
                        <Nav className="flex-column ms-3">
                            <NavLink to="/accounting/coa" className={getNavLinkClass}>Chart of Accounts</NavLink>
                            <NavLink to="/accounting/upload-gl" className={getNavLinkClass}>Upload General Ledger</NavLink>
                        </Nav>
                     </Accordion.Body>
                </Accordion.Item>

                {/* --- Subscription --- */}
                <Accordion.Item eventKey="3">
                     <Accordion.Header>Subscription</Accordion.Header>
                     <Accordion.Body className="p-0">
                        <Nav className="flex-column ms-3">
                             <NavLink to="/subscription/maintain" className={getNavLinkClass}>Maintain Subscriptions</NavLink>
                             <NavLink to="/subscription/add" className={getNavLinkClass}>Add Subscriptions</NavLink>
                        </Nav>
                     </Accordion.Body>
                </Accordion.Item>

                {/* --- Reports --- */}
                 <Accordion.Item eventKey="4">
                    <Accordion.Header>Reports</Accordion.Header>
                     <Accordion.Body className="p-0">
                        <Nav className="flex-column ms-3">
                            {/* Add specific report links here if needed, otherwise just the category */}
                            <NavLink to="/reports/view" className={getNavLinkClass}>View Reports</NavLink>
                        </Nav>
                    </Accordion.Body>
                </Accordion.Item>

                 {/* Simple NavLink for Dashboard */}
                 <NavLink to="/" className={getNavLinkClass}>Dashboard</NavLink>

            </Accordion>
        </Nav>
    );
};

export default Sidebar;