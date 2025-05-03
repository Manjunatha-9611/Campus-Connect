import React from 'react';
import '../css/TheHub.css';

const TheHub = () => {
  const resources = [
    {
      id: 1,
      title: "Resume Templates",
      description: "Download professionally designed resume templates for various industries.",
      icon: "📄"
    },
    {
      id: 2,
      title: "Interview Preparation",
      description: "Tips, common questions, and strategies for acing your interviews.",
      icon: "🎯"
    },
    {
      id: 3,
      title: "Career Development",
      description: "Resources for professional growth and skill development.",
      icon: "📈"
    },
    {
      id: 4,
      title: "Job Search Strategies",
      description: "Effective approaches to find opportunities in your field.",
      icon: "🔍"
    }
  ];

  const upcomingWebinars = [
    {
      id: 1,
      title: "Mastering Remote Work",
      date: "May 8, 2025 • 2:00 PM",
      speaker: "Dr. Emma Rodriguez"
    },
    {
      id: 2,
      title: "Networking in the Digital Age",
      date: "May 12, 2025 • 1:00 PM",
      speaker: "James Wilson"
    },
    {
      id: 3,
      title: "Negotiating Your Salary",
      date: "May 17, 2025 • 11:00 AM",
      speaker: "Sarah Chang"
    }
  ];

  return (
    <div className="hub-container">
      <div className="hub-hero glass-effect">
        <h1>The Hub</h1>
        <p>Your central resource for career development and opportunities</p>
      </div>
      
      <section className="resources-section">
        <h2>Resources Library</h2>
        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource.id} className="resource-card glass-card">
              <div className="resource-icon">{resource.icon}</div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button className="access-btn">Access Resource</button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="webinars-section glass-effect">
        <h2>Upcoming Webinars</h2>
        <div className="webinars-list">
          {upcomingWebinars.map(webinar => (
            <div key={webinar.id} className="webinar-item">
              <div className="webinar-details">
                <h3>{webinar.title}</h3>
                <p className="webinar-date">{webinar.date}</p>
                <p className="webinar-speaker">Presented by: {webinar.speaker}</p>
              </div>
              <button className="register-webinar-btn">Register</button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="community-section">
        <h2>Community Forum</h2>
        <div className="forum-preview glass-card">
          <p>Connect with peers, share experiences, and get advice from industry professionals.</p>
          <button className="join-btn">Join Discussion</button>
        </div>
      </section>
    </div>
  );
};

export default TheHub;