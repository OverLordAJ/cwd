// ============================================================
//  Elden Ring Guide — App Logic
// ============================================================

let activeTab = 'bosses';
let activeSubTab = 'weapons';
let activeRegionFilter = 'all';
let activeMapType = 'main'; // 'main' or 'dlc'
let searchQuery = '';
let bossModal = null;

// ── Initialise ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupSearch();
  renderBosses();
  renderMap('main');
  renderItems();
  renderSpellsWeapons();
  setupParticles();
});

// ── Tab switching ────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + target).classList.add('active');
      activeTab = target;
      clearSearch();
      // Refresh map pins when switching to a data tab
      if (target === 'items') renderMapPins('main');
      if (target === 'spells-weapons') filterSpellsWeapons();
    });
  });

  document.querySelectorAll('.sub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.sub;
      document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeSubTab = target;
      filterSpellsWeapons();
    });
  });
}

// ── Search ───────────────────────────────────────────────────
function setupSearch() {
  const bar = document.getElementById('global-search');
  const overlay = document.getElementById('search-overlay');
  const closeBtn = document.getElementById('search-close');

  bar.addEventListener('input', e => {
    searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery.length >= 2) {
      renderSearchResults(searchQuery);
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  });

  bar.addEventListener('keydown', e => {
    if (e.key === 'Escape') clearSearch();
  });

  closeBtn.addEventListener('click', clearSearch);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) clearSearch();
  });
}

function clearSearch() {
  document.getElementById('global-search').value = '';
  document.getElementById('search-overlay').classList.remove('active');
  searchQuery = '';
}

function renderSearchResults(q) {
  const results = [];

  BOSSES_MAIN.forEach(b => {
    if (matches(b.name, q) || matches(b.location, q) || matches(b.backstory, q) || b.weaknesses.some(w => matches(w, q))) {
      results.push({ ...b, _category: 'Main Boss' });
    }
  });
  BOSSES_DLC.forEach(b => {
    if (matches(b.name, q) || matches(b.location, q) || matches(b.backstory, q) || b.weaknesses.some(w => matches(w, q))) {
      results.push({ ...b, _category: 'DLC Boss' });
    }
  });
  ITEMS.forEach(i => {
    if (matches(i.name, q) || matches(i.location, q) || matches(i.description, q) || matches(i.category, q) || matches(i.region, q)) {
      results.push({ ...i, _category: i.category });
    }
  });
  WEAPONS.forEach(w => {
    if (matches(w.name, q) || matches(w.location, q) || matches(w.description, q) || matches(w.type, q) || matches(w.region, q)) {
      results.push({ ...w, _category: 'Weapon — ' + w.type });
    }
  });
  SPELLS.forEach(s => {
    if (matches(s.name, q) || matches(s.location, q) || matches(s.description, q) || matches(s.type, q) || matches(s.region, q)) {
      results.push({ ...s, _category: s.type });
    }
  });

  const container = document.getElementById('search-results');
  if (results.length === 0) {
    container.innerHTML = `<div class="search-empty"><p>No results found for "<strong>${escHtml(q)}</strong>"</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="search-header">
      <span class="search-count">${results.length} result${results.length !== 1 ? 's' : ''} for "<em>${escHtml(q)}</em>"</span>
    </div>
    <div class="search-list">
      ${results.map(r => renderSearchCard(r, q)).join('')}
    </div>
  `;
}

function renderSearchCard(item, q) {
  const name = highlight(item.name, q);
  const loc = highlight(item.location || '', q);
  const desc = highlight((item.backstory || item.description || item.howToGet || '').slice(0, 160) + '...', q);
  return `
    <div class="search-card" onclick="handleSearchClick('${item.id}', '${item._category}')">
      <div class="search-card-cat">${escHtml(item._category)}</div>
      <div class="search-card-name">${name}</div>
      <div class="search-card-loc">${loc}</div>
      <div class="search-card-desc">${desc}</div>
    </div>
  `;
}

function handleSearchClick(id, category) {
  clearSearch();
  if (category === 'Main Boss' || category === 'DLC Boss') {
    switchTab('bosses');
    setTimeout(() => openBossModal(id), 100);
  } else if (category.startsWith('Weapon')) {
    switchTab('spells-weapons');
    setTimeout(() => { setSubTab('weapons'); scrollToCard(id); }, 150);
  } else if (category.includes('Sorcery') || category.includes('Incantation')) {
    switchTab('spells-weapons');
    const sub = category.includes('Sorcery') ? 'sorceries' : 'incantations';
    setTimeout(() => { setSubTab(sub); scrollToCard(id); }, 150);
  } else {
    switchTab('items');
    setTimeout(() => scrollToCard(id), 150);
  }
}

function switchTab(name) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelector(`.nav-tab[data-tab="${name}"]`).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
  activeTab = name;
}

