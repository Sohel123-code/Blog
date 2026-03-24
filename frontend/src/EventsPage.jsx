import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ANNOUNCEMENTS = [
  { id: 1, title: "Vignan TechFest 2026 Registrations Open", date: "12 March 2026", tag: "Technical" },
  { id: 2, title: "B.Tech II Year Mid Examination Timetable Released", date: "10 March 2026", tag: "Academic" },
  { id: 3, title: "Campus Placement Training Session", date: "18 March 2026", tag: "Placement" },
  { id: 4, title: "24-Hour Coding Hackathon", date: "22 March 2026", tag: "Technical" },
];

const EVENT_CATEGORIES = [
  {
    id: 1,
    title: 'Academic Events',
    type: 'academic',
    subtitle: 'Learning & Knowledge',
    description:
      'Expand your academic horizons through workshops, seminars, guest lectures, conferences, and technical talks. These learning-focused events bring industry experts and scholars to campus, offering students a chance to gain insights beyond the classroom.',
    types: ['Workshops', 'Seminars', 'Guest Lectures', 'Conferences', 'Technical Talks'],
    image: '/images/1_DEmjwMFD4JTqtdasWJ5Reg.jpg',
    color: '#3b6cb7',
  },
  {
    id: 2,
    title: 'Technical Events',
    type: 'technical',
    subtitle: 'Code · Build · Innovate',
    description:
      'Put your engineering skills to the test in coding competitions, hackathons, project expos, and tech fests. These events are perfect for CSE and Engineering students looking to showcase their projects, collaborate, and compete at the highest level.',
    types: ['Coding Competitions', 'Hackathons', 'Project Expos', 'Tech Fests', 'Paper Presentations'],
    image: '/images/IMG_20190208_111641.jpg',
    color: '#37319c',
  },
  {
    id: 3,
    title: 'Cultural Events',
    type: 'cultural',
    subtitle: 'Entertainment & Creativity',
    description:
      'Celebrate talent, creativity, and culture through dance programs, music shows, drama and skits, festive celebrations, and talent shows. These vibrant events bring the campus to life and give students a platform to express themselves.',
    types: ['Dance Programs', 'Music Shows', 'Drama / Skits', 'Fest Celebrations', 'Talent Shows'],
    image: '/images/college-fest.jpg',
    color: '#7c3aed',
  },
  {
    id: 4,
    title: 'Sports Events',
    type: 'sports',
    subtitle: 'Play Hard · Win Together',
    description:
      'Stay active and competitive with cricket matches, football tournaments, athletics, and indoor games. Sports events at VIIT encourage teamwork, sportsmanship, and physical fitness among all students.',
    types: ['Cricket Matches', 'Football Tournaments', 'Athletics', 'Indoor Games'],
    image: '/images/download.jpeg',
    color: '#0f766e',
  },
  {
    id: 5,
    title: 'Club Activities',
    type: 'club_activities',
    subtitle: 'Organized by Student Clubs',
    description:
      'Join the Coding Club, Robotics Club, Literary Club, Photography Club and many more. Student-run clubs organize a wide range of events that help build skills, foster community, and ignite passions outside the regular curriculum.',
    types: ['Coding Club Events', 'Robotics Club', 'Literary Club', 'Photography Club'],
    image: '/images/1_DEmjwMFD4JTqtdasWJ5Reg.jpg',
    color: '#b45309',
  },
  {
    id: 6,
    title: 'Placement & Career',
    type: 'placement_career',
    subtitle: 'Your Future Starts Here',
    description:
      'Kickstart your career with placement drives, internship programs, career guidance sessions, and resume workshops. These events connect students with top recruiters and equip them with the skills needed to thrive in the competitive job market.',
    types: ['Placement Drives', 'Internship Programs', 'Career Guidance Sessions', 'Resume Workshops'],
    image: '/images/i4.png',
    color: '#1c3350',
  },
  {
    id: 7,
    title: 'Social & Community',
    type: 'social',
    subtitle: 'Social Responsibility',
    description:
      'Give back to society through blood donation camps, NSS activities, awareness programs, and charity events. These initiatives cultivate empathy, leadership, and a sense of civic responsibility among VIIT students.',
    types: ['Blood Donation Camps', 'NSS Activities', 'Awareness Programs', 'Charity Events'],
    image: '/images/images.jpeg',
    color: '#be123c',
  },
  {
    id: 8,
    title: 'College Announcements',
    type: 'announcements',
    subtitle: 'Stay Informed',
    description:
      'Keep up with holidays, circulars, important notices, and exam updates. This section ensures every student stays informed about institutional announcements and critical academic updates throughout the semester.',
    types: ['Holidays', 'Circulars', 'Important Notices', 'Exam Updates'],
    image: '/images/images (1).jpeg',
    color: '#374151',
  },
];

