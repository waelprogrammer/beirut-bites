// ── Announcement banner dismiss ────────────────────────────────────
document.getElementById('banner-close').addEventListener('click', () => {
  const banner = document.getElementById('announcement');
  banner.style.transition = 'max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease';
  banner.style.overflow   = 'hidden';
  banner.style.maxHeight  = banner.offsetHeight + 'px';
  requestAnimationFrame(() => {
    banner.style.maxHeight = '0';
    banner.style.opacity   = '0';
    banner.style.padding   = '0';
  });
  setTimeout(() => banner.remove(), 420);
});

// ── Hero particles (canvas) ────────────────────────────────────────
(function() {
  const canvas = document.getElementById('hero-canvas');
  const ctx    = canvas.getContext('2d');
  const EMOJIS = ['✦', '·', '◆', '✧', '⬡', '∙'];
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      size: Math.random() * 10 + 4,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:  -(Math.random() * 0.5 + 0.15),
      alpha: Math.random() * 0.35 + 0.05,
      char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      hue:  Math.random() > 0.6 ? '#d4a843' : 'rgba(255,255,255,0.6)',
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 55 }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.hue;
      ctx.font        = `${p.size}px serif`;
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -20 || p.x < -20 || p.x > W + 20) {
        Object.assign(p, makeParticle(), { y: H + 10, x: Math.random() * W });
      }
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();

// ── Navbar scroll effect ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Hamburger menu ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Menu tabs ──────────────────────────────────────────────────────
const tabBtns    = document.querySelectorAll('.tab-btn');
const menuPanels = document.querySelectorAll('.menu-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    menuPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    panel.classList.add('active');
    // re-trigger card animations
    panel.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.animation = 'none';
      card.offsetHeight; // reflow
      card.style.animation = '';
      card.style.animationDelay = (i * 0.07 + 0.05) + 's';
    });
  });
});

// ── Reservation form ───────────────────────────────────────────────
const resForm     = document.getElementById('resForm');
const formSuccess = document.getElementById('formSuccess');

// Set min date to today
const dateInput = document.getElementById('res-date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

resForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputs = resForm.querySelectorAll('[required]');
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#c0392b';
      input.style.background  = '#fff5f5';
      valid = false;
      setTimeout(() => {
        input.style.borderColor = '';
        input.style.background  = '';
      }, 2000);
    }
  });
  if (!valid) return;
  resForm.style.display = 'none';
  formSuccess.style.display = 'block';
});

// ── Scroll reveal ──────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Back to top ────────────────────────────────────────────────────
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Animated stat counters ─────────────────────────────────────────
const statEls      = document.querySelectorAll('.stat-number');
const statTargets  = [40, 500, 3];
const statSuffixes = ['+', '+', ''];
let statsAnimated  = false;

function animateCounters() {
  if (statsAnimated) return;
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    statsAnimated = true;
    statEls.forEach((el, i) => {
      const target   = statTargets[i];
      const suffix   = statSuffixes[i];
      const duration = 1400;
      const start    = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    });
  }
}

window.addEventListener('scroll', animateCounters, { passive: true });
animateCounters();

// ── Smooth active nav highlight on scroll ─────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : '';
  });
}, { passive: true });
