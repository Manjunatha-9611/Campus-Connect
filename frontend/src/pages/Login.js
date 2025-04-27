import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/LogReg.css'; // Make sure to create this CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="user-icon">
          <i className="bi bi-person"></i>
        </div>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="bi bi-person"></i>
            </div>
            <Form.Control 
              type="email" 
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <i className="bi bi-lock"></i>
            </div>
            <Form.Control 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          
          <div className="login-options">
            <Form.Check 
              type="checkbox" 
              label="Remember me" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="remember-me"
            />
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <Button 
            variant="primary" 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
        </Form>
        
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;