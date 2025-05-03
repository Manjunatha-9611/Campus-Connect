import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Event.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaHandshake, FaGlobe, FaLaptop } from 'react-icons/fa';
import { API_URL } from '../config';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Dummy events data
  const dummyEvents = [
    {
      _id: '1',
      title: 'Annual Career Fair 2024',
      date: '2024-03-15',
      location: 'Main Campus Auditorium',
      description: 'Join us for our annual career fair featuring top companies from various industries. Network with recruiters and explore exciting job opportunities.',
      category: 'inperson',
      imageUrl: '/images/events/career-fair.jpg'
    },
    {
      _id: '2',
      title: 'Virtual Tech Workshop',
      date: '2024-03-20',
      location: 'Online',
      description: 'Learn the latest technologies in this hands-on virtual workshop. Perfect for students interested in software development and IT.',
      category: 'virtual',
      imageUrl: '/images/events/tech-workshop.jpg'
    },
    {
      _id: '3',
      title: 'Research Symposium',
      date: '2024-04-01',
      location: 'Science Building',
      description: 'Present your research findings and learn from fellow researchers. Open to all departments and research areas.',
      category: 'workshop',
      imageUrl: '/images/events/research-symposium.jpg'
    },
    {
      _id: '4',
      title: 'International Student Meetup',
      date: '2024-04-10',
      location: 'Student Center',
      description: 'Connect with international students and learn about different cultures. Food, games, and cultural performances included.',
      category: 'inperson',
      imageUrl: '/images/events/student-meetup.jpg'
    },
    {
      _id: '5',
      title: 'Virtual Career Counseling',
      date: '2024-04-15',
      location: 'Online',
      description: 'One-on-one career counseling sessions with experienced professionals. Get personalized advice on your career path.',
      category: 'virtual',
      imageUrl: '/images/events/career-counseling.jpg'
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events: ", error);
        // Use dummy events if API fails
        setEvents(dummyEvents);
      } finally {
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
    <div className="events-page gradient-bg">
      <div className="events-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="container">
            <h1>Events</h1>
            <p>Discover and participate in exciting campus events</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon"><FaHandshake /></div>
                <div className="stat-number">50+</div>
                <div className="stat-label">Events This Year</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><FaGlobe /></div>
                <div className="stat-number">1000+</div>
                <div className="stat-label">Participants</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><FaLaptop /></div>
                <div className="stat-number">20+</div>
                <div className="stat-label">Virtual Events</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon"><FaUniversity /></div>
                <div className="stat-number">30+</div>
                <div className="stat-label">Partner Organizations</div>
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
                In-Person Events
              </button>
              <button 
                className={filter === 'virtual' ? 'active' : ''} 
                onClick={() => filterEvents('virtual')}
              >
                Virtual Events
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
    </div>
  );
};

export default Events;