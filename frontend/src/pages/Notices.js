import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/notices${category ? `?category=${category}` : ''}`);
        setNotices(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(notice => notice.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notices:', error);
        setLoading(false);
      }
    };
    
    fetchNotices();
  }, [category]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Notice Board</h1>
        {isAdmin && (
          <Link to="/admin/notices/create">
            <Button variant="success">Create Notice</Button>
          </Link>
        )}
      </div>
      
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      {notices.length === 0 ? (
        <p>No notices available in this category.</p>
      ) : (
        notices.map(notice => (
          <Card key={notice._id} className="mb-3">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{notice.title}</h5>
                <span className="badge bg-info">{notice.category}</span>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>{notice.content}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              Posted on {new Date(notice.createdAt).toLocaleDateString()}
            </Card.Footer>
          </Card>
        ))
      )}
    </div>
  );
};

export default Notices;