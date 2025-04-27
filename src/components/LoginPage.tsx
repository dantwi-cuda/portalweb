import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setIsSubmitting(true); // Show loading state

    try {
      await login(username, password);
      navigate('/', { replace: true }); // Redirect to main page on success
    } catch (err: any) {
      // Handle login errors (e.g., display message from API or generic one)
      if (err.response && err.response.data && err.response.data.detail) {
           setError(err.response.data.detail);
      } else {
          setError('Login failed. Please check your credentials.');
      }
      console.error("Login error details:", err);
    } finally {
        setIsSubmitting(false); // Hide loading state
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12}> {/* Use md={12} or adjust as needed */}
          <Card className="shadow-lg p-4" style={{ minWidth: '350px' }}> {/* Material-like shadow */}
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <div className="d-grid"> {/* Makes button full width */}
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                        />
                        Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                    </Button>
                </div>
              </Form>
              <hr />
              <p className="text-center text-muted small">
                Use: testuser / password123
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;