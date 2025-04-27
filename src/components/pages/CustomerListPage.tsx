import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner, Alert, Image, Button, Navbar } from 'react-bootstrap'; // Added Navbar, Button
import { getAllCustomers } from '../../services/api';
import { Customer } from '../../types';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth for logout


const CustomerListPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { logout, user } = useAuth(); // Get logout function and user

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getAllCustomers();
                setCustomers(data);
            } catch (err: any) {
                console.error("Failed to fetch customers:", err);
                setError(err.message || "Could not load customer list.");
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

     // Basic Header for this specific page
    const renderHeader = () => (
         <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand>Customer Management</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-3 text-light">
                        Signed in as: Super Admin ({user?.username})
                    </Navbar.Text>
                    <Button variant="outline-light" onClick={logout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

    if (loading) {
        return (
             <>
                {renderHeader()}
                <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Customers...</span>
                    </Spinner>
                </Container>
             </>
        );
    }

    if (error) {
         return (
             <>
                {renderHeader()}
                <Container>
                    <Alert variant="danger">Error loading customers: {error}</Alert>
                </Container>
             </>
         );
    }

    return (
        <>
            {renderHeader()}
            <Container>
                <h2 className="mb-4">Customer List</h2>
                <ListGroup>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    {customer.logo_url && (
                                        <Image src={customer.logo_url} alt="" height="30" className="me-3" roundedCircle />
                                    )}
                                    <strong>{customer.name}</strong>
                                    <small className="ms-3 text-muted">({customer.domain_url})</small>
                                </div>
                                {/* Add Actions like Edit/View Details later */}
                                {/* <Button variant="outline-primary" size="sm">Details</Button> */}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No customers found.</ListGroup.Item>
                    )}
                </ListGroup>
            </Container>
        </>
    );
};

export default CustomerListPage;