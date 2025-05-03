import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';
import './CreateNotice.css';

const EditNotice = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'normal'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchNotice();
  }, [id]);

  const fetchNotice = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notices/${id}`);
      const notice = response.data;
      setFormData({
        title: notice.title,
        content: notice.content,
        category: notice.category,
        priority: notice.priority
      });
    } catch (err) {
      setError('Failed to fetch notice details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put(`${API_URL}/api/notices/${id}`, formData);
      navigate('/admin/notices');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update notice');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="create-notice">
        <div className="loading">Loading notice details...</div>
      </div>
    );
  }

  return (
    <div className="create-notice">
      <div className="form-container">
        <h1>Edit Notice</h1>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Notice Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="event">Event</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/admin/notices')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;