/* ── Screenshot-blur hook ── */
function useScreenshotBlur(containerRef, isStudent) {
  useEffect(() => {
    if (!isStudent) return;
    const blur = () => containerRef.current?.classList.add('screenshot-blur-active');
    const unblur = () => containerRef.current?.classList.remove('screenshot-blur-active');
    const blockKey = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        blur();
        setTimeout(unblur, 2000);
      }
    };
    window.addEventListener('blur', blur);
    window.addEventListener('focus', unblur);
    window.addEventListener('keyup', blockKey);
    return () => {
      window.removeEventListener('blur', blur);
      window.removeEventListener('focus', unblur);
      window.removeEventListener('keyup', blockKey);
    };
  }, [isStudent, containerRef]);
}

/* ── SVG Icon helpers ── */
const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconExpand = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────── */

function useInView(ref, once = true) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [once, ref]);
  return inView;
}

function CatCardReveal({ cat, i, handleCategoryClick }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`cat-card ${inView ? 'ep-reveal-in' : 'ep-reveal-out'} ${i % 2 === 1 ? 'cat-reverse' : ''}`}
      style={{ transitionDelay: `${(i % 2) * 0.15}s` }}
    >
      <div className="cat-card-body">
        <div className="cat-card-meta">
          <span className="cat-number">{cat.id.toString().padStart(2, '0')}</span>
          <span className="cat-subtitle">{cat.subtitle}</span>
        </div>
        <h2 className="cat-title">{cat.title}</h2>
        <p className="cat-desc">{cat.description}</p>
        <div className="cat-tags">
          {cat.types.map((t) => (
            <span key={t} className="cat-tag">{t}</span>
          ))}
        </div>
        <button className="btn-primary cat-cta" onClick={() => handleCategoryClick(cat)}>
          Browse Events <IconArrowRight />
        </button>
      </div>
      <div className="cat-card-img-wrap protected-img-container watermark-overlay">
        <div className="bg-img-protected cat-card-img" style={{ backgroundImage: `url(${cat.image})` }} />
        <div className="cat-img-accent" style={{ background: cat.color }} />
      </div>
    </div>
  );
}

