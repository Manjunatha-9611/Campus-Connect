import React from 'react';
import '../css/InPersonFairs.css';

const InPersonFairs = () => {
  const upcomingFairs = [
    {
      id: 1,
      title: "Spring Career Expo 2025",
      date: "May 15-16, 2025",
      location: "Convention Center, Downtown",
      description: "Connect with over 100 employers from various industries."
    },
    {
      id: 2,
      title: "Tech Recruitment Fair",
      date: "June 3, 2025",
      location: "Tech Hub, Innovation District",
      description: "Specialized fair for software, IT, and engineering positions."
    },
    {
      id: 3,
      title: "Healthcare Professionals Meet",
      date: "June 20, 2025",
      location: "Medical Center Plaza",
      description: "Opportunities in hospitals, clinics, and healthcare organizations."
    }
  ];

  return (
    <div className="inperson-fairs-container">
      <div className="glass-header">
        <h1>In-Person Career Fairs</h1>
        <p>Join us at our upcoming events to connect with employers face-to-face</p>
      </div>
      
      <div className="fairs-grid">
        {upcomingFairs.map(fair => (
          <div key={fair.id} className="fair-card">
            <h2>{fair.title}</h2>
            <div className="fair-details">
              <p><strong>Date:</strong> {fair.date}</p>
              <p><strong>Location:</strong> {fair.location}</p>
              <p>{fair.description}</p>
            </div>
            <button className="register-btn">Register Now</button>
          </div>
        ))}
      </div>

      <div className="registration-info glass-panel">
        <h2>How to Prepare</h2>
        <ul>
          <li>Update your resume and bring multiple copies</li>
          <li>Research companies that interest you</li>
          <li>Prepare your elevator pitch</li>
          <li>Dress professionally</li>
        </ul>
      </div>
    </div>
  );
};

export default InPersonFairs;