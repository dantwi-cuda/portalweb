import React from 'react';
import { Navbar, Container, NavDropdown, Image, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const { user, customer, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Navigate to login handled by routing setup
    };

    // Placeholder handlers for profile actions
    const handleEditProfile = () => navigate('/profile'); // Example route
    const handleChangePassword = () => navigate('/change-password'); // Example route


    return (
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container fluid> {/* Use fluid for full width */}
                <Navbar.Brand href="/">
                    {customer?.logo_url && (
                        <Image
                            src={customer.logo_url}
                            alt={`${customer.name} Logo`}
                            height="30"
                            className="me-2 d-inline-block align-top"
                        />
                    )}
                    {customer?.name || 'Application'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <i className="bi bi-person-circle me-1"></i> {/* Optional: Add bootstrap icons */}
                                        {user.full_name || user.username}
                                    </>
                                }
                                id="user-nav-dropdown"
                                align="end" // Align dropdown to the right
                            >
                                <NavDropdown.Item onClick={handleEditProfile}>Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleChangePassword}>Change Password</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;