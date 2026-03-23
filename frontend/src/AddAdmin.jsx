import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const AddAdmin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Mock Backend Save Process
    setTimeout(() => {
      setLoading(false);
      setStatus({ 
        type: 'success', 
        message: `Admin account '${formData.email}' has been securely created and saved!` 
      });
      setFormData({ email: '', password: '' });
    }, 1500);
  };

  return (
    <AdminLayout 
      title="Add New Admin" 
      subtitle="Provision access for new coordinators or faculty members."
      breadcrumbs="System Administration / Access Control"
    >
      <div className="admin-glass-card" style={{ maxWidth: '600px' }}>
        
        {status && (
          <div 
            className="stagger-1" 
            style={{ 
              padding: '1rem', 
              borderRadius: '12px', 
              marginBottom: '2rem', 
              background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: status.type === 'success' ? '#10b981' : '#ef4444'
            }}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="stagger-2">
          <div className="admin-input-group">
            <label>Gmail Address</label>
            <input 
              type="email" 
              className="admin-input" 
              placeholder="e.g. coordinator@vignanit.edu.in"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Secure Password</label>
            <input 
              type="password" 
              className="admin-input" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading || !formData.email || !formData.password}
          >
            {loading ? (
              <><span className="spinner">↻</span> Saving...</>
            ) : (
              'Create & Save Admin'
            )}
          </button>
        </form>
      </div>

      <style>{`
        .spinner { animation: spin 1s linear infinite; display: inline-block; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </AdminLayout>
  );
};

export default AddAdmin;
