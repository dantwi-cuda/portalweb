import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100"> {/* Ensure full height */}
            <Header />
            <Container fluid className="flex-grow-1"> {/* Allow content to grow */}
                <Row>
                    <Col md={3} lg={2} className="d-none d-md-block p-0"> {/* Sidebar column, hide on small screens */}
                        <Sidebar />
                    </Col>
                    <Col md={9} lg={10} className="p-4"> {/* Main content area */}
                        <Outlet /> {/* Renders the matched child route (e.g., DashboardPage) */}
                    </Col>
                </Row>
            </Container>
             {/* Optional Footer */}
             {/* <footer className="bg-light p-3 text-center mt-auto">Footer Content</footer> */}
        </div>
    );
};

export default Layout;