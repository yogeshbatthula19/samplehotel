import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, MapPin, Phone, Mail, Menu, X, 
  ChevronRight, Star, ChevronLeft, Play, ArrowRight 
} from 'lucide-react';
import '../styles/Resort.css';

const ROOM_DATA = {
  deluxe: {
    title: "Luxury Suite Room",
    size: "65 m²",
    view: "Lake & Mountain View",
    guests: "2 Adults",
    price: "$550",
    image: "/assets/images/room_luxury.png",
    description: "Our signature Luxury Suite Room is designed to evoke absolute serenity. Features a spacious open-concept layout, custom teak furniture, a plush king-size bed with Egyptian cotton linens, and a private stone balcony directly overlooking the lake and mountain scenery. The ensuite features a rain shower and hand-carved stone soaking tub.",
    amenities: [
      "Private cliffside terrace",
      "King-size bed",
      "Stone soaking tub",
      "Marshall bluetooth speaker",
      "Bespoke minibar & espresso",
      "High-speed Wi-Fi & Smart TV"
    ]
  },
  penthouse: {
    title: "Royal Penthouse Suite",
    size: "140 m²",
    view: "Panoramic Lake View",
    guests: "Up to 4 Adults",
    price: "$1,200",
    image: "/assets/images/resort_hero_128.png",
    description: "Perched at the highest peak of the resort, the Royal Penthouse represents the pinnacle of luxury. Featuring double-height ceilings, a lavish marble fireplace, and floor-to-ceiling glass doors opening onto an expansive private terrace overlooking the entire mountain lake valley.",
    amenities: [
      "24/7 private butler service",
      "120 m² panoramic terrace",
      "Private elevator access",
      "Fully stocked cocktail bar",
      "Marble fireplace",
      "Steam room & jacuzzi"
    ]
  },
  villa: {
    title: "Sanctuary Garden Villa",
    size: "110 m²",
    view: "Cliffside & Tropical Garden",
    guests: "3 Adults",
    price: "$850",
    image: "/assets/images/memories_bg.png",
    description: "Tucked inside our lush Mediterranean gardens, the Sanctuary Garden Villa offers absolute privacy. The interior merges local stone and warm cedar woods, transitioning seamlessly onto a wide private sundeck. The outdoor terrace features a personal heated plunge pool, comfortable sun loungers, and an outdoor rain shower.",
    amenities: [
      "Private heated plunge pool",
      "Secluded botanical garden",
      "Outdoor rain shower",
      "Pre-stocked wine fridge",
      "Premium yoga mats & gear",
      "Direct beach access path"
    ]
  }
};

const REVIEWS = [
  {
    stars: "★★★★★",
    text: "The resort hotel was beyond our expectations. Every detail was curated to perfection, from the breathtaking views to the impeccable guest relations. Truly a golden memory.",
    name: "Brenda Davis",
    origin: "Business Owner"
  },
  {
    stars: "★★★★★",
    text: "An absolute masterpiece of a hotel. The scenic mountain terrace took my breath away every morning. The staff anticipates every need before you even realize it.",
    name: "Eleanor Vance",
    origin: "London, UK"
  },
  {
    stars: "★★★★★",
    text: "Dinner at the terrace was an unforgettable sensory experience. The food pairing combined with the gentle sound of the wind and candlelit atmosphere was simply perfect.",
    name: "Marcus Dupont",
    origin: "Paris, France"
  }
];

