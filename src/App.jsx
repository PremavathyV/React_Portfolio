/*
Prema Portfolio - React Single File App
Files: This is a single React component file (App.jsx) which includes styles injected via a <style> tag for ease.
Usage:
- Create a React app (e.g. using Vite or Create React App).
- Place this file as src/App.jsx and import it in index.jsx.
- Copy the images into public/images/ (react.png, js.png, html.png, css.png, sticker1.png, sticker2.png)
- Run the app. This SPA supports swipe navigation, keyboard arrows, floating stickers, nav highlight with pink line, contact form demo.

Note: You can extract CSS into style.css if you prefer. This file uses plain React + hooks, no external libs.
*/

import React, { useEffect, useState, useRef } from 'react';
import reactImg from "./assets/react.png";
import jsImg from "./assets/js.png";
import htmlImg from "./assets/html.png";
import cssImg from "./assets/css.jpg";
import s1 from "./assets/sticker1.png";
import s2 from "./assets/sticker2.png";

const pages = [
  { id: 'home', title: 'Home' },
  { id: 'projects', title: 'Projects' },
  { id: 'experience', title: 'Experience' },
  { id: 'certifications', title: 'Certifications' },
  { id: 'achievements', title: 'Achievements' },
  { id: 'contact', title: 'Contact' }
];

