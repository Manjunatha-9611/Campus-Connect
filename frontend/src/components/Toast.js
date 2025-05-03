import React, { useState, useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa';
import '../css/Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'info':
      default:
        return <FaInfo />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-content">
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={() => {
        setIsVisible(false);
        onClose();
      }}>
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast; 