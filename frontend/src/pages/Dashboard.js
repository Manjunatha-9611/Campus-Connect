import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../css/Dashboard.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeUsers: 0,
    noticeCategories: 0,
    registrations: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, fetch from API
        // For demo, using dummy data
        setEvents([]);
        setNotices([]);
        setStats({
          totalEvents: 24,
          activeUsers: 180,
          noticeCategories: 8,
          registrations: 356
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="welcome-section">
          <h1>Welcome to CampusConnect</h1>
          <p>Your one-stop platform for campus events and notices</p>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">📅</div>
            <div className="stat-number">{stats.totalEvents}</div>
            <div className="stat-label">Events This Month</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{stats.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📋</div>
            <div className="stat-number">{stats.noticeCategories}</div>
            <div className="stat-label">Notice Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{stats.registrations}</div>
            <div className="stat-label">Event Registrations</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  Upcoming Events
                </div>
                <div className="card-body">
                  {events.length > 0 ? (
                    <div className="events-list">
                      {events.map((event) => (
                        <div key={event.id} className="event-item">
                          <div className="event-date">
                            <span className="day">{new Date(event.date).getDate()}</span>
                            <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                          </div>
                          <div className="event-details">
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-location">{event.location}</p>
                            <Link to={`/events/${event.id}`} className="event-link">View Details</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📅</div>
                      <p>No upcoming events</p>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <Link to="/events" className="btn btn-primary">View All Events</Link>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="card-header">
                  Latest Notices
                </div>
                <div className="card-body">
                  {notices.length > 0 ? (
                    <div className="notices-list">
                      {notices.map((notice) => (
                        <div key={notice.id} className="notice-item">
                          <div className="notice-category">
                            <span className={`category-tag ${notice.category.toLowerCase()}`}>
                              {notice.category}
                            </span>
                          </div>
                          <div className="notice-content">
                            <h3 className="notice-title">{notice.title}</h3>
                            <p className="notice-date">Posted on {new Date(notice.createdAt).toLocaleDateString()}</p>
                            <Link to={`/notices/${notice.id}`} className="notice-link">Read More</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📢</div>
                      <p>No notices available</p>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <Link to="/notices" className="btn btn-primary">View All Notices</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-links-section">
            <h2 className="section-title">Quick Links</h2>
            <div className="quick-links">
              <Link to="/events" className="quick-link-card">
                <div className="quick-link-icon">📅</div>
                <h3>Campus Events</h3>
                <p>Explore all upcoming events on campus</p>
              </Link>
              <Link to="/notices" className="quick-link-card">
                <div className="quick-link-icon">📢</div>
                <h3>Notice Board</h3>
                <p>Stay updated with the latest announcements</p>
              </Link>
              <Link to="/clubs" className="quick-link-card">
                <div className="quick-link-icon">👥</div>
                <h3>Student Clubs</h3>
                <p>Discover student organizations and activities</p>
              </Link>
              <Link to="/academic-calendar" className="quick-link-card">
                <div className="quick-link-icon">🗓️</div>
                <h3>Academic Calendar</h3>
                <p>Important academic dates and deadlines</p>
              </Link>
              <Link to="/services" className="quick-link-card">
                <div className="quick-link-icon">🔍</div>
                <h3>Student Services</h3>
                <p>Access resources and support services</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;