import React, { useState } from 'react';
import { FaBuilding, FaUsers, FaHandshake, FaChartLine } from 'react-icons/fa';
import './Clients.css';

const Clients = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Clients' },
    { id: 'technology', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'finance', name: 'Finance' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'education', name: 'Education' },
    { id: 'manufacturing', name: 'Manufacturing' }
  ];
  
  const clients = [
    {
      id: 1,
      name: "Tech Innovations Inc.",
      category: "technology",
      description: "Leading software development and IT services company.",
      partnerships: "Internship programs, technical workshops",
      logo: "/images/clients/tech-innovations.png"
    },
    {
      id: 2,
      name: "Global Health Partners",
      category: "healthcare",
      description: "Network of hospitals and healthcare providers.",
      partnerships: "Medical internships, healthcare training",
      logo: "/images/clients/global-health.png"
    },
    {
      id: 3,
      name: "Financial Solutions Group",
      category: "finance",
      description: "Banking, investment, and financial advisory services.",
      partnerships: "Financial literacy programs, banking internships",
      logo: "/images/clients/financial-solutions.png"
    },
    {
      id: 4,
      name: "Creative Media Agency",
      category: "marketing",
      description: "Full-service marketing and advertising firm.",
      partnerships: "Marketing internships, creative workshops",
      logo: "/images/clients/creative-media.png"
    },
    {
      id: 5,
      name: "EduLearn Academy",
      category: "education",
      description: "Online learning platform offering courses in multiple disciplines.",
      partnerships: "Faculty recruitment, educational content development",
      logo: "/images/clients/edulearn.png"
    },
    {
      id: 6,
      name: "NextGen Manufacturing",
      category: "manufacturing",
      description: "Modern manufacturing company implementing smart factory concepts.",
      partnerships: "Technical skills development, industrial placements",
      logo: "/images/clients/nextgen-manufacturing.png"
    }
  ];

  const filteredClients = activeCategory === 'all' 
    ? clients 
    : clients.filter(client => client.category === activeCategory);

  const stats = [
    { icon: <FaBuilding />, value: '50+', label: 'Partner Companies' },
    { icon: <FaUsers />, value: '1000+', label: 'Placements' },
    { icon: <FaHandshake />, value: '100+', label: 'Active Partnerships' },
    { icon: <FaChartLine />, value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="clients-page">
      <div className="clients-hero">
        <div className="hero-content">
          <h1>Our Partners</h1>
          <p>Connecting students with leading organizations across industries</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="clients-content">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="clients-grid">
          {filteredClients.map(client => (
            <div key={client.id} className="client-card">
              <div className="client-logo">
                <img src={client.logo} alt={client.name} />
              </div>
              <div className="client-info">
                <h3>{client.name}</h3>
                <span className="client-category">
                  {categories.find(cat => cat.id === client.category).name}
                </span>
                <p>{client.description}</p>
                <div className="partnership-info">
                  <h4>Partnership Programs</h4>
                  <p>{client.partnerships}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="become-partner">
        <div className="partner-content">
          <h2>Become a Partner</h2>
          <p>Join our network of industry leaders and connect with top talent</p>
          <button className="partner-btn">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default Clients;