export default function App(){
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);

  useEffect(()=>{
    const onKey = (e)=>{
      if(e.key === 'ArrowRight') setCurrent(i=>Math.min(i+1,pages.length-1));
      if(e.key === 'ArrowLeft') setCurrent(i=>Math.max(i-1,0));
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[]);

  useEffect(()=>{
    // update URL hash (optional) for shareable state
    window.location.hash = pages[current].id;
  },[current]);

  useEffect(()=>{
    const onTouchStart = (e)=>{ if(e.touches && e.touches[0]) startX.current = e.touches[0].clientX; };
    const onTouchMove = (e)=>{ if(e.touches && e.touches[0]) endX.current = e.touches[0].clientX; };
    const onTouchEnd = ()=>{
      const diff = startX.current - endX.current;
      const threshold = 60;
      if(Math.abs(diff) > threshold){
        if(diff > 0) setCurrent(i=>Math.min(i+1,pages.length-1));
        else setCurrent(i=>Math.max(i-1,0));
      }
      startX.current = endX.current = 0;
    };
    document.addEventListener('touchstart', onTouchStart, {passive:true});
    document.addEventListener('touchmove', onTouchMove, {passive:true});
    document.addEventListener('touchend', onTouchEnd);
    return ()=>{
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }
  },[]);

  // contact form demo
  const onContactSubmit = (e)=>{
    e.preventDefault();
    alert('Message Sent Successfully (Demo)!');
    e.target.reset();
  };

  return (
    <div className="app-root">
      <Style />
      <aside className="left-bar">
        <div className="burger">☰</div>
        <div className="vertical-name">PREMA</div>
        <div className="social-rotated">PREMAVATHY</div>
      </aside>

      <header className="nav">
        <div className="logo">PREMA</div>
        <nav>
          {pages.map((p,idx)=> (
            <a key={p.id}
               className={idx===current? 'active':''}
               onClick={()=>setCurrent(idx)}
               href={`#${p.id}`}
            >{p.title}</a>
          ))}
        </nav>
      </header>

      <main className="main-view">
        <section className={`page page-home ${current===0? 'visible':''}`}>
          <div className="hero">
            <div className="hero-left">
              <p className="eyebrow">CREATIVE VISION</p>
              <h1>Designing user-first experiences with code, color, and clarity.</h1>
              <p className="lead">I’m a passionate frontend developer crafting smooth, modern digital experiences.</p>
              <div className="meta">📞 +91 9444539285 • ✉️ vprema376@gmail.com</div>
              <button className="btn" onClick={()=>setCurrent(1)}>View Projects</button>
            </div>
            <div className="hero-right">
              <img className="sticker s1" src={reactImg} alt="react" />
<img className="sticker s2" src={jsImg} alt="js" />
<img className="sticker s3" src={htmlImg} alt="html" />
<img className="sticker s4" src={cssImg} alt="css" />
<img className="sticker s5" src={s1} alt="sticker" />
<img className="sticker s6" src={s2} alt="sticker" />

            </div>
          </div>
        </section>

       <section className={`page page-projects ${current===1? 'visible':''}`}>
<h2>Selected Projects</h2>
<p className="swipe-hint">Swipe left/right on mobile or use ← → keys</p>
<div className="project-grid">
<article className="card">
<img className="project-thumb" src="/images/project1.png" alt="Portfolio Project" />
<h3>Motivational Quotes</h3>
<p>HTML • CSS • JavaScript</p>
</article>
<article className="card">
<img className="project-thumb" src="/images/project2.png" alt="Ecommerce Project" />
<h3>Ecommerce Website</h3>
<p>Shopping Website</p>
</article>
<article className="card">
<img className="project-thumb" src="/images/project3.png" alt="Weather App" />
<h3>Weather App</h3>
<p>OpenWeather API Demo</p>
</article>
<article className="card">
<img className="project-thumb" src="/images/project4.png" alt="Email Extractor" />
<h3>Learnify</h3>
<p>Learning Platform</p>
</article>
</div>
</section>

        <section className={`page page-experience ${current===2? 'visible':''}`}>
          <h2>Internships </h2>
          <div className="exp-item"><h3>PRODIGY INFOTECH — Web Development</h3><p>June 2025 - July 2025</p></div>
          <div className="exp-item"><h3>CODEALPHA — Python Programming</h3><p>July 2025 - Aug 2025</p></div>
          <div className="exp-item"><h3>SLYTHERIN — Full-Stack Development</h3><p>Aug 2025 - Sep 2025</p></div>
          <h2>Education</h2>
          <h3>Jaya Engineering College — BE Computer Science (2023 - 2027)</h3>
        </section>

        <section className={`page page-certifications ${current===3? 'visible':''}`}>
          <h2>Certifications</h2>
          <ul>
            <li>Introduction to Python Programming – Red Hat (Dec 2023)</li>
            <li>CSS and JavaScript Crash Course – Udemy (Sep 2023)</li>
            <li>Become a Full-Stack Web Developer – LinkedIn (Jun 2024)</li>
            <li>Accenture Nordics – Forage (Jul 2025)</li>
            <li>Deloitte Australia – Forage (Jul 2025)</li>
            <li>Communication Skills – TCS iON (Jul 2025)</li>
          </ul>
        </section>

        <section className={`page page-achievements ${current===4? 'visible':''}`}>
          <h2>Achievements</h2>
          <ul>
            <li>Special award for Unity-based solution — Naan Mudhalvan Hackathon</li>
            <li>Finalist — Smart India Hackathon (2023)</li>
          </ul>
        </section>

        <section className={`page page-contact ${current===5? 'visible':''}`}>
          <h2>Contact Me</h2>
          <p>Phone: +91 9444539285 • Email: vprema376@gmail.com</p>
          <p>GitHub: <a href="https://github.com/PremavathyV" target="_blank" rel="noreferrer">github.com/PremavathyV</a></p>
          <form onSubmit={onContactSubmit} className="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Message" required />
            <button className="btn" type="submit">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">© {new Date().getFullYear()} PREMAVATHY VIJAYAN</footer>
   
<>
  <style>{`
    .project-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; }
    .card { width:260px; padding:16px; background:#0d0d0d; border-radius:14px; border:1px solid #222; }
    .project-thumb { width:100%; height:180px; object-fit:cover; border-radius:10px; display:block; }
  `}</style>

  {/* existing JSX follows */}
  <div className="app-root"> ... </div>
</>
</div>
  );
}


function Style(){
  return (
    <style>{`
    :root{--bg:#070707;--text:#fff;--muted:#bfbfbf;--accent:#7dff2a;--pink:#ff4aa3}
    *{box-sizing:border-box}
    body,html,#root{height:100%;margin:0}
    .app-root{background:var(--bg);color:var(--text);min-height:100vh;font-family:Inter,system-ui,Arial}
    .left-bar{position:fixed;left:0;top:0;bottom:0;width:84px;background:#0d0d0d;display:flex;flex-direction:column;align-items:center;padding-top:16px;z-index:60}
    .left-bar .burger{font-size:26px;margin-bottom:16px}
    .vertical-name{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:800;letter-spacing:4px;margin-top:24px}
    .social-rotated{position:absolute;left:4px;bottom:20px;color:var(--muted);font-weight:700;transform:rotate(-90deg);font-size:14px}
    .nav{display:flex;justify-content:space-between;align-items:center;padding:18px 120px 18px 100px;background:rgba(0,0,0,0.2);position:sticky;top:0;z-index:50}
    .logo{font-weight:800}
    .nav nav{display:flex;gap:22px}
    .nav a{color:var(--text);text-decoration:none;position:relative;padding:8px 4px}
    .nav a.active::before{content:'';position:absolute;left:0;right:0;height:4px;top:-10px;background:linear-gradient(90deg,var(--pink),#ff76b9);border-radius:2px}
    .main-view{margin-left:84px}
    .page{display:none;padding:60px 100px;min-height:80vh}
    .page.visible{display:block}
    .hero{display:flex;gap:40px;align-items:center}
    .hero-left{max-width:720px}
    .eyebrow{color:var(--accent);font-weight:700;margin-bottom:12px}
    h1{font-family:Georgia, 'Times New Roman', serif;font-size:48px;line-height:1;margin:0 0 12px}
    .lead{color:var(--muted);margin-bottom:12px}
    .meta{color:var(--muted);margin:10px 0}
    .btn{background:#111;padding:10px 14px;border-radius:8px;color:#fff;border:1px solid rgba(255,255,255,0.06)}
    .hero-right{position:relative;width:460px;height:420px}
    .sticker{position:absolute;width:92px;height:92px;object-fit:contain;filter:drop-shadow(0 10px 18px rgba(0,0,0,0.6));transform-origin:center}
    .s1{right:24%;top:8%;animation:float 6s ease-in-out infinite}
    .s2{right:8%;top:20%;width:84px;animation:float 5s ease-in-out infinite}
    .s3{right:12%;top:48%;width:110px;animation:float 7s ease-in-out infinite}
    .s4{right:30%;top:58%;width:88px;animation:float 4s ease-in-out infinite}
    .s5{right:2%;top:6%;width:72px;animation:float 5.5s infinite}
    .s6{right:20%;top:30%;width:64px;animation:float 6.5s infinite}
    @keyframes float{0%{transform:translateY(0) rotate(0)}50%{transform:translateY(-18px) rotate(6deg)}100%{transform:translateY(0) rotate(0)}}
    .project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:22px}
    .card{background:#0b0b0b;padding:18px;border-radius:12px}
    .swipe-hint{opacity:.7;margin-bottom:12px;color:var(--muted)}
    .contact-form input,.contact-form textarea{width:100%;padding:12px;border-radius:8px;border:1px solid #222;background:#0b0b0b;color:#fff;margin-bottom:12px}
    h2{font-size:34px;margin-bottom:12px}
    ul{color:var(--muted);padding-left:20px}
    .site-footer{padding:20px 120px;color:var(--muted)}
    @media(max-width:980px){.nav{padding:12px 20px}.nav nav{gap:12px}.hero{flex-direction:column}.hero-right{display:none}.main-view{margin-left:64px;padding:0 20px}}
    `}</style>
  );
}
