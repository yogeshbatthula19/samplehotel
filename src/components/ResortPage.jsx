import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, MapPin, Phone, Mail, Menu, X, 
  ChevronRight, Star, ChevronLeft, Play, ArrowRight
} from 'lucide-react';

const Facebook = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const Linkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const Youtube = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);
import '../styles/Resort.css';

const STAYCATION_DATA = {
  family: {
    title: "Family",
    image: "/assets/images/ashva_family_staycation.png",
    description: "Be it a birthday, anniversary, or a quick break, Ashva Retreat is ideal for quality family time. Kids love the lawns and pool, while elders relax in a peaceful, secure space with all modern comforts."
  },
  friends: {
    title: "Friends",
    image: "/assets/images/ashva_friends_staycation.png",
    description: "Reunite with your gang or plan a fun escape. Dive into the pool, enjoy music, bonfire nights, and pure privacy as you create unforgettable moments away from city life."
  }
};

const TESTIMONIALS = [
  {
    stars: "★★★★★",
    text: "We had a wonderful stay at Ashva Retreat. The villa is beautiful, clean, and very spacious. Kids had a great time in the pool and lawns. The staff was very helpful and the food was delicious. Highly recommended for family stays!",
    name: "Abhay Raj",
    category: "Family Stay"
  },
  {
    stars: "★★★★★",
    text: "Perfect getaway with friends! The outdoor tennis court was amazing, the pool was crystal clear, and the bonfire set up at night made our reunion unforgettable. Absolute privacy.",
    name: "Vikram Sethi",
    category: "Friends Reunion"
  },
  {
    stars: "★★★★★",
    text: "Hosted an intimate corporate dinner here. The ambiance, surrounding nature, and custom catering prepared by the in-house chef exceeded all expectations. Incredible hospitality.",
    name: "Priyanka Roy",
    category: "Corporate Event"
  }
];

