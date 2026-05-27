import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Chase.css';

// Sparkle particle component
function SparkleStar({ color, size, x, y, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const floatDistance = Math.random() * 40 + 20;
  const driftDistance = (Math.random() - 0.5) * 30;

  return (
    <motion.span
      initial={{ 
        position: 'absolute',
        left: x,
        top: y,
        fontSize: `${size}rem`,
        color: color,
        pointerEvents: 'none',
        textShadow: '1px 1px 0px #1C1C1C',
        zIndex: 5,
        opacity: 1,
        scale: 1,
        rotate: 0,
        display: 'inline-block'
      }}
      animate={{ 
        x: driftDistance,
        y: -floatDistance,
        scale: 0.5,
        opacity: 0,
        rotate: Math.random() * 180
      }}
      transition={{ duration: 1.5, ease: [0.1, 0.8, 0.3, 1] }}
    >
      {Math.random() > 0.5 ? '✦' : '★'}
    </motion.span>
  );
}

// 3D Card Tilt wrapper using React mouse event handling
function TiltCard({ children, className, id }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(10);
  const [shadowY, setShadowY] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (normalized between -0.5 and 0.5)
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Rotation ranges (max 15 degrees)
    setRotateX(-mouseY * 20);
    setRotateY(mouseX * 20);
    
    // Shadow offset adjustments based on tilt
    setShadowX(12 - mouseX * 10);
    setShadowY(12 - mouseY * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShadowX(10);
    setShadowY(10);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Base rotation styles for the cards based on their class
  let baseRotate = 0;
  let baseTranslateY = 0;
  if (className.includes('card-left')) {
    baseRotate = -8;
    baseTranslateY = 40;
  } else if (className.includes('card-middle')) {
    baseRotate = -1;
    baseTranslateY = 10;
  } else if (className.includes('card-right')) {
    baseRotate = 7;
    baseTranslateY = 50;
  }

  return (
    <motion.div
      id={id}
      className={`hero-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        zIndex: isHovered ? 50 : (className.includes('card-middle') ? 20 : (className.includes('card-right') ? 15 : 10))
      }}
      animate={isHovered ? {
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: 0,
        scale: 1.1,
        y: -20,
        boxShadow: `${shadowX}px ${shadowY}px 0px var(--color-border-dark)`
      } : {
        rotateX: 0,
        rotateY: 0,
        rotateZ: baseRotate,
        scale: 1,
        y: baseTranslateY,
        boxShadow: '10px 10px 0px var(--color-border-dark)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export default function ChasePage({ onPageChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [phoneVal, setPhoneVal] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Scroll handler for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic sparkle spawner
  useEffect(() => {
    const spawner = setInterval(() => {
      const container = document.querySelector('.highlight-orange');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const id = Date.now() + Math.random();
      
      const colors = ['#F8D249', '#FF7A00', '#FFFFFF'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomSize = Math.random() * 1.5 + 0.8;
      
      // We calculate random coords relative to text container bounding box
      const randomX = Math.random() * rect.width;
      const randomY = Math.random() * rect.height;

      setSparkles(prev => [
        ...prev, 
        { id, color: randomColor, size: randomSize, x: randomX, y: randomY }
      ]);
    }, 750);

    return () => clearInterval(spawner);
  }, []);

  // Handle lead form submission
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (phoneVal.trim()) {
      setFormSubmitted(true);
      setShowSpeechBubble(true);
      
      setTimeout(() => {
        setShowSpeechBubble(false);
      }, 3000);
    }
  };

  const removeSparkle = (id) => {
    setSparkles(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="chase-page-wrap">
      {/* Dotted Grid Texture Overlay */}
      <div className="grid-texture"></div>

      {/* Header Section (Floating Pill Navbar) */}
      <header className={`chase-header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
        <div className="header-container">
          <a href="#home" className="chase-logo" id="logo-link">
            <span className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-5.5l1.5-7.5L5 13.5h5.5L9 21l10-10.5z"/>
              </svg>
            </span>
            <span className="logo-text">DELI</span>
          </a>

          {/* Navbar Navigation Links */}
          <nav className="chase-nav" id="navigation-bar">
            <ul className="nav-list">
              <li><a href="#features" className="nav-link">FEATURES</a></li>
              <li><a href="#how-it-works" className="nav-link">HOW IT WORKS</a></li>
              <li><a href="#pricing" className="nav-link">PRICING</a></li>
            </ul>
          </nav>

          {/* CTA Button */}
          <a href="#cta" className="btn-login-header" id="header-login-btn">LOGIN</a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="chase-hero">
          <div className="hero-container">
            
            {/* Hero Copy */}
            <div className="hero-text-block">
              <h1 className="hero-title">
                Cut the noise. <span className="highlight-orange">
                  Chasey
                  {sparkles.map(s => (
                    <SparkleStar
                      key={s.id}
                      color={s.color}
                      size={s.size}
                      x={s.x}
                      y={s.y}
                      onComplete={() => removeSparkle(s.id)}
                    />
                  ))}
                  <span className="sparkle-spark">✦</span>
                </span> closes every deal.
              </h1>
              <p className="hero-subtitle">
                Chasey follows up, qualifies leads, and replies in your voice... so conversations move forward without you chasing them.
              </p>

              {/* Input CTA Form */}
              <form 
                className="hero-form" 
                id="lead-capture-form" 
                onSubmit={handleLeadSubmit}
                style={{ position: 'relative' }}
              >
                <input 
                  type="tel" 
                  placeholder="ENTER YOUR NUMBER" 
                  className="form-input" 
                  id="phone-input" 
                  required
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  disabled={formSubmitted}
                />
                <button 
                  type="submit" 
                  className="btn-submit-orange" 
                  id="form-submit-btn"
                  style={formSubmitted ? { backgroundColor: '#A9D18E', color: '#1C1C1C' } : {}}
                >
                  {formSubmitted ? 'BOOM!' : 'LOGIN'}
                </button>

                {/* Animated Speech Bubble */}
                <AnimatePresence>
                  {showSpeechBubble && (
                    <motion.div 
                      className="speech-bubble font-handwritten form-success-bubble"
                      initial={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, scale: 0.8, y: -10, x: '-50%' }}
                      style={{
                        position: 'absolute',
                        top: '-70px',
                        left: '50%',
                        zIndex: 10,
                        border: '2px solid #1c1c1c',
                        boxShadow: '4px 4px 0px #1c1c1c',
                        backgroundColor: '#fff',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Chasey is on it! Check your phone!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Hero Overlapping Graphic Cards with Tilt Effect */}
            <div className="hero-cards-wrapper" id="hero-interactive-cards">
              <TiltCard className="card-left" id="hero-card-1">
                <img src="assets/images/chase_hero_1.png" alt="Company Party illustration" className="card-img" />
              </TiltCard>
              <TiltCard className="card-middle" id="hero-card-2">
                <img src="assets/images/chase_hero_2.png" alt="Office Meeting illustration" className="card-img" />
              </TiltCard>
              <TiltCard className="card-right" id="hero-card-3">
                <img src="assets/images/chase_hero_3.png" alt="Employee of the Month illustration" className="card-img" />
              </TiltCard>
            </div>

          </div>
        </section>

        {/* Thick Full Width Orange Separator Bar */}
        <div className="orange-separator-bar"></div>

        {/* How It Works Section: Comic Strip */}
        <section id="how-it-works" class="comic-strip-section">
          <div className="comic-strip-container">
            
            {/* Comic Board Grid with scroll reveals */}
            <div className="comic-board">
              
              {/* Panel 1 */}
              <motion.div 
                className="comic-panel" 
                id="panel-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5 }}
              >
                <div className="panel-header">THE ASSIGNMENT</div>
                <div className="panel-image-wrapper">
                  <img src="assets/images/chase_comic_1.png" alt="Calendar assignment comic panel" className="panel-img" />
                  <div className="speech-bubble bubble-bottom-left font-handwritten">
                    Simple task.<br />Should be easy.
                  </div>
                </div>
              </motion.div>

              {/* Panel 2 */}
              <motion.div 
                className="comic-panel" 
                id="panel-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="panel-header">THE WEEK PASSES...</div>
                <div className="panel-image-wrapper">
                  <img src="assets/images/chase_comic_2.png" alt="Overworked office comic panel" class="panel-img" />
                </div>
              </motion.div>

              {/* Panel 3 */}
              <motion.div 
                className="comic-panel" 
                id="panel-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="panel-header">THE DEADLINE.</div>
                <div className="panel-image-wrapper">
                  <img src="assets/images/chase_comic_3.png" alt="Deadline panic comic panel" className="panel-img" />
                  <div className="speech-bubble bubble-top-right font-handwritten">
                    Oh no... the client's asking for the update.
                  </div>
                </div>
              </motion.div>

              {/* Panel 4 */}
              <motion.div 
                className="comic-panel" 
                id="panel-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5 }}
              >
                <div className="panel-header">NO FOLLOW-UP?</div>
                <div className="panel-image-wrapper">
                  <img src="assets/images/chase_comic_4.png" alt="Empty desk comic panel" className="panel-img" />
                </div>
              </motion.div>

              {/* Panel 5 */}
              <motion.div 
                className="comic-panel" 
                id="panel-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="panel-header">THEY'RE FINE.</div>
                <div className="panel-image-wrapper">
                  <img src="assets/images/chase_comic_5.png" alt="Colleagues talking comic panel" className="panel-img" />
                  <div className="speech-bubble bubble-center font-handwritten">
                    THEY'RE FINE.
                  </div>
                </div>
              </motion.div>

              {/* Pitch/Text Box Panel */}
              <motion.div 
                className="comic-text-panel" 
                id="panel-pitch"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="pitch-tagline"><span className="highlight-orange">CHASEY</span></h3>
                <p className="pitch-title">AUTOMATES FOLLOW-UPS IN WHATSAPP, SO TASKS AND LEADS STAY HOT.</p>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Why It Matters Section */}
        <section id="features" className="why-matters-section">
          <div className="features-container">
            
            <div className="section-header text-center">
              <h2 className="section-title">Why it matters</h2>
              <p className="section-subtitle">
                Most deals fail because of missed follow-ups or lost context. Chasey automates tasks and keeps messages consistent.
              </p>
            </div>

            {/* 4 Card Neo-brutalist Grid with scroll reveals */}
            <div className="features-grid">
              
              {/* Card 1 (Large - WhatsApp Direct) */}
              <motion.div 
                className="feature-card card-whatsapp" 
                id="feature-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-graphic-wrapper">
                  <img src="assets/images/chase_card_whatsapp.png" alt="WhatsApp direct integration" className="card-img-feature" />
                </div>
                <div className="card-info">
                  <p className="feature-card-text">Use directly in WhatsApp. No added apps or detours.</p>
                </div>
              </motion.div>

              {/* Card 2 (Tone controls) */}
              <motion.div 
                className="feature-card card-yellow card-tone" 
                id="feature-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="card-graphic-wrapper-row">
                  <img src="assets/images/chase_card_tone.png" alt="Tone controls and comic character faces" className="card-img-feature" />
                </div>
                <div className="card-info">
                  <p className="feature-card-text">Tone controls and templates that read like a teammate, not a script.</p>
                </div>
              </motion.div>

              {/* Card 3 (Auto Actions) */}
              <motion.div 
                className="feature-card card-yellow card-funnel" 
                id="feature-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="card-graphic-wrapper">
                  <img src="assets/images/chase_card_funnel.png" alt="Auto actions funnel" className="card-img-feature" />
                </div>
                <div className="card-info">
                  <p className="feature-card-text">Auto actions guide leads to purchase.</p>
                </div>
              </motion.div>

              {/* Card 4 (Chat Recall) */}
              <motion.div 
                className="feature-card card-yellow card-brain" 
                id="feature-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="card-graphic-wrapper">
                  <img src="assets/images/chase_card_brain.png" alt="Chat recall database brain" className="card-img-feature" />
                </div>
                <div className="card-info">
                  <p className="feature-card-text">Recalls chats, notes, and more for tailored replies.</p>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* For Whom Section */}
        <section id="pricing" className="audience-section">
          <div className="audience-container">
            
            <div className="section-header text-center">
              <h2 className="section-title">For whom the products suites perfectly</h2>
            </div>

            <div className="audience-split-layout">
              
              {/* Left Column (List items) */}
              <div className="audience-list-wrapper">
                
                {/* Item 1 */}
                <motion.div 
                  className="audience-item" 
                  id="audience-item-1"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="audience-item-title">Sales Teams</h3>
                  <p className="audience-item-desc">
                    handles the follow-ups so your pipeline never goes cold and your team can focus on closing.
                  </p>
                </motion.div>

                {/* Item 2 */}
                <motion.div 
                  className="audience-item" 
                  id="audience-item-2"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="audience-item-title">Service Brands</h3>
                  <p className="audience-item-desc">
                    Confirmations, reminders, and updates—handled automatically. Your customers get answers before they even ask.
                  </p>
                </motion.div>

                {/* Item 3 */}
                <motion.div 
                  className="audience-item" 
                  id="audience-item-3"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="audience-item-title">Customer Support</h3>
                  <p className="audience-item-desc">
                    Fast, human-sounding responses that keep customers happy and take the pressure off your human agents.
                  </p>
                </motion.div>

              </div>

              {/* Right Column (Comic Book Cover) */}
              <motion.div 
                className="audience-graphic-wrapper" 
                id="audience-graphic"
                initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                <div className="comic-cover-card">
                  <img src="assets/images/chase_cover.png" alt="Sales Success Comic Book Cover" className="cover-img" />
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Call to Action Banner Section */}
        <section id="cta" className="cta-banner-section">
          <div className="cta-container">
            
            {/* Neo-brutalist CTA Block */}
            <motion.div 
              className="cta-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="cta-content">
                <h2 className="cta-headline">Stop chasing. Start closing with <span className="highlight-orange">Chasey</span></h2>
                <p className="cta-paragraph">
                  Ready to turn your team into a productivity powerhouse? Join 5,000+ managers who treat work like a comic-book adventure.
                </p>
              </div>
              
              <div className="cta-button-block">
                <a href="#trial" className="btn-cta-blue" id="main-cta-btn">Start Free Trial</a>
                <span className="cta-btn-subtext">NO CREDIT CARD REQUIRED. EVER.</span>
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="chase-footer">
        <div className="footer-container">
          
          {/* Footer Logo */}
          <a href="#home" className="footer-logo">
            <span className="logo-icon-white">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-5.5l1.5-7.5L5 13.5h5.5L9 21l10-10.5z"/>
              </svg>
            </span>
            <span className="logo-text">DELI</span>
          </a>

          {/* Footer Navigation Links */}
          <nav className="footer-nav">
            <ul className="footer-links-list">
              <li><a href="#resort" className="footer-link" onClick={(e) => { e.preventDefault(); onPageChange('resort'); }}>L'HORIZON RESORT</a></li>
              <li><a href="#insurance" className="footer-link" onClick={(e) => { e.preventDefault(); onPageChange('insurance'); }}>INSURANCE PORTAL</a></li>
              <li><a href="#chase" className="footer-link" onClick={(e) => { e.preventDefault(); onPageChange('chase'); }} style={{ textDecoration: 'underline', fontWeight: 'bold' }}>CHASEY CRM</a></li>
            </ul>
          </nav>

          {/* Copyright Statement */}
          <p className="footer-copy">© 2026 Deli Chasey. All rights reserved.</p>

        </div>
      </footer>
    </div>
  );
}
