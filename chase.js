/**
 * Chasey Comic-Book Landing Page Interactions
 * Handles scroll reveals, 3D hover tilts, and sparkle particle systems
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Header Scroll Behavior
  // ==========================================================================
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================================================
  // 2. Scroll Reveal Animations
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, we can unobserve
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset bottom threshold
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================================================
  // 3. 3D Tilt Effect on Hero Cards
  // ==========================================================================
  const heroCards = document.querySelectorAll('.hero-card');
  
  heroCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      
      // Calculate mouse position relative to card center (normalized between -0.5 and 0.5)
      const mouseX = (e.clientX - cardRect.left) / cardRect.width - 0.5;
      const mouseY = (e.clientY - cardRect.top) / cardRect.height - 0.5;
      
      // Rotation ranges (max 15 degrees)
      const rotateX = -mouseY * 20;
      const rotateY = mouseX * 20;
      
      // Apply 3D perspective rotation and scaling
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1) translateY(-20px) rotate(0deg)`;
      card.style.boxShadow = `${12 - mouseX*10}px ${12 - mouseY*10}px 0px var(--color-border-dark)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Restore default CSS transition coordinates
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // ==========================================================================
  // 4. Dynamic Sparkle Star Particle Spawner
  // ==========================================================================
  const highlightBrand = document.querySelector('.highlight-orange');
  
  if (highlightBrand) {
    // Spawns a sparkle star at random intervals
    const spawnSparkle = () => {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle-particle';
      sparkle.innerHTML = Math.random() > 0.5 ? '✦' : '★';
      
      // Randomize color (yellow or orange)
      const colors = ['#F8D249', '#FF7A00', '#FFFFFF'];
      sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      // Randomize size
      const size = Math.random() * 1.5 + 0.8;
      sparkle.style.fontSize = `${size}rem`;
      
      // Position around the brand text
      const rect = highlightBrand.getBoundingClientRect();
      const randomX = Math.random() * rect.width;
      const randomY = Math.random() * rect.height;
      
      sparkle.style.position = 'absolute';
      sparkle.style.left = `${randomX}px`;
      sparkle.style.top = `${randomY}px`;
      sparkle.style.pointerEvents = 'none';
      sparkle.style.textShadow = '1px 1px 0px #1C1C1C';
      sparkle.style.zIndex = '5';
      sparkle.style.transition = 'all 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)';
      sparkle.style.opacity = '1';
      
      highlightBrand.appendChild(sparkle);
      
      // Animation frames
      setTimeout(() => {
        const floatDistance = Math.random() * 40 + 20;
        const driftDistance = (Math.random() - 0.5) * 30;
        sparkle.style.transform = `translate(${driftDistance}px, -${floatDistance}px) scale(0.5) rotate(${Math.random() * 180}deg)`;
        sparkle.style.opacity = '0';
      }, 50);
      
      // Cleanup after fade out
      setTimeout(() => {
        sparkle.remove();
      }, 1600);
    };

    // Spawn stars periodically
    setInterval(spawnSparkle, 750);
  }

  // ==========================================================================
  // 5. Interactive Demo Elements (Form validation feedback)
  // ==========================================================================
  const leadForm = document.getElementById('lead-capture-form');
  const phoneInput = document.getElementById('phone-input');
  const submitBtn = document.getElementById('form-submit-btn');

  if (leadForm && phoneInput && submitBtn) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Comic style alert/feedback
      const phoneVal = phoneInput.value.trim();
      if (phoneVal) {
        submitBtn.textContent = 'BOOM!';
        submitBtn.style.backgroundColor = '#A9D18E';
        submitBtn.style.color = '#1C1C1C';
        phoneInput.disabled = true;
        
        // Add speech bubble to the form
        const successBubble = document.createElement('div');
        successBubble.className = 'speech-bubble font-handwritten form-success-bubble';
        successBubble.innerHTML = 'Chasey is on it! Check your phone!';
        successBubble.style.position = 'absolute';
        successBubble.style.top = '-70px';
        successBubble.style.left = '50%';
        successBubble.style.transform = 'translateX(-50%)';
        successBubble.style.zIndex = '10';
        successBubble.style.border = '2px solid #1c1c1c';
        successBubble.style.boxShadow = '4px 4px 0px #1c1c1c';
        
        leadForm.style.position = 'relative';
        leadForm.appendChild(successBubble);
        
        setTimeout(() => {
          successBubble.style.opacity = '0';
          successBubble.style.transition = 'opacity 0.5s ease';
          setTimeout(() => successBubble.remove(), 500);
        }, 3000);
      }
    });
  }

});
