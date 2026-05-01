import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import BookingConfirmedPage from './pages/BookingConfirmedPage';
import SOSPage from './pages/SOSPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="bg-[#F0F4F8] min-h-screen font-primary">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage />} />
          <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Default Legacy Redirects */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/doctors" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
