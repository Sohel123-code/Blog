import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import EventsPage from './EventsPage';
import SecurityWrapper from './SecurityWrapper';
import ScrollToTop from './ScrollToTop';

const ANNOUNCEMENTS = [
  { id: 1, title: "Vignan TechFest 2026 Registrations Open", description: "Students can register for coding competitions, robotics events, and project exhibitions during TechFest 2026.", date: "12 March 2026", tag: "Technical" },
  { id: 2, title: "B.Tech II Year Mid Examination Timetable Released", description: "The timetable for Mid-I examinations has been uploaded on the academic portal. Check the schedule and prepare accordingly.", date: "10 March 2026", tag: "Academic" },
  { id: 3, title: "Campus Placement Training Session", description: "A training program for aptitude, communication skills, and coding practice for students preparing for campus placements.", date: "18 March 2026", tag: "Placement" },
  { id: 4, title: "24-Hour Coding Hackathon", description: "The Department of CSE is organizing a 24-hour coding hackathon focusing on web development and artificial intelligence.", date: "22 March 2026", tag: "Technical" },
  { id: 5, title: "Annual Sports Meet 2026", description: "Registrations are open for cricket, football, badminton, volleyball, and athletics. Contact the sports department.", date: "25 March 2026", tag: "Sports" },
  { id: 6, title: "Guest Lecture on Artificial Intelligence", description: "Industry experts will deliver a guest lecture on AI, machine learning, and career opportunities in emerging tech.", date: "28 March 2026", tag: "Academic" },
  { id: 7, title: "Central Library New Book Collection", description: "New books on data science, cloud computing, cybersecurity, and machine learning are now available in the library.", date: "5 March 2026", tag: "General" },
  { id: 8, title: "Cultural Fest – Vignan Utsav 2026", description: "The annual fest features dance, singing, drama, photography, and talent competitions. All departments welcome.", date: "30 March 2026", tag: "Cultural" },
];

const STATS = [
  { label: "Events This Year", value: 120, suffix: "+" },
  { label: "Students Engaged", value: 4800, suffix: "+" },
  { label: "Years of Excellence", value: 18, suffix: "" },
  { label: "Clubs & Societies", value: 32, suffix: "" },
];

const TYPING_WORDS = ["Tech Fests", "Sports Days", "Cultural Nights", "Hackathons", "Guest Lectures"];

/* ── Hook: count-up animation ── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Hook: intersection observer ── */
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ── Stat counter component ── */
function StatCounter({ value, suffix, label, start }) {
  const count = useCountUp(value, 1600, start);
  return (
    <div className="stat-item">
      <span className="stat-number">{count.toLocaleString()}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ── Typing animation ── */
function TypingText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let timeout;
    if (!isDeleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 140);
    } else if (!isDeleting && displayed.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 70);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIdx]);

  return (
    <span className="typing-word">
      {displayed}<span className="typing-cursor">|</span>
    </span>
  );
}

/* ── Announcement card with scroll reveal ── */
function AnnounceCard({ item, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`announce-card ${inView ? 'reveal-in' : 'reveal-out'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="announce-tag">{item.tag}</span>
      <span className="announcement-date">{item.date}</span>
      <h4 className="announcement-title">{item.title}</h4>
      <p className="announcement-desc">{item.description}</p>
    </div>
  );
}

function HomePage({ userRole, setUserRole }) {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleFaculty = () => {
    const newRole = userRole === 'faculty' ? 'student' : 'faculty';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    alert(`Switched to ${newRole.toUpperCase()} mode! ${newRole === 'faculty' ? 'You can now download and copy.' : 'Protections are now active.'}`);
  };

  return (
    <div className="app blog-home">

      {/* ── Marquee ticker bar ── */}
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

      {/* ── Nav ── */}
      <nav className="top-nav blog-nav">
        <div className="nav-container">
          <div className="blog-brand">
            <span className="blog-brand-name">VIIT</span>
            <span className="blog-brand-sep"> · </span>
            <span className="blog-brand-label">Official Blog</span>
          </div>
          <div className="nav-right">
            <div className="nav-links">
              <button className="nav-text-link" onClick={() => navigate('/')}>Home</button>
              <button className="nav-text-link" onClick={() => navigate('/events')}>Events</button>
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

      <main>

        <section className="split-hero">

          {/* ── LEFT: content panel ── */}
          <div className="split-left">
            <p className="split-label blog-anim-1">
              <span className="blog-hero-dot" />
              Welcome to VIIT Blog
            </p>

            <h1 className="split-title blog-anim-2">
              Discover <TypingText /><br />
              <span className="split-title-rest">at Vignan's Campus</span>
            </h1>

            <p className="split-sub blog-anim-3">
              Your go-to source for campus events, achievements, announcements, and student life highlights from VIIT.
            </p>

            <div className="split-actions blog-anim-4">
              <button className="split-cta-primary" onClick={() => navigate('/events')}>
                Check Events →
              </button>
            </div>

            <div className="split-links blog-anim-4">
              <button className="split-quick-link" onClick={() => navigate('/events')}>Academic Events →</button>
              <button className="split-quick-link" onClick={() => navigate('/events')}>Cultural Fest →</button>
            </div>
          </div>

          {/* ── RIGHT: dark navy panel with image bridging the split ── */}
          <div className="split-right">
            <div className="split-img-frame protected-img-container watermark-overlay blog-anim-img">
              <div
                className="bg-img-protected split-img"
                style={{ backgroundImage: "url('/images/Students-discussing-engaging-events-on-college-campuses-1024x683.jpg')" }}
              />
              <div className="split-badge blog-anim-4">
                <span className="split-badge-num">120+</span>
                <span className="split-badge-txt">Events this year</span>
              </div>
            </div>
          </div>

        </section>



        {/* ══════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="stats-strip" ref={statsRef}>
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} start={statsInView} />
          ))}
        </section>

        {/* ══════════════════════════════════════════
            ANNOUNCEMENTS
        ══════════════════════════════════════════ */}
        <section className="blog-announcements-section">
          <div className="blog-section-container">
            <div className="blog-section-header">
              <p className="section-overline">Stay Informed</p>
              <h2 className="section-big-title">Latest <span className="h2-accent">Announcements</span></h2>
              <p className="blog-section-sub">Important updates, notices, and highlights from Vignan's IIIT</p>
            </div>
            <div className="blog-announce-grid">
              {ANNOUNCEMENTS.map((item, i) => (
                <AnnounceCard key={item.id} item={item} delay={i * 60} />
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="footer-official">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VIGNAN'S Institute of Information Technology. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;
