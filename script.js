/* =========================================================
   RzkyRsy Portfolio — Interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrolled = window.scrollY > 12;
    header.classList.toggle('scrolled', scrolled);

    const doc = document.documentElement;
    const scrollTotal = doc.scrollHeight - doc.clientHeight;
    const pct = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    scrollProgress.style.width = pct + '%';

    backToTop.classList.toggle('show', window.scrollY > 500);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  }

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ---------- Scrollspy active nav link ---------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => spy.observe(sec));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Skill bar fill on view ---------- */
  const bars = document.querySelectorAll('.bar-fill');
  if ('IntersectionObserver' in window && bars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.width + '%';
          barObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(bar => barObserver.observe(bar));
  } else {
    bars.forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
  }

  /* ---------- Project media slider (per card) ---------- */
  document.querySelectorAll('.project-media').forEach(media => {
    const slides = media.querySelector('.slides');
    if (!slides) return;
    const images = slides.querySelectorAll('img');
    const dots = media.querySelectorAll('.mdot');
    const prevBtn = media.querySelector('.media-prev');
    const nextBtn = media.querySelector('.media-next');
    if (images.length <= 1) return;

    let index = 0;

    function update() {
      slides.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function move(dir) {
      index = (index + dir + images.length) % images.length;
      update();
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); move(-1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); move(1); });
  });

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projectGrid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden-card', !match);
      });
    });
  });

  /* ---------- Project detail modal ---------- */
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalRole = document.getElementById('modalRole');
  const modalTech = document.getElementById('modalTech');
  const modalLinks = document.getElementById('modalLinks');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  let lastFocusedEl = null;

  function openModal(card) {
    const title = card.dataset.title || card.querySelector('h3').textContent;
    const categoryLabel = card.dataset.categoryLabel || '';
    const desc = card.dataset.desc || '';
    const role = card.dataset.role || 'Belum ada detail peran untuk proyek ini.';
    const tech = (card.dataset.tech || '').split(',').filter(Boolean);
    const images = card.dataset.images ? card.dataset.images.split(',') : [];
    const firstImg = images[0] || (card.querySelector('.slides img') ? card.querySelector('.slides img').src : '');
    const live = card.dataset.live;
    const source = card.dataset.source;

    modalImage.src = firstImg;
    modalImage.alt = title;
    modalCategory.textContent = categoryLabel;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalRole.textContent = role;

    modalTech.innerHTML = '';
    tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-badge';
      span.textContent = t;
      modalTech.appendChild(span);
    });

    modalLinks.innerHTML = '';
    if (live) {
      const a = document.createElement('a');
      a.href = live;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'btn btn-primary btn-sm';
      a.textContent = 'Live Demo';
      modalLinks.appendChild(a);
    }
    if (source) {
      const a = document.createElement('a');
      a.href = source;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'btn btn-outline btn-sm';
      a.textContent = 'Source Code';
      modalLinks.appendChild(a);
    }
    if (!live && !source) {
      const p = document.createElement('span');
      p.className = 'link-note';
      p.textContent = 'Belum tersedia secara publik.';
      modalLinks.appendChild(p);
    }

    lastFocusedEl = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('[data-open-detail]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      if (card) openModal(card);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

});
