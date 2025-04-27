import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../css/Header.css';

const Header = () => {
  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">C</span>
            <span className="logo-text">CampusConnect</span>
          </Link>
        </div>

        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/events" 
                className={location.pathname === '/events' ? 'active' : ''}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/notices" 
                className={location.pathname === '/notices' ? 'active' : ''}
              >
                Notices
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/network" 
                className={location.pathname === '/network' ? 'active' : ''}
              >
                Network
              </Link>
            </li>
          </ul>

          <div className="auth-buttons">
            {currentUser ? (
              <div className="user-menu">
                <div className="user-avatar">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-dropdown">
                  <span className="user-name">{currentUser.name}</span>
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    {currentUser.role === 'admin' && (
                      <Link to="/admin/dashboard" className="dropdown-item">Admin Panel</Link>
                    )}
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item logout-btn" onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;