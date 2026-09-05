// Vulture Spec — shared site behaviour
document.addEventListener('DOMContentLoaded', () => {

  /* Sticky nav compact state */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  if (toggle && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', openMenu);
    mobileClose && mobileClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* Scroll reveal — single restrained pass, respects reduced motion */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => io.observe(el));
    }
  }

  /* Service group accordion */
  document.querySelectorAll('.service-group-head').forEach(head => {
    head.addEventListener('click', () => {
      const group = head.closest('.service-group');
      const isOpen = group.getAttribute('data-open') === 'true';
      group.setAttribute('data-open', String(!isOpen));
      head.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* How-we-work interactive stages */
  const stages = document.querySelectorAll('.stage');
  const detail = document.querySelector('.stage-detail');
  if (stages.length && detail) {
    const setStage = (el) => {
      stages.forEach(s => s.classList.remove('is-active'));
      el.classList.add('is-active');
      detail.innerHTML = `<strong>${el.dataset.name}</strong>${el.dataset.detail}`;
    };
    stages.forEach(s => s.addEventListener('click', () => setStage(s)));
    setStage(stages[0]);
  }

  /* Portfolio filters */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const val = btn.dataset.filter;
        caseCards.forEach(card => {
          const match = val === 'all' || card.dataset.category === val;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* Contact form — static placeholder submit, ready to wire to a backend/form service */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = "Thanks — your message has been noted. We'll get back to you shortly.";
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }

  /* Active nav link by current page */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
