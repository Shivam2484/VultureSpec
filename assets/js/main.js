(() => {
  if (!document.querySelector('link[data-saas-layer]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/saas.css';
    link.dataset.saasLayer = 'true';
    document.head.appendChild(link);
  }
})();

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const syncNav = () => nav?.classList.toggle('scrolled', window.scrollY > 12);
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  const menu = document.querySelector('.mobile-menu');
  const openButton = document.querySelector('.nav-row .nav-toggle');
  const closeButton = document.querySelector('.mobile-menu-close');
  const setMenu = open => {
    menu?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    openButton?.setAttribute('aria-expanded', String(open));
  };
  openButton?.addEventListener('click', () => setMenu(true));
  closeButton?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }), { threshold: 0.1, rootMargin: '0px 0px -45px' });
    reveals.forEach(el => io.observe(el));
  }

  document.querySelectorAll('.service-group-head').forEach(head => {
    head.addEventListener('click', () => {
      const group = head.closest('.service-group');
      if (!group) return;
      const open = group.dataset.open === 'true';
      group.dataset.open = String(!open);
      head.setAttribute('aria-expanded', String(!open));
    });
  });

  const stages = [...document.querySelectorAll('.stage')];
  const detail = document.querySelector('.stage-detail');
  if (stages.length && detail) {
    const setStage = stage => {
      stages.forEach(item => {
        const active = item === stage;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
        item.setAttribute('tabindex', active ? '0' : '-1');
      });
      detail.innerHTML = `<strong>${stage.dataset.name || ''}</strong>${stage.dataset.detail || ''}`;
    };
    stages.forEach((stage, index) => {
      stage.setAttribute('role', 'tab');
      stage.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      stage.setAttribute('tabindex', index === 0 ? '0' : '-1');
      stage.addEventListener('click', () => setStage(stage));
      stage.addEventListener('keydown', e => {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
        e.preventDefault();
        const delta = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
        const next = stages[(index + delta + stages.length) % stages.length];
        next.focus();
        setStage(next);
      });
    });
    setStage(stages[0]);
  }

  const filters = [...document.querySelectorAll('.filter-btn, .filter')];
  const cards = [...document.querySelectorAll('[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active', 'is-active'));
    button.classList.add('active');
    const value = button.dataset.filter || 'all';
    cards.forEach(card => { card.style.display = value === 'all' || card.dataset.category === value ? '' : 'none'; });
  }));

  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = 'Please complete the required fields.';
        return;
      }
      const data = new FormData(form);
      const message = [
        'Hello Vulture Spec,', '',
        `Name: ${data.get('name') || ''}`,
        `Business: ${data.get('company') || ''}`,
        `Phone: ${data.get('phone') || ''}`,
        `Email: ${data.get('email') || ''}`,
        `Service: ${data.get('service') || 'Not specified'}`, '',
        `Message: ${data.get('message') || ''}`
      ].join('\n');
      if (status) status.textContent = 'Opening WhatsApp with your enquiry…';
      window.open(`https://wa.me/919987952052?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu-links a').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });
});
