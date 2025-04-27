import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Notices from './pages/Notices';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminEvents from './pages/admin/AdminEvents';
import AdminNotices from './pages/admin/AdminNotices';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import CreateNotice from './pages/admin/CreateNotice';
import EditNotice from './pages/admin/EditNotice';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1 py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes - Admin Only */}
                <Route path="/admin/events" element={
                  <AdminRoute>
                    <AdminEvents />
                  </AdminRoute>
                } />
                <Route path="/admin/events/create" element={
                  <AdminRoute>
                    <CreateEvent />
                  </AdminRoute>
                } />
                <Route path="/admin/events/edit/:id" element={
                  <AdminRoute>
                    <EditEvent />
                  </AdminRoute>
                } />
                <Route path="/admin/notices" element={
                  <AdminRoute>
                    <AdminNotices />
                  </AdminRoute>
                } />
                <Route path="/admin/notices/create" element={
                  <AdminRoute>
                    <CreateNotice />
                  </AdminRoute>
                } />
                <Route path="/admin/notices/edit/:id" element={
                  <AdminRoute>
                    <EditNotice />
                  </AdminRoute>
                } />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;