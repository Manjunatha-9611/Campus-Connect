import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import { AuthContext } from '../../contexts/AuthContext';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notices`);
      setNotices(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setError('Failed to fetch notices');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      await axios.delete(`${API_URL}/api/notices/${id}`, config);
      setSuccess('Notice deleted successfully');
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      setError(error.response?.data?.message || 'Failed to delete notice');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <div className="p-4" style={{ backgroundColor: '#fff' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded" style={{ backgroundColor: '#8B0000', color: '#fff' }}>
        <h1 className="h3 fw-bold mb-0">Manage Notices</h1>
        <Link to="/admin/notices/create">
          <Button variant="light" className="fw-bold" style={{ backgroundColor: '#fff', color: '#8B0000', borderRadius: '25px' }}>
            + Create Notice
          </Button>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

      {notices.length === 0 ? (
        <p className="text-center">No notices available.</p>
      ) : (
        <div className="p-3 rounded shadow" style={{ backgroundColor: '#f8f9fa' }}>
          <Table bordered hover responsive className="text-center align-middle" style={{ backgroundColor: '#fff' }}>
            <thead style={{ backgroundColor: '#8B0000', color: '#fff' }}>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice._id}>
                  <td className="fw-semibold">{notice.title}</td>
                  <td>{notice.category}</td>
                  <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/notices/edit/${notice._id}`}>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        style={{ borderRadius: '20px', fontWeight: 'bold' }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(notice._id)}
                      style={{ borderRadius: '20px', fontWeight: 'bold' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
