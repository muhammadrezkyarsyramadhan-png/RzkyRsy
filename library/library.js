/* Library — render, filter, pencarian, dan viewer */
(() => {
  const { certs, projects } = window.LIBRARY;
  const $ = (s) => document.querySelector(s);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (d) => new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const sets = { sertifikat: certs, portofolio: projects };
  const state = { tab: 'sertifikat', filter: 'all', q: '' };
  let list = [];            // item yang sedang tampil (dasar navigasi viewer)
  let cursor = 0, imgIdx = 0, lastFocus = null;

  const grid = $('#grid'), chips = $('#chips'), count = $('#count');
  const viewer = $('#viewer'), vImg = $('#vImg');

  /* ---------- Header ---------- */
  const header = $('#siteHeader');
  const hb = $('#hamburgerBtn'), mm = $('#mobileMenu');
  hb.addEventListener('click', () => hb.setAttribute('aria-expanded', String(mm.classList.toggle('open'))));
  document.addEventListener('click', (e) => {
    if (mm.classList.contains('open') && !mm.contains(e.target) && !hb.contains(e.target)) {
      mm.classList.remove('open'); hb.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Statistik (count-up halus) ---------- */
  const stats = { certs: certs.length, issuers: new Set(certs.map((c) => c.issuer.split(' (')[0])).size, projects: projects.length };
  document.querySelectorAll('[data-stat]').forEach((el) => {
    const to = stats[el.dataset.stat];
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 800, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  /* ---------- Render ---------- */
  const matches = (item, q) =>
    [item.title, item.issuer, item.category, item.credential, ...(item.tech || [])].join(' ').toLowerCase().includes(q);

  function cardHTML(item, i) {
    const isCert = state.tab === 'sertifikat';
    const img = isCert ? item.img : item.imgs[0];
    const meta = isCert
      ? `<p class="lib-meta">${fmt(item.date)}</p>${item.credential ? `<p class="lib-meta">ID: ${item.credential}</p>` : ''}`
      : `<div class="tech-badges">${item.tech.map((t) => `<span class="tech-badge">${t}</span>`).join('')}</div>`;
    return `<article class="lib-card" style="--i:${Math.min(i, 8)}">
      <button class="lib-thumb" type="button" data-open="${i}" aria-label="Lihat ${item.title}">
        <img src="${img}" alt="${isCert ? 'Sertifikat ' : 'Tampilan '}${item.title}" loading="lazy">
      </button>
      <div class="lib-body">
        <span class="lib-issuer">${item.issuer}</span>
        <h3>${item.title}</h3>
        ${meta}
        <button class="btn btn-ghost btn-sm" type="button" data-open="${i}">Lihat detail</button>
      </div>
    </article>`;
  }

  function render() {
    const items = sets[state.tab];
    const cats = [...new Set(items.map((x) => x.category))];
    if (state.filter !== 'all' && !cats.includes(state.filter)) state.filter = 'all';

    chips.innerHTML = ['all', ...cats].map((c) => {
      const n = c === 'all' ? items.length : items.filter((x) => x.category === c).length;
      return `<button class="filter-btn${state.filter === c ? ' active' : ''}" type="button" data-cat="${c}">${c === 'all' ? 'Semua' : c} (${n})</button>`;
    }).join('');

    const q = state.q.trim().toLowerCase();
    list = items.filter((x) => (state.filter === 'all' || x.category === state.filter) && (!q || matches(x, q)));

    grid.innerHTML = list.map(cardHTML).join('');
    count.textContent = `${list.length} dari ${items.length} ${state.tab === 'sertifikat' ? 'sertifikat' : 'proyek'}`;
    $('#empty').hidden = list.length > 0;
    if (!list.length) $('#emptyMsg').textContent = q ? `Tidak ada hasil untuk "${state.q.trim()}".` : 'Belum ada item di kategori ini.';
  }

  function setTab(tab, push = true) {
    state.tab = tab; state.filter = 'all'; state.q = ''; $('#q').value = '';
    document.querySelectorAll('.lib-tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    grid.setAttribute('aria-labelledby', 'tab-' + tab);
    if (push) history.replaceState(null, '', '#' + tab);
    render();
  }

  /* ---------- Viewer ---------- */
  function show(i) {
    cursor = (i + list.length) % list.length; imgIdx = 0;
    const it = list[cursor], isCert = state.tab === 'sertifikat';
    $('#vCat').textContent = it.category;
    $('#vTitle').textContent = it.title;
    $('#vIssuer').textContent = it.issuer;
    $('#vDesc').textContent = it.desc;
    $('#vCount').textContent = `${cursor + 1} dari ${list.length}`;

    const facts = isCert
      ? [['Tanggal terbit', fmt(it.date)], ...(it.credential ? [['ID kredensial', it.credential]] : [])]
      : [['Peran saya', it.role]];
    $('#vFacts').innerHTML = facts.map(([k, v]) => `<div><dt>${k}</dt><dd></dd></div>`).join('');
    document.querySelectorAll('#vFacts dd').forEach((dd, n) => { dd.textContent = facts[n][1]; });
    $('#vTech').innerHTML = isCert ? '' : it.tech.map((t) => `<span class="tech-badge">${t}</span>`).join('');

    const views = $('#vViews');
    views.innerHTML = !isCert && it.imgs.length > 1
      ? it.imgs.map((_, n) => `<button type="button" data-view="${n}" aria-pressed="${n === 0}">${it.imgLabels[n]}</button>`).join('') : '';

    $('#vActions').innerHTML = isCert && it.url
      ? `<a class="btn btn-primary btn-sm" href="${it.url}" target="_blank" rel="noopener">Verifikasi sertifikat</a>`
      : (isCert ? '' : ((it.live ? `<a class="btn btn-primary btn-sm" href="${it.live}" target="_blank" rel="noopener">Live demo</a>` : '') +
          (it.source ? `<a class="btn btn-outline btn-sm" href="${it.source}" target="_blank" rel="noopener">Source code</a>` : '') ||
          '<span class="link-note">Belum tersedia secara publik</span>'));

    const multi = list.length > 1;
    $('#vPrev').hidden = $('#vNext').hidden = !multi;
    setImg(isCert ? it.img : it.imgs[0], (isCert ? 'Sertifikat ' : 'Tampilan ') + it.title);
    history.replaceState(null, '', isCert ? '#cert-' + it.id : '#portofolio');
  }

  function setImg(src, alt) {
    vImg.classList.add('loading');
    vImg.onload = () => vImg.classList.remove('loading');
    vImg.alt = alt; vImg.src = src;
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    if (!viewer.open) viewer.showModal();
    requestAnimationFrame(() => viewer.classList.add('open'));
  }

  function close() {
    viewer.classList.remove('open');
    setTimeout(() => { if (viewer.open) viewer.close(); }, reduced ? 0 : 250);
  }

  viewer.addEventListener('close', () => {
    viewer.classList.remove('open');
    history.replaceState(null, '', '#' + state.tab);
    if (lastFocus) lastFocus.focus();
  });
  viewer.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  viewer.addEventListener('click', (e) => { if (e.target === viewer) close(); });
  $('#vClose').addEventListener('click', close);
  $('#vPrev').addEventListener('click', () => show(cursor - 1));
  $('#vNext').addEventListener('click', () => show(cursor + 1));
  $('#vViews').addEventListener('click', (e) => {
    const b = e.target.closest('[data-view]');
    if (!b) return;
    const it = list[cursor];
    imgIdx = +b.dataset.view;
    document.querySelectorAll('#vViews button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    setImg(it.imgs[imgIdx], 'Tampilan ' + it.imgLabels[imgIdx].toLowerCase() + ' ' + it.title);
  });
  document.addEventListener('keydown', (e) => {
    if (!viewer.open) return;
    if (e.key === 'ArrowLeft') show(cursor - 1);
    if (e.key === 'ArrowRight') show(cursor + 1);
  });

  /* ---------- Events ---------- */
  document.querySelectorAll('.lib-tab').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (b) { state.filter = b.dataset.cat; render(); }
  });
  $('#q').addEventListener('input', (e) => { state.q = e.target.value; render(); });
  $('#resetBtn').addEventListener('click', () => { state.filter = 'all'; state.q = ''; $('#q').value = ''; render(); });
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (b) open(+b.dataset.open);
  });

  /* ---------- Init + deep link (#sertifikat, #portofolio, #cert-<id>) ---------- */
  const hash = location.hash.slice(1);
  setTab(hash === 'portofolio' ? 'portofolio' : 'sertifikat', false);
  if (hash.startsWith('cert-')) {
    const i = list.findIndex((c) => 'cert-' + c.id === hash);
    if (i > -1) open(i);
  }
})();
