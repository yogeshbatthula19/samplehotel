// ==========================================================================
// SOLUTIONS TAB DATA
// ==========================================================================
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

// ==========================================================================
// TABS SWITCHER INTERACTION
// ==========================================================================
function initTabSwitcher() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cardBody = document.querySelector('#panel-content');
  const cardTag = document.querySelector('#card-tag');
  const cardHeadline = document.querySelector('#card-headline');
  const cardPrice = document.querySelector('#card-price');

  if (tabs.length === 0 || !cardBody) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const selectedTab = e.currentTarget;
      const tabKey = selectedTab.getAttribute('data-tab');
      const data = TAB_DATA[tabKey];

      if (!data) return;

      // 1. Update active states on tab buttons
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      selectedTab.classList.add('active');
      selectedTab.setAttribute('aria-selected', 'true');

      // 2. Trigger fade transition on display card
      cardBody.classList.add('fade');

      setTimeout(() => {
        // 3. Swap text contents (replacing newline with <br> for styling)
        cardTag.textContent = data.tag;
        cardHeadline.innerHTML = data.headline.replace('\n', '<br>');
        cardPrice.textContent = data.price;
        
        // 4. Fade back in
        cardBody.classList.remove('fade');
      }, 150);
    });
  });
}

// ==========================================================================
// STICKY HEADER SCROLL EVENT
// ==========================================================================
function initStickyHeader() {
  const header = document.querySelector('.ins-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run on load
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTabSwitcher();
  initStickyHeader();
});
