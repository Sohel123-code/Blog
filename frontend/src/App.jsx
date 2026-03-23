import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Admin imports
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import CreateEvent from './CreateEvent';
import GalleryUpload from './GalleryUpload';
import AddAdmin from './AddAdmin';

// Blog imports
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import SecurityWrapper from './SecurityWrapper';
import ScrollToTop from './ScrollToTop';

import './index.css';

const DynamicTitle = () => {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    let title = "VIIT Events Portal"; // Default
    if (path === '/') title = "Home | VIIT Events Portal";
    else if (path.startsWith('/events')) title = "Events | VIIT Events Portal";
    else if (path === '/login') title = "Admin Login | VIIT";
    else if (path === '/dashboard') title = "Dashboard | Admin";
    else if (path === '/create-event') title = "Create Event | Admin";
    else if (path === '/gallery-upload') title = "Gallery Upload | Admin";
    else if (path === '/add-admin') title = "Add Admin | Admin";
    else if (path === '/manage-events') title = "Manage Events | Admin";
    else if (path === '/faculty-requests') title = "Faculty | Admin";

    document.title = title;
  }, [location]);
  
  return null;
};

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student');

  return (
    <Router>
      <DynamicTitle />
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/gallery-upload" element={<GalleryUpload />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/faculty-requests" element={<div className="dashboard-container"><h1>Faculty Requests</h1><p>Coming Soon...</p><button className="btn btn-primary" onClick={() => window.history.back()}>Back</button></div>} />
        <Route path="/manage-events" element={<div className="dashboard-container"><h1>Manage Events</h1><p>Coming Soon...</p><button className="btn btn-primary" onClick={() => window.history.back()}>Back</button></div>} />

        {/* Blog Routes */}
        <Route
          path="/*"
          element={
            <SecurityWrapper userRole={userRole}>
              <Routes>
                <Route path="/" element={<HomePage userRole={userRole} setUserRole={setUserRole} />} />
                <Route path="/events" element={<EventsPage userRole={userRole} setUserRole={setUserRole} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </SecurityWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
