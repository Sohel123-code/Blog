import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './admin-theme.css';

const AdminLayout = ({ children, title, subtitle, breadcrumbs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const primaryNav = [
    { 
      path: '/dashboard', 
      label: 'Overview', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> 
    }
  ];

  const managementNav = [
    { 
      path: '/create-event', 
      label: 'Create Event', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> 
    },
    { 
      path: '/manage-events', 
      label: 'All Events', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg> 
    },
    { 
      path: '/gallery-upload', 
      label: 'Gallery Uploads', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg> 
    }
  ];

  const settingsNav = [
    { 
      path: '/faculty-requests', 
      label: 'Faculty Approvals', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg> 
    },
    { 
      path: '/add-admin', 
      label: 'Access Control', 
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg> 
    }
  ];

  const renderNavItems = (items) => (
    items.map((item) => (
      <div 
        key={item.path}
        className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
        onClick={() => navigate(item.path)}
      >
        {item.icon}
        {item.label}
      </div>
    ))
  );

  return (
    <div className="admin-body">
      <div className="admin-layout">
        
        {/* Sidebar */}
        <nav className="admin-sidebar stagger-1">
          <div className="admin-brand">
            VIGNAN IT
            <span>ADMIN</span>
          </div>
          
          <div className="admin-nav">
            <div className="admin-nav-group" style={{ marginTop: '0.5rem' }}>Core</div>
            {renderNavItems(primaryNav)}

            <div className="admin-nav-group">Event Management</div>
            {renderNavItems(managementNav)}

            <div className="admin-nav-group">Administration</div>
            {renderNavItems(settingsNav)}
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--admin-border)' }}>
            <div 
              className="admin-nav-item" 
              style={{ color: '#ef4444', margin: 0, justifyContent: 'center', background: '#fef2f2' }}
              onClick={() => navigate('/')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="admin-content-wrapper">
          
          {/* Topbar */}
          <header className="admin-topbar stagger-2">
            <div className="admin-breadcrumbs">
              <span onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>Portal</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              <span className="current">{breadcrumbs || title}</span>
            </div>

            <div className="admin-topbar-profile">
              <span>Admin User</span>
              <div className="admin-avatar">A</div>
            </div>
          </header>

          <main className="admin-main">
            {title && (
              <div className="admin-page-header stagger-3">
                <h1 className="admin-page-title">{title}</h1>
                {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
              </div>
            )}
            
            <div className="stagger-3">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
