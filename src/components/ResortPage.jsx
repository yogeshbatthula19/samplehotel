import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, MapPin, Phone, Mail, Menu, X, 
  ChevronRight, Star, Compass, Waves, Utensils, 
  Smile, Heart, Shield, HelpCircle, ArrowRight
} from 'lucide-react';
import '../styles/Resort.css';

const ROOM_DATA = {
  deluxe: {
    title: "Deluxe Ocean Suite",
    size: "65 m²",
    view: "Ocean View",
    guests: "2 Adults",
    price: "$550",
    image: "assets/images/suite_deluxe.png",
    description: "Our Deluxe Ocean Suite is designed to evoke absolute serenity. Features a spacious open-concept layout, custom teak furniture, a plush king-size bed with Egyptian cotton linens, and a private stone balcony directly overlooking the azure shoreline. The ensuite features a rain shower and hand-carved stone soaking tub.",
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
    title: "Presidential Penthouse",
    size: "140 m²",
    view: "Panoramic Harbor & Sea View",
    guests: "Up to 4 Adults",
    price: "$1,200",
    image: "assets/images/suite_penthouse.png",
    description: "Perched at the highest peak of the resort, the Presidential Penthouse represents the pinnacle of luxury. Featuring double-height ceilings, a lavish marble fireplace, and floor-to-ceiling glass doors opening onto an expansive private terrace. Includes private elevator access, a custom cocktail bar, and full butler service.",
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
    view: "Cliffside & Lush Tropical Garden",
    guests: "3 Adults",
    price: "$850",
    image: "assets/images/suite_villa.png",
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
    text: "An absolute masterpiece of a hotel. The cliffside views from the Deluxe Ocean Suite took my breath away every morning. The staff anticipates every need before you even realize it.",
    name: "Eleanor Vance",
    origin: "London, UK"
  },
  {
    stars: "★★★★★",
    text: "The Sanctuary Garden Villa offered the perfect seclusion for our anniversary. Having a private plunge pool surrounded by tropical plants felt like our own hidden paradise.",
    name: "Marcus & Kiara Dupont",
    origin: "Paris, France"
  },
  {
    stars: "★★★★★",
    text: "Dinner at the terrace was an unforgettable sensory experience. The seafood pairing combined with the gentle sound of the waves and candlelit atmosphere was simply perfect.",
    name: "Aleksei Romanov",
    origin: "Zurich, Switzerland"
  }
];

