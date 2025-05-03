import React, { useState } from 'react';
import '../css/Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Placeholder image data - in a real app you would fetch these from an API or database
  const galleryItems = [
    {
      id: 1,
      category: 'events',
      title: 'Annual Career Fair 2024',
      description: 'Over 500 attendees connected with top employers',
      thumbnail: '/images/gallery/career-fair-2024.jpg',
    },
    {
      id: 2,
      category: 'workshops',
      title: 'Resume Building Workshop',
      description: 'Interactive session with industry experts',
      thumbnail: '/images/gallery/resume-workshop.jpg',
    },
    {
      id: 3,
      category: 'facilities',
      title: 'Main Campus Building',
      description: 'Our newly renovated headquarters',
      thumbnail: '/images/gallery/campus-building.jpg',
    },
    {
      id: 4,
      category: 'events',
      title: 'Technology Symposium',
      description: 'Showcasing the latest industry innovations',
      thumbnail: '/images/gallery/tech-symposium.jpg',
    },
    {
      id: 5,
      category: 'workshops',
      title: 'Leadership Training',
      description: 'Developing the next generation of leaders',
      thumbnail: '/images/gallery/leadership-training.jpg',
    },
    {
      id: 6,
      category: 'facilities',
      title: 'Conference Center',
      description: 'State-of-the-art meeting spaces',
      thumbnail: '/images/gallery/conference-center.jpg',
    },
    {
      id: 7,
      category: 'events',
      title: 'Networking Mixer',
      description: 'Building professional connections',
      thumbnail: '/images/gallery/networking-mixer.jpg',
    },
    {
      id: 8,
      category: 'facilities',
      title: 'Study Areas',
      description: 'Comfortable spaces for focused learning',
      thumbnail: '/images/gallery/study-areas.jpg',
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'events', name: 'Events' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'facilities', name: 'Facilities' }
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="gallery-container">
      <div className="gallery-header glass-effect">
        <h1>Our Gallery</h1>
        <p>Explore visual highlights of our events, workshops, and facilities</p>
      </div>
      
      <div className="gallery-filters">
        {categories.map(category => (
          <button 
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-item glass-card">
            <div className="gallery-image-container">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="gallery-image" 
              />
            </div>
            <div className="gallery-item-details">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="gallery-category-tag">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="gallery-message glass-effect">
        <h2>Share Your Moments</h2>
        <p>
          Have photos from our events or activities? We'd love to feature them in our gallery!
          Send your high-quality images to <strong>gallery@ourcompany.com</strong>
        </p>
        <button className="submit-btn">Submit Photos</button>
      </div>
    </div>
  );
};

export default Gallery;