// ==========================================================================
// CONSTANTS & ROOM DATA
// ==========================================================================
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

// ==========================================================================
// SCROLL PERFORMANCE & PROGRESS BAR FALLBACK
// ==========================================================================
function initScrollProgress() {
  const progressBar = document.querySelector('#progress');
  if (!progressBar) return;

  // Fallback for browsers that do not support CSS scroll-driven animations
  if (!CSS.supports('animation-timeline', 'scroll()')) {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = window.scrollY;
      const progressPercentage = scrolled / scrollable;
      progressBar.style.transform = `scaleX(${progressPercentage})`;
    };
    
    // Use requestAnimationFrame for smoother scroll performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Initial call
    handleScroll();
  }
}

// ==========================================================================
// SHRINKING HEADER NAVIGATION
// ==========================================================================
function initShrinkingHeader() {
  const header = document.querySelector('#main-header');
  if (!header) return;

  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run immediately in case user is already scrolled on page load
}

// ==========================================================================
// INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
// ==========================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the middle of the viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
function initMobileMenu() {
  const toggleBtn = document.querySelector('#menu-toggle');
  const navMenu = document.querySelector('#primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close mobile menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });
}

// ==========================================================================
// TESTIMONIALS CAROUSEL
// ==========================================================================
function initTestimonialCarousel() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoCycleInterval;

  if (cards.length === 0) return;

  const showSlide = (index) => {
    // Reset classes
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Set active
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    let next = currentSlide + 1;
    if (next >= cards.length) next = 0;
    showSlide(next);
  };

  const startAutoCycle = () => {
    autoCycleInterval = setInterval(nextSlide, 6000);
  };

  const stopAutoCycle = () => {
    clearInterval(autoCycleInterval);
  };

  // Add click listeners to dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      stopAutoCycle();
      startAutoCycle(); // Restart timer
    });
  });

  // Start auto-slide
  startAutoCycle();
}

// ==========================================================================
// BOOKING DIALOGS & INVOKERS FALLBACK
// ==========================================================================
function initDialogs() {
  const bookingDialog = document.querySelector('#booking-dialog');
  const roomDetailDialog = document.querySelector('#room-detail-dialog');
  const roomDetailBody = document.querySelector('#room-detail-body');
  
  if (!bookingDialog || !roomDetailDialog) return;

  const supportsInvokers = 'commandForElement' in HTMLButtonElement.prototype;

  // 1. Invoker Commands manual fallback (for browsers lacking native support)
  if (!supportsInvokers) {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('button[commandfor]');
      if (!button) return;

      const targetId = button.getAttribute('commandfor');
      const command = button.getAttribute('command');
      const target = document.getElementById(targetId);

      if (target && command) {
        // Dispatch Custom 'command' event
        target.dispatchEvent(new CustomEvent('command', {
          bubbles: true,
          detail: { command }
        }));
      }
    });

    // Add event listeners on target dialogs to handle custom events
    const handleCommand = (event) => {
      const command = event.command || event.detail?.command;
      const target = event.currentTarget;

      if (command === 'show-modal' && typeof target.showModal === 'function') {
        target.showModal();
        target.classList.add(':open'); // Fallback style class
      } else if (command === 'close' && typeof target.close === 'function') {
        target.close();
        target.classList.remove(':open');
      }
    };

    bookingDialog.addEventListener('command', handleCommand);
    roomDetailDialog.addEventListener('command', handleCommand);
  } else {
    // Native support: add fallback style class tracking for animation
    bookingDialog.addEventListener('close', () => bookingDialog.classList.remove(':open'));
    roomDetailDialog.addEventListener('close', () => roomDetailDialog.classList.remove(':open'));

    // Trigger state styles immediately
    const openObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'open') {
          const target = mutation.target;
          if (target.hasAttribute('open')) {
            target.classList.add(':open');
          } else {
            target.classList.remove(':open');
          }
        }
      });
    });
    openObserver.observe(bookingDialog, { attributes: true });
    openObserver.observe(roomDetailDialog, { attributes: true });
  }

  // 2. Light-dismiss fallback: Clicking on dialog backdrop
  const setupLightDismiss = (dialogEl) => {
    // If browser doesn't natively support closedby="any" on dialog
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialogEl.addEventListener('click', (event) => {
        if (event.target !== dialogEl) return;

        const rect = dialogEl.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
          dialogEl.close();
          dialogEl.classList.remove(':open');
        }
      });
    }
  };

  setupLightDismiss(bookingDialog);
  setupLightDismiss(roomDetailDialog);

  // 3. Room Details triggering & dynamic popup rendering
  const detailsButtons = document.querySelectorAll('.room-details-trigger');
  detailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const roomKey = e.target.getAttribute('data-room');
      const data = ROOM_DATA[roomKey];
      if (!data) return;

      // Populate details dialog
      roomDetailBody.innerHTML = `
        <div class="room-detail-img-wrapper">
          <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="room-detail-info">
          <h2 class="room-title" id="room-detail-title" style="font-size: 2rem; margin-bottom: 8px;">${data.title}</h2>
          <div class="room-detail-specs">
            <span>📐 ${data.size}</span>
            <span>🌅 ${data.view}</span>
            <span>👥 Max ${data.guests}</span>
          </div>
          <p class="room-detail-desc">${data.description}</p>
          
          <h4 style="font-family: var(--font-sans); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; color: var(--color-gold); margin-bottom: 12px; font-weight:600;">Suite Exclusives</h4>
          <div class="room-detail-amenity-list">
            ${data.amenities.map(amenity => `<div class="room-detail-amenity-item">${amenity}</div>`).join('')}
          </div>

          <div class="room-detail-footer">
            <div class="room-price">
              <span class="price-amount" style="font-size: 1.8rem;">${data.price}</span>
              <span class="price-unit">/ night</span>
            </div>
            <button class="btn btn-gold btn-book-from-detail" data-room-key="${roomKey}">Reserve This Suite</button>
          </div>
        </div>
      `;

      // Show details dialog
      roomDetailDialog.showModal();
      roomDetailDialog.classList.add(':open');

      // Bind Booking CTA inside the detail popup
      const reserveFromDetailBtn = roomDetailBody.querySelector('.btn-book-from-detail');
      reserveFromDetailBtn.addEventListener('click', () => {
        // Pre-select room type in booking dropdown
        const selectDropdown = document.querySelector('#booking-room');
        if (selectDropdown) {
          selectDropdown.value = roomKey;
        }
        
        // Close details, open booking form
        roomDetailDialog.close();
        roomDetailDialog.classList.remove(':open');
        setTimeout(() => {
          bookingDialog.showModal();
          bookingDialog.classList.add(':open');
        }, 150); // smooth switch delay
      });
    });
  });
}

