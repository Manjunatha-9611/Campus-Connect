import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUserEdit, FaEnvelope, FaPhone, FaUniversity, FaIdBadge, FaCalendarAlt, FaEdit, FaTimes } from 'react-icons/fa';
import './Profile.css';
import axios from 'axios';
import { API_URL } from '../config';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    rollNumber: user?.rollNumber || '',
    year: user?.year || '',
    semester: user?.semester || '',
    profilePic: user?.profilePic || ''
  });
  const [activity, setActivity] = useState({
    eventsAttended: 0,
    noticesRead: 0,
    upcomingEvents: 0,
    certificates: 0
  });
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState('');
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    const fetchActivity = async () => {
      setActivityLoading(true);
      setActivityError('');
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/auth/activity`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivity(response.data);
      } catch (err) {
        setActivityError('Failed to load activity overview');
      } finally {
        setActivityLoading(false);
      }
    };
    fetchActivity();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (err) {
      setProfileError('Failed to update profile');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setFormData((prev) => ({ ...prev, profilePic: '' }));
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.profilePic ? (
              <>
                <img src={formData.profilePic} alt="Profile" className="profile-pic-img" />
                {editing && (
                  <button type="button" className="remove-pic-btn" onClick={handleRemoveProfilePic}>Remove</button>
                )}
              </>
            ) : (
              <FaUserEdit size={48} />
            )}
            {editing && (
              <input type="file" accept="image/*" onChange={handleImageChange} className="profile-pic-input" />
            )}
          </div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <span className="user-role">{user?.role || 'Student'}</span>
            <button className="edit-btn" onClick={() => setEditing((e) => !e)}>
              {editing ? <FaTimes /> : <FaEdit />} {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="profile-content">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label><FaUserEdit /> Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label><FaEnvelope /> Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><FaPhone /> Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label><FaUniversity /> Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><FaIdBadge /> Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label><FaCalendarAlt /> Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label>Semester</label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            {editing && (
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            )}
            {profileError && <div className="error-message">{profileError}</div>}
          </form>
          <div className="profile-stats">
            <h3>Activity Overview</h3>
            {activityLoading ? (
              <div>Loading activity...</div>
            ) : activityError ? (
              <div className="error-message">{activityError}</div>
            ) : (
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-value">{activity.eventsAttended}</span>
                  <span className="stat-label">Events Attended</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{activity.noticesRead}</span>
                  <span className="stat-label">Notices Read</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{activity.upcomingEvents}</span>
                  <span className="stat-label">Upcoming Events</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">{activity.certificates}</span>
                  <span className="stat-label">Certificates</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;