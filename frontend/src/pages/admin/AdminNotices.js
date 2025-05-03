import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';
import './AdminNotices.css';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notices`);
      setNotices(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch notices');
      setLoading(false);
    }
  };

  const handleDelete = async (noticeId) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`${API_URL}/api/notices/${noticeId}`);
        setNotices(notices.filter(notice => notice._id !== noticeId));
      } catch (err) {
        setError('Failed to delete notice');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-notices">
      <div className="admin-header">
        <h1>Manage Notices</h1>
        <Link to="/admin/notices/create" className="create-btn">
          Create New Notice
        </Link>
      </div>

      <div className="notices-grid">
        {notices.map(notice => (
          <div key={notice._id} className="notice-card">
            <div className="notice-header">
              <h3>{notice.title}</h3>
              <span className={`priority ${notice.priority}`}>{notice.priority}</span>
            </div>
            <div className="notice-details">
              <p className="notice-content">{notice.content}</p>
              <p className="notice-meta">
                <strong>Posted:</strong> {new Date(notice.createdAt).toLocaleDateString()}
              </p>
              <p className="notice-meta">
                <strong>Category:</strong> {notice.category}
              </p>
            </div>
            <div className="notice-actions">
              <Link to={`/admin/notices/edit/${notice._id}`} className="edit-btn">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(notice._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;
