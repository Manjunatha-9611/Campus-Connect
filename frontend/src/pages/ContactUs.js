import React, { useState } from 'react';
import '../css/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  const locations = [
    {
      id: 1,
      name: "Main Office",
      address: "123 Business Ave, Suite 500",
      city: "Metropolis, NY 10001",
      phone: "(555) 123-4567",
      email: "info@company.com",
      hours: "Mon-Fri: 9am - 6pm"
    },
    {
      id: 2,
      name: "West Coast Branch",
      address: "456 Innovation Blvd",
      city: "Tech City, CA 90210",
      phone: "(555) 987-6543",
      email: "westcoast@company.com",
      hours: "Mon-Fri: 8am - 5pm"
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header glass-panel">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out with questions, feedback, or partnership opportunities.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-form-section glass-panel">
          <h2>Send Us a Message</h2>
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="How can we help?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
        
        <div className="contact-info-section">
          <div className="office-locations">
            <h2>Our Locations</h2>
            
            <div className="locations-grid">
              {locations.map(location => (
                <div key={location.id} className="location-card glass-panel">
                  <h3>{location.name}</h3>
                  <div className="location-details">
                    <p>{location.address}<br />{location.city}</p>
                    <p><strong>Phone:</strong> {location.phone}</p>
                    <p><strong>Email:</strong> {location.email}</p>
                    <p><strong>Hours:</strong> {location.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="quick-contact glass-panel">
            <h2>Connect With Us</h2>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="faq-section glass-panel">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What services do you offer?</h3>
            <p>We provide career counseling, job placement, skills training, and networking opportunities for professionals across various industries.</p>
          </div>
          <div className="faq-item">
            <h3>How quickly will I receive a response?</h3>
            <p>We strive to respond to all inquiries within 24-48 business hours.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer virtual consultations?</h3>
            <p>Yes, we provide both in-person and virtual consultation options to accommodate your schedule and location.</p>
          </div>
          <div className="faq-item">
            <h3>How can I become a partner?</h3>
            <p>Please reach out through our contact form with details about your organization, and our partnership team will contact you to discuss opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;