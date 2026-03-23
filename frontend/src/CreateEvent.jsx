import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    organisers: [''],
    timeline: [{ stage: '', date: '' }],
    timings: { start: '', end: '' },
    createdBy: '',
    type: '',
    venue: '',
    isActive: true,
    poster: null
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleTimingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      timings: { ...prev.timings, [name]: value }
    }));
  };

  const handleOrganiserChange = (index, value) => {
    const newOrganisers = [...formData.organisers];
    newOrganisers[index] = value;
    setFormData((prev) => ({ ...prev, organisers: newOrganisers }));
  };

  const addOrganiser = () => {
    setFormData((prev) => ({ ...prev, organisers: [...prev.organisers, ''] }));
  };

  const removeOrganiser = (index) => {
    if (formData.organisers.length > 1) {
      const newOrganisers = formData.organisers.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, organisers: newOrganisers }));
    }
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index][field] = value;
    setFormData((prev) => ({ ...prev, timeline: newTimeline }));
  };

  const addTimelineStage = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { stage: '', date: '' }]
    }));
  };

  const removeTimelineStage = (index) => {
    if (formData.timeline.length > 1) {
      const newTimeline = formData.timeline.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, timeline: newTimeline }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('details', formData.details);
      data.append('organisers', JSON.stringify(formData.organisers));
      data.append('timeline', JSON.stringify(formData.timeline));
      data.append('timings', JSON.stringify(formData.timings));
      data.append('createdBy', formData.createdBy);
      data.append('type', formData.type);
      data.append('venue', formData.venue);
      data.append('isActive', formData.isActive ? "true" : "false");
      
      if (formData.poster) {
        data.append('poster', formData.poster);
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/newevent`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Event successfully created!' });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        const errData = await response.json();
        setStatus({ type: 'error', message: errData.message || 'Failed to create event.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Network error. Make sure the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout 
      title="Official Event Creation" 
      subtitle="VIGNAN'S INSTITUTE OF INFORMATION TECHNOLOGY (A) - EVENTS PORTAL"
      breadcrumbs="Event Operations / Create Event"
    >
      <div className="admin-glass-card stagger-1" style={{ maxWidth: '800px', margin: '0 auto' }}>

        {status.message && (
          <div className={`status-msg ${status.type}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="input-row">
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. VIGNAN'S TECH FEST"
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="academic">Academic</option>
                  <option value="technical">Technical</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="club_activities">Club Activities</option>
                  <option value="placement_career">Placement &amp; Career</option>
                  <option value="social">Social &amp; Community</option>
                  <option value="announcements">Announcements</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="A catchy short description"
              />
            </div>

            <div className="form-group">
              <label>Detailed Content</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Full event details and instructions..."
              ></textarea>
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                placeholder="e.g. Main Auditorium"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Organisers & Timings</h3>
            <div className="form-group">
              <label>Organisers</label>
              {formData.organisers.map((org, index) => (
                <div key={index} className="flex-row">
                  <input
                    type="text"
                    value={org}
                    onChange={(e) => handleOrganiserChange(index, e.target.value)}
                    required
                    placeholder={`Organiser ${index + 1}`}
                  />
                  {formData.organisers.length > 1 && (
                    <button type="button" className="btn btn-secondary" onClick={() => removeTimelineStage(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={addOrganiser} style={{ marginTop: '0.5rem' }}>
                + Add Organiser
              </button>
            </div>

            <div className="input-row">
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  name="start"
                  value={formData.timings.start}
                  onChange={handleTimingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  name="end"
                  value={formData.timings.end}
                  onChange={handleTimingChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Timeline</h3>
            {formData.timeline.map((item, index) => (
              <div key={index} className="input-row">
                <div className="form-group">
                  <label>Stage Name</label>
                  <input
                    type="text"
                    value={item.stage}
                    onChange={(e) => handleTimelineChange(index, 'stage', e.target.value)}
                    required
                    placeholder="e.g. Registration"
                  />
                </div>
                <div className="form-group flex-row">
                  <div style={{ flex: 1 }}>
                    <label>Date & Time</label>
                    <input
                      type="datetime-local"
                      value={item.date}
                      onChange={(e) => handleTimelineChange(index, 'date', e.target.value)}
                      required
                    />
                  </div>
                  {formData.timeline.length > 1 && (
                    <button type="button" className="btn btn-secondary" onClick={() => removeTimelineStage(index)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addTimelineStage}>
              + Add Stage
            </button>
          </div>

          <div className="form-section">
            <h3>Administrative</h3>
            <div className="input-row">
              <div className="form-group">
                <label>Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  required
                  placeholder="Your Name/Dept"
                />
              </div>
              <div className="form-group">
                <label>Poster Image</label>
                <input
                  type="file"
                  name="poster"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                style={{ width: 'auto' }}
              />
              <label style={{ marginBottom: 0 }}>Event is Active and Visible to Users</label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateEvent;
