import { useEffect, useState, useRef } from 'react';
import reactImg from "./assets/react.png";
import jsImg from "./assets/js.png";
import htmlImg from "./assets/html.png";
import cssImg from "./assets/css.jpg";
import s1 from "./assets/sticker1.png";
import s2 from "./assets/sticker2.png";

const NAV = [
  { id: 'home',           label: 'Home' },
  { id: 'projects',       label: 'Projects' },
  { id: 'experience',     label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements',   label: 'Achievements' },
  { id: 'contact',        label: 'Contact' },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function useScrollSpy() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useFadeIn(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function FadeSection({ id, className, children }) {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section id={id} ref={ref} className={`section fade-section ${className || ''}`}>
      {children}
    </section>
  );
}

export default function App() {
  const activeSection = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onContactSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent Successfully!');
    e.target.reset();
  };

  return (
    <div className="app-root">
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      <aside className="left-bar">
        <div className="left-logo">P</div>
        <div className="vertical-name">PREMA</div>
        <div className="social-rotated">PORTFOLIO</div>
      </aside>

      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo"><span className="logo-dot">✦</span> PREMA</div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV.map(({ id, label }) => (
            <a key={id}
              className={activeSection === id ? 'active' : ''}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); setMenuOpen(false); }}
            >{label}</a>
          ))}
        </nav>
        <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      <div className="page-dots">
        {NAV.map(({ id }) => (
          <button key={id}
            className={`dot ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${id}`}
          />
        ))}
      </div>

      <main className="main-view">

        {/* ── HOME ── */}
        <FadeSection id="home" className="section-home">
          <div className="hero">
            <div className="hero-left">
              <div className="badge">
                <span className="badge-dot" />
                Available for opportunities
              </div>
              <h1>
                Designing<br />
                <span className="gradient-text">user-first</span><br />
                experiences.
              </h1>
              <p className="lead">
                Frontend developer crafting smooth, modern digital experiences with code, color, and clarity.
              </p>
              <div className="contact-chips">
                <span className="chip">📞 +91 9444539285</span>
                <span className="chip">✉️ vprema376@gmail.com</span>
              </div>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={() => scrollTo('projects')}>View Projects</button>
                <button className="btn btn-ghost"   onClick={() => scrollTo('contact')}>Contact Me</button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-blob" />
              <img className="sticker s1" src={reactImg} alt="React" />
              <img className="sticker s2" src={jsImg}    alt="JavaScript" />
              <img className="sticker s3" src={htmlImg}  alt="HTML" />
              <img className="sticker s4" src={cssImg}   alt="CSS" />
              <img className="sticker s5" src={s1}       alt="sticker" />
              <img className="sticker s6" src={s2}       alt="sticker" />
            </div>
          </div>
          <div className="skills-row">
            {['React', 'JavaScript', 'HTML5', 'CSS3', 'Python', 'Git'].map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </FadeSection>

        {/* ── PROJECTS ── */}
        <FadeSection id="projects">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2>Selected <span className="gradient-text">Projects</span></h2>
            <p className="section-sub">A few things I've built recently.</p>
          </div>
          <div className="project-grid">
            {[
              { img: '/images/project1.jpeg', title: 'FaceAuth Offline',      tags: ['React Native', 'TypeScript', 'Android Studio'], desc: 'Offline face authentication app — secure, lightweight, runs fully on-device in under 1s.' },
              { img: '/images/project2.png',  title: 'Ecommerce Website',     tags: ['HTML', 'CSS', 'JavaScript'],                    desc: 'Responsive product store with a clean layout, product cards, and cart functionality.' },
              { img: '/images/project3.png',  title: 'GST Anomaly Detection', tags: ['Python', 'Machine Learning', 'Data'],           desc: 'Multi-source anomaly detection dashboard cross-validating GST turnover against TANGEDCO & EPFO data.' },
              { img: '/images/project4.png',  title: 'Discover Recipes',      tags: ['React', 'API', 'CSS'],                          desc: 'Recipe discovery app with category filters, search, and save functionality using a meals API.' },
            ].map((proj, i) => (
              <article className="card" key={i}>
                <div className="card-img-wrap">
                  <img className="project-thumb" src={proj.img} alt={proj.title} loading="lazy" />
                  <div className="card-overlay"><span className="overlay-icon">↗</span></div>
                </div>
                <div className="card-body">
                  <div className="card-tags">
                    {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </FadeSection>

        {/* ── EXPERIENCE ── */}
        <FadeSection id="experience">
          <div className="section-header">
            <span className="section-label">Career</span>
            <h2>Experience &amp; <span className="gradient-text">Education</span></h2>
          </div>
          <div className="timeline">
            <div className="timeline-group">
              <h3 className="timeline-group-label">Internships</h3>
              {[
                { org: 'PRODIGY INFOTECH', role: 'Web Development Intern',   period: 'June 2025 – July 2025' },
                { org: 'CODEALPHA',        role: 'Python Programming Intern', period: 'July 2025 – Aug 2025'  },
                { org: 'SLYTHERIN',        role: 'Full-Stack Dev Intern',     period: 'Aug 2025 – Sep 2025'   },
              ].map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h4>{item.org}</h4>
                    <span className="tl-role">{item.role}</span>
                    <span className="tl-period">{item.period}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="timeline-group">
              <h3 className="timeline-group-label">Education</h3>
              <div className="timeline-item">
                <div className="timeline-dot edu" />
                <div className="timeline-content">
                  <h4>Jaya Engineering College</h4>
                  <span className="tl-role">BE Computer Science</span>
                  <span className="tl-period">2023 – 2027</span>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ── CERTIFICATIONS ── */}
        <FadeSection id="certifications">
          <div className="section-header">
            <span className="section-label">Credentials</span>
            <h2>My <span className="gradient-text">Certifications</span></h2>
          </div>
          <div className="cert-grid">
            {[
              { title: 'Introduction to Python Programming', issuer: 'Red Hat',  date: 'Dec 2023', icon: '🐍' },
              { title: 'CSS and JavaScript Crash Course',    issuer: 'Udemy',    date: 'Sep 2023', icon: '🎨' },
              { title: 'Become a Full-Stack Web Developer',  issuer: 'LinkedIn', date: 'Jun 2024', icon: '💼' },
              { title: 'Accenture Nordics',                  issuer: 'Forage',   date: 'Jul 2025', icon: '⚡' },
              { title: 'Deloitte Australia',                 issuer: 'Forage',   date: 'Jul 2025', icon: '🔷' },
              { title: 'Communication Skills',               issuer: 'TCS iON',  date: 'Jul 2025', icon: '🗣️' },
            ].map((cert, i) => (
              <div className="cert-card" key={i}>
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <span className="cert-meta">{cert.issuer} · {cert.date}</span>
                </div>
                <div className="cert-badge">✓</div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* ── ACHIEVEMENTS ── */}
        <FadeSection id="achievements">
          <div className="section-header">
            <span className="section-label">Highlights</span>
            <h2>My <span className="gradient-text">Achievements</span></h2>
          </div>
          <div className="achievement-list">
            {[
              { icon: '🏆', title: 'Naan Mudhalvan Hackathon',  desc: 'Special award for Unity-based innovative solution.' },
              { icon: '🥈', title: 'Smart India Hackathon 2023', desc: 'Finalist among thousands of participants nationwide.' },
            ].map((ach, i) => (
              <div className="ach-card" key={i}>
                <div className="ach-icon">{ach.icon}</div>
                <div className="ach-body">
                  <h3>{ach.title}</h3>
                  <p>{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* ── CONTACT ── */}
        <FadeSection id="contact">
          <div className="section-header">
            <span className="section-label">Say hello</span>
            <h2>Get in <span className="gradient-text">Touch</span></h2>
            <p className="section-sub">I'm open to freelance, internships, and full-time opportunities.</p>
          </div>
          <div className="contact-layout">
            <div className="contact-info">
              <a href="tel:+919444539285" className="contact-link">
                <span className="contact-link-icon">📞</span><span>+91 9444539285</span>
              </a>
              <a href="mailto:vprema376@gmail.com" className="contact-link">
                <span className="contact-link-icon">✉️</span><span>vprema376@gmail.com</span>
              </a>
              <a href="https://github.com/PremavathyV" target="_blank" rel="noreferrer" className="contact-link">
                <span className="contact-link-icon">💻</span><span>github.com/PremavathyV</span>
              </a>
            </div>
            <form onSubmit={onContactSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="What's on your mind?" required />
              </div>
              <button className="btn btn-primary" type="submit">Send Message ✦</button>
            </form>
          </div>
        </FadeSection>

      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Premavathy Vijayan</span>
        <span className="footer-dot">·</span>
        <span>Built with React &amp; Vite</span>
      </footer>
    </div>
  );
}
