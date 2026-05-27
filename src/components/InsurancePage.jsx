import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Globe, CircleDollarSign, ShieldCheck, 
  Settings, Layers, TrendingUp, Sparkles, ArrowUpRight 
} from 'lucide-react';
import '../styles/Insurance.css';

const TAB_DATA = {
  health: {
    tag: "Health Insurance",
    headline: "Ensuring Your\nHealth Coverage",
    price: "$350"
  },
  life: {
    tag: "Life Insurance",
    headline: "Securing Your\nFamily's Future",
    price: "$450"
  },
  auto: {
    tag: "Auto Insurance",
    headline: "Protecting Your\nVehicles on Road",
    price: "$220"
  },
  disability: {
    tag: "Disability Insurance",
    headline: "Income Security\nWhen You Need It",
    price: "$310"
  },
  business: {
    tag: "Business Insurance",
    headline: "Safeguarding Your\nCorporate Assets",
    price: "$600"
  },
  umbrella: {
    tag: "Umbrella Insurance",
    headline: "Extra Liability\nProtection Layer",
    price: "$180"
  }
};

export default function InsurancePage({ onPageChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('health');

  // Track scroll for header shrinking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeData = TAB_DATA[activeTab];

  return (
    <div className="insurance-page-wrap">
      {/* Navigation Header */}
      <header className={`ins-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="ins-container header-wrapper">
          <a href="#home" className="ins-logo" id="logo-link">
            {/* Circular dotted sunburst icon from screenshot */}
            <svg className="logo-icon" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="18" r="5" />
              <circle cx="73" cy="27" r="5" />
              <circle cx="82" cy="50" r="5" />
              <circle cx="73" cy="73" r="5" />
              <circle cx="50" cy="82" r="5" />
              <circle cx="27" cy="73" r="5" />
              <circle cx="18" cy="50" r="5" />
              <circle cx="27" cy="27" r="5" />
              
              <circle cx="50" cy="32" r="4.5" />
              <circle cx="63" cy="37" r="4.5" />
              <circle cx="68" cy="50" r="4.5" />
              <circle cx="63" cy="63" r="4.5" />
              <circle cx="50" cy="68" r="4.5" />
              <circle cx="37" cy="63" r="4.5" />
              <circle cx="32" cy="50" r="4.5" />
              <circle cx="37" cy="37" r="4.5" />
            </svg>
            <span className="logo-text">insurance</span>
          </a>

          {/* Navigation Links */}
          <nav className="ins-nav">
            <ul className="ins-nav-list">
              <li><a href="#home" className="ins-nav-link active">Home</a></li>
              <li className="has-megamenu">
                <a href="#megamenu" className="ins-nav-link">Megamenu <span className="arrow-down">▼</span></a>
              </li>
              <li><a href="#solutions" className="ins-nav-link">Insurance Services</a></li>
              <li><a href="#blog" className="ins-nav-link">Blog Pages</a></li>
              <li><a href="#about" className="ins-nav-link">About</a></li>
              <li><a href="#support" className="ins-nav-link">Support</a></li>
              <li className="has-dropdown">
                <a href="#other" className="ins-nav-link">Other Pages <span className="arrow-down">▼</span></a>
              </li>
            </ul>
          </nav>

          {/* Contact CTA */}
          <a href="#contact" className="btn-contact" id="contact-btn">Contact us</a>
        </div>
      </header>

      <main>
        {/* Hero Banner Card (Full Bleed) */}
        <section className="hero-banner-card-full">
          <div className="hero-image-wrapper">
            <img src="assets/images/insurance_hero.png" alt="Happy family outdoors in sunlit field" className="hero-img" />
            <div className="hero-img-overlay"></div>
          </div>
          
          <div className="hero-card-content-wrapper ins-container">
            <div className="hero-card-content">
              <h1 className="hero-card-title">Safeguarding<br />Your <span className="title-serif">Valuables</span></h1>
              <a href="#solutions" className="hero-cta-link">Get started with a small step <span className="arrow-right">&rarr;</span></a>
            </div>
          </div>

          {/* Mouse Scroll Down indicator */}
          <div className="scroll-down-indicator-wrapper ins-container">
            <div className="scroll-down-indicator">
              <div className="mouse-icon">
                <span className="mouse-wheel"></span>
              </div>
              <span className="scroll-text">Scroll Down</span>
            </div>
          </div>

          {/* Page slider indicators */}
          <div className="hero-side-slider">
            <span className="slider-dot active"></span>
            <span className="slider-dot"></span>
          </div>
        </section>

        {/* Solutions Section with Tabs */}
        <section id="solutions" className="solutions-section ins-container">
          <div className="solutions-header">
            <h2 className="solutions-title">Discover a range of<br /><span className="title-serif">insurance solutions</span></h2>
          </div>

          <div className="solutions-tabs-container">
            {/* Vertical Tabs List */}
            <div className="tabs-list" role="tablist" aria-label="Insurance Solutions">
              {Object.keys(TAB_DATA).map((key) => (
                <button 
                  key={key}
                  className={`tab-btn ${activeTab === key ? 'active' : ''}`} 
                  role="tab" 
                  aria-selected={activeTab === key ? 'true' : 'false'}
                  onClick={() => setActiveTab(key)}
                >
                  {TAB_DATA[key].tag}
                </button>
              ))}
            </div>

            {/* Dynamic Card Display (Mint green background with Framer Motion transition) */}
            <div className="tabs-content" id="solutions-panel">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="solution-card-body" 
                  id="panel-content"
                >
                  <div className="card-left-column">
                    <span className="card-category-label" id="card-tag">{activeData.tag}</span>
                    <h3 
                      className="card-main-title" 
                      id="card-headline"
                      dangerouslySetInnerHTML={{ __html: activeData.headline.replace('\n', '<br>') }}
                    />
                  </div>
                  
                  <div className="card-right-column">
                    <div className="card-icon-arrow">
                      <ArrowUpRight size={20} strokeWidth={2} />
                    </div>
                    <div className="card-pricing-block">
                      <span className="card-price-amount" id="card-price">{activeData.price}</span>
                      <span className="card-price-subtext">Standard Insurance Start From</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Icon Feature Bar (3 Columns) */}
          <div className="feature-bar">
            {/* Feature 1 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <h4 className="feature-title">Peace of Mind Guaranteed</h4>
              <p className="feature-desc">Your content goes here. Edit or remove this text inline or in the module Content settings.</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Globe size={22} strokeWidth={1.5} />
              </div>
              <h4 className="feature-title">Always Covered</h4>
              <p className="feature-desc">Your content goes here. Edit or remove this text inline or in the module Content settings.</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <CircleDollarSign size={22} strokeWidth={1.5} />
              </div>
              <h4 className="feature-title">Financial Stability</h4>
              <p className="feature-desc">Your content goes here. Edit or remove this text inline or in the module Content settings.</p>
            </div>
          </div>
        </section>

        {/* Securing Peace of Mind Section (Two Column Layout) */}
        <section className="securing-section ins-container">
          <div className="securing-header text-center">
            {/* Logo marker */}
            <div className="ins-logo-marker">
              <svg className="logo-icon-small" viewBox="0 0 100 100" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                <circle cx="50" cy="18" r="5" />
                <circle cx="73" cy="27" r="5" />
                <circle cx="82" cy="50" r="5" />
                <circle cx="73" cy="73" r="5" />
                <circle cx="50" cy="82" r="5" />
                <circle cx="27" cy="73" r="5" />
                <circle cx="18" cy="50" r="5" />
                <circle cx="27" cy="27" r="5" />
              </svg>
              <span className="marker-text">insurance</span>
            </div>
            <h2 className="securing-title">Securing Your Peace of Mind,<br /><span className="title-serif">Today and Tomorrow.</span></h2>
          </div>

          <div className="securing-grid">
            {/* Left details column */}
            <div className="securing-left-panel">
              <h3 className="securing-subtitle">We're best in<br />the Country</h3>
              
              <div className="metrics-list">
                {/* Unmatched Services */}
                <div className="metric-item">
                  <div className="metric-icon">
                    <Sparkles size={28} strokeWidth={1.5} />
                  </div>
                  <div className="metric-text-block">
                    <h4 className="metric-title">Unmatched Services</h4>
                    <p className="metric-desc">Ut non rutrum leo quis pretium augue. Donec rutrum venenatis turpis sitting amet auctor leo quam luctus.</p>
                  </div>
                </div>

                {/* Large number text */}
                <div className="large-number-block">
                  <span className="number-count">1.7B</span>
                  <p className="number-desc">Ut non rutrum leo quis pretium augue. Donec rutrum venenatis turpis sitting amet auctor leo quam luctus.</p>
                </div>

                {/* Innovative Solutions */}
                <div className="metric-item">
                  <div className="metric-icon">
                    <Layers size={28} strokeWidth={1.5} />
                  </div>
                  <div className="metric-text-block">
                    <h4 className="metric-title">Innovative Solutions</h4>
                    <p className="metric-desc">Ut non rutrum leo quis pretium augue. Donec rutrum venenatis turpis sitting amet auctor leo quam luctus.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right image column */}
            <div className="securing-right-panel">
              <div className="hiking-img-card">
                <img src="assets/images/hiking.png" alt="Woman backpacker hiking in mountains" className="hiking-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Logo Banner */}
        <section className="partners-section">
          <div className="ins-container">
            <span className="partners-tagline">OUR PARTNER THAT HELPS US TO PROTECT YOU</span>
            <div className="partners-grid">
              <div className="partner-logo">
                <span className="logo-name font-serif">Prudential</span>
              </div>
              <div className="partner-logo">
                <span className="logo-name">STERLING</span>
              </div>
              <div className="partner-logo">
                <span className="logo-name font-serif">UnitedHealthcare</span>
              </div>
              <div className="partner-logo">
                <span className="logo-name">Continental <span className="logo-sub">Insurance</span></span>
              </div>
              <div className="partner-logo">
                <span className="logo-name">Credo-Classic</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ins-footer">
        <div className="ins-container text-center">
          <div className="footer-nav-links" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '24px', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
            <a href="#resort" onClick={(e) => { e.preventDefault(); onPageChange('resort'); }} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>L'Horizon Resort</a>
            <a href="#insurance" onClick={(e) => { e.preventDefault(); onPageChange('insurance'); }} style={{ color: 'inherit', textDecoration: 'underline', opacity: 1 }}>Insurance Portal</a>
            <a href="#chase" onClick={(e) => { e.preventDefault(); onPageChange('chase'); }} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Chasey CRM</a>
          </div>
          <p className="footer-copy">&copy; 2026 insurance. All rights reserved. Designed for Divi Pixel.</p>
        </div>
      </footer>
    </div>
  );
}
