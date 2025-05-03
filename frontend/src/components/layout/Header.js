import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa';
import './Header.css';
import logo from '../../assets/logo-placeholder.png';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/notices" className="nav-link">Notices</Link>
        </>
      );
    }
    if (isAdmin) {
      return (
        <>
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/admin/events" className="nav-link">Manage Events</Link>
          <Link to="/admin/notices" className="nav-link">Manage Notices</Link>
        </>
      );
    }
    return (
      <>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/events" className="nav-link">Events</Link>
        <Link to="/notices" className="nav-link">Notices</Link>
      </>
    );
  };

  return (
    <header className={`header${isScrolled ? ' scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
        <Link to="/" className="nav-link">
          <img src={logo} alt="Campus Connect Logo" className="logo-img" />
          <span className="logo-text">Campus Connect</span>
          </Link>
        </div>
        <nav className="nav-menu">
          {renderNavLinks()}
        </nav>
        <div className="user-section">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <span className="user-avatar" onClick={() => setIsDropdownOpen((v) => !v)}>
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="header-profile-pic" />
                ) : (
                  user.name[0]
                )}
              </span>
              <span className="user-name" onClick={() => setIsDropdownOpen((v) => !v)}>{user.name}</span>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <a href="/profile">Profile</a>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
