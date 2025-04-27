import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user info is in localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo) {
      setUser(userInfo);
    }
    
    setLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        config
      );
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message);
      setLoading(false);
      throw error;
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        { name, email, password },
        config
      );
      
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message);
      setLoading(false);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      error,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user && user.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};
