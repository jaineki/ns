/* =============================================
   ABACA & LAMPAKANAY — NATIVE PRODUCTS WEBSITE
   JavaScript
   ============================================= */

// ---- DOM References ----
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const fabMain   = document.getElementById('fabMain');
const fabOptions= document.getElementById('fabOptions');
const backToTop = document.getElementById('backToTop');
const allLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

// ==============================================
// NAVBAR — Scroll effect & active link tracking
// ==============================================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Add scrolled class to navbar
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link highlighting
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  allLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Trigger reveal animations on scroll
  revealOnScroll();
});

// ==============================================
// MOBILE HAMBURGER MENU
// ==============================================
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ==============================================
// FLOATING ACTION BUTTON (FAB)
// ==============================================
fabMain.addEventListener('click', () => {
  fabOptions.classList.toggle('open');

  // Animate the icon
  if (fabOptions.classList.contains('open')) {
    fabMain.textContent = '✕';
    fabMain.style.background = 'var(--dark-brown)';
  } else {
    fabMain.textContent = '💬';
    fabMain.style.background = 'var(--accent)';
  }
});

// Close FAB when clicking outside
document.addEventListener('click', (e) => {
  if (!document.getElementById('floatingBtn').contains(e.target)) {
    fabOptions.classList.remove('open');
    fabMain.textContent = '💬';
    fabMain.style.background = 'var(--accent)';
  }
});

// ==============================================
// SCROLL REVEAL ANIMATION
// ==============================================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      // Stagger sibling reveals
      const siblings = el.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, i) => {
        if (sib === el) delay = i * 80;
      });
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
    }
  });
}

// Run on load too
window.addEventListener('load', () => {
  revealOnScroll();

  // Animate hero content immediately (it's above fold)
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
});

// ==============================================
// SMOOTH SCROLL for anchor links
// ==============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==============================================
// GALLERY — Lightbox (simple version)
// ==============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    // If real images are added, this would open a lightbox
    // For now, the overlay label appears on hover (CSS handles it)
  });
});

// ==============================================
// PRODUCT CARD — Hover ripple effect
// ==============================================
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ==============================================
// NAVBAR — Hide on scroll down, show on scroll up
// ==============================================
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Don't hide navbar at top
  if (currentScrollY > 200) {
    if (currentScrollY > lastScrollY) {
      // Scrolling down — hide on mobile if menu is closed
      if (window.innerWidth <= 768 && !navLinks.classList.contains('open')) {
        navbar.style.transform = 'translateY(-100%)';
      }
    } else {
      // Scrolling up — show
      navbar.style.transform = 'translateY(0)';
    }
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
});

// Add transform transition to navbar
navbar.style.transition = 'background 0.4s, box-shadow 0.4s, padding 0.3s, transform 0.4s';

// ==============================================
// STATS COUNTER ANIMATION (About section)
// ==============================================
function animateCounters() {
  const statItems = document.querySelectorAll('.stat-item strong');
  statItems.forEach(item => {
    // Only animate numeric values
    const text = item.textContent.trim();
    if (text.endsWith('%')) {
      const target = parseInt(text);
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        item.textContent = Math.floor(current) + '%';
      }, 30);
    }
  });
}

// Trigger counter when about section is visible
const aboutSection = document.getElementById('about');
let countersAnimated = false;
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      animateCounters();
    }
  });
}, { threshold: 0.3 });

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// ==============================================
// HERO — Subtle parallax on scroll
// ==============================================
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (heroSection) {
    const scrollY = window.scrollY;
    const parallaxVal = scrollY * 0.3;
    heroSection.style.backgroundPositionY = `${parallaxVal}px`;
  }
}, { passive: true });

// ==============================================
// CONTACT CARDS — Hover pop animation
// ==============================================
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ==============================================
// UTILITY — Debounce function
// ==============================================
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Re-run reveal check on resize (debounced)
window.addEventListener('resize', debounce(revealOnScroll, 100));

// ==============================================
// INIT — Run immediately
// ==============================================
(function init() {
  // Ensure navbar is correct on initial load
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  }

  // Set initial back to top visibility
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  }

  console.log('🌿 Abaca & Lampakanay — Website Loaded');
})();
