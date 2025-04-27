import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';

const MainPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
             <Container>
                <Navbar.Brand href="#home">My App</Navbar.Brand>
                 <Navbar.Toggle />
                 <Navbar.Collapse className="justify-content-end">
                     <Navbar.Text className="me-3 text-light">
                        Signed in as: {user?.full_name || user?.username}
                     </Navbar.Text>
                     <Button variant="outline-light" onClick={logout}>Logout</Button>
                 </Navbar.Collapse>
             </Container>
        </Navbar>

        <Container>
        <Card className="shadow-sm"> {/* Material-like shadow */}
            <Card.Body>
            <Card.Title>Welcome to the Main Page!</Card.Title>
            <Card.Text>
                This page is only accessible after successful login.
            </Card.Text>
            {user && (
                <div>
                <h5>Your Details:</h5>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Full Name:</strong> {user.full_name || 'N/A'}</p>
                <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                </div>
            )}
            <Button variant="danger" onClick={logout} className="mt-3">
                Logout
            </Button>
            </Card.Body>
        </Card>
        </Container>
    </>
  );
};

export default MainPage;