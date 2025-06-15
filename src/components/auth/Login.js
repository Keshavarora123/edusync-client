import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { success, error } = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError(error || 'Failed to log in');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', border: 'none', background: '#fff' }}>
      <Card.Body style={{ padding: '2rem 1.5rem' }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address or phone number"
              style={{ fontSize: '1.1rem', padding: '0.9rem', borderRadius: 7, border: '1.5px solid #1877f2' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              style={{ fontSize: '1.1rem', padding: '0.9rem', borderRadius: 7, border: '1.5px solid #ddd' }}
            />
          </Form.Group>
          <Button
            disabled={loading}
            type="submit"
            style={{
              width: '100%',
              background: '#1877f2',
              border: 'none',
              fontWeight: 700,
              fontSize: '1.2rem',
              borderRadius: 7,
              padding: '0.8rem 0',
              marginBottom: '0.7rem',
              marginTop: '0.2rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </Form>
        <div className="text-center mb-3">
          <Link to="/forgot-password" style={{ color: '#1877f2', fontSize: '1rem', textDecoration: 'none', fontWeight: 500 }}>
            Forgotten password?
          </Link>
        </div>
        <hr style={{ margin: '1.5rem 0 1.2rem 0', borderTop: '1.5px solid #eee' }} />
        <div className="d-flex justify-content-center">
          <Link to="/register" style={{
            background: '#42b72a',
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            borderRadius: 7,
            padding: '0.8rem 2rem',
            fontSize: '1.1rem',
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            display: 'inline-block',
            textAlign: 'center'
          }}>
            Create new account
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Login;