export default function ResortPage({ onPageChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const videoRef = useRef(null);

  const setVideoRef = (el) => {
    if (el) {
      videoRef.current = el;
      el.defaultMuted = true;
      el.muted = true;
      el.loop = true;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay was prevented by browser:", error);
        });
      }
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, email, checkin, checkout } = bookingFormData;
    alert(
      `Reservation Inquiry Received\n\nThank you, ${name}. We have received your inquiry for Ashva Retreat from ${checkin} to ${checkout}.\n\nOur guest relations team will contact you at ${email} shortly.`
    );
    setBookingFormData({
      checkin: '',
      checkout: '',
      guests: '2',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setIsBookingOpen(false);
  };

  const handleQuickCheckSubmit = (e) => {
    e.preventDefault();
    setIsBookingOpen(true);
  };

  return (
    <div className="resort-page-wrap ashva-theme">
      {/* Scroll Progress Indicator */}
      <motion.div id="progress" style={{ scaleX }} />

      {/* Header Navigation */}
      <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
        <div className="header-top-bar">
          <div className="header-container flex-row-between">
            {/* Social Icons */}
            <div className="header-socials">
              <a href="#facebook" onClick={(e) => e.preventDefault()} aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#instagram" onClick={(e) => e.preventDefault()} aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#linkedin" onClick={(e) => e.preventDefault()} aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="#youtube" onClick={(e) => e.preventDefault()} aria-label="YouTube"><Youtube size={16} /></a>
            </div>

            {/* Logo in Center */}
            <div className="header-logo-container" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
              <img src="/assets/images/ashva_logo.png" alt="Ashva Retreat Logo" className="header-logo-img" />
              <span className="logo-title-text">ASHVA RETREAT</span>
            </div>

            {/* CTA Button */}
            <div className="header-cta">
              <button className="btn btn-forest header-cta-btn" onClick={() => setIsBookingOpen(true)}>Book Now</button>
            </div>
          </div>
        </div>

        {/* Bottom Menu Bar */}
        <div className="header-menu-bar">
          <div className="header-container flex-center">
            <nav className="header-nav-menu">
              <ul className="nav-list">
                <li><button onClick={() => scrollToSection('home')} className="nav-link">Home</button></li>
                <li><button onClick={() => scrollToSection('welcome')} className="nav-link">About Us</button></li>
                <li><button onClick={() => scrollToSection('staycations')} className="nav-link">Staycations</button></li>
                <li><button onClick={() => scrollToSection('events')} className="nav-link">Events</button></li>
                <li><button onClick={() => scrollToSection('shooting')} className="nav-link">Shooting</button></li>
                <li><button onClick={() => scrollToSection('summer-escape')} className="nav-link">Activities</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="nav-link">Gallery</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="nav-link">Testimonials</button></li>
                <li><button onClick={() => scrollToSection('footer-contact')} className="nav-link">Contact Us</button></li>
              </ul>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="mobile-nav-toggle" 
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`hamburger-lines ${isMobileMenuOpen ? 'active' : ''}`}>
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              className="mobile-nav-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ul className="mobile-nav-list">
                <li><button onClick={() => scrollToSection('home')} className="mobile-nav-btn">Home</button></li>
                <li><button onClick={() => scrollToSection('welcome')} className="mobile-nav-btn">About Us</button></li>
                <li><button onClick={() => scrollToSection('staycations')} className="mobile-nav-btn">Staycations</button></li>
                <li><button onClick={() => scrollToSection('events')} className="mobile-nav-btn">Events</button></li>
                <li><button onClick={() => scrollToSection('shooting')} className="mobile-nav-btn">Shooting</button></li>
                <li><button onClick={() => scrollToSection('summer-escape')} className="mobile-nav-btn">Activities</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="mobile-nav-btn">Gallery</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="mobile-nav-btn">Testimonials</button></li>
                <li><button onClick={() => scrollToSection('footer-contact')} className="mobile-nav-btn">Contact Us</button></li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-bg-wrapper">
            <video 
              ref={setVideoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              poster="/assets/images/ashva_banner_night.png" 
              className="hero-image hero-video"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            >
              <source src="/assets/videos/resort_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hero-overlay"></div>
          </div>
          
          <div className="hero-content">
            <div className="hero-stars">
              <Star size={16} fill="var(--color-gold)" stroke="none" />
              <Star size={16} fill="var(--color-gold)" stroke="none" />
              <Star size={16} fill="var(--color-gold)" stroke="none" />
              <Star size={16} fill="var(--color-gold)" stroke="none" />
              <Star size={16} fill="var(--color-gold)" stroke="none" />
            </div>
            <h1 className="hero-title">ASHVA RETREAT</h1>
            <p className="hero-lead">Classic. Reconnected. Unmatched. Experience ultimate luxury and absolute privacy.</p>
          </div>

          {/* Quick Check Availability Bar */}
          <div className="quick-check-widget">
            <form className="quick-check-form" onSubmit={handleQuickCheckSubmit}>
              <div className="form-group-inline">
                <label htmlFor="quick-checkin">Check-in</label>
                <input 
                  type="date" 
                  id="quick-checkin" 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingFormData.checkin}
                  onChange={(e) => setBookingFormData({...bookingFormData, checkin: e.target.value})}
                />
              </div>
              <div className="form-group-inline">
                <label htmlFor="quick-checkout">Check-out</label>
                <input 
                  type="date" 
                  id="quick-checkout" 
                  required 
                  min={bookingFormData.checkin || new Date().toISOString().split('T')[0]}
                  value={bookingFormData.checkout}
                  onChange={(e) => setBookingFormData({...bookingFormData, checkout: e.target.value})}
                />
              </div>
              <div className="form-group-inline">
                <label htmlFor="quick-guests">Guests</label>
                <select 
                  id="quick-guests"
                  value={bookingFormData.guests}
                  onChange={(e) => setBookingFormData({...bookingFormData, guests: e.target.value})}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>
              <button type="submit" className="btn btn-forest" id="quick-search-btn">Search Now</button>
            </form>
          </div>
        </section>

        {/* Welcome Section */}
        <section id="welcome" className="welcome-section">
          <div className="container">
            <div className="welcome-card">
              <h2 className="welcome-heading">WELCOME TO ASHVA RETREAT</h2>
              <div className="welcome-text-container">
                <p className="welcome-p">
                  With standard hotel amenities but the privacy of your own space, Ashva Retreat is the perfect destination for your next getaway. Nestled in a quiet location, our villa offers a peaceful retreat with all the comfort and luxury you need.
                </p>
                <p className="welcome-p">
                  Relax by the pool, enjoy breakfast on the terrace, or explore the local sights - there's always something to do at Ashva Retreat.
                </p>
                <p className="welcome-p">
                  Whether you're looking for a romantic escape, a family staycation, or a place to celebrate a special occasion, Ashva Retreat is the perfect choice for your next getaway.
                </p>
              </div>
              <div className="welcome-logo-wrap">
                <img src="/assets/images/ashva_logo.png" alt="Ashva emblem" className="welcome-logo-emblem" />
              </div>
            </div>
          </div>

          {/* Floating WhatsApp Action Button */}
          <a 
            href="https://wa.me/919123456789" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-float-btn"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFF">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.58 1.98 14.12 .953 11.995.953c-5.442 0-9.866 4.372-9.87 9.802-.001 1.768.478 3.49 1.39 5.031L2.5 21.314l6.147-1.616L6.647 19.154zm12.656-7.854c-.22-.11-1.3-.642-1.502-.715-.202-.073-.35-.11-.5.11-.15.22-.58.73-.71.88-.13.15-.26.165-.48.055-.22-.11-.93-.343-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.015-.34.095-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.365.07-.15.035-.275-.02-.385s-.5-1.21-.68-1.65c-.18-.435-.37-.375-.5-.38-.13-.005-.28-.005-.43-.005s-.39.055-.6.28c-.21.22-.8.78-.8 1.9s.82 2.2 1.93 2.35c.11.015 2.19 3.34 5.3 4.69.74.32 1.31.51 1.76.65.74.24 1.42.2 1.95.12.6-.09 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.14-.42-.25z"/>
            </svg>
          </a>
        </section>

        {/* Staycations Section */}
        <section id="staycations" className="staycations-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">STAYCATIONS</h2>
              <div className="header-underline"></div>
            </div>

            <div className="staycations-grid">
              {/* Family Card */}
              <div className="staycation-card">
                <div className="card-image-wrap">
                  <img src={STAYCATION_DATA.family.image} alt="Family at villa" className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{STAYCATION_DATA.family.title}</h3>
                  <p className="card-description">{STAYCATION_DATA.family.description}</p>
                  <button className="btn btn-outline" onClick={() => setIsBookingOpen(true)}>Read More</button>
                </div>
              </div>

              {/* Friends Card */}
              <div className="staycation-card">
                <div className="card-image-wrap">
                  <img src={STAYCATION_DATA.friends.image} alt="Friends at pool" className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{STAYCATION_DATA.friends.title}</h3>
                  <p className="card-description">{STAYCATION_DATA.friends.description}</p>
                  <button className="btn btn-outline" onClick={() => setIsBookingOpen(true)}>Read More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summer Escape Section (Tennis Court) */}
        <section id="summer-escape" className="summer-escape-section">
          <div className="escape-bg-wrap">
            <img src="/assets/images/ashva_summer_escape.png" alt="Tennis court" className="escape-bg-image" />
            <div className="escape-overlay"></div>
          </div>
          <div className="container escape-content-container">
            <div className="escape-text-content">
              <h2 className="escape-heading">Escape To The Luxury This Summer</h2>
              <p className="escape-p">
                This summer, treat yourself to a relaxing stay at Ashva Retreat, a private villa designed for comfort, privacy, and leisure. Take a refreshing dip in your exclusive pool, enjoy peaceful mornings in the lawn, and unwind with delicious meals prepared just for you.
              </p>
              <p className="escape-p">
                Whether you’re planning a family staycation or a getaway with friends, our villa offers everything you need - spacious rooms, open-air dining, and beautiful surroundings, all to yourself.
              </p>
              <p className="escape-p">
                At Ashva Retreat, you don’t just stay - you slow down, reconnect, and make the most of your time together.
              </p>
              <button className="btn btn-forest-light" onClick={() => scrollToSection('gallery')}>Explore Activities</button>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="events-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">EVENTS</h2>
              <div className="header-underline"></div>
            </div>

            <div className="events-grid-layout">
              <div className="events-image-block">
                <img src="/assets/images/ashva_events.png" alt="Wedding celebration" className="events-img" />
              </div>
              <div className="events-text-block">
                <h3 className="events-subtitle">Sangeet &amp; Reception​</h3>
                <p className="events-description">
                  Ashva Retreat offers the perfect setting for all kinds of events - from pre-wedding photoshoots and Haldi-Mehendi functions to intimate weddings, corporate meetings, and cocktail parties. Surrounded by nature, with beautiful spaces and warm hospitality, every celebration here feels personal, peaceful, and absolutely grand.
                </p>
                <button className="btn btn-forest" onClick={() => setIsBookingOpen(true)}>Read More</button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="gallery-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">GALLERY</h2>
              <p className="section-subtitle">Super interior views</p>
              <div className="header-underline"></div>
            </div>

            <div className="gallery-layout-grid">
              <div className="gallery-item-card">
                <img src="/assets/images/ashva_gallery_pool_table.png" alt="Pool table room" />
                <div className="gallery-item-overlay"><span>Game Room</span></div>
              </div>
              <div className="gallery-item-card">
                <img src="/assets/images/ashva_gallery_deck.png" alt="Pergola seating" />
                <div className="gallery-item-overlay"><span>Patio Deck</span></div>
              </div>
              <div className="gallery-item-card">
                <img src="/assets/images/ashva_gallery_lounge.png" alt="Seaside dining" />
                <div className="gallery-item-overlay"><span>Lounge Seating</span></div>
              </div>
              <div className="gallery-item-card">
                <img src="/assets/images/ashva_gallery_games.png" alt="Foosball table" />
                <div className="gallery-item-overlay"><span>Activity Center</span></div>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: '40px' }}>
              <button className="btn btn-forest" onClick={() => setIsBookingOpen(true)}>Explore Full Gallery</button>
            </div>
          </div>
        </section>

        {/* Shooting Section */}
        <section id="shooting" className="shooting-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">SHOOTING</h2>
              <div className="header-underline"></div>
            </div>

            <div className="shooting-grid-layout">
              <div className="shooting-text-block">
                <p className="shooting-description">
                  Ashva Retreat is an ideal location for film, video, and photoshoots, offering a picturesque natural backdrop, rustic architecture, and open landscapes. Whether it’s a movie scene, music video, fashion shoot, or brand commercial, we provide the ultimate creative playground.
                </p>
                <button className="btn btn-forest" onClick={() => setIsBookingOpen(true)}>Read More</button>
              </div>
              <div className="shooting-image-block">
                <img src="/assets/images/ashva_shooting.png" alt="Professional filming camera" className="shooting-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">TESTIMONIALS</h2>
              <p className="section-subtitle">What our lovely guests say about us</p>
              <div className="header-underline"></div>
            </div>

            <div className="testimonials-grid-layout">
              <div className="testimonials-text-card">
                <div className="stars-row">{TESTIMONIALS[activeReviewIndex].stars}</div>
                <p className="testimonial-quote">"{TESTIMONIALS[activeReviewIndex].text}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{TESTIMONIALS[activeReviewIndex].name}</span>
                  <span className="author-category">{TESTIMONIALS[activeReviewIndex].category}</span>
                </div>
                
                {/* Carousel controls */}
                <div className="carousel-nav-controls">
                  <button 
                    onClick={() => setActiveReviewIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                    className="carousel-nav-btn"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveReviewIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                    className="carousel-nav-btn"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="testimonials-image-card">
                <img src="/assets/images/ashva_testimonials.png" alt="Smiling Indian family at resort" className="testimonials-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Night Villa Booking CTA Banner */}
        <section id="cta-banner" className="night-banner-section">
          <div className="night-bg-wrap">
            <img src="/assets/images/ashva_banner_night.png" alt="Villa at night" className="night-bg-image" />
            <div className="night-overlay"></div>
          </div>
          <div className="night-content text-center">
            <h2 className="night-heading">ASHVA RETREAT</h2>
            <p className="night-subheading">Classic. Reconnected. Unmatched.</p>
            <button className="btn btn-outline-white" onClick={() => setIsBookingOpen(true)}>Book Now</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer" id="footer-contact">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Info */}
            <div className="footer-column contact-info-col">
              <h4 className="footer-title">CONTACT US</h4>
              <p className="footer-text font-italic">
                Plot 6, Golden Splendour, Bahadurguda, near Keesara Temple, Keesara, Hyderabad, Telangana 501301
              </p>
              <p className="footer-text mt-3"><strong>Reservations:</strong> +91 91234 56789</p>
              <p className="footer-text"><strong>Email:</strong> info@ashvaretreat.com</p>

              <div className="footer-socials mt-4">
                <a href="#facebook" onClick={(e) => e.preventDefault()} aria-label="Facebook"><Facebook size={16} /></a>
                <a href="#instagram" onClick={(e) => e.preventDefault()} aria-label="Instagram"><Instagram size={16} /></a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()} aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="#youtube" onClick={(e) => e.preventDefault()} aria-label="YouTube"><Youtube size={16} /></a>
              </div>
            </div>

            {/* Center Logo Column */}
            <div className="footer-column logo-col text-center">
              <div className="footer-logo-wrap">
                <img src="/assets/images/ashva_logo.png" alt="Ashva Retreat Emblem" className="footer-logo-img" />
                <h3 className="footer-logo-title">ASHVA RETREAT</h3>
              </div>
            </div>

            {/* Column 2 & 3 Combined as Navigation Links */}
            <div className="footer-column nav-col">
              <h4 className="footer-title">QUICK LINKS</h4>
              <div className="footer-nav-split">
                <ul className="footer-nav-links">
                  <li><button onClick={() => scrollToSection('home')}>Home</button></li>
                  <li><button onClick={() => scrollToSection('welcome')}>About Us</button></li>
                  <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
                  <li><button onClick={() => scrollToSection('footer-contact')}>Contact Us</button></li>
                </ul>
                <ul className="footer-nav-links">
                  <li><button onClick={() => scrollToSection('staycations')}>Staycations</button></li>
                  <li><button onClick={() => scrollToSection('events')}>Events</button></li>
                  <li><button onClick={() => scrollToSection('shooting')}>Shooting</button></li>
                  <li><button onClick={() => scrollToSection('summer-escape')}>Activities</button></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="copyright">&copy; 2026 Ashva Retreat. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </div>
            <div className="footer-demo-links">
              <a href="#resort" onClick={(e) => { e.preventDefault(); onPageChange('resort'); }} className="active-portfolio-link">Hotel 128 (Ashva)</a>
              <a href="#insurance" onClick={(e) => { e.preventDefault(); onPageChange('insurance'); }}>Insurance</a>
              <a href="#chase" onClick={(e) => { e.preventDefault(); onPageChange('chase'); }}>Chasey CRM</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Dialog Modal (Animated with Framer Motion) */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            className="dialog-overlay-react"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBookingOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(11, 12, 16, 0.8)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.dialog 
              open 
              className="dialog-react"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FAF6EE',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: 0,
                width: '90%',
                maxWidth: '600px',
                position: 'relative',
                display: 'block'
              }}
            >
              <div className="dialog-content">
                <button className="dialog-close-btn" onClick={() => setIsBookingOpen(false)} aria-label="Close booking form">&times;</button>
                
                <div className="dialog-header">
                  <h2>Book Your Stay</h2>
                  <p className="dialog-subtitle">Specify your dates and preferences to reserve your luxury experience at Ashva Retreat.</p>
                </div>

                <form id="booking-form" className="luxury-form" onSubmit={handleBookingSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="booking-checkin">Check-in Date</label>
                      <input 
                        type="date" 
                        id="booking-checkin" 
                        required 
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingFormData.checkin}
                        onChange={(e) => setBookingFormData({...bookingFormData, checkin: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-checkout">Check-out Date</label>
                      <input 
                        type="date" 
                        id="booking-checkout" 
                        required 
                        min={bookingFormData.checkin || new Date().toISOString().split('T')[0]}
                        value={bookingFormData.checkout}
                        onChange={(e) => setBookingFormData({...bookingFormData, checkout: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="booking-guests">Guests</label>
                      <select 
                        id="booking-guests" 
                        required
                        value={bookingFormData.guests}
                        onChange={(e) => setBookingFormData({...bookingFormData, guests: e.target.value})}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6+ Guests</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="booking-phone" 
                        required 
                        placeholder="+91 XXXXX XXXXX"
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="booking-name">Full Name</label>
                      <input 
                        type="text" 
                        id="booking-name" 
                        required 
                        placeholder="John Smith"
                        value={bookingFormData.name}
                        onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-email">Email Address</label>
                      <input 
                        type="email" 
                        id="booking-email" 
                        required 
                        placeholder="john@example.com"
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-notes">Special Requests / Notes</label>
                    <textarea 
                      id="booking-notes" 
                      rows="3"
                      placeholder="Let us know if you are celebrating a special occasion or have dietary requirements."
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="btn btn-green btn-full btn-large" id="booking-submit-btn">Confirm Reservation Inquiry</button>
                </form>
              </div>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
