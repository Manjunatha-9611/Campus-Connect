import React, { useState } from 'react';
import '../css/Echo.css';

const Echo = () => {
  const [activeStory, setActiveStory] = useState(1);
  
  const successStories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer at TechCorp",
      image: "profile1", // For placeholder styling
      story: "After attending the Spring Career Fair, I connected with TechCorp's recruiting team. Within two weeks, I had interviews lined up, and a month later, I received my offer. The prep resources provided were invaluable for my technical interviews.",
      industry: "Technology"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Marketing Specialist at Creative Media",
      image: "profile2",
      story: "The networking sessions were a game-changer for me. I met my current manager at a virtual session focused on marketing careers. The personalized resume review helped me highlight my relevant experience effectively.",
      industry: "Marketing"
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Financial Analyst at Global Finance",
      image: "profile3",
      story: "I was transitioning careers from teaching to finance. The targeted workshops helped me translate my transferable skills, and the mentorship program connected me with professionals who guided my job search strategy.",
      industry: "Finance"
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "The services provided exceeded my expectations. The personalized coaching helped me refine my interview skills.",
      author: "Michael L."
    },
    {
      id: 2,
      text: "I was skeptical at first, but the connections I made through the network proved invaluable for my job search.",
      author: "Jessica T."
    },
    {
      id: 3,
      text: "The resume workshop transformed my application documents. I started getting callbacks within days of revising.",
      author: "Carlos R."
    }
  ];

  const statistics = [
    { label: "Job Placements", value: "500+", period: "Last Year" },
    { label: "Employer Partners", value: "300+", period: "And Growing" },
    { label: "Success Rate", value: "87%", period: "Within 3 Months" }
  ];

  return (
    <div className="echo-container">
      <div className="echo-hero glass-panel">
        <h1>Echo</h1>
        <p>Success stories and outcomes from our community</p>
      </div>
      
      <section className="stats-section">
        <div className="stats-grid">
          {statistics.map((stat, index) => (
            <div key={index} className="stat-card glass-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-period">{stat.period}</div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="success-stories-section glass-panel">
        <h2>Success Stories</h2>
        
        <div className="story-selector">
          {successStories.map(story => (
            <div 
              key={story.id} 
              className={`story-tab ${activeStory === story.id ? 'active' : ''}`}
              onClick={() => setActiveStory(story.id)}
            >
              <div className={`profile-circle ${story.image}`}></div>
              <div className="tab-info">
                <div className="tab-name">{story.name}</div>
                <div className="tab-industry">{story.industry}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="story-content">
          {successStories.map(story => (
            <div 
              key={story.id} 
              className={`story-details ${activeStory === story.id ? 'active' : ''}`}
            >
              <div className="story-header">
                <div className={`profile-image ${story.image}`}></div>
                <div className="story-info">
                  <h3>{story.name}</h3>
                  <p className="story-role">{story.role}</p>
                </div>
              </div>
              <blockquote className="story-quote">
                "{story.story}"
              </blockquote>
            </div>
          ))}
        </div>
      </section>
      
      <section className="testimonials-section">
        <h2>What People Say</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card glass-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="share-story-section glass-panel">
        <h2>Share Your Story</h2>
        <p>We love hearing how our services have helped you in your career journey. Your story could inspire others!</p>
        <button className="share-story-btn">Share Your Success</button>
      </section>
    </div>
  );
};

export default Echo;