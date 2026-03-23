import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const EventManagement = [
    {
      title: 'Create Event',
      description: 'Launch a new official event with detailed timelines and organisers.',
      path: '/create-event',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      ),
      action: 'Start Now'
    },
    {
      title: 'Gallery Upload',
      description: 'Upload and manage high-quality photos for event galleries.',
      path: '/gallery-upload',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      ),
      action: 'Upload Media'
    },
    {
      title: 'Manage Events',
      description: 'Edit, delete, or track the status of all existing portal events.',
      path: '/manage-events',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
      ),
      action: 'Manage Database'
    }
  ];

  const SystemAdministration = [
    {
      title: 'Faculty Requests',
      description: 'Review and manage new faculty registrations and approvals.',
      path: '/faculty-requests',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      action: 'Review Requests'
    },
    {
      title: 'Add Admins',
      description: 'Provision and manage administrative access for portal coordinators.',
      path: '/add-admin',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
      ),
      action: 'User Access'
    }
  ];

  const renderCard = (option, idx) => (
    <Link 
      key={idx} 
      to={option.path} 
      className={`admin-glass-card interactive stagger-${(idx % 3) + 1}`}
      style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
    >
      <div style={{ color: 'var(--admin-accent)', marginBottom: '1.25rem', padding: '12px', background: '#eff6ff', display: 'inline-flex', borderRadius: '10px', width: 'fit-content' }}>
        {option.icon}
      </div>
      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--admin-text-main)', fontWeight: 700 }}>{option.title}</h3>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{option.description}</p>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-accent)', fontWeight: 600, fontSize: '0.9rem' }}>
        {option.action} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </Link>
  );

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Official systems management console for Vignan's Institute of Information Technology."
      breadcrumbs="Dashboard"
    >
      <h2 className="admin-section-heading">Event Operations</h2>
      <div className="admin-grid">
        {EventManagement.map((opt, i) => renderCard(opt, i))}
      </div>

      <h2 className="admin-section-heading" style={{ marginTop: '3.5rem' }}>System Administration</h2>
      <div className="admin-grid">
        {SystemAdministration.map((opt, i) => renderCard(opt, i))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
