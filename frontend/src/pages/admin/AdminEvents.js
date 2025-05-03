import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';
import './AdminEvents.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaUserTie } from 'react-icons/fa';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_URL}/api/events/${eventId}`);
        setEvents(events.filter(event => event._id !== eventId));
      } catch (err) {
        setError('Failed to delete event');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-events">
      <div className="admin-header">
        <h1>Manage Events</h1>
        <Link to="/admin/events/create" className="create-btn">
          Create New Event
        </Link>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div key={event._id} className="event-card organized">
            <div className="event-header">
              <h3>{event.title}</h3>
              <span className={`status-badge ${event.status}`}>{event.status}</span>
            </div>
            <div className="event-details-grid">
              <div className="event-detail-row"><FaCalendarAlt className="event-icon" /><span><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</span></div>
              <div className="event-detail-row"><FaClock className="event-icon" /><span><strong>Time:</strong> {event.time}</span></div>
              <div className="event-detail-row"><FaMapMarkerAlt className="event-icon" /><span><strong>Location:</strong> {event.location}</span></div>
              <div className="event-detail-row"><FaUsers className="event-icon" /><span><strong>Capacity:</strong> {event.capacity}</span></div>
              <div className="event-detail-row"><FaUserTie className="event-icon" /><span><strong>Organizer:</strong> {event.organizer}</span></div>
              <div className="event-detail-row"><FaUsers className="event-icon" /><span><strong>Registered:</strong> {event.registeredCount || 0}</span></div>
            </div>
            <hr className="event-divider" />
            <div className="event-actions organized-actions">
              <Link to={`/admin/events/edit/${event._id}`} className="edit-btn">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(event._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
