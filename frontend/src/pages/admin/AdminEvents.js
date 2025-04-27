import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import { AuthContext } from '../../contexts/AuthContext';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      
      await axios.delete(`${API_URL}/api/events/${id}`, config);
      setSuccess('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setError(error.response?.data?.message || 'Failed to delete event');
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Manage Events</h2>
          <Link to="/admin/events/create">
            <Button variant="success">
              <i className="bi bi-plus-lg"></i> Create Event
            </Button>
          </Link>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {events.length === 0 ? (
            <p className="text-center text-muted">No events available.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Registrations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event._id}>
                      <td>{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.location}</td>
                      <td>{event.registrations ? event.registrations.length : 0}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/admin/events/edit/${event._id}`}>
                            <Button variant="warning" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminEvents;