// ==========================================================================
// LUXURY FORM SUBMISSIONS (MOCK ACTIONS)
// ==========================================================================
function initForms() {
  const bookingForm = document.querySelector('#booking-form');
  const bookingDialog = document.querySelector('#booking-dialog');
  const contactForm = document.querySelector('#contact-form');
  const quickCheckForm = document.querySelector('#quick-check-form');
  const newsletterForm = document.querySelector('#newsletter-form');

  // Helper to show modern mock alerts
  const showFeedback = (title, message) => {
    alert(`${title}\n\n${message}`);
  };

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.querySelector('#booking-name').value;
      const email = document.querySelector('#booking-email').value;
      const roomVal = document.querySelector('#booking-room').value;
      const checkin = document.querySelector('#booking-checkin').value;
      const checkout = document.querySelector('#booking-checkout').value;

      showFeedback(
        "Reservation Inquiry Received",
        `Thank you, ${name}. We have received your inquiry for the ${ROOM_DATA[roomVal]?.title || 'Suite'} from ${checkin} to ${checkout}.\n\nOur concierge guest relations team will contact you at ${email} within 2 hours to finalize details and confirm your reservation.`
      );

      bookingForm.reset();
      if (bookingDialog) {
        bookingDialog.close();
        bookingDialog.classList.remove(':open');
      }
    });
  }

  // Quick Check Widget Submission
  if (quickCheckForm) {
    quickCheckForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkin = document.querySelector('#quick-checkin').value;
      const checkout = document.querySelector('#quick-checkout').value;
      const guests = document.querySelector('#quick-guests').value;

      // Populate booking form dates
      document.querySelector('#booking-checkin').value = checkin;
      document.querySelector('#booking-checkout').value = checkout;
      document.querySelector('#booking-guests').value = guests;

      // Open booking dialog
      if (bookingDialog) {
        bookingDialog.showModal();
        bookingDialog.classList.add(':open');
      }
    });
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#contact-name').value;
      const email = document.querySelector('#contact-email').value;

      showFeedback(
        "Inquiry Sent Successfully",
        `Dear ${name},\n\nYour message has been encrypted and dispatched to our Guest Relations department. An advisor will review your message and get in touch at ${email} shortly.`
      );

      contactForm.reset();
    });
  }

  // Newsletter Form Submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#newsletter-email').value;

      showFeedback(
        "Welcome to L'Horizon Circle",
        `You have been subscribed with ${email}. You will now receive private seasonal packages, event listings, and bespoke updates before the general public.`
      );

      newsletterForm.reset();
    });
  }

  // Prevent selecting past dates in booking forms
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.min = today;
  });
}

// ==========================================================================
// INITIALIZATION ON DOM CONTENT LOADED
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initShrinkingHeader();
  initScrollSpy();
  initMobileMenu();
  initTestimonialCarousel();
  initDialogs();
  initForms();
});
