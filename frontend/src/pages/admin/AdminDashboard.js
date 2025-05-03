import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';
import { FaUsers, FaCalendarAlt, FaBell, FaChartLine } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalNotices: 0,
    activeRegistrations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/stats`);
      setStats(response.data);
    } catch (err) {
      setError('Failed to fetch dashboard statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="welcome-message">
          Welcome back, {user?.name || 'Admin'}!
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon events">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <h3>Total Events</h3>
            <p className="stat-value">{stats.totalEvents}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon notices">
            <FaBell />
          </div>
          <div className="stat-info">
            <h3>Total Notices</h3>
            <p className="stat-value">{stats.totalNotices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon registrations">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>Active Registrations</h3>
            <p className="stat-value">{stats.activeRegistrations}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button
            className="action-card"
            onClick={() => navigate('/admin/events/create')}
          >
            <FaCalendarAlt />
            <span>Create Event</span>
          </button>

          <button
            className="action-card"
            onClick={() => navigate('/admin/notices/create')}
          >
            <FaBell />
            <span>Post Notice</span>
          </button>

          <button
            className="action-card"
            onClick={() => navigate('/admin/users')}
          >
            <FaUsers />
            <span>Manage Users</span>
          </button>

          <button
            className="action-card"
            onClick={() => navigate('/admin/reports')}
          >
            <FaChartLine />
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 