export default function ResortPage({ onPageChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [subPage, setSubPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedRoomKey, setSelectedRoomKey] = useState('deluxe');

  const [bookingFormData, setBookingFormData] = useState({
    checkin: '',
    checkout: '',
    room: 'deluxe',
    guests: '2',
    name: '',
    email: '',
    notes: ''
  });

  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

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

  // Scroll to top on sub-page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [subPage]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, email, room, checkin, checkout } = bookingFormData;
    alert(
      `Reservation Inquiry Received\n\nThank you, ${name}. We have received your inquiry for the ${ROOM_DATA[room]?.title || 'Suite'} from ${checkin} to ${checkout}.\n\nOur concierge guest relations team will contact you at ${email} within 2 hours.`
    );
    setBookingFormData({
      checkin: '',
      checkout: '',
      room: 'deluxe',
      guests: '2',
      name: '',
      email: '',
      notes: ''
    });
    setIsBookingOpen(false);
  };

  const handleQuickCheckSubmit = (e) => {
    e.preventDefault();
    setIsBookingOpen(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(
      `Inquiry Sent Successfully\n\nDear ${contactFormData.name},\n\nYour message has been sent to our Guest Relations department. We will get in touch at ${contactFormData.email} shortly.`
    );
    setContactFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(
      `Welcome to Resort Hotel Circle\n\nYou have been subscribed with ${newsletterEmail}.`
    );
    setNewsletterEmail('');
  };

  const selectedRoom = ROOM_DATA[selectedRoomKey];

  return (
    <div className="resort-page-wrap">
      {/* Scroll Progress Indicator */}
      <motion.div id="progress" style={{ scaleX }} />

      {/* Header Navigation */}
      <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <nav className="header-nav-left">
            <ul className="nav-list">
              <li>
                <button 
                  onClick={() => setSubPage('home')} 
                  className={`nav-link ${subPage === 'home' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSubPage('about')} 
                  className={`nav-link ${subPage === 'about' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSubPage('rooms')} 
                  className={`nav-link ${subPage === 'rooms' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  Rooms
                </button>
              </li>
            </ul>
          </nav>

          <a href="#home" className="logo" id="header-logo" onClick={(e) => { e.preventDefault(); setSubPage('home'); }}>
            <span className="logo-title-text">Resort Hotel</span>
          </a>

          <nav className="header-nav-right">
            <ul className="nav-list">
              <li>
                <button 
                  onClick={() => setSubPage('events')} 
                  className={`nav-link ${subPage === 'events' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSubPage('gallery')} 
                  className={`nav-link ${subPage === 'gallery' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSubPage('contact')} 
                  className={`nav-link ${subPage === 'contact' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-nav-toggle" 
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className={`hamburger-lines ${isMobileMenuOpen ? 'active' : ''}`}>
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav className="mobile-nav-menu">
            <ul className="mobile-nav-list">
              <li><button onClick={() => { setSubPage('home'); setIsMobileMenuOpen(false); }} className="mobile-nav-btn">Home</button></li>
              <li><button onClick={() => { setSubPage('about'); setIsMobileMenuOpen(false); }} className="mobile-nav-btn">About</button></li>
              <li><button onClick={() => { setSubPage('rooms'); setIsMobileMenuOpen(false); }} className="mobile-nav-btn">Rooms</button></li>
              <li><button onClick={() => { setSubPage('events'); setIsMobileMenuOpen(false); }} className="mobile-nav-btn">Events</button></li>
              <li><button onClick={() => { setSubPage('gallery'); setIsMobileMenuOpen(false); }} className="mobile-nav-btn">Gallery</button></li>
              <li><button onClick={() => { setSubPage('contact'); setIsMobileMenuOpen(false); }} className="mobile-nav-btn">Contact</button></li>
            </ul>
          </nav>
        )}
      </header>

      <main style={{ paddingTop: subPage === 'home' ? '0' : '90px' }}>
        <AnimatePresence mode="wait">
          {subPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <section id="home" className="hero-section">
                <div className="hero-bg-wrapper">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    poster="/assets/images/resort_hero_128.png" 
                    className="hero-image hero-video"
                    onEnded={(e) => { e.target.play(); }}
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
                  <h1 className="hero-title">Resort Hotel 128</h1>
                  <p className="hero-lead">Welcome to the place where luxury meets the infinite horizon. Experience breathtaking nature and premium boutique rooms.</p>
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
                      </select>
                    </div>
                    <button type="submit" className="btn btn-green" id="quick-search-btn">Check Now</button>
                  </form>
                </div>
              </section>
            </motion.div>
          )}

          {subPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section 1: Make Your Golden Memories */}
              <section id="about" className="memories-section section-padding">
                <div className="container memories-grid-container">
                  <div className="memories-text-content">
                    <div className="section-stars">
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                    </div>
                    <h2 className="memories-heading">Make Your Golden Memories</h2>
                    <p className="memories-p">Our resort hotel provides the ultimate luxury experience. Nestled inside mountain scenery and pristine shores, we offer refined living, premium services, and curated experiences designed to help you create lifelong memories.</p>
                    <button className="btn btn-green btn-large" onClick={() => setIsBookingOpen(true)}>Explore Resort</button>
                  </div>
                  
                  <div className="memories-image-collage">
                    <div className="collage-bg-img-wrap">
                      <img src="/assets/images/memories_bg.png" alt="Tropical resort pool building" className="collage-bg-img" />
                    </div>
                    <div className="collage-fg-img-wrap">
                      <img src="/assets/images/memories_fg.png" alt="Balcony overlooking lake" className="collage-fg-img" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Features / Stats strip */}
              <section className="stats-banner-section">
                <div className="container stats-flex-container">
                  <div className="stat-item">
                    <h4 className="stat-value">Ocean View Suites</h4>
                    <p className="stat-label">120 Villas & Suites</p>
                  </div>
                  <div className="stat-item">
                    <h4 className="stat-value">AURA Wellness Spa</h4>
                    <p className="stat-label">5 Treatment Chambers</p>
                  </div>
                  <div className="stat-item">
                    <h4 className="stat-value">Michelin Fine Dining</h4>
                    <p className="stat-label">3 Signature Restaurants</p>
                  </div>
                  <div className="stat-item">
                    <h4 className="stat-value">Direct Private Shore</h4>
                    <p className="stat-label">Private Beachfront Access</p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {subPage === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section 4: Rooms & Living */}
              <section id="rooms" className="rooms-section section-padding">
                <div className="container">
                  <div className="section-header text-center">
                    <div className="section-stars">
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                      <Star size={14} fill="var(--color-gold)" stroke="none" />
                    </div>
                    <h2 className="section-title">Rooms & Living</h2>
                    <p className="section-desc">Take a look at our carefully designed living spaces that merge modern luxury with comfort.</p>
                  </div>

                  <div className="rooms-carousel-wrapper">
                    <div className="room-card-side side-left" onClick={() => setSelectedRoomKey('penthouse')} style={{ cursor: 'pointer' }}>
                      <img src="/assets/images/resort_hero_128.png" alt="Side view room preview" />
                    </div>

                    <div className="room-card-center">
                      <div className="room-img-container">
                        <img src={selectedRoom.image} alt={selectedRoom.title} />
                      </div>
                      <div className="room-card-details">
                        <h3 className="room-card-title">{selectedRoom.title.toUpperCase()}</h3>
                        <button 
                          className="room-card-link-btn"
                          onClick={() => setIsDetailOpen(true)}
                        >
                          LEARN MORE
                        </button>
                      </div>
                    </div>

                    <div className="room-card-side side-right" onClick={() => setSelectedRoomKey('villa')} style={{ cursor: 'pointer' }}>
                      <img src="/assets/images/memories_bg.png" alt="Side view room preview" />
                    </div>
                  </div>
                  
                  {/* Suite Switch Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '45px', flexWrap: 'wrap' }}>
                    {Object.keys(ROOM_DATA).map(key => (
                      <button 
                        key={key} 
                        className={`btn ${selectedRoomKey === key ? 'btn-green' : 'btn-outline'}`}
                        onClick={() => setSelectedRoomKey(key)}
                        style={{ border: '1px solid var(--color-border)', textTransform: 'capitalize' }}
                      >
                        {ROOM_DATA[key].title}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {subPage === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Events & Meetings Page */}
              <section id="services" className="services-section section-padding">
                <div className="container">
                  <div className="section-header text-center">
                    <span className="section-subtitle">CELEBRATIONS</span>
                    <h2 className="section-title">Events & Meetings</h2>
                    <p className="section-desc">Host your special occasions, weddings, and premium meetings in our luxurious banquet halls.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center', marginBottom: '60px' }} className="responsive-grid-events">
                    <div style={{ height: '400px', overflow: 'hidden' }}>
                      <img src="/assets/images/service_events.png" alt="Luxury banquet hall" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '16px', lineHeight: '1.2' }}>Elegant Venues & Professional Coordination</h3>
                      <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.7' }}>We offer comprehensive banquet coordination for luxury weddings, corporate summits, and intimate family gatherings. Our rooms are equipped with state-of-the-art acoustics, glowing crystal chandeliers, and dining menus customized by Michelin chefs.</p>
                      <button className="btn btn-green" onClick={() => setIsBookingOpen(true)}>Book Venue</button>
                    </div>
                  </div>

                  <div className="promo-video-section" style={{ height: '320px' }}>
                    <div className="promo-bg-wrap">
                      <img src="/assets/images/promo_video_bg.png" alt="Luxury suite interior" className="promo-bg-img" />
                      <div className="promo-overlay"></div>
                    </div>
                    <div className="promo-content text-center" style={{ padding: '0 20px' }}>
                      <h2 className="promo-heading" style={{ fontSize: '2.2rem' }}>Corporate & Social Gatherings</h2>
                      <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '0.9rem', lineHeight: '1.6' }}>From private dining experiences to multi-day summits, Resort Hotel 128 guarantees absolute privacy, state-of-the-art setups, and impeccable dining services.</p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {subPage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Photo Gallery Page */}
              <section id="gallery" className="gallery-section section-padding">
                <div className="container">
                  <div className="section-header text-center">
                    <span className="section-subtitle">VISUAL JOURNEY</span>
                    <h2 className="section-title">Photo Gallery</h2>
                    <p className="section-desc">Take a look inside the spaces, fine dining cuisines, and landscapes that frame our resort.</p>
                  </div>

                  <div className="gallery-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    <div style={{ height: '260px', overflow: 'hidden' }}><img src="/assets/images/resort_hero_128.png" alt="Hero resort view" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-hover-zoom" /></div>
                    <div style={{ height: '260px', overflow: 'hidden' }}><img src="/assets/images/memories_bg.png" alt="Resort terrace" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-hover-zoom" /></div>
                    <div style={{ height: '260px', overflow: 'hidden' }}><img src="/assets/images/memories_fg.png" alt="Resort balcony view" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-hover-zoom" /></div>
                    <div style={{ height: '260px', overflow: 'hidden' }}><img src="/assets/images/service_spa.png" alt="Resort spa wellness" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-hover-zoom" /></div>
                    <div style={{ height: '260px', overflow: 'hidden' }}><img src="/assets/images/service_events.png" alt="Resort banquet hall" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-hover-zoom" /></div>
                    <div style={{ height: '260px', overflow: 'hidden' }}><img src="/assets/images/service_restaurant.png" alt="Resort dining table" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} className="gallery-hover-zoom" /></div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {subPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Contact & Inquiry Page */}
              <section id="contact" className="contact-section section-padding">
                <div className="container">
                  <div className="contact-grid">
                    <div className="contact-info-block">
                      <span className="section-subtitle">GET IN TOUCH</span>
                      <h2 className="section-title">We Await Your Arrival</h2>
                      <p className="contact-lead-text">Whether you seek details on our suites, wish to coordinate custom itineraries, or desire a private tour, our guest relations team is at your convenience.</p>
                      
                      <div className="contact-details" style={{ marginTop: '35px' }}>
                        <div className="contact-detail-item">
                          <div className="icon" style={{ fontSize: '1.25rem' }}>📍</div>
                          <div>
                            <h4 className="detail-label">Location</h4>
                            <p className="detail-val">128 Strada di Tramonti, Positano, Italy</p>
                          </div>
                        </div>
                        <div className="contact-detail-item">
                          <div className="icon" style={{ fontSize: '1.25rem' }}>📞</div>
                          <div>
                            <h4 className="detail-label">Reservations & Info</h4>
                            <p className="detail-val">+39 089 875 4400</p>
                          </div>
                        </div>
                        <div className="contact-detail-item">
                          <div className="icon" style={{ fontSize: '1.25rem' }}>✉️</div>
                          <div>
                            <h4 className="detail-label">Email</h4>
                            <p className="detail-val">reservations@resorthotel128.com</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="contact-form-block">
                      <form id="contact-form" className="luxury-form" onSubmit={handleContactSubmit}>
                        <h3 className="form-title">Send An Inquiry</h3>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="contact-name">Full Name</label>
                            <input 
                              type="text" 
                              id="contact-name" 
                              required 
                              placeholder="Jane Doe"
                              value={contactFormData.name}
                              onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="contact-email">Email Address</label>
                            <input 
                              type="email" 
                              id="contact-email" 
                              required 
                              placeholder="jane@example.com"
                              value={contactFormData.email}
                              onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="contact-message">Message</label>
                          <textarea 
                            id="contact-message" 
                            rows="5" 
                            required 
                            placeholder="How may we assist you?"
                            value={contactFormData.message}
                            onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                          />
                        </div>
                        <button type="submit" className="btn btn-green btn-full">Send Message</button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="main-footer bg-dark-green">
        <div className="container">
          <div className="footer-top-row text-center">
            <span className="footer-logo-title" onClick={() => setSubPage('home')} style={{ cursor: 'pointer' }}>Resort Hotel</span>
          </div>

          <div className="footer-grid">
            <div className="footer-column">
              <h4 className="footer-title">ADDRESS</h4>
              <p className="footer-text">128 Strada di Tramonti, Positano, Italy</p>
              <p className="footer-text">Tel: +39 089 875 4400</p>
              <p className="footer-text">Email: info@resorthotel128.com</p>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">NEWSLETTER</h4>
              <p className="footer-text">Subscribe to our seasonal news and offers updates.</p>
              <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="footer-sub-btn">OK</button>
              </form>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">FOLLOW US</h4>
              <div className="footer-social-links">
                <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
                <a href="#facebook" onClick={(e) => e.preventDefault()}>Facebook</a>
                <a href="#twitter" onClick={(e) => e.preventDefault()}>Twitter</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="copyright">&copy; 2026 Resort Hotel 128. All rights reserved.</p>
            <div className="footer-demo-links" style={{ marginTop: '10px' }}>
              <a href="#resort" onClick={(e) => { e.preventDefault(); onPageChange('resort'); }} style={{ color: 'var(--color-gold)', fontWeight: 600, marginRight: '15px' }}>Hotel 128</a>
              <a href="#insurance" onClick={(e) => { e.preventDefault(); onPageChange('insurance'); }} style={{ color: '#ffffff', marginRight: '15px' }}>Insurance</a>
              <a href="#chase" onClick={(e) => { e.preventDefault(); onPageChange('chase'); }} style={{ color: '#ffffff' }}>Chasey CRM</a>
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
                border: '1px solid #e0dcd3',
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
                  <h2>Book Your Suite</h2>
                  <p className="dialog-subtitle">Specify your dates and preferences to reserve your luxury stay.</p>
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
                      <label htmlFor="booking-room">Select Accommodation</label>
                      <select 
                        id="booking-room" 
                        required
                        value={bookingFormData.room}
                        onChange={(e) => setBookingFormData({...bookingFormData, room: e.target.value})}
                      >
                        <option value="deluxe">Luxury Suite Room ($550/night)</option>
                        <option value="penthouse">Royal Penthouse Suite ($1,200/night)</option>
                        <option value="villa">Sanctuary Garden Villa ($850/night)</option>
                      </select>
                    </div>
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
                      </select>
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

                  <button type="submit" className="btn btn-green btn-full btn-large" id="booking-submit-btn">Confirm Booking</button>
                </form>
              </div>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {isDetailOpen && selectedRoom && (
          <motion.div 
            className="dialog-overlay-react"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDetailOpen(false)}
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
              className="dialog-react room-detail-dialog-react"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FAF6EE',
                border: '1px solid #e0dcd3',
                borderRadius: '8px',
                padding: 0,
                width: '90%',
                maxWidth: '800px',
                position: 'relative',
                display: 'block',
                overflow: 'hidden'
              }}
            >
              <div className="dialog-content room-detail-content">
                <button className="dialog-close-btn" onClick={() => setIsDetailOpen(false)} aria-label="Close details">&times;</button>
                
                <div id="room-detail-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '30px' }}>
                  <div className="room-detail-img-wrapper" style={{ borderRadius: '6px', overflow: 'hidden', height: '240px' }}>
                    <img src={selectedRoom.image} alt={selectedRoom.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="room-detail-info" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 className="room-title" id="room-detail-title" style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#2C3E35', fontFamily: 'var(--font-serif)' }}>{selectedRoom.title}</h2>
                    <div className="room-detail-specs" style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#555555', marginBottom: '16px' }}>
                      <span>📐 {selectedRoom.size}</span>
                      <span>🌅 {selectedRoom.view}</span>
                      <span>👥 Max {selectedRoom.guests}</span>
                    </div>
                    <p className="room-detail-desc" style={{ fontSize: '0.85rem', color: '#666666', lineHeight: '1.6', marginBottom: '20px' }}>{selectedRoom.description}</p>
                    
                    <div className="room-detail-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0dcd3', paddingTop: '16px' }}>
                      <div className="room-price">
                        <span className="price-amount" style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: '#2C3E35' }}>{selectedRoom.price}</span>
                        <span className="price-unit" style={{ fontSize: '0.75rem', color: '#888888' }}>/ night</span>
                      </div>
                      <button 
                        className="btn btn-green btn-book-from-detail"
                        onClick={() => {
                          setBookingFormData({
                            ...bookingFormData,
                            room: selectedRoomKey
                          });
                          setIsDetailOpen(false);
                          setTimeout(() => setIsBookingOpen(true), 150);
                        }}
                      >
                        Reserve This Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
