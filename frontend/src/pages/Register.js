import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/LogReg.css'; // Make sure to create this CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="user-icon">
          <i className="bi bi-person-plus"></i>
        </div>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="bi bi-person"></i>
            </div>
            <Form.Control 
              type="text" 
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <i className="bi bi-envelope"></i>
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
          
          <div className="input-group">
            <div className="input-icon">
              <i className="bi bi-lock-fill"></i>
            </div>
            <Form.Control 
              type="password" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          
          <Button 
            variant="primary" 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </Button>
        </Form>
        
        <div className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;