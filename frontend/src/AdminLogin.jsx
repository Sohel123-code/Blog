import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-theme.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-glass-card" style={{ maxWidth: '420px', width: '100%', padding: '3.5rem 3rem', animation: 'floatIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 className="admin-brand-login" style={{ margin: 0, padding: 0, fontSize: '2.25rem', letterSpacing: '-0.5px' }}>
            VIGNAN IT
          </h1>
          <div style={{ color: 'var(--admin-accent)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', marginTop: '4px', textTransform: 'uppercase' }}>
            Secure Portal
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="admin-input"
              placeholder="admin@vignanit.edu.in" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="admin-input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="admin-input"
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="admin-btn" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', fontSize: '1rem' }}>
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