export default function EventsPage({ userRole, setUserRole }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [currentView, setCurrentView] = React.useState('categories');
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [categoryEvents, setCategoryEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [visiblePhotosCount, setVisiblePhotosCount] = React.useState(12);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(null);

  const isStudent = userRole !== 'faculty';
  useScreenshotBlur(containerRef, isStudent);

  /* ── Slideshow logic (now handled by Swiper Autoplay) ── */

  useEffect(() => { window.scrollTo(0, 0); }, [currentView, selectedCategory, selectedEvent]);

  /* ── Data fetching ── */
  const fetchCategoryEvents = async (catType) => {
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    const fetchUrl = `${baseUrl}/allevents/${catType}`;
    
    console.log(`Fetching events from: ${fetchUrl}`);
    
    try {
      const res = await fetch(fetchUrl);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Fetch failed with status ${res.status}: ${errorText}`);
      }
      const data = await res.json();
      console.log(`Successfully fetched ${data.length} events for ${catType}`);
      setCategoryEvents(data);
    } catch (err) { 
      console.error("Error fetching category events:", err);
      setCategoryEvents([]); 
    }
    finally { setIsLoading(false); }
  };

  const toggleFaculty = () => {
    const newRole = userRole === 'faculty' ? 'student' : 'faculty';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    alert(`Switched to ${newRole.toUpperCase()} mode! ${newRole === 'faculty' ? 'You can now download and copy.' : 'Protections are now active.'}`);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCurrentView('gallery');
    setVisiblePhotosCount(12);
    setSelectedPhotoIndex(null);
    fetchCategoryEvents(cat.type);
  };

  const handleEventClick = async (event) => {
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const imgRes = await fetch(`${baseUrl}/images-receive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: event._id || event.id }),
      });
      let allPhotos = [];
      if (imgRes.ok) {
        const result = await imgRes.json();
        if (result.data?.[0]?.poster) allPhotos = result.data[0].poster.map(img => img.url);
      }
      if (event.poster?.url && !allPhotos.includes(event.poster.url)) allPhotos.unshift(event.poster.url);
      setSelectedEvent({ ...event, allPhotos });
      setCurrentView('detail');
      setVisiblePhotosCount(12);
      setSelectedPhotoIndex(null);
    } catch {
      setSelectedEvent({ ...event, allPhotos: event.poster?.url ? [event.poster.url] : [] });
      setCurrentView('detail');
      setVisiblePhotosCount(12);
    } finally {
      setIsLoading(false);
    }
  };

  const resetToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setCategoryEvents([]);
    setSelectedEvent(null);
    setVisiblePhotosCount(12);
    setSelectedPhotoIndex(null);
  };

  /* ── Shared nav pills ── */
  const NavPills = ({ onBack, backLabel }) => (
    <div className="ed-nav-pills">
      <button className="ed-pill ed-pill-outline" onClick={onBack}>
        <IconArrowLeft /> {backLabel}
      </button>
      <button className="ed-pill ed-pill-solid" onClick={() => navigate('/')}>
        <IconHome /> Exit to Home
      </button>
    </div>
  );

  /* ══════════════════════════════════════════════════════════
     VIEW 1 – CATEGORIES
  ══════════════════════════════════════════════════════════ */
  const renderCategories = () => (
    <div className="cat-container">
      {EVENT_CATEGORIES.map((cat, i) => (
        <CatCardReveal key={cat.id} cat={cat} i={i} handleCategoryClick={handleCategoryClick} />
      ))}
    </div>
  );

  /* ══════════════════════════════════════════════════════════
     VIEW 2 – EVENTS GALLERY (Event cards for a category)
  ══════════════════════════════════════════════════════════ */
  const renderGallery = () => (
    <div className="ed-view animate-fade-in">
      {/* ── Top breadcrumb bar ── */}
      <NavPills onBack={resetToCategories} backLabel="All Categories" />

      {/* ── Section header ── */}
      <div className="ed-section-hero">
        <div className="ed-section-hero-text">
          <p className="ed-overline">Event Gallery</p>
          <h2 className="ed-section-title">{selectedCategory?.title || 'Events'}</h2>
          <p className="ed-section-sub">{selectedCategory?.description || 'Browse our collection of events.'}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container"><div className="loader" /><p>Loading events…</p></div>
      ) : categoryEvents.length > 0 ? (
        <div className="evgrid">
          {categoryEvents.map(ev => (
            <article key={ev?._id || ev?.id || Math.random()} className="evcard animate-slide-in">
              <div className="evcard-img-wrap protected-img-container watermark-overlay">
                <div
                  className={`bg-img-protected evcard-img${isStudent ? ' no-drag' : ''}`}
                  style={{ backgroundImage: `url(${ev?.poster?.url || ev?.photos?.[0] || '/images/default-event.jpg'})` }}
                />
                <div className="evcard-img-hover">
                  <span>Explore Event</span>
                </div>
              </div>
              <div className="evcard-body">
                {(ev?.date || ev?.eventDate) && (
                  <span className="evcard-date">
                    <IconCalendar /> {ev.date || ev.eventDate}
                  </span>
                )}
                <h3 className="evcard-title">{ev?.title || ev?.eventName || 'Untitled Event'}</h3>
                {ev?.venue && <p className="evcard-venue"><IconPin /> {ev.venue}</p>}
                <button className="btn-primary evcard-btn" onClick={() => handleEventClick(ev)}>
                  View Details <IconArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-events"><p>No events found for this category.</p></div>
      )}
    </div>
  );

  /* ══════════════════════════════════════════════════════════
     VIEW 3 – EVENT DETAIL
  ══════════════════════════════════════════════════════════ */
  const renderEventDetail = () => {
    const ev = selectedEvent;
    if (!ev) return null;
    const posterUrl = ev.poster?.url || ev.allPhotos?.[0] || null;

    return (
      <div className="ed-view animate-fade-in">

        {/* ── Breadcrumb nav ── */}
        <NavPills onBack={() => setCurrentView('gallery')} backLabel="Back to Events" />

        {/* ── Swapped Split Hero (Poster Left) ── */}
        <section className="split-hero ed-split-hero-swapped">
          {/* LEFT: navy panel with bridging image */}
          <div className="split-right ed-split-poster-left">
            <div className="split-img-frame protected-img-container watermark-overlay ed-poster-frame">
              <div
                className="bg-img-protected split-img ed-poster-img"
                style={{ backgroundImage: posterUrl ? `url(${posterUrl})` : 'none' }}
              />
              {ev.allPhotos.length > 0 && (
                <div className="split-badge blog-anim-4">
                  <span className="split-badge-num">{ev.allPhotos.length}+</span>
                  <span className="split-badge-txt">Photos Captured</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: content panel */}
          <div className="split-left ed-split-content-right">
            <p className="split-label blog-anim-1">
              <span className="blog-hero-dot" />
              Official Event Page
            </p>
            {ev.type && (
              <span className="ed-cat-badge blog-anim-2" style={{ alignSelf: 'flex-start' }}>
                {ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}
              </span>
            )}
            <h1 className="split-title ed-detail-title-anim">
              {ev.title || ev.eventName || 'Untitled Event'}
            </h1>
            <p className="split-sub blog-anim-3" style={{ maxWidth: '480px' }}>
              {ev.description || 'Discover the highlights and details of this official event hosted at Vignan Institute. Browse the gallery and timing information below.'}
            </p>
            <div className="ed-hero-meta blog-anim-4">
              <span className="ed-hero-meta-item" style={{ color: 'var(--secondary)' }}><IconCalendar /> {ev.date || ev.eventDate}</span>
              {ev.venue && <span className="ed-hero-meta-sep" style={{ color: '#ccc' }}>·</span>}
              {ev.venue && <span className="ed-hero-meta-item" style={{ color: 'var(--secondary)' }}><IconPin /> {ev.venue}</span>}
            </div>
          </div>
        </section>

        {/* ── Two-column body ── */}
        <div className="ed-body">

          {/* LEFT column */}
          <div className="ed-left">

            {/* Description / Overview */}
            {ev.description && (
              <section className="ed-card">
                <div className="ed-card-header">
                  <span className="ed-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  </span>
                  <h3 className="ed-card-title">About This Event</h3>
                </div>
                <p className="ed-card-body-text">{ev.description}</p>
              </section>
            )}

            {/* Event details */}
            {ev.details && (
              <section className="ed-card">
                <div className="ed-card-header">
                  <span className="ed-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </span>
                  <h3 className="ed-card-title">Event Details</h3>
                </div>
                <p className="ed-card-body-text">{ev.details}</p>
              </section>
            )}

            {/* Organisers */}
            {ev.organisers?.length > 0 && (
              <section className="ed-card">
                <div className="ed-card-header">
                  <span className="ed-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </span>
                  <h3 className="ed-card-title">Organisers</h3>
                </div>
                <div className="ed-tags-row">
                  {ev.organisers.map((o, i) => <span key={i} className="ed-tag">{o}</span>)}
                </div>
              </section>
            )}

            {/* Timeline */}
            {ev.timeline?.length > 0 && (
              <section className="ed-card">
                <div className="ed-card-header">
                  <span className="ed-card-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </span>
                  <h3 className="ed-card-title">Event Timeline</h3>
                </div>
                <div className="ed-timeline">
                  {ev.timeline.map((step, i) => {
                    const stepDate = step?.date ? new Date(step.date) : null;
                    const isValidDate = stepDate && !isNaN(stepDate);
                    return (
                      <div key={i} className="ed-timeline-item">
                        <div className="ed-timeline-dot" />
                        <div className="ed-timeline-body">
                          <p className="ed-timeline-date">
                            {isValidDate 
                              ? stepDate.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                              : (step?.date || 'Date TBD')}
                          </p>
                          {step?.stage && <p className="ed-timeline-label">{step.stage}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Gallery */}
            <section className="ed-card ed-gallery-card">
              <div className="ed-card-header">
                <span className="ed-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </span>
                <h3 className="ed-card-title">Photo Gallery</h3>
                {ev.allPhotos.length > 0 && (
                  <span className="ed-photo-count">{ev.allPhotos.length} photos</span>
                )}
              </div>

              {ev.allPhotos.length > 0 ? (
                <div className="ed-gallery-body">
                  <div className="ed-photo-grid">
                    {ev.allPhotos.slice(0, visiblePhotosCount).map((photo, idx) => (
                      <div
                        key={idx}
                        className={`ed-photo${isStudent ? ' student-photo' : ''}`}
                        onClick={() => setSelectedPhotoIndex(idx)}
                        style={{ animationDelay: `${idx * 0.04}s` }}
                      >
                        <div className="bg-img-protected ed-photo-img" style={{ backgroundImage: `url(${photo})` }} />
                        <div className="ed-photo-hover"><IconExpand /></div>
                      </div>
                    ))}
                  </div>
                  {visiblePhotosCount < ev.allPhotos.length && (
                    <div className="ed-load-more">
                      <button className="btn-outline" onClick={() => setVisiblePhotosCount(p => p + 12)}>
                        Load More Photos
                        <span className="ed-remaining">({ev.allPhotos.length - visiblePhotosCount} remaining)</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="no-photos">No photos available for this event.</p>
              )}
            </section>
          </div>

          {/* RIGHT sticky info card */}
          <aside className="ed-right">
            <div className="ed-info-card">
              <div className="ed-info-card-head">Event Information</div>
              <div className="ed-info-card-body">
                {(ev.date || ev.eventDate) && (
                  <div className="ed-info-row">
                    <span className="ed-info-icon"><IconCalendar /></span>
                    <div>
                      <p className="ed-info-label">Date</p>
                      <p className="ed-info-value">{ev.date || ev.eventDate}</p>
                    </div>
                  </div>
                )}
                {ev?.timings && (
                  <div className="ed-info-row">
                    <span className="ed-info-icon"><IconClock /></span>
                    <div>
                      <p className="ed-info-label">Timings</p>
                      <p className="ed-info-value">{ev.timings?.start || 'TBD'} – {ev.timings?.end || 'TBD'}</p>
                    </div>
                  </div>
                )}
                {ev.venue && (
                  <div className="ed-info-row">
                    <span className="ed-info-icon"><IconPin /></span>
                    <div>
                      <p className="ed-info-label">Venue</p>
                      <p className="ed-info-value">{ev.venue}</p>
                    </div>
                  </div>
                )}
                {ev.createdBy && (
                  <div className="ed-info-row">
                    <span className="ed-info-icon"><IconUser /></span>
                    <div>
                      <p className="ed-info-label">Proposed By</p>
                      <p className="ed-info-value">{ev.createdBy}</p>
                    </div>
                  </div>
                )}
                {ev.type && (
                  <div className="ed-info-row">
                    <span className="ed-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    </span>
                    <div>
                      <p className="ed-info-label">Category</p>
                      <p className="ed-info-value" style={{ textTransform: 'capitalize' }}>{ev.type}</p>
                    </div>
                  </div>
                )}
              </div>
              {ev.allPhotos.length > 0 && (
                <div className="ed-info-card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    className="btn-primary ed-view-gallery-btn" 
                    onClick={() => { setSelectedPhotoIndex(0); }}
                  >
                    View Gallery ({ev.allPhotos.length})
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── Native Lightbox ── */}
        {selectedPhotoIndex !== null && (
          <div
            className="lightbox-overlay"
            onClick={() => { setSelectedPhotoIndex(null); }}
            onContextMenu={e => isStudent && e.preventDefault()}
          >
            <div className="lb-top-bar">
              <span className="lb-counter">
                {selectedPhotoIndex + 1} / {ev.allPhotos.length}
              </span>
              <button 
                className="lb-close" 
                onClick={() => { setSelectedPhotoIndex(null); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button
                className="lb-nav lb-prev"
                onClick={e => { e.stopPropagation(); setSelectedPhotoIndex(p => (p - 1 + ev.allPhotos.length) % ev.allPhotos.length); }}
              >‹</button>

              <div className={`lightbox-img-container protected-img-container watermark-overlay${isStudent ? ' no-drag' : ''}`}>
                <img
                  key={selectedPhotoIndex}
                  src={ev.allPhotos[selectedPhotoIndex]}
                  alt={`Photo ${selectedPhotoIndex + 1}`}
                  className={`lightbox-image${isStudent ? ' student-protected-img' : ''}`}
                  onContextMenu={e => isStudent && e.preventDefault()}
                  onDragStart={e => isStudent && e.preventDefault()}
                  draggable={!isStudent}
                />
              </div>

              <button
                className="lb-nav lb-next"
                onClick={e => { e.stopPropagation(); setSelectedPhotoIndex(p => (p + 1) % ev.allPhotos.length); }}
              >›</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ══════════════════════════════════════════════════════════
     ROOT RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <div
      className={`app${isStudent ? ' student-mode' : ' faculty-mode'}`}
      ref={containerRef}
      onContextMenu={e => isStudent && e.preventDefault()}
    >
      {/* ── Ticker bar — matching homepage ── */}
      <div className="ticker-bar">
        <span className="ticker-label">LATEST</span>
        <div className="ticker-track">
          <div className="ticker-content">
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-dot">●</span> {a.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation – exactly like homepage ── */}
      <nav className="top-nav blog-nav">
        <div className="nav-container">
          <div className="blog-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="blog-brand-name">VIIT</span>
            <span className="blog-brand-sep"> · </span>
            <span className="blog-brand-label">Official Blog</span>
          </div>
          <div className="nav-right">
            <div className="nav-links">
              <button className="nav-text-link" onClick={() => navigate('/')}>Home</button>
              <button className={`nav-text-link ${currentView === 'categories' ? 'ep-active-link' : ''}`} onClick={resetToCategories}>Events</button>
              <button className="nav-text-link" onClick={() => navigate('/login')}>Admin</button>
              <button
                className={`nav-text-link ${userRole === 'faculty' ? 'active-role' : ''}`}
                onClick={toggleFaculty}
              >
                {userRole === 'faculty' ? 'Faculty ✓' : 'Faculty'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Unique centered hero header (Categories view only) ── */}
      {currentView === 'categories' && (
        <div className="ep-hero-wrapper">
          <div className="ep-hero-centered blog-anim-1">
            <p className="ep-hero-overline">
              <span className="blog-hero-dot" /> Official Event Portal
            </p>
            <h1 className="ep-hero-title">Experience <span className="ep-hero-accent">VIIT</span> Events</h1>
          </div>

          <div className="ep-hero-cluster">
            <div className="cluster-img cluster-1 blog-anim-2" style={{ backgroundImage: "url('/images/1_DEmjwMFD4JTqtdasWJ5Reg.jpg')" }} />
            <div className="cluster-img cluster-2 blog-anim-3" style={{ backgroundImage: "url('/images/college-fest.jpg')" }} />
            <div className="cluster-img cluster-3 blog-anim-4" style={{ backgroundImage: "url('/images/IMG_20190208_111641.jpg')" }} />
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <main className="events-categories-main">
        {currentView === 'categories' && renderCategories()}
        {currentView === 'gallery'    && renderGallery()}
        {currentView === 'detail'     && renderEventDetail()}
      </main>

      <footer className="footer-official">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vignan Institute of Information Technology. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