export default function ResortPage({ onPageChange }) {
  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Carousel state
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Modal / Detail states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedRoomKey, setSelectedRoomKey] = useState('deluxe');

  // Form states
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
    subject: 'reservation',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll for shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Scrollspy active nav links
  useEffect(() => {
    const sections = ['home', 'rooms', 'amenities', 'gallery', 'testimonials', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
      });

      observer.observe(el);
      return { observer, el };
    }).filter(Boolean);

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  // Auto-cycle reviews carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Booking Form Submission Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, email, room, checkin, checkout } = bookingFormData;
    alert(
      `Reservation Inquiry Received\n\nThank you, ${name}. We have received your inquiry for the ${ROOM_DATA[room]?.title || 'Suite'} from ${checkin} to ${checkout}.\n\nOur concierge guest relations team will contact you at ${email} within 2 hours to finalize details and confirm your reservation.`
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

  // Quick Check Widget Submission
  const handleQuickCheckSubmit = (e) => {
    e.preventDefault();
    setIsBookingOpen(true);
  };

  // Contact Form Submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(
      `Inquiry Sent Successfully\n\nDear ${contactFormData.name},\n\nYour message has been encrypted and dispatched to our Guest Relations department. An advisor will review your message and get in touch at ${contactFormData.email} shortly.`
    );
    setContactFormData({
      name: '',
      email: '',
      subject: 'reservation',
      message: ''
    });
  };

  // Newsletter Submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(
      `Welcome to L'Horizon Circle\n\nYou have been subscribed with ${newsletterEmail}. You will now receive private seasonal packages, event listings, and bespoke updates before the general public.`
    );
    setNewsletterEmail('');
  };

  const selectedRoom = ROOM_DATA[selectedRoomKey];

  return (
    <div className="resort-page-wrap">
      {/* Scroll Progress Indicator */}
      <motion.div 
        id="progress" 
        style={{ scaleX }}
      />

      {/* Header Navigation */}
      <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <a href="#home" className="logo" id="header-logo" onClick={() => setActiveSection('home')}>
            <span className="logo-light">L'HORIZON</span>
            <span className="logo-subtitle">RESORT & SPA</span>
          </a>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-nav-toggle" 
            aria-controls="primary-navigation" 
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

          <nav id="primary-navigation" className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {['home', 'rooms', 'amenities', 'gallery', 'testimonials', 'contact'].map((section) => (
                <li key={section}>
                  <a 
                    href={`#${section}`} 
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(section);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {section === 'testimonials' ? 'reviews' : section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            className="btn btn-gold btn-book-now" 
            id="nav-booking-btn"
            onClick={() => setIsBookingOpen(true)}
          >
            Book Your Stay
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-bg-wrapper">
            <img src="assets/images/hero.png" alt="Stunning infinity pool overlooking the ocean at sunset" className="hero-image" />
            <div className="hero-overlay"></div>
          </div>
          
          <div className="hero-content">
            <span className="hero-eyebrow">A sanctuary for the senses</span>
            <h1 className="hero-title">Where Luxury Meets The Infinite Horizon</h1>
            <p className="hero-lead">Nestled along pristine cliffs, L'Horizon offers an exquisite sanctuary of curated experiences, bespoke service, and refined oceanfront living.</p>
            
            <div className="hero-cta-group">
              <button className="btn btn-gold btn-large" onClick={() => setIsBookingOpen(true)}>Reserve Now</button>
              <a href="#rooms" className="btn btn-outline btn-large">Explore Suites</a>
            </div>
          </div>

          {/* Quick Check Widget (Glassmorphic) */}
          <div className="quick-check-widget">
            <form className="quick-check-form" id="quick-check-form" onSubmit={handleQuickCheckSubmit}>
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
                  <option value="5+">5+ Guests</option>
                </select>
              </div>
              <button type="submit" className="btn btn-gold" id="quick-search-btn">Check Availability</button>
            </form>
          </div>
        </section>

        {/* Rooms & Suites Section */}
        <section id="rooms" className="rooms-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span class="section-subtitle">Exquisite Accommodations</span>
              <h2 className="section-title">Rooms & Suites</h2>
              <div className="divider"></div>
              <p className="section-desc">Each of our sanctuaries features premium amenities, private terraces, and breathtaking views of the azure coast.</p>
            </div>

            <div className="rooms-grid">
              {/* Room 1 */}
              <div className="room-card" id="room-deluxe">
                <div className="room-img-container">
                  <img src="assets/images/suite_deluxe.png" alt="Deluxe Ocean Suite interior" className="room-img" />
                  <div className="room-badge">Popular</div>
                </div>
                <div className="room-info">
                  <div className="room-meta">
                    <span className="room-size">65 m²</span>
                    <span className="room-view">Ocean View</span>
                  </div>
                  <h3 className="room-title">Deluxe Ocean Suite</h3>
                  <p className="room-text">A masterfully styled retreat featuring custom oak woodwork, a private ocean terrace, and a spa-inspired stone bathroom.</p>
                  <div className="room-price-row">
                    <div className="room-price">
                      <span className="price-amount">$550</span>
                      <span className="price-unit">/ night</span>
                    </div>
                    <button 
                      className="btn btn-text room-details-trigger" 
                      onClick={() => {
                        setSelectedRoomKey('deluxe');
                        setIsDetailOpen(true);
                      }}
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Room 2 */}
              <div className="room-card" id="room-penthouse">
                <div className="room-img-container">
                  <img src="assets/images/suite_penthouse.png" alt="Presidential Penthouse living area" className="room-img" />
                  <div className="room-badge">Exclusive</div>
                </div>
                <div className="room-info">
                  <div className="room-meta">
                    <span className="room-size">140 m²</span>
                    <span className="room-view">Panoramic View</span>
                  </div>
                  <h3 className="room-title">Presidential Penthouse</h3>
                  <p className="room-text">Perched at our highest point, this grand space features private elevator access, double-height ceilings, and a marble fireplace.</p>
                  <div className="room-price-row">
                    <div className="room-price">
                      <span className="price-amount">$1,200</span>
                      <span className="price-unit">/ night</span>
                    </div>
                    <button 
                      className="btn btn-text room-details-trigger"
                      onClick={() => {
                        setSelectedRoomKey('penthouse');
                        setIsDetailOpen(true);
                      }}
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Room 3 */}
              <div className="room-card" id="room-villa">
                <div className="room-img-container">
                  <img src="assets/images/suite_villa.png" alt="Sanctuary Garden Villa pool deck" className="room-img" />
                  <div className="room-badge">Private Pool</div>
                </div>
                <div className="room-info">
                  <div className="room-meta">
                    <span className="room-size">110 m²</span>
                    <span className="room-view">Garden & Cliff View</span>
                  </div>
                  <h3 className="room-title">Sanctuary Garden Villa</h3>
                  <p className="room-text">Tucked away in lush tropical foliage, our private villas offer ultimate seclusion with personal plunge pools and outdoor showers.</p>
                  <div className="room-price-row">
                    <div className="room-price">
                      <span className="price-amount">$850</span>
                      <span className="price-unit">/ night</span>
                    </div>
                    <button 
                      className="btn btn-text room-details-trigger"
                      onClick={() => {
                        setSelectedRoomKey('villa');
                        setIsDetailOpen(true);
                      }}
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="amenities-section section-padding bg-darker">
          <div className="container">
            <div className="section-header text-center">
              <span class="section-subtitle">The L'Horizon Experience</span>
              <h2 className="section-title">Curated Guest Conveniences</h2>
              <div className="divider"></div>
              <p className="section-desc">From check-in to check-out, immerse yourself in world-class amenities designed to elevate your stay.</p>
            </div>

            <div className="amenities-grid">
              {/* Amenity 1 */}
              <div className="amenity-card">
                <div className="amenity-icon">
                  <Waves size={28} strokeWidth={1.5} />
                </div>
                <h3 className="amenity-title">Infinity Cliffside Pool</h3>
                <p className="amenity-text">Dive into our signature pool that seamlessly blends into the sky, complete with custom sun lounges and poolside butler service.</p>
              </div>

              {/* Amenity 2 */}
              <div className="amenity-card">
                <div className="amenity-icon">
                  <Utensils size={28} strokeWidth={1.5} />
                </div>
                <h3 className="amenity-title">Michelin Dining</h3>
                <p className="amenity-text">Savor fine-dining creations under the stars, showcasing locally-sourced marine ingredients and international culinary artistry.</p>
              </div>

              {/* Amenity 3 */}
              <div className="amenity-card">
                <div className="amenity-icon">
                  <Compass size={28} strokeWidth={1.5} />
                </div>
                <h3 className="amenity-title">AURA Spa & Wellness</h3>
                <p className="amenity-text">Restore body and mind in our serene sanctuaries, offering stone therapies, organic botanical facials, and yoga sessions.</p>
              </div>

              {/* Amenity 4 */}
              <div className="amenity-card">
                <div className="amenity-icon">
                  <Calendar size={28} strokeWidth={1.5} />
                </div>
                <h3 className="amenity-title">Bespoke Concierge</h3>
                <p className="amenity-text">Enjoy tailored luxury itineraries, from private helicopter charters and yacht tours to exclusive cultural excursions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="gallery-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <span class="section-subtitle">Visual Pleasures</span>
              <h2 className="section-title">A Glimpse of Paradise</h2>
              <div className="divider"></div>
              <p className="section-desc">Take a visual tour through L'Horizon and begin planning your luxury escape.</p>
            </div>

            <div className="gallery-grid">
              <div className="gallery-item item-large">
                <img src="assets/images/hero.png" alt="Sunset pool deck overlooking the sea" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-tag">Resort Exterior</span>
                  <h4 className="gallery-item-title">Sunset Infinity Pool</h4>
                </div>
              </div>
              <div className="gallery-item">
                <img src="assets/images/suite_deluxe.png" alt="Deluxe Room Interior" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-tag">Suites</span>
                  <h4 className="gallery-item-title">Deluxe Room Suite</h4>
                </div>
              </div>
              <div className="gallery-item">
                <img src="assets/images/suite_penthouse.png" alt="Penthouse living area" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-tag">Suites</span>
                  <h4 className="gallery-item-title">Presidential Penthouse</h4>
                </div>
              </div>
              <div className="gallery-item">
                <img src="assets/images/suite_villa.png" alt="Sanctuary Villa pool deck" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-tag">Sanctuaries</span>
                  <h4 className="gallery-item-title">Garden Plunge Pool</h4>
                </div>
              </div>
              <div className="gallery-item">
                <img src="assets/images/spa.png" alt="Spa wellness sanctuary" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-tag">Wellness</span>
                  <h4 className="gallery-item-title">AURA Treatment Room</h4>
                </div>
              </div>
              <div className="gallery-item item-wide">
                <img src="assets/images/dining.png" alt="Fine dining terrace looking over ocean" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-tag">Gastronomy</span>
                  <h4 className="gallery-item-title">Michelin Dining Terrace</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Reviews Section */}
        <section id="testimonials" className="testimonials-section section-padding bg-darker">
          <div className="container">
            <div className="section-header text-center">
              <span class="section-subtitle">Shared Impressions</span>
              <h2 className="section-title">What Our Guests Say</h2>
              <div className="divider"></div>
            </div>

            <div className="testimonials-container">
              <div className="testimonial-carousel" style={{ minHeight: '250px', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReviewIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    style={{ position: 'absolute', width: '100%' }}
                    className="testimonial-card-react"
                  >
                    <div className="stars" style={{ color: 'var(--color-gold)', fontSize: '1.25rem', marginBottom: '16px' }}>
                      {REVIEWS[activeReviewIndex].stars}
                    </div>
                    <p className="testimonial-text" style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: '1.6' }}>
                      "{REVIEWS[activeReviewIndex].text}"
                    </p>
                    <div className="guest-info" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="guest-name" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-primary)' }}>
                        {REVIEWS[activeReviewIndex].name}
                      </span>
                      <span className="guest-origin" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {REVIEWS[activeReviewIndex].origin}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Controls */}
              <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '140px' }}>
                {REVIEWS.map((_, index) => (
                  <button 
                    key={index} 
                    className={`dot ${activeReviewIndex === index ? 'active' : ''}`} 
                    onClick={() => setActiveReviewIndex(index)}
                    aria-label={`Review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Location Section */}
        <section id="contact" className="contact-section section-padding">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Info */}
              <div className="contact-info-block">
                <span class="section-subtitle">Get In Touch</span>
                <h2 className="section-title">We Await Your Arrival</h2>
                <div className="divider divider-left"></div>
                <p className="contact-lead-text">Whether you seek detail on our suites, wish to orchestrate custom itineraries, or desire a private tour, our guest relations team is at your convenience.</p>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="icon">
                      <MapPin size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="detail-label">Location</h4>
                      <p className="detail-val">128 Strada di Tramonti, Positano, Italy</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="icon">
                      <Phone size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="detail-label">Reservations & Info</h4>
                      <p className="detail-val">+39 089 875 4400</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="icon">
                      <Mail size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="detail-label">Email</h4>
                      <p className="detail-val">reservations@lhorizonresort.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
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
                        placeholder="e.g., Jane Doe"
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
                        placeholder="e.g., jane@example.com"
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <select 
                      id="contact-subject"
                      value={contactFormData.subject}
                      onChange={(e) => setContactFormData({...contactFormData, subject: e.target.value})}
                    >
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="event">Private Events &amp; Weddings</option>
                      <option value="special">Bespoke Concierge Request</option>
                      <option value="general">General Inquiries</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea 
                      id="contact-message" 
                      rows="5" 
                      required 
                      placeholder="How may we assist you with your stay?"
                      value={contactFormData.message}
                      onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-gold btn-full" id="contact-submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-column">
              <a href="#home" className="footer-logo">
                <span>L'HORIZON</span>
                <span className="logo-subtitle">RESORT & SPA</span>
              </a>
              <p className="footer-about">An exclusive retreat celebrating the beauty of the coast, featuring bespoke accommodations and refined service for the modern epicurean.</p>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-title">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#rooms">Suites &amp; Villas</a></li>
                <li><a href="#amenities">Resort Amenities</a></li>
                <li><a href="#gallery">Photo Gallery</a></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-title">Demo Pages</h4>
              <ul className="footer-links">
                <li><a href="#resort" onClick={(e) => { e.preventDefault(); onPageChange('resort'); }} style={{ textDecoration: 'underline', fontWeight: 600 }}>L'Horizon Resort</a></li>
                <li><a href="#insurance" onClick={(e) => { e.preventDefault(); onPageChange('insurance'); }}>Insurance Portal</a></li>
                <li><a href="#chase" onClick={(e) => { e.preventDefault(); onPageChange('chase'); }}>Chasey CRM</a></li>
              </ul>
            </div>
            <div className="footer-newsletter-column">
              <h4 className="footer-title">Newsletter</h4>
              <p className="newsletter-desc">Subscribe to receive exclusive offers, events, and seasonal updates from L'Horizon.</p>
              <form id="newsletter-form" className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input 
                  type="email" 
                  id="newsletter-email" 
                  placeholder="Your Email Address" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-gold" id="newsletter-btn">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 L'Horizon Resort &amp; Spa. All rights reserved.</p>
            <div className="footer-socials">
              <a href="#instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
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
                background: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-lg)',
                padding: 0,
                width: '90%',
                maxWidth: '650px',
                position: 'relative',
                boxShadow: 'var(--shadow-dark)',
                display: 'block'
              }}
            >
              <div className="dialog-content">
                <button className="dialog-close-btn" onClick={() => setIsBookingOpen(false)} aria-label="Close booking form">&times;</button>
                
                <div className="dialog-header">
                  <h2>Book Your Sanctuary</h2>
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
                        <option value="deluxe">Deluxe Ocean Suite ($550/night)</option>
                        <option value="penthouse">Presidential Penthouse ($1,200/night)</option>
                        <option value="villa">Sanctuary Garden Villa ($850/night)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="booking-guests">Number of Guests</label>
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
                        <option value="5+">5+ Guests</option>
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
                        placeholder="e.g., John Smith"
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
                        placeholder="e.g., john@example.com"
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="booking-notes">Special Requests &amp; Notes</label>
                    <textarea 
                      id="booking-notes" 
                      rows="3" 
                      placeholder="e.g., dietary requirements, airport shuttle, high floor..."
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="btn btn-gold btn-full btn-large" id="booking-submit-btn">Confirm Reservation Inquiry</button>
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
                background: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-lg)',
                padding: 0,
                width: '90%',
                maxWidth: '850px',
                position: 'relative',
                boxShadow: 'var(--shadow-dark)',
                display: 'block',
                overflow: 'hidden'
              }}
            >
              <div className="dialog-content room-detail-content">
                <button className="dialog-close-btn" onClick={() => setIsDetailOpen(false)} aria-label="Close details">&times;</button>
                
                <div id="room-detail-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '30px' }}>
                  <div className="room-detail-img-wrapper" style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', height: '100%' }}>
                    <img src={selectedRoom.image} alt={selectedRoom.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="room-detail-info" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 className="room-title" id="room-detail-title" style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>{selectedRoom.title}</h2>
                    <div className="room-detail-specs" style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                      <span>📐 {selectedRoom.size}</span>
                      <span>🌅 {selectedRoom.view}</span>
                      <span>👥 Max {selectedRoom.guests}</span>
                    </div>
                    <p className="room-detail-desc" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>{selectedRoom.description}</p>
                    
                    <h4 style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '12px', fontWeight: 600 }}>Suite Exclusives</h4>
                    <div className="room-detail-amenity-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
                      {selectedRoom.amenities.map((amenity, i) => (
                        <div key={i} className="room-detail-amenity-item" style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <ChevronRight size={12} color="var(--color-gold)" /> {amenity}
                        </div>
                      ))}
                    </div>

                    <div className="room-detail-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                      <div className="room-price">
                        <span className="price-amount" style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>{selectedRoom.price}</span>
                        <span className="price-unit" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/ night</span>
                      </div>
                      <button 
                        className="btn btn-gold btn-book-from-detail"
                        onClick={() => {
                          setBookingFormData({
                            ...bookingFormData,
                            room: selectedRoomKey
                          });
                          setIsDetailOpen(false);
                          setTimeout(() => setIsBookingOpen(true), 150);
                        }}
                      >
                        Reserve This Suite
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