function setSubTab(name) {
  document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.sub-tab[data-sub="${name}"]`).classList.add('active');
  activeSubTab = name;
  filterSpellsWeapons();
}

function scrollToCard(id) {
  const el = document.getElementById('card-' + id);
  if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('highlight-flash'); setTimeout(() => el.classList.remove('highlight-flash'), 1500); }
}

// ── Boss Rendering ───────────────────────────────────────────
function renderBosses() {
  const mainGrid = document.getElementById('main-boss-grid');
  const dlcGrid = document.getElementById('dlc-boss-grid');
  mainGrid.innerHTML = BOSSES_MAIN.map(b => bossCard(b)).join('');
  dlcGrid.innerHTML = BOSSES_DLC.map(b => bossCard(b)).join('');

  document.querySelectorAll('.boss-card').forEach(card => {
    card.addEventListener('click', () => openBossModal(card.dataset.id));
  });
}

function bossCard(b) {
  const stars = difficultyStars(b.difficulty);
  const weakTags = b.weaknesses.slice(0, 3).map(w => `<span class="tag tag-weak">${escHtml(w)}</span>`).join('');
  return `
    <div class="boss-card" id="card-${b.id}" data-id="${b.id}">
      <div class="boss-card-inner">
        <div class="boss-icon">${getIcon(b.name)}</div>
        <div class="boss-info">
          <h3 class="boss-name">${escHtml(b.name)}</h3>
          <p class="boss-location"><span class="loc-icon">⚑</span> ${escHtml(b.location.split('—')[0].trim())}</p>
          <div class="boss-tags">${weakTags}</div>
          <div class="boss-footer">
            <div class="difficulty-row">
              <span class="diff-label">Difficulty</span>
              <span class="stars">${stars}</span>
            </div>
            <span class="phases-badge">${b.phases} Phase${b.phases > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      <div class="click-hint">Click for full lore &amp; tips</div>
    </div>
  `;
}

function difficultyStars(n) {
  return Array.from({ length: 5 }, (_, i) => `<span class="star ${i < n ? 'filled' : ''}">${i < n ? '★' : '☆'}</span>`).join('');
}

function openBossModal(id) {
  const b = [...BOSSES_MAIN, ...BOSSES_DLC].find(x => x.id === id);
  if (!b) return;
  const weakHtml = b.weaknesses.map(w => `<span class="tag tag-weak">${escHtml(w)}</span>`).join('');
  const resHtml = b.resistances.map(r => `<span class="tag tag-resist">${escHtml(r)}</span>`).join('');
  const dropsHtml = b.drops.map(d => `<li>${escHtml(d)}</li>`).join('');
  const modal = document.getElementById('boss-modal');
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-boss-header">
      <div class="modal-boss-icon">${getIcon(b.name)}</div>
      <div>
        <h2 class="modal-boss-name">${escHtml(b.name)}</h2>
        <p class="modal-boss-type">${b.type === 'dlc' ? '⚔ Shadow of the Erdtree Boss' : '⚔ Main Game Boss'}</p>
        <p class="modal-boss-loc"><span class="loc-icon">⚑</span> ${escHtml(b.location)}</p>
        <div class="modal-stars">${difficultyStars(b.difficulty)} <span class="phases-badge">${b.phases}-Phase Fight</span></div>
      </div>
    </div>

    <div class="modal-section-grid">
      <div class="modal-section">
        <h4 class="modal-section-title">Weaknesses</h4>
        <div class="tag-group">${weakHtml}</div>
      </div>
      <div class="modal-section">
        <h4 class="modal-section-title">Resistances</h4>
        <div class="tag-group">${resHtml}</div>
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Drops &amp; Rewards</h4>
      <ul class="drops-list">${dropsHtml}</ul>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Lore &amp; Backstory</h4>
      <p class="modal-text">${escHtml(b.backstory)}</p>
    </div>

    <div class="modal-section tips-section">
      <h4 class="modal-section-title">Combat Tips</h4>
      <p class="modal-text">${escHtml(b.tips)}</p>
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('boss-modal');
  document.getElementById('modal-close').addEventListener('click', closeBossModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeBossModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBossModal(); });
});

function closeBossModal() {
  document.getElementById('boss-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// ── Map Rendering ────────────────────────────────────────────
function renderMap(type) {
  const container = document.getElementById('map-canvas');
  const regions = type === 'dlc' ? REGIONS_DLC : REGIONS_MAIN;
  container.innerHTML = regions.map(r => {
    const lines = r.label.split('\n');
    return `
      <div class="map-region"
           style="left:${r.x}%; top:${r.y}%; width:${r.w}%; height:${r.h}%; background:${r.color}22; border-color:${r.color}88;"
           data-region="${r.id}"
           onclick="filterByRegion('${r.id}')">
        <span class="map-region-label">${lines.map(l => escHtml(l)).join('<br>')}</span>
      </div>
    `;
  }).join('');
  renderMapPins(type);
}

function renderMapPins(type) {
  const container = document.getElementById('map-canvas');
  let items = [];
  if (activeTab === 'items') items = ITEMS.filter(i => type === 'dlc' ? isDLC(i.region) : !isDLC(i.region));
  else if (activeSubTab === 'weapons') items = WEAPONS.filter(w => type === 'dlc' ? isDLC(w.region) : !isDLC(w.region));
  else if (activeSubTab === 'sorceries') items = SPELLS.filter(s => s.type.includes('Sorcery') && (type === 'dlc' ? isDLC(s.region) : !isDLC(s.region)));
  else if (activeSubTab === 'incantations') items = SPELLS.filter(s => s.type.includes('Incantation') && (type === 'dlc' ? isDLC(s.region) : !isDLC(s.region)));

  container.querySelectorAll('.map-pin').forEach(p => p.remove());
  items.forEach(item => {
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.style.left = item.coords.x + '%';
    pin.style.top = item.coords.y + '%';
    pin.title = item.name + '\n' + (item.location || '');
    pin.innerHTML = getPinIcon(item);
    pin.addEventListener('click', e => { e.stopPropagation(); scrollToCard(item.id); });
    container.appendChild(pin);
  });
}

function getPinIcon(item) {
  if (item.category === 'Map Fragment') return '🗺';
  if (item.category === 'Golden Seed') return '🌿';
  if (item.category === 'Sacred Tear') return '💧';
  if (item.category === 'Key Item' || item.category?.includes('DLC')) return '🔑';
  if (item.type) return item.type.includes('Sorcery') ? '✦' : item.type.includes('Incantation') ? '✤' : '⚔';
  return '●';
}

function filterByRegion(region) {
  if (activeRegionFilter === region) {
    activeRegionFilter = 'all';
  } else {
    activeRegionFilter = region;
  }
  document.querySelectorAll('.map-region').forEach(el => {
    el.classList.toggle('selected', el.dataset.region === activeRegionFilter);
  });
  if (activeTab === 'items') renderItems();
  else filterSpellsWeapons();
}

function isDLC(region) {
  const dlcRegions = ['Gravesite Plain', 'Scadu Altus', 'Shadow Realm', 'Jagged Peak', 'Enir-Ilim', 'Shadow Keep'];
  return dlcRegions.includes(region);
}

// ── Items Rendering ──────────────────────────────────────────
function renderItems() {
  const grid = document.getElementById('item-grid');
  const categoryFilter = document.getElementById('item-category-filter')?.value || 'all';
  const mapType = document.getElementById('items-map-toggle')?.dataset?.type || 'main';

  let items = ITEMS;
  if (activeRegionFilter !== 'all') items = items.filter(i => i.region === activeRegionFilter);
  if (categoryFilter !== 'all') items = items.filter(i => i.category === categoryFilter);

  grid.innerHTML = items.length === 0
    ? `<div class="empty-state"><p>No items found for this filter.</p></div>`
    : items.map(item => itemCard(item)).join('');
}

function itemCard(item) {
  const catColor = getCatColor(item.category);
  return `
    <div class="item-card" id="card-${item.id}">
      <div class="item-cat-bar" style="background:${catColor}"></div>
      <div class="item-card-inner">
        <span class="item-cat-label">${escHtml(item.category)}</span>
        <h3 class="item-name">${escHtml(item.name)}</h3>
        <p class="item-region"><span class="loc-icon">⚑</span> ${escHtml(item.region)}</p>
        <p class="item-location">${escHtml(item.location)}</p>
        <p class="item-desc">${escHtml(item.description)}</p>
        <div class="item-how">
          <span class="how-label">How to Get</span>
          <p>${escHtml(item.howToGet)}</p>
        </div>
      </div>
    </div>
  `;
}

function getCatColor(cat) {
  const map = {
    'Map Fragment': '#2a5a7a', 'Golden Seed': '#7a6a1a', 'Sacred Tear': '#1a5a4a',
    'Key Item': '#5a2a7a', 'DLC — Scadutree Blessing': '#4a5a1a', 'DLC — Spirit Ash Upgrade': '#3a4a1a',
    'DLC — Key Item': '#6a3a6a'
  };
  return map[cat] || '#3a3a3a';
}

// ── Spells & Weapons Rendering ───────────────────────────────
function renderSpellsWeapons() {
  filterSpellsWeapons();
  setupCategoryFilters();
}

function filterSpellsWeapons() {
  const grid = document.getElementById('spells-weapons-grid');
  let items;
  if (activeSubTab === 'weapons') items = WEAPONS;
  else if (activeSubTab === 'sorceries') items = SPELLS.filter(s => s.type.includes('Sorcery'));
  else items = SPELLS.filter(s => s.type.includes('Incantation'));

  if (activeRegionFilter !== 'all') items = items.filter(i => i.region === activeRegionFilter);

  grid.innerHTML = items.length === 0
    ? `<div class="empty-state"><p>No results for this filter.</p></div>`
    : items.map(item => activeSubTab === 'weapons' ? weaponCard(item) : spellCard(item)).join('');
}

function weaponCard(w) {
  return `
    <div class="item-card weapon-card" id="card-${w.id}">
      <div class="item-cat-bar" style="background:#5a3a1a"></div>
      <div class="item-card-inner">
        <span class="item-cat-label">${escHtml(w.type)}</span>
        <h3 class="item-name">${escHtml(w.name)}</h3>
        <p class="item-region"><span class="loc-icon">⚑</span> ${escHtml(w.region)}</p>
        <p class="item-location">${escHtml(w.location)}</p>
        <div class="weapon-stats">
          <span class="stat-pill">Scaling: ${escHtml(w.scaling)}</span>
          <span class="stat-pill req">Req: ${escHtml(w.requirement)}</span>
        </div>
        <div class="weapon-skill"><span class="skill-label">Skill:</span> ${escHtml(w.skill)}</div>
        <p class="item-desc">${escHtml(w.description)}</p>
        <div class="item-how">
          <span class="how-label">How to Get</span>
          <p>${escHtml(w.howToGet)}</p>
        </div>
      </div>
    </div>
  `;
}

function spellCard(s) {
  const typeColor = s.type.includes('Sorcery') ? '#1a3a5a' : '#5a1a1a';
  return `
    <div class="item-card spell-card" id="card-${s.id}">
      <div class="item-cat-bar" style="background:${typeColor}"></div>
      <div class="item-card-inner">
        <span class="item-cat-label">${escHtml(s.type)}</span>
        <h3 class="item-name">${escHtml(s.name)}</h3>
        <p class="item-region"><span class="loc-icon">⚑</span> ${escHtml(s.region)}</p>
        <p class="item-location">${escHtml(s.location)}</p>
        <div class="weapon-stats">
          <span class="stat-pill">Req: ${escHtml(s.requirement)}</span>
          <span class="stat-pill">FP Cost: ${s.fpCost}</span>
        </div>
        <p class="item-desc">${escHtml(s.description)}</p>
        <div class="item-how">
          <span class="how-label">How to Get</span>
          <p>${escHtml(s.howToGet)}</p>
        </div>
      </div>
    </div>
  `;
}

// ── Category filter dropdowns ────────────────────────────────
function setupCategoryFilters() {
  const catFilter = document.getElementById('item-category-filter');
  if (catFilter) {
    catFilter.addEventListener('change', renderItems);
  }

  // Map toggle buttons (main / dlc)
  document.querySelectorAll('.map-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.maptype;
      renderMap(type);
      activeRegionFilter = 'all';
      document.querySelectorAll('.map-region').forEach(el => el.classList.remove('selected'));
      if (activeTab === 'items') renderItems();
      else filterSpellsWeapons();
    });
  });
}

// ── Particles ────────────────────────────────────────────────
function setupParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function spawn() {
    return {
      x: Math.random() * W,
      y: H + 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.3 + Math.random() * 0.6),
      alpha: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2 + 0.5,
      life: 0,
      maxLife: 200 + Math.random() * 300
    };
  }

  for (let i = 0; i < 40; i++) {
    const p = spawn();
    p.y = Math.random() * H;
    p.life = Math.random() * p.maxLife;
    particles.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      const fade = Math.sin((p.life / p.maxLife) * Math.PI);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 64, ${p.alpha * fade})`;
      ctx.fill();
      if (p.life >= p.maxLife) particles[idx] = spawn();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

// ── Helpers ──────────────────────────────────────────────────
function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function matches(str, q) {
  return String(str ?? '').toLowerCase().includes(q);
}

function highlight(str, q) {
  if (!q) return escHtml(str);
  const safe = escHtml(str);
  const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(safeQ, 'gi'), m => `<mark>${m}</mark>`);
}

function getIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('dragon') || n.includes('dragonlord')) return '🐉';
  if (n.includes('flame') || n.includes('fire') || n.includes('messmer') || n.includes('rykard')) return '🔥';
  if (n.includes('blood') || n.includes('mohg') || n.includes('malenia')) return '🩸';
  if (n.includes('moon') || n.includes('rennala') || n.includes('rellana')) return '🌙';
  if (n.includes('elden') || n.includes('radagon') || n.includes('godfrey')) return '👑';
  if (n.includes('rot') || n.includes('romina') || n.includes('astel')) return '🌿';
  if (n.includes('frenzy') || n.includes('midra')) return '👁';
  if (n.includes('maliketh') || n.includes('black blade')) return '⚫';
  if (n.includes('giant') || n.includes('bayle')) return '🗻';
  if (n.includes('star') || n.includes('radahn') || n.includes('placidusax')) return '⭐';
  if (n.includes('mimic')) return '👤';
  return '⚔';
}
