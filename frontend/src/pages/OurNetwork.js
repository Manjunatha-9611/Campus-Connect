import React from 'react';
import '../css/OurNetwork.css';

const OurNetwork = () => {
  const partners = [
    {
      id: 1,
      name: "Tech Innovations Inc.",
      category: "Technology",
      description: "Leading software development and IT services company."
    },
    {
      id: 2,
      name: "Global Health Partners",
      category: "Healthcare",
      description: "Network of hospitals and healthcare providers."
    },
    {
      id: 3,
      name: "Financial Solutions Group",
      category: "Finance",
      description: "Banking, investment, and financial advisory services."
    },
    {
      id: 4,
      name: "Creative Media Agency",
      category: "Marketing",
      description: "Full-service marketing and advertising firm."
    },
    {
      id: 5,
      name: "EduLearn Alliance",
      category: "Education",
      description: "Educational institutions and learning resources providers."
    },
    {
      id: 6,
      name: "Green Energy Consortium",
      category: "Energy",
      description: "Renewable energy companies and sustainability initiatives."
    }
  ];

  const universities = [
    "State University",
    "Metropolitan College",
    "Technical Institute",
    "Business Academy",
    "Arts & Sciences University",
    "Medical School"
  ];

  return (
    <div className="network-container">
      <div className="network-hero glass-panel">
        <h1>Our Network</h1>
        <p>Connect with our extensive network of employers, universities, and industry partners</p>
      </div>
      
      <section className="network-map-section">
        <div className="map-visual glass-panel">
          <div className="map-placeholder">
            <div className="map-center">
              <div className="center-node">Our Network</div>
              <div className="connecting-lines">
                {partners.map((partner, index) => (
                  <div key={index} className={`connector line-${index + 1}`}></div>
                ))}
              </div>
            </div>
            <div className="network-nodes">
              {partners.map((partner, index) => (
                <div key={partner.id} className={`network-node node-${index + 1}`}>
                  {partner.category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="partners-section">
        <h2>Industry Partners</h2>
        <div className="partners-grid">
          {partners.map(partner => (
            <div key={partner.id} className="partner-card glass-card">
              <h3>{partner.name}</h3>
              <span className="partner-category">{partner.category}</span>
              <p>{partner.description}</p>
              <button className="view-opportunities-btn">View Opportunities</button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="universities-section glass-panel">
        <h2>Educational Partners</h2>
        <div className="universities-list">
          {universities.map((university, index) => (
            <div key={index} className="university-badge">
              {university}
            </div>
          ))}
        </div>
      </section>
      
      <section className="join-network-section">
        <div className="join-card glass-panel">
          <h2>Join Our Network</h2>
          <p>Are you an employer or institution interested in connecting with talented professionals?</p>
          <button className="join-network-btn">Become a Partner</button>
        </div>
      </section>
    </div>
  );
};

export default OurNetwork;