import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import '../css/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <FaExclamationTriangle className="error-icon" />
            <h1>Oops! Something went wrong</h1>
            <p>We apologize for the inconvenience. Please try refreshing the page or return to the home page.</p>
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()} 
                className="refresh-btn"
              >
                Refresh Page
              </button>
              <Link to="/" className="home-btn">
                <FaHome /> Return Home
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="error-details">
                <h3>Error Details (Development Only):</h3>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 