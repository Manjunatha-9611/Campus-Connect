import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Notices from './pages/Notices';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminNotices from './pages/admin/AdminNotices';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import CreateNotice from './pages/admin/CreateNotice';
import EditNotice from './pages/admin/EditNotice';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './pages/Profile';
import './App.css';

// Import additional pages
import Clients from './pages/CLients';
import ContactUs from './pages/ContactUs';
import Echo from './pages/Echo';
import Gallery from './pages/Gallery';
import InPersonFairs from './pages/InPersonFairs';
import OurNetwork from './pages/OurNetwork';
import TheHub from './pages/TheHub';
import VirtualSessions from './pages/VirtualSessions';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <div className="app-container d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 py-4">
              <div className="container">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes - Student */}
                  <Route path="/dashboard" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />

                  {/* Protected Routes - Admin */}
                  <Route path="/admin/dashboard" element={
                    <PrivateRoute requiredRole="admin">
                      <AdminDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/events" element={
                    <PrivateRoute requiredRole="admin">
                      <AdminEvents />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/events/create" element={
                    <PrivateRoute requiredRole="admin">
                      <CreateEvent />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/events/edit/:id" element={
                    <PrivateRoute requiredRole="admin">
                      <EditEvent />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/notices" element={
                    <PrivateRoute requiredRole="admin">
                      <AdminNotices />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/notices/create" element={
                    <PrivateRoute requiredRole="admin">
                      <CreateNotice />
                    </PrivateRoute>
                  } />
                  <Route path="/admin/notices/edit/:id" element={
                    <PrivateRoute requiredRole="admin">
                      <EditNotice />
                    </PrivateRoute>
                  } />

                  {/* Additional Routes */}
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/echo" element={<Echo />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/in-person-fairs" element={<InPersonFairs />} />
                  <Route path="/our-network" element={<OurNetwork />} />
                  <Route path="/the-hub" element={<TheHub />} />
                  <Route path="/virtual-sessions" element={<VirtualSessions />} />

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;