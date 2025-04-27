import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Event.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaHandshake, FaGlobe, FaLaptop } from 'react-icons/fa';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const filterEvents = (category) => {
    setFilter(category);
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <div className="events-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1>Events</h1>
          <p>Building bridges to higher education worldwide through tailored recruitment solutions</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon"><FaHandshake /></div>
              <div className="stat-number">140+</div>
              <div className="stat-label">2023 InPerson Fairs</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><FaGlobe /></div>
              <div className="stat-number">15+</div>
              <div className="stat-label">Countries Visited</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><FaLaptop /></div>
              <div className="stat-number">200+</div>
              <div className="stat-label">VirtualSessions Hosted</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><FaUniversity /></div>
              <div className="stat-number">350+</div>
              <div className="stat-label">High School Network</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="container">
          <h2>Filter Events</h2>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => filterEvents('all')}
            >
              All Events
            </button>
            <button 
              className={filter === 'inperson' ? 'active' : ''} 
              onClick={() => filterEvents('inperson')}
            >
              In-Person Fairs
            </button>
            <button 
              className={filter === 'virtual' ? 'active' : ''} 
              onClick={() => filterEvents('virtual')}
            >
              Virtual Sessions
            </button>
            <button 
              className={filter === 'workshop' ? 'active' : ''} 
              onClick={() => filterEvents('workshop')}
            >
              Workshops
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="events-list-section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div 
                  key={event._id} 
                  className="event-card"
                  onClick={() => handleEventClick(event._id)}
                >
                  <div className="event-image">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} />
                    ) : (
                      <div className="placeholder-image">
                        <FaCalendarAlt />
                      </div>
                    )}
                  </div>
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <div className="event-details">
                      <p>
                        <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p>
                        <FaMapMarkerAlt /> {event.location}
                      </p>
                    </div>
                    <p className="event-description">{event.description.substring(0, 100)}...</p>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-events">
              <h3>No events available in this category</h3>
              <p>Check back later for upcoming events or try a different filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2>Want to join our next event?</h2>
          <p>Register now to secure your spot and receive updates about upcoming opportunities.</p>
          <button className="register-btn" onClick={() => navigate('/register')}>REGISTER NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Events;