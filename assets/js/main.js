(() => { document.documentElement.classList.add('js'); })();

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('link[data-saas-theme]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = 'assets/css/saas.css?v=20260919';
    theme.dataset.saasTheme = 'true';
    document.head.appendChild(theme);
  }

  const icon = document.querySelector('link[rel="icon"]');
  if (icon) { icon.href = 'assets/img/favicon.svg?v=20260919'; icon.type = 'image/svg+xml'; }

  const addTeamLink = selector => document.querySelectorAll(selector).forEach(list => {
    if (list.querySelector('a[href="team.html"]')) return;
    const li = document.createElement('li');
    li.innerHTML = '<a href="team.html">Team</a>';
    list.appendChild(li);
  });
  addTeamLink('.nav-links'); addTeamLink('.mobile-menu-links');

  const WHATSAPP = '919987952052';
  const whatsappUrl = (text = 'Hello Vulture Spec, I would like to discuss my business.') => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  if (!document.querySelector('.whatsapp-float')) {
    const wa = document.createElement('a');
    wa.className = 'whatsapp-float'; wa.href = whatsappUrl(); wa.target = '_blank'; wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Chat with Vulture Spec on WhatsApp');
    wa.innerHTML = '<span aria-hidden="true"></span> WhatsApp'; document.body.appendChild(wa);
  }

  // Restore the premium SaaS homepage architecture: dashboard hero + structured ecosystem board.
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.innerHTML = `
      <div class="hero-dashboard" aria-label="Vulture Spec digital growth system">
        <div class="dashboard-top"><span class="dashboard-kicker">Vulture Spec / Growth system</span><span class="dashboard-status">Connected ecosystem</span></div>
        <div class="dashboard-title">One system for <span>digital growth.</span></div>
        <div class="dashboard-flow">
          <div class="flow-card accent"><strong>Strategy</strong><span>Direction & positioning</span></div>
          <div class="flow-card"><strong>Creative</strong><span>Content & campaigns</span></div>
          <div class="flow-card"><strong>Channels</strong><span>Ads, social & influencers</span></div>
          <div class="flow-card"><strong>Technology</strong><span>Web, CRM & commerce</span></div>
        </div>
        <div class="dashboard-line"></div>
        <div class="dashboard-flow" style="margin-top:10px">
          <div class="flow-card"><strong>Measure</strong><span>Signals, data & learning</span></div>
          <div class="flow-card accent"><strong>Optimize</strong><span>Refine what moves growth</span></div>
        </div>
      </div>`;
  }

  const ecosystem = document.querySelector('.ecosystem');
  if (ecosystem) {
    ecosystem.innerHTML = `
      <div class="eco-board" role="img" aria-label="Vulture Spec digital ecosystem connecting social media, advertising, influencers, SEO, websites, CRM, e-commerce, WhatsApp and analytics">
        <div class="eco-node"><small>Reach</small><strong>Social Media</strong><span>Content, presence & community</span></div>
        <div class="eco-node"><small>Campaigns</small><strong>Advertising</strong><span>Paid media & audience growth</span></div>
        <div class="eco-node"><small>Trust</small><strong>Influencers</strong><span>Creator-led discovery</span></div>
        <div class="eco-node eco-core"><div><strong>VULTURE SPEC</strong><em>One connected growth system</em></div></div>
        <div class="eco-node"><small>Discover</small><strong>SEO</strong><span>Search visibility & intent</span></div>
        <div class="eco-node"><small>Convert</small><strong>Website</strong><span>Digital experience & conversion</span></div>
        <div class="eco-node"><small>Commerce</small><strong>E-commerce</strong><span>Marketplace & online selling</span></div>
        <div class="eco-node"><small>Retain</small><strong>CRM</strong><span>Customer relationships & workflow</span></div>
        <div class="eco-node"><small>Connect</small><strong>WhatsApp & Analytics</strong><span>Direct communication & insight</span></div>
      </div>`;
  }

  const nav = document.querySelector('.nav');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress'; progress.setAttribute('aria-hidden','true'); document.body.appendChild(progress);
  const hero = document.querySelector('.hero');
  const syncScroll = () => {
    const doc = document.documentElement, max = doc.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    nav?.classList.toggle('scrolled', scrollY > 12);
    if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const p = Math.min(scrollY / Math.max(innerHeight, 1), 1);
      hero.style.setProperty('--scroll-progress', p.toFixed(3));
    }
  };
  syncScroll(); addEventListener('scroll', syncScroll, {passive:true}); addEventListener('resize', syncScroll);

  const menu = document.querySelector('.mobile-menu'), openButton = document.querySelector('.nav-row .nav-toggle'), closeButton = document.querySelector('.mobile-menu-close');
  const setMenu = open => { menu?.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; openButton?.setAttribute('aria-expanded', String(open)); };
  openButton?.addEventListener('click', () => setMenu(true)); closeButton?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('is-visible'));
  else {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    }), {threshold:.12, rootMargin:'0px 0px -55px'});
    reveals.forEach(el => io.observe(el));
  }

  document.querySelectorAll('.section > .container, .strip > .container').forEach((el,i) => {
    if (!el.hasAttribute('data-reveal')) { el.setAttribute('data-reveal',''); el.style.setProperty('--reveal-delay', `${Math.min(i*45,180)}ms`); }
  });
  if (!reduced && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); so.unobserve(entry.target); }
    }), {threshold:.08, rootMargin:'0px 0px -70px'});
    document.querySelectorAll('.section > .container, .strip > .container').forEach(el => so.observe(el));
  } else document.querySelectorAll('.section > .container, .strip > .container').forEach(el => el.classList.add('is-visible'));

  document.querySelectorAll('.service-group-head').forEach(head => head.addEventListener('click', () => {
    const group=head.closest('.service-group'); if(!group)return; const open=group.dataset.open==='true';
    group.dataset.open=String(!open); head.setAttribute('aria-expanded',String(!open));
  }));

  const stages=[...document.querySelectorAll('.stage')], detail=document.querySelector('.stage-detail');
  if(stages.length&&detail){
    const setStage=stage=>{stages.forEach(item=>{const active=item===stage;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.setAttribute('tabindex',active?'0':'-1');});detail.innerHTML=`<strong>${stage.dataset.name||''}</strong>${stage.dataset.detail||''}`;};
    stages.forEach((stage,index)=>{stage.setAttribute('role','tab');stage.setAttribute('aria-selected',index===0?'true':'false');stage.setAttribute('tabindex',index===0?'0':'-1');stage.addEventListener('click',()=>setStage(stage));stage.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(e.key))return;e.preventDefault();const delta=(e.key==='ArrowRight'||e.key==='ArrowDown')?1:-1;const next=stages[(index+delta+stages.length)%stages.length];next.focus();setStage(next);});});
    setStage(stages[0]);
  }

  const filters=[...document.querySelectorAll('.filter-btn,.filter')],cards=[...document.querySelectorAll('[data-category]')];
  filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active','is-active'));button.classList.add('active');const value=button.dataset.filter||'all';cards.forEach(card=>{card.style.display=value==='all'||card.dataset.category===value?'':'none';});}));

  const form=document.querySelector('#contact-form');
  if(form)form.addEventListener('submit',event=>{event.preventDefault();const status=form.querySelector('.form-status');if(!form.checkValidity()){form.reportValidity();if(status)status.textContent='Please complete the required fields.';return;}const data=new FormData(form);const message=['Hello Vulture Spec,','',`Name: ${data.get('name')||''}`,`Business: ${data.get('company')||''}`,`Phone: ${data.get('phone')||''}`,`Email: ${data.get('email')||''}`,`Service: ${data.get('service')||'Not specified'}`,'',`Message: ${data.get('message')||''}`].join('\\n');if(status)status.textContent='Opening WhatsApp with your enquiry…';window.location.href=whatsappUrl(message);});
  document.querySelectorAll('a[href*="wa.me"],a[href*="whatsapp.com"]').forEach(link=>{const label=link.textContent.trim().toLowerCase();link.href=whatsappUrl(label.includes('whatsapp')?'Hello Vulture Spec, I would like to connect on WhatsApp.':'');link.target='_blank';link.rel='noopener noreferrer';});
  const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a,.mobile-menu-links a').forEach(link=>{if(link.getAttribute('href')===path)link.classList.add('active');});
});