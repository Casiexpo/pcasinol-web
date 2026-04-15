/* ==============================
   MAIN.JS — Pol Casiñol Expósito
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────
     NAVBAR: scroll + mobile burger
  ────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const burger   = document.getElementById('burger');
  const navMobile = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  burger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    const bars = burger.querySelectorAll('span');
    const isOpen = navMobile.classList.contains('open');
    bars[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    bars[1].style.opacity   = isOpen ? '0' : '';
    bars[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  // Close mobile nav on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  /* ──────────────────────────────
     INTERSECTION OBSERVER: reveal
  ────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings within the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObs.observe(el));

  /* ──────────────────────────────
     HERO: fade in on load
  ────────────────────────────── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 200);
  }

  /* ──────────────────────────────
     LANGUAGE BARS: animate on scroll
  ────────────────────────────── */
  const langFills = document.querySelectorAll('.lang-fill');

  const langObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // The width is set inline in HTML; trigger CSS transition
        const fill = entry.target;
        const target = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.width = target;
          });
        });
        langObs.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  langFills.forEach(fill => {
    const target = fill.style.width;
    fill.dataset.target = target;
    fill.style.width = '0';
    langObs.observe(fill);
  });

  /* ──────────────────────────────
     SMOOTH SCROLL (fallback for older browsers)
  ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────
     DYNAMIC CURSOR GLOW on hero
  ────────────────────────────── */
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const glowBlue   = hero.querySelector('.glow-blue');
      const glowPurple = hero.querySelector('.glow-purple');
      if (glowBlue)   glowBlue.style.transform   = `translate(${(x - 50) * 0.15}px, ${(y - 50) * 0.15}px)`;
      if (glowPurple) glowPurple.style.transform = `translate(${(x - 50) * -0.1}px, ${(y - 50) * -0.1}px)`;
    }, { passive: true });
  }

  /* ──────────────────────────────
     SKILL CARDS: staggered icon color cycle
  ────────────────────────────── */
  const skillIcons = document.querySelectorAll('.skill-icon');
  const accentColors = ['var(--blue)', 'var(--purple)', 'var(--blue)', 'var(--purple)', 'var(--blue)'];
  skillIcons.forEach((icon, i) => {
    icon.style.color = accentColors[i % accentColors.length];
    if (i % 2 === 1) {
      icon.style.background = 'var(--purple-dim)';
    }
  });

  /* ──────────────────────────────
     COUNTER ANIMATION on stats
  ────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)(\+?)$/);
      if (!match) return;
      const target = parseInt(match[1], 10);
      const plus   = match[2] || '';
      let current  = 0;
      const step   = Math.ceil(target / 30);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + plus;
        if (current >= target) clearInterval(timer);
      }, 40);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.8 });

  statNums.forEach(el => counterObs.observe(el));

  /* ──────────────────────────────
     CONTACT CARDS: hover ripple effect
  ────────────────────────────── */
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      const icon = this.querySelector('.contact-icon i');
      if (!icon) return;
      icon.style.transform = 'scale(1.2) rotate(-8deg)';
      icon.style.transition = '0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    card.addEventListener('mouseleave', function () {
      const icon = this.querySelector('.contact-icon i');
      if (!icon) return;
      icon.style.transform = '';
    });
  });

  /* ──────────────────────────────
     TIMELINE DOTS: pulse on hover
  ────────────────────────────── */
  document.querySelectorAll('.tl-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      const dot = this.parentElement.querySelector('.tl-dot');
      if (dot) {
        dot.style.transform = 'scale(1.4)';
        dot.style.transition = '0.2s ease';
      }
    });
    card.addEventListener('mouseleave', function () {
      const dot = this.parentElement.querySelector('.tl-dot');
      if (dot) {
        dot.style.transform = '';
      }
    });
  });

  /* ──────────────────────────────
     NAVBAR ACTIVE SECTION highlight
  ────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--white)'
            : '';
        });
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-64px 0px 0px 0px'
  });

  sections.forEach(s => sectionObs.observe(s));

});