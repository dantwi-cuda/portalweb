import React from "react";
import { Nav, Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Sidebar.css";

const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return `nav-link ${isActive ? "active" : ""}`;
};

const Sidebar = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Nav
      className="flex-column bg-light sidebar p-3 vh-100"
      style={{ position: "sticky", top: "0" }}
    >
      {/* Dashboard - Always visible */}
      <NavLink to="/dashboard" className={getNavLinkClass}>
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </NavLink>

      {/* Admin Menu - Only for admin users */}
      {isAdmin && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <i className="bi bi-gear me-2"></i>
              Administration
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <Nav className="flex-column ms-3">
                <NavLink to="/admin/customers" className={getNavLinkClass}>
                  Manage Customers
                </NavLink>
                <NavLink to="/admin/users" className={getNavLinkClass}>
                  Manage Users
                </NavLink>
                <NavLink to="/admin/workspaces" className={getNavLinkClass}>
                  Manage Workspaces
                </NavLink>
                <NavLink to="/admin/reports" className={getNavLinkClass}>
                  Manage Reports
                </NavLink>
                <NavLink
                  to="/admin/report-categories"
                  className={getNavLinkClass}
                >
                  Report Categories
                </NavLink>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}

      {/* Customer Admin and User Menus */}
      {!isAdmin && (
        <>
          {/* Reports Section */}
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="bi bi-file-text me-2"></i>
                Reports
              </Accordion.Header>
              <Accordion.Body className="p-0">
                <Nav className="flex-column ms-3">
                  <NavLink to="/reports/view" className={getNavLinkClass}>
                    View Reports
                  </NavLink>
                  {user?.role === "customer-admin" && (
                    <NavLink to="/reports/manage" className={getNavLinkClass}>
                      Manage Reports
                    </NavLink>
                  )}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>

            {/* Customer Admin Only Sections */}
            {user?.role === "customer-admin" && (
              <>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <i className="bi bi-shop me-2"></i>
                    Shop Management
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <Nav className="flex-column ms-3">
                      <NavLink
                        to="/shop/properties"
                        className={getNavLinkClass}
                      >
                        Shop Properties
                      </NavLink>
                      <NavLink to="/shop/kpi" className={getNavLinkClass}>
                        Shop KPIs
                      </NavLink>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <i className="bi bi-people me-2"></i>
                    User Management
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <Nav className="flex-column ms-3">
                      <NavLink to="/users/manage" className={getNavLinkClass}>
                        Manage Users
                      </NavLink>
                      <NavLink to="/users/roles" className={getNavLinkClass}>
                        User Roles
                      </NavLink>
                    </Nav>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )}
          </Accordion>
        </>
      )}
    </Nav>
  );
};

export default Sidebar;
