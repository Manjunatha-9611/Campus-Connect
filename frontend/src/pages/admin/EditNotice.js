import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const EditNotice = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/notices/${id}`);
        const notice = res.data;
        
        setTitle(notice.title);
        setContent(notice.content);
        setCategory(notice.category);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notice:', error);
        setError('Failed to fetch notice details');
        setLoading(false);
      }
    };
    
    fetchNotice();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setUpdating(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      
      await axios.put(
        `${API_URL}/api/notices/${id}`,
        {
          title,
          content,
          category
        },
        config
      );
      
      navigate('/admin/notices');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update notice');
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: '#212A3E' }}>Edit Notice</h2>
        <div className="mt-2" style={{ width: '50px', height: '4px', backgroundColor: '#B80000' }}></div>
      </div>
      
      {error && (
        <div className="alert" style={{ backgroundColor: '#FFEEEE', border: '1px solid #B80000', color: '#B80000', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px' }}>
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-3 p-4">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Notice Title</Form.Label>
                <Form.Control 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="py-2"
                  style={{ borderRadius: '4px', borderColor: '#DFE0E5' }}
                  placeholder="Enter the notice title"
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="py-2"
                  style={{ borderRadius: '4px', borderColor: '#DFE0E5' }}
                >
                  <option value="">Select Category</option>
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Exam">Exam</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Placement">Placement</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="General">General</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Notice Content</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="py-2"
              style={{ borderRadius: '4px', borderColor: '#DFE0E5' }}
              placeholder="Enter the notice content"
            />
          </Form.Group>
          
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate('/admin/notices')}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updating}
              className="px-4 py-2"
              style={{ 
                backgroundColor: '#B80000', 
                borderColor: '#B80000',
                color: 'white',
                fontWeight: '500'
              }}
            >
              {updating ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Updating...
                </>
              ) : (
                'Update Notice'
              )}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditNotice;