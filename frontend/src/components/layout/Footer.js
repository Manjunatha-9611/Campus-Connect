import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import '../../css/Footer.css';
import logo from '../../assets/logo-placeholder.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Link to="/">
              <span className="logo-icon"><img src={logo} alt="Campus Connect Logo" className="logo-img" /></span>
              <span>CampusConnect</span>
            </Link>
          </div>
          <p className="footer-tagline">We believe in personalizing the learner's experience, rather than have a "cookie cutter" approach.</p>
          
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
          
          <div className="footer-newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Sign up</button>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-links-column">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/events/in-person-fairs">InPerson Fairs</Link></li>
              <li><Link to="/the-hub">The Hub</Link></li>
              <li><Link to="/events/virtual-sessions">VirtualSessions</Link></li>
              <li><Link to="/our-network">Our Network</Link></li>
              <li><Link to="/echo">Echo</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/clients">Clients</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h4>Contact Info</h4>
            <address>
              <p>Yelahanka, Bangalore, Karnataka -560064</p>
              <p className="contact-phone">+91-9876543210</p>
              <p className="contact-email">info@campusconnectglobal.com</p>
            </address>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CampusConnect Global. All Rights Reserved.</p>
        <p>Developed By <a href="https://example.com" target="_blank" rel="noopener noreferrer">Manjunatha</a></p>
      </div>
    </footer>
  );
};

export default Footer;