import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EventDetails.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUniversity, FaArrowLeft, FaUser } from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
        // Check if user is logged in and registered for this event
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
          try {
            const registrationStatus = await axios.get(`/api/events/${id}/registration-status`, {
              headers: { Authorization: `Bearer ${userToken}` }
            });
            setRegistered(registrationStatus.data.isRegistered);
          } catch (err) {
            console.error("Error checking registration status:", err);
          }
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details");
        setLoading(false);
        console.error("Error fetching event details:", err);
        // Use dummy data for testing
        setEvent({
          _id: id,
          title: 'Annual Career Fair 2024',
          date: '2024-03-15',
          time: '10:00 AM - 4:00 PM',
          location: 'Main Campus Auditorium',
          description: 'Join us for our annual career fair featuring top companies from various industries. Network with recruiters and explore exciting job opportunities.',
          category: 'inperson',
          imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          organizer: 'Career Services Department',
          capacity: 200,
          registered: 150,
          requirements: [
            'Valid student ID',
            'Resume (optional)',
            'Business casual attire'
          ]
        });
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }

    try {
      await axios.post(`/api/events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setRegistered(true);
    } catch (err) {
      console.error("Error registering for event:", err);
      alert("Failed to register for event. Please try again.");
    }
  };

  const handleCancelRegistration = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) return;

    try {
      await axios.delete(`/api/events/${id}/register`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setRegistered(false);
    } catch (err) {
      console.error("Error canceling registration:", err);
      alert("Failed to cancel registration. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || "Event not found"}</p>
        <button onClick={() => navigate('/events')}>Back to Events</button>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <button className="back-button" onClick={() => navigate('/events')}>
        <FaArrowLeft /> Back to Events
      </button>

      <div className="event-header">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="event-banner" />
        ) : (
          <div className="event-banner placeholder-banner">
            <FaCalendarAlt />
          </div>
        )}
        <div className="event-title-section">
          <h1>{event.title}</h1>
          <div className="event-meta">
            <div className="meta-item">
              <FaCalendarAlt />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="meta-item">
              <FaClock />
              <span>{event.time || "TBA"}</span>
            </div>
            <div className="meta-item">
              <FaMapMarkerAlt />
              <span>{event.location}</span>
            </div>
            {event.organizer && (
              <div className="meta-item">
                <FaUser />
                <span>{event.organizer}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="event-content">
        <div className="event-main-content">
          <section className="event-description-section">
            <h2>About This Event</h2>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </section>

          {event.schedule && event.schedule.length > 0 && (
            <section className="event-schedule-section">
              <h2>Event Schedule</h2>
              <div className="schedule-timeline">
                {event.schedule.map((item, index) => (
                  <div key={index} className="schedule-item">
                    <div className="time-slot">{item.time}</div>
                    <div className="schedule-content">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {event.speakers && event.speakers.length > 0 && (
            <section className="event-speakers-section">
              <h2>Featured Speakers</h2>
              <div className="speakers-grid">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="speaker-card">
                    {speaker.image ? (
                      <img src={speaker.image} alt={speaker.name} />
                    ) : (
                      <div className="speaker-placeholder-image"></div>
                    )}
                    <h3>{speaker.name}</h3>
                    <p className="speaker-title">{speaker.title}</p>
                    <p>{speaker.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="event-requirements">
            <h2>Requirements</h2>
            <ul>
              {event.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="event-sidebar">
          <div className="registration-card">
            <h2>Registration</h2>
            {event.registrationDeadline && (
              <p className="deadline">
                <strong>Registration Deadline:</strong>{" "}
                {new Date(event.registrationDeadline).toLocaleDateString()}
              </p>
            )}
            <p>
              <strong>Status:</strong>{" "}
              {event.registrationOpen ? "Open" : "Closed"}
            </p>
            {event.capacity && (
              <p>
                <strong>Capacity:</strong> {event.capacity} attendees
              </p>
            )}
            {event.registrationFee ? (
              <p className="fee">
                <strong>Fee:</strong> ${event.registrationFee}
              </p>
            ) : (
              <p className="free">Free Event</p>
            )}

            {event.registrationOpen ? (
              registered ? (
                <div className="registration-status">
                  <p className="success-message">
                    You're registered for this event!
                  </p>
                  <button 
                    className="cancel-registration-btn" 
                    onClick={handleCancelRegistration}
                  >
                    Cancel Registration
                  </button>
                </div>
              ) : (
                <button 
                  className="register-now-btn" 
                  onClick={handleRegister}
                >
                  Register Now
                </button>
              )
            ) : (
              <p className="closed-message">Registration is closed</p>
            )}
          </div>

          {event.venue && (
            <div className="venue-info">
              <h3>Venue Information</h3>
              <p>{event.venue.name}</p>
              <p>{event.venue.address}</p>
              {event.venue.mapUrl && (
                <a 
                  href={event.venue.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="map-link"
                >
                  View on Map
                </a>
              )}
            </div>
          )}

          {event.additionalInfo && (
            <div className="additional-info">
              <h3>Additional Information</h3>
              <p>{event.additionalInfo}</p>
            </div>
          )}

          <div className="share-event">
            <h3>Share This Event</h3>
            <div className="social-share-buttons">
              <button className="share-btn facebook">
                Share on Facebook
              </button>
              <button className="share-btn twitter">
                Share on Twitter
              </button>
              <button className="share-btn linkedin">
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="related-events">
        <h2>You May Also Be Interested In</h2>
        <div className="related-events-placeholder">
          <p>Related events would appear here</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;