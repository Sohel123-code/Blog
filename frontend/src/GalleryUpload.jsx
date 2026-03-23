import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const GalleryUpload = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [types] = useState([
    'academic', 'technical', 'cultural', 'sports', 
    'club_activities', 'placement_career', 'social', 'announcements', 'other'
  ]); // Matched with CreateEvent.jsx
  const [selectedType, setSelectedType] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch events when type changes
  useEffect(() => {
    if (selectedType) {
      fetchEventsByCategory(selectedType);
    } else {
      setEvents([]);
    }
    setSelectedEventId('');
  }, [selectedType]);

  const fetchEventsByCategory = async (catType) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/allevents/${catType}`);
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId || !file) {
      setMessage({ type: 'error', text: 'Please select an event and an image.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('id', selectedEventId);
    formData.append('images', file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/event-images`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        setMessage({ type: 'success', text: 'Image added to official gallery successfully!' });
        setFile(null);
        setPreview(null);
      } else {
        setMessage({ type: 'error', text: 'Failed to upload image. Please try again.' });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Connection error or timeout. Please check your backend.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout 
      title="Gallery Upload" 
      subtitle="Select an official event and upload photos to its gallery."
      breadcrumbs="Event Operations / Gallery Media"
    >
      <div className="admin-glass-card stagger-1" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {message.text && (
            <div className={`status-msg ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Step 1: Classification</h3>
              <div className="form-group">
                <label>Event Type</label>
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  disabled={loading}
                  style={{ textTransform: 'capitalize' }}
                >
                  <option value="">Select Category</option>
                  {types.map(t => (
                    <option key={t} value={t}>
                      {t.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {selectedType && (
                <div className="form-group" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                  <label>Select Specific Event</label>
                  <select 
                    value={selectedEventId} 
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Choose an event</option>
                    {events.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Step 2: Media Selection</h3>
              <div className="form-group">
                <label>Gallery Image</label>
                <div 
                  className="upload-box" 
                  onClick={() => document.getElementById('gallery-input').click()}
                  style={{ 
                    border: '2px dashed #d1d5db', 
                    borderRadius: 'var(--radius-btn)',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#f8fafc',
                    transition: 'all 0.2s',
                  }}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" style={{ maxHeight: '200px', borderRadius: '8px' }} />
                  ) : (
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      <p style={{ color: '#64748b' }}>Click to select or drag and drop an event photo</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    id="gallery-input" 
                    hidden 
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading || !selectedEventId || !file}
              style={{ padding: '1.2rem', fontSize: '1rem' }}
            >
              {loading ? 'Uploading...' : 'Add to Event Gallery'}
            </button>
          </form>
        </div>
    </AdminLayout>
  );
};

export default GalleryUpload;
