import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaCalendarAlt, FaUser } from 'react-icons/fa';
import '../css/Notices.css';
import { API_URL } from '../config';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Dummy notices data
  const dummyNotices = [
    {
      _id: '1',
      title: 'Campus Closure Notice',
      content: 'The campus will be closed on March 15th for maintenance work. All classes will be conducted online.',
      category: 'announcement',
      date: '2024-03-10',
      author: 'Administration Office',
      priority: 'high'
    },
    {
      _id: '2',
      title: 'Scholarship Applications Open',
      content: 'Applications for the Spring 2024 scholarship program are now open. Deadline: April 1st, 2024.',
      category: 'academic',
      date: '2024-03-08',
      author: 'Financial Aid Office',
      priority: 'medium'
    },
    {
      _id: '3',
      title: 'Library Extended Hours',
      content: 'The main library will have extended hours during the final examination period. Open 24/7 from April 15th to May 1st.',
      category: 'facility',
      date: '2024-03-05',
      author: 'Library Services',
      priority: 'low'
    },
    {
      _id: '4',
      title: 'Career Fair Registration',
      content: 'Registration for the Annual Career Fair is now open. Limited spots available. Register early to secure your place.',
      category: 'event',
      date: '2024-03-01',
      author: 'Career Services',
      priority: 'high'
    }
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/notices`);
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
        // Use dummy data if API fails
        setNotices(dummyNotices);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filterNotices = (category) => {
    setFilter(category);
  };

  const filteredNotices = filter === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === filter);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="notices-page">
      <div className="notices-header">
        <h1>Campus Notices</h1>
        <p>Stay updated with the latest announcements and information</p>
      </div>

      <div className="filter-section">
        <div className="container">
          <h2>Filter Notices</h2>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => filterNotices('all')}
            >
              All Notices
            </button>
            <button 
              className={filter === 'announcement' ? 'active' : ''} 
              onClick={() => filterNotices('announcement')}
            >
              Announcements
            </button>
            <button 
              className={filter === 'academic' ? 'active' : ''} 
              onClick={() => filterNotices('academic')}
            >
              Academic
            </button>
            <button 
              className={filter === 'event' ? 'active' : ''} 
              onClick={() => filterNotices('event')}
            >
              Events
            </button>
            <button 
              className={filter === 'facility' ? 'active' : ''} 
              onClick={() => filterNotices('facility')}
            >
              Facilities
            </button>
          </div>
        </div>
      </div>

      <div className="notices-list">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading notices...</p>
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="notices-grid">
              {filteredNotices.map((notice) => (
                <div 
                  key={notice._id} 
                  className={`notice-card ${getPriorityClass(notice.priority)}`}
                >
                  <div className="notice-header">
                    <h3>{notice.title}</h3>
                    <span className={`priority-badge ${getPriorityClass(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <div className="notice-content">
                    <p>{notice.content}</p>
                  </div>
                  <div className="notice-footer">
                    <div className="notice-meta">
                      <p>
                        <FaCalendarAlt /> {new Date(notice.date).toLocaleDateString()}
                      </p>
                      <p>
                        <FaUser /> {notice.author}
                      </p>
                    </div>
                    <div className="notice-category">
                      <FaBell /> {notice.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-notices">
              <h3>No notices available in this category</h3>
              <p>Check back later for new notices or try a different filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;