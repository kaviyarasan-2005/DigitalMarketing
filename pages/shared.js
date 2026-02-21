// ===== DigiBoost Shared JS =====

// RTL Toggle
function toggleRTL() {
  const body = document.body;
  const isRTL = body.classList.toggle('rtl');
  localStorage.setItem('digiboost-dir', isRTL ? 'rtl' : 'ltr');
  const btn = document.getElementById('rtl-btn');
  if (btn) btn.title = isRTL ? 'Switch to LTR' : 'Switch to RTL';
}

// Load saved direction
function loadDirection() {
  const saved = localStorage.getItem('digiboost-dir');
  if (saved === 'rtl') document.body.classList.add('rtl');
}

// Scrolled header
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile Nav
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// Active nav link
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page) a.classList.add('active');
  });
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// Fade up on scroll
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
  loadDirection();
  initScrollHeader();
  initMobileNav();
  setActiveNav();
  animateCounters();
  initScrollAnimations();
});

// Build standard header HTML
function buildHeader(currentPage) {
  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="brand">
        <div class="brand-icon">⚡</div>
        DigiBoost
      </a>
      <nav>
        <ul class="nav-links">
          <li class="nav-dropdown">
            <a href="#">🏠 Home</a>
            <div class="dropdown-menu">
              <a href="index.html" class="dd-home1"><span class="dd-icon">🌟</span> Home 1 – Bold</a>
              <a href="index2.html" class="dd-home2"><span class="dd-icon">🌊</span> Home 2 – Minimal</a>
            </div>
          </li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="case-studies.html">Case Studies</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li class="nav-dropdown">
            <a href="#">📊 Dashboard</a>
            <div class="dropdown-menu">
              <a href="user-dashboard.html" class="dd-user"><span class="dd-icon">👤</span> User Dashboard</a>
              <a href="admin-dashboard.html" class="dd-admin"><span class="dd-icon">🛡</span> Admin Dashboard</a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="btn-rtl" id="rtl-btn" onclick="toggleRTL()" title="Toggle RTL/LTR">🌐</button>
        <a href="login.html"><button class="btn-outline">Log In</button></a>
        <a href="signup.html"><button class="btn-primary">Get Started</button></a>
        <div class="hamburger" onclick="document.querySelector('.mobile-nav').classList.toggle('open')">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </header>
  <nav class="mobile-nav">
    <a href="index.html">🏠 Home 1 – Bold</a>
    <a href="index2.html">🏠 Home 2 – Minimal</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="pricing.html">Pricing</a>
    <a href="case-studies.html">Case Studies</a>
    <a href="contact.html">Contact</a>
    <a href="user-dashboard.html">👤 User Dashboard</a>
    <a href="admin-dashboard.html">🛡 Admin Dashboard</a>
    <a href="login.html">Log In</a>
    <a href="signup.html">Get Started →</a>
  </nav>`;
}

// Build standard footer HTML
function buildFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="brand" style="font-size:1.3rem;">
          <div class="brand-icon" style="width:32px;height:32px;font-size:16px;">⚡</div>
          DigiBoost
        </a>
        <p>Empowering brands through data-driven digital marketing and SEO strategies that deliver measurable results.</p>
        <div class="footer-social">
          <a href="#" class="social-btn">𝕏</a>
          <a href="#" class="social-btn">in</a>
          <a href="#" class="social-btn">f</a>
          <a href="#" class="social-btn">▶</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html">SEO Optimization</a></li>
          <li><a href="services.html">PPC Advertising</a></li>
          <li><a href="services.html">Content Marketing</a></li>
          <li><a href="services.html">Social Media</a></li>
          <li><a href="services.html">Email Marketing</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="case-studies.html">Case Studies</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="coming-soon.html">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">API Status</a></li>
          <li><a href="login.html">Login</a></li>
          <li><a href="signup.html">Sign Up</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} DigiBoost. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>`;
}
