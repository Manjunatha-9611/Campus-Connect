import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import { AuthContext } from '../../contexts/AuthContext';

const CreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      await axios.post(
        `${API_URL}/api/notices`,
        { title, content, category },
        config
      );

      navigate('/admin/notices');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create notice');
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Create a New Notice</h2>

      <Card className="shadow p-4">
        <Card.Body>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Title</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>Content</strong></Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write notice content here..."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label><strong>Category</strong></Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">-- Select Category --</option>
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

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/admin/notices')}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Creating...
                  </>
                ) : (
                  'Create Notice'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateNotice;
