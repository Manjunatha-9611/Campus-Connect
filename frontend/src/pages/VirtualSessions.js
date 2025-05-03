import React, { useState } from 'react';
import '../css/VirtualSessions.css';

const VirtualSessions = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingSessions = [
    {
      id: 1,
      title: "Tech Industry Insights",
      date: "May 5, 2025",
      time: "1:00 PM - 2:30 PM",
      host: "Alex Rivera, Senior Tech Recruiter",
      spots: "45/100 spots filled"
    },
    {
      id: 2,
      title: "Resume Review Workshop",
      date: "May 10, 2025",
      time: "10:00 AM - 12:00 PM",
      host: "Jessica Chen, Career Coach",
      spots: "72/80 spots filled"
    },
    {
      id: 3,
      title: "Healthcare Careers Panel",
      date: "May 18, 2025",
      time: "3:00 PM - 4:30 PM",
      host: "Multiple Industry Experts",
      spots: "28/100 spots filled"
    }
  ];

  const pastSessions = [
    {
      id: 101,
      title: "Finance Industry Q&A",
      date: "April 20, 2025",
      recording: true
    },
    {
      id: 102,
      title: "Interview Techniques Masterclass",
      date: "April 15, 2025",
      recording: true
    },
    {
      id: 103,
      title: "Marketing Career Paths",
      date: "April 5, 2025",
      recording: true
    }
  ];

  return (
    <div className="virtual-sessions-container">
      <div className="hero-section glass-panel">
        <h1>Virtual Sessions</h1>
        <p>Interactive online events to boost your career journey</p>
      </div>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Sessions
          </button>
          <button 
            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Sessions
          </button>
        </div>
        
        <div className="tab-content glass-panel">
          {activeTab === 'upcoming' ? (
            <div className="upcoming-sessions">
              {upcomingSessions.map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-header">
                    <h2>{session.title}</h2>
                    <span className="session-spots">{session.spots}</span>
                  </div>
                  <div className="session-details">
                    <p><strong>Date:</strong> {session.date}</p>
                    <p><strong>Time:</strong> {session.time}</p>
                    <p><strong>Host:</strong> {session.host}</p>
                  </div>
                  <div className="session-actions">
                    <button className="register-session-btn">Register</button>
                    <button className="add-calendar-btn">Add to Calendar</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="past-sessions">
              {pastSessions.map(session => (
                <div key={session.id} className="past-session-card">
                  <div className="past-session-info">
                    <h3>{session.title}</h3>
                    <p>Held on {session.date}</p>
                  </div>
                  {session.recording && (
                    <button className="watch-recording-btn">
                      <span className="play-icon">▶</span> Watch Recording
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="info-section glass-panel">
        <h2>About Virtual Sessions</h2>
        <p>Our virtual sessions provide valuable industry insights, career advice, and networking opportunities from the comfort of your home. All sessions include Q&A time with presenters.</p>
        
        <h3>What You'll Need</h3>
        <ul>
          <li>Reliable internet connection</li>
          <li>Computer with audio capabilities</li>
          <li>Optional: webcam for networking sessions</li>
        </ul>
        
        <div className="notification-box">
          <p><strong>Note:</strong> All registered participants will receive session links via email 24 hours before the event.</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualSessions;