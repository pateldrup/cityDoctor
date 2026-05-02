import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FindDoctor from './pages/FindDoctor';
import EmergencyHelp from './pages/EmergencyHelp';

import CostEstimator from './pages/CostEstimator';
import About from './pages/About';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';

import BookingConfirmedPage from './pages/BookingConfirmedPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import BookingsPage from './pages/BookingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import ToastContainer from './components/ToastContainer';
import NotificationsPage from './pages/NotificationsPage';
import './index.css';

function App() {
  return (
    <div className="bg-bgLight min-h-screen font-body selection:bg-primary/20 selection:text-primary">
        <ToastContainer />
        <Routes>
          {/* Main Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
          <Route path="/cost-estimator" element={<CostEstimator />} />
          <Route path="/about" element={<About />} />

          {/* Functional Routes */}
          <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
          <Route path="/book/:doctorId" element={<BookAppointment />} />
          <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

          {/* Legacy & Redirects */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/search" element={<Navigate to="/find-doctor" replace />} />
          <Route path="/sos" element={<Navigate to="/emergency" replace />} />
          <Route path="/costs" element={<Navigate to="/cost-estimator" replace />} />
          
          {/* 404 Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
  );
}

export default App;
