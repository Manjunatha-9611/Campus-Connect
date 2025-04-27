import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import { AuthContext } from '../../contexts/AuthContext';

const EditEvent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/events/${id}`);
        const event = res.data;
        
        setTitle(event.title);
        setDescription(event.description);
        
        // Format date for form input
        const eventDate = new Date(event.date);
        setDate(eventDate.toISOString().split('T')[0]);
        setTime(eventDate.toTimeString().split(' ')[0].substring(0, 5));
        
        setLocation(event.location);
        setOrganizer(event.organizer);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };
    
    fetchEvent();
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
      
      // Combine date and time
      const dateTime = new Date(`${date}T${time}`);
      
      await axios.put(
        `${API_URL}/api/events/${id}`,
        {
          title,
          description,
          date: dateTime,
          location,
          organizer
        },
        config
      );
      
      navigate('/admin/events');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update event');
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-4">Edit Event</h1>
      
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Organizer</Form.Label>
              <Form.Control 
                type="text" 
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                required
              />
            </Form.Group>
            
            <div className="d-flex justify-content-between">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/admin/events')}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update Event'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditEvent;