document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.nav');
 const syncNav=()=>nav&&nav.classList.toggle('scrolled',window.scrollY>12);
 syncNav(); window.addEventListener('scroll',syncNav,{passive:true});
 const toggle=document.querySelector('.nav-toggle'); const menu=document.querySelector('.mobile-menu'); const close=document.querySelector('.mobile-menu-close');
 const closeMenu=()=>{menu?.classList.remove('open');document.body.style.overflow='';toggle?.setAttribute('aria-expanded','false')};
 if(toggle&&menu){toggle.addEventListener('click',()=>{menu.classList.add('open');document.body.style.overflow='hidden';toggle.setAttribute('aria-expanded','true')});close?.addEventListener('click',closeMenu);menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const reveals=document.querySelectorAll('[data-reveal]');
 if(reduced||!('IntersectionObserver' in window)) reveals.forEach(e=>e.classList.add('is-visible')); else {const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});reveals.forEach(e=>io.observe(e));}
 document.querySelectorAll('.service-group-head').forEach(head=>head.addEventListener('click',()=>{const g=head.closest('.service-group'),open=g.dataset.open==='true';g.dataset.open=String(!open);head.setAttribute('aria-expanded',String(!open));}));
 const stages=[...document.querySelectorAll('.stage')],detail=document.querySelector('.stage-detail');
 if(stages.length&&detail){const set=s=>{stages.forEach(x=>x.classList.remove('active'));s.classList.add('active');detail.innerHTML='<strong>'+s.dataset.name+'</strong>'+s.dataset.detail};stages.forEach(s=>s.addEventListener('click',()=>set(s)));set(stages[0]);}
 const filters=document.querySelectorAll('.filter-btn,.filter'),cards=document.querySelectorAll('[data-category]');
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active','is-active'));btn.classList.add('active');const v=btn.dataset.filter;cards.forEach(c=>c.style.display=v==='all'||c.dataset.category===v?'':'none')}));
 const form=document.querySelector('#contact-form');
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');if(status){status.textContent="Thanks — your message has been noted. We'll get back to you shortly.";status.classList.add('is-visible')}form.reset()});
 const path=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a,.mobile-menu-links a').forEach(a=>{if(a.getAttribute('href')===path)a.classList.add('active')});
});