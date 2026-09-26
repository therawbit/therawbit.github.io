/**
 * THERAWBIT — v2.3 main
 * Boot · terminal-rendered 3D logo · page-length dataflow · live GitHub.
 * No frameworks — the brand mark is hand-extruded voxels drawn inside a
 * terminal window; the circuit is generated to span the full document.
 */

const DATA = window.DATA;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════ 1. CONTENT RENDERING ═══════════════════ */

function renderWork() {
  const wrap = document.getElementById('work-list');
  wrap.innerHTML = DATA.projects.map((p, i) => `
    <a class="work-row reveal-fade" href="${p.github}" target="_blank" rel="noopener" aria-label="${p.name} on GitHub">
      <span class="work-idx">${String(i + 1).padStart(2, '0')}</span>
      <span class="work-name">${p.name}<span class="ext">↗</span><span class="work-type">${p.type}</span></span>
      <span class="work-desc">${p.desc}</span>
      <span class="work-tech">${p.tech}</span>
    </a>`).join('');
}

function renderExp() {
  const wrap = document.getElementById('exp-list');
  wrap.innerHTML = DATA.experiences.map(e => `
    <article class="exp-item reveal-fade">
      <div class="exp-when">${e.startDate} — <span class="${e.endDate === 'Present' ? 'now' : ''}">${e.endDate}</span></div>
      <div>
        <h3 class="exp-role">${e.title}</h3>
        <p class="exp-org">${e.organization}</p>
        <p class="exp-desc">${e.desc}</p>
      </div>
    </article>`).join('');
}

function renderCerts() {
  const wrap = document.getElementById('cert-grid');
  wrap.innerHTML = DATA.certs.map(c => `
    <button class="cert-card reveal-fade" data-img="${c.imagePath}" data-title="${c.title}" aria-label="View ${c.title}">
      <span class="cert-abbr">${c.id.split('-')[0]} · ${c.id}</span>
      <span class="cert-name">${c.title}</span>
      <span class="cert-meta">${c.issuer} — ${c.date}</span>
      <span class="cert-view">verify credential</span>
    </button>`).join('');
}

function renderEdu() {
  const wrap = document.getElementById('education-card');
  wrap.innerHTML = DATA.education.map(d => `
    <div class="edu-cell reveal-fade">
      <p class="edu-deg">${d.title}</p>
      <p class="edu-school">${d.organization}</p>
      <p class="edu-meta"><span class="ok">✓ ${d.status}</span> · ${d.batch}</p>
    </div>`).join('');
}

/* two counter-scrolling bands of the stack */
function renderCarousel() {
  const hot = new Set(['APPSEC', 'GHIDRA', 'BURP SUITE', 'JADX', 'CI/CD']);
  const item = t => `<span class="chip${hot.has(t) ? ' hot' : ''}">${t}</span>`;
  const a = DATA.marquee, b = DATA.marquee.slice().reverse();
  document.getElementById('carousel-a').innerHTML = (a.map(item).join('')).repeat(2);
  document.getElementById('carousel-b').innerHTML = (b.map(item).join('')).repeat(2);
}

/* live repo strip from the GitHub API — real stars, real languages */
const LANG_COLOR = { Java: '#b07219', Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', Shell: '#89e051', Kotlin: '#A97BFF', C: '#555555', PHP: '#4F5D95' };

async function initRepos() {
  const grid = document.getElementById('repo-grid');
  grid.innerHTML = Array.from({ length: 6 }, () =>
    '<div class="repo-card skeleton"></div>').join('');
  try {
    const res = await fetch('https://api.github.com/users/therawbit/repos?per_page=100&sort=updated');
    if (!res.ok) throw new Error('api');
    const repos = await res.json();
    const featured = ['Secware', 'QueryUs', 'dotfiles', 'FYP_Malware-Analysis-and-Classification', 'Budget-On', 'Cryptopals', 'babypwn-2026', 'YT-Mp3', 'Writeups-Collection', 'Innovate360-CTF'];
    const byName = new Map(repos.map(r => [r.name, r]));
    const picks = featured.map(n => byName.get(n)).filter(Boolean).slice(0, 6);
    const stats = document.getElementById('gh-stats');
    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    stats.textContent = `· ${repos.length} repos · ${stars}★ · ${[...new Set(repos.map(r => r.language).filter(Boolean))].slice(0, 5).join(', ')}`;
    grid.innerHTML = picks.map(r => `
      <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
        <span class="repo-top"><svg class="i"><use href="#i-code" /></svg><span>${r.name}</span></span>
        <span class="repo-desc">${(r.description || '').slice(0, 96) || '—'}</span>
        <span class="repo-meta">
          ${r.language ? `<span class="lang" style="--lang:${LANG_COLOR[r.language] || 'var(--accent)'}">${r.language}</span>` : ''}
          ${r.stargazers_count ? `<span class="starred"><svg class="i"><use href="#i-star" /></svg>${r.stargazers_count}</span>` : ''}
          ${r.forks_count ? `<span><svg class="i" style="width:11px;height:11px;vertical-align:-2px"><use href="#i-fork" /></svg>${r.forks_count}</span>` : ''}
        </span>
      </a>`).join('');
  } catch {
    grid.innerHTML = '<p class="repo-desc">— API unavailable right now. The full rack lives at <a class="coral" href="https://github.com/therawbit" target="_blank" rel="noopener">github.com/therawbit</a>.</p>';
  }
}

/* ═══════════════════ 2. BOOT SEQUENCE ═══════════════════ */

function runBoot() {
  return new Promise(resolve => {
    const boot = document.getElementById('boot');
    const cmd = document.getElementById('boot-cmd');
    const fill = document.getElementById('boot-meter-fill');
    const text = 'init portfolio --noice=off';
    const total = 1900;
    const t0 = performance.now();

    cmd.textContent = '';
    (function frame(now) {
      const p = Math.min((now - t0) / total, 1);
      fill.style.width = (p * 100).toFixed(1) + '%';
      cmd.textContent = text.slice(0, Math.floor(p * text.length));
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        boot.classList.add('done');
        setTimeout(() => boot.remove(), 800);
        resolve();
      }
    })(t0);
  });
}

/* ═══════════════════ 3. TERMINAL LOGO — extruded hacker-mask block ═══════════════════ */

/* pixel bitmap of the mask: '#' solid, 'o' hole — 13 cols × 11 rows */
const MASK = [
  '.....###.....',
  '...#######...',
  '..#########..',
  '..##oo#oo##..',
  '..##oo#oo##..',
  '..###o#o###..',
  '..#########..',
  '.##o#####o##.',
  '..#########..',
  '...##o#o##...',
  '....#####....',
];

/* extrude the bitmap 3 layers deep, keep only voxels with an exposed face */
const MASK_VOX = (() => {
  const has = (c, r, z) =>
    z >= 0 && z < 3 && r >= 0 && r < MASK.length &&
    c >= 0 && c < MASK[r].length && MASK[r][c] === '#';
  const out = [];
  for (let r = 0; r < MASK.length; r++)
    for (let c = 0; c < 13; c++)
      for (let z = 0; z < 3; z++) {
        if (!has(c, r, z)) continue;
        const exposed = !has(c + 1, r, z) || !has(c - 1, r, z) || !has(c, r + 1, z) ||
                        !has(c, r - 1, z) || !has(c, r, z + 1) || !has(c, r, z - 1);
        if (exposed) out.push({ x: c - 6, y: r - 5, z });
      }
  return out;
})();

let logoW = 0, logoCleanup = null;
function initLogo() {
  const cv = document.getElementById('term-logo');
  if (!cv) return;
  const screen = cv.parentElement;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  /* render at the size it is actually displayed — crisp glyphs at any width */
  const W = Math.max(300, Math.round(screen.clientWidth) || 760);
  if (W === logoW) return;   // e.g. mobile URL-bar collapse, box unchanged
  logoW = W;
  if (logoCleanup) logoCleanup();
  const H = Math.round(W * 0.45);
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const sc = W / 760;
  const s = 21 * sc, sy = 26 * sc, f = 26, cx = W / 2, cy = H / 2;

  /* mouse parallax: yaw/pitch ease toward the pointer, bounded — no full spin */
  let tYaw = 0, tPitch = 0, yaw = 0.3, pitch = -0.12;
  const onMove = e => {
    const r = cv.getBoundingClientRect();
    tYaw = ((e.clientX - r.left) / r.width - 0.5) * 0.9;    // ±0.45 rad
    tPitch = ((e.clientY - r.top) / r.height - 0.5) * 0.5;  // ±0.25 rad
  };
  const onLeave = () => { tYaw = 0; tPitch = 0; };
  if (!reduced && matchMedia('(pointer: fine)').matches) {
    screen.addEventListener('pointermove', onMove);
    screen.addEventListener('pointerleave', onLeave);
  }

  function paint() {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const cyaw = Math.cos(yaw), syaw = Math.sin(yaw);
    const cpit = Math.cos(pitch), spit = Math.sin(pitch);
    const proj = MASK_VOX.map(v => {
      // rotY then rotX
      const x1 = v.x * cyaw + v.z * syaw;
      const z1 = -v.x * syaw + v.z * cyaw;
      const y2 = v.y * cpit - z1 * spit;
      const z2 = v.y * spit + z1 * cpit;
      const p = f / (f + z2 + 6);
      return { px: cx + x1 * s * p, py: cy + y2 * sy * p, p, z: v.z, d: z2 };
    }).sort((a, b) => b.d - a.d);

    for (const q of proj) {
      const lift = (q.z - 1) * 0.5 + 0.5;   // 0 back ... 1 front
      const g = lift > 0.75 ? '\u2588' : lift > 0.25 ? '\u2593' : '\u2592';
      ctx.font = `${(((22 + 6 * lift) * q.p) * sc) | 0}px "IBM Plex Mono", monospace`;
      if (lift > 0.75) {
        ctx.fillStyle = 'rgba(236,233,228,0.92)';           // ink-lit face
      } else if (lift > 0.25) {
        ctx.fillStyle = 'rgba(158,154,148,0.55)';           // mid slab
      } else {
        ctx.fillStyle = 'rgba(250,146,127,0.32)';           // coral rim
      }
      ctx.fillText(g, q.px, q.py);
    }
  }

  if (reduced) { paint(); return; }
  let raf = 0;
  const frame = now => {
    // when idle, a gentle sway; the pointer takes over the moment it moves in
    const idleX = Math.sin(now * 0.0006) * 0.28;
    const idleY = Math.cos(now * 0.00045) * 0.10;
    yaw += ((tYaw || idleX) - yaw) * 0.07;
    pitch += ((tPitch || idleY) - pitch) * 0.07;
    paint();
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  logoCleanup = () => {
    cancelAnimationFrame(raf);
    screen.removeEventListener('pointermove', onMove);
    screen.removeEventListener('pointerleave', onLeave);
  };
}

/* ═══════════════════ 3b. FULL-PAGE CIRCUIT ═══════════════════ */

function initCircuit() {
  const svg = document.getElementById('dataflow');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const H = Math.max(document.documentElement.scrollHeight, innerHeight + 400);
  /* 1 viewBox unit = 1 CSS px in both axes — no stretch distortion on narrow screens */
  const W = Math.max(480, Math.round(innerWidth));
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.width = '100%';
  svg.style.height = H + 'px';
  svg.innerHTML = '';

  // deterministic pseudo-random so the layout is stable per width
  let seed = 1337;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const wiresG = document.createElementNS(NS, 'g');
  wiresG.setAttribute('fill', 'none');
  const jointsG = document.createElementNS(NS, 'g');
  jointsG.setAttribute('class', 'joints');
  const packetsG = document.createElementNS(NS, 'g');
  packetsG.setAttribute('class', 'packets');
  svg.append(wiresG, jointsG, packetsG);

  const lanes = 4;
  for (let i = 0; i < lanes; i++) {
    let x = 130 + i * (W - 260) / (lanes - 1) + (rnd() - 0.5) * 120;
    let y = -30;
    let d = `M ${x.toFixed(0)} ${y}`;
    const bends = [[x, y]];
    while (y < H + 30) {
      y += 280 + rnd() * 220;
      d += ` V ${Math.min(y, H + 30).toFixed(0)}`;
      const dx = Math.max(70, W * (0.10 + rnd() * 0.17)) * (rnd() > 0.5 ? 1 : -1);
      const nx = Math.max(60, Math.min(W - 60, x + dx));
      if (y < H + 30) d += ` H ${nx.toFixed(0)}`;
      x = nx;
      bends.push([x, Math.min(y, H + 30)]);
    }
    const p = document.createElementNS(NS, 'path');
    p.id = 'cw' + i;
    p.setAttribute('d', d);
    p.setAttribute('class', 'wire' + (i % 3 === 2 ? ' alt' : ''));
    wiresG.appendChild(p);

    bends.slice(1, -1).forEach(([bx, by]) => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', bx); c.setAttribute('cy', by); c.setAttribute('r', '2.5');
      jointsG.appendChild(c);
    });

    const len = p.getTotalLength();
    for (let k = 0; k < 2; k++) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', 'packet');
      c.setAttribute('r', k === 0 ? '3.5' : '2.5');
      const m = document.createElementNS(NS, 'animateMotion');
      m.setAttribute('dur', (len / 110).toFixed(1) + 's');
      m.setAttribute('repeatCount', 'indefinite');
      m.setAttribute('begin', (-len / 110 * ((k + rnd()) / 2)).toFixed(1) + 's');
      const mp = document.createElementNS(NS, 'mpath');
      mp.setAttribute('href', '#cw' + i);
      m.appendChild(mp); c.appendChild(m);
      packetsG.appendChild(c);
    }
  }
}

/* ═══════════════════ 4. ROLE SCRAMBLE ROTATOR ═══════════════════ */

const GLYPHS = '!<>-_\\/[]{}=+*^?#01█▓▒';

function scrambleTo(el, next, duration = 550) {
  const prev = el.textContent;
  const len = Math.max(prev.length, next.length);
  const start = performance.now();
  const queue = Array.from({ length: len }, (_, i) => ({
    from: prev[i] || '',
    to: next[i] || '',
    start: Math.random() * duration * 0.5,
    end: duration * 0.5 + Math.random() * duration * 0.5,
  }));
  (function tick(now) {
    const t = now - start;
    let out = '';
    let done = 0;
    for (const q of queue) {
      if (t >= q.end) { done++; out += q.to; }
      else if (t >= q.start) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      else out += q.from;
    }
    el.textContent = out;
    if (done < queue.length) requestAnimationFrame(tick);
  })(start);
}

function initRoles(roles) {
  const el = document.getElementById('role-rotator');
  if (reduced) { el.textContent = roles[0]; return; }
  let i = 0;
  setInterval(() => { i = (i + 1) % roles.length; scrambleTo(el, roles[i]); }, 3400);
}

/* ═══════════════════ 5. REVEALS · COUNTERS ═══════════════════ */

function initReveals() {
  const targets = document.querySelectorAll('.reveal-line, .reveal-fade');
  const byParent = new Map();
  targets.forEach(t => {
    const idx = byParent.get(t.parentElement) || 0;
    byParent.set(t.parentElement, idx + 1);
    const delay = Math.min(idx * 90, 450);
    if (t.classList.contains('reveal-line')) {
      t.querySelector('span').style.transitionDelay = delay + 'ms';
    } else {
      t.style.transitionDelay = delay + 'ms';
    }
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach(t => io.observe(t));
}

function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1100;
      const t0 = performance.now();
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ═══════════════════ 6. NAV ═══════════════════ */

function initNav() {
  const nav = document.getElementById('nav');
  const btn = document.getElementById('menu-btn');
  const links = document.getElementById('nav-links');
  let lastY = 0;

  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 30);
    nav.classList.toggle('hidden-up', y > 400 && y > lastY && !links.classList.contains('open'));
    lastY = y;
  }, { passive: true });

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', e => {
    if (e.target.tagName === 'A') { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
}

/* ═══════════════════ 7. MODAL ═══════════════════ */

function initModal() {
  const modal = document.getElementById('cert-modal');
  const img = document.getElementById('modal-img');

  document.getElementById('cert-grid').addEventListener('click', e => {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    img.src = card.dataset.img;
    img.alt = card.dataset.title;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ═══════════════════ 8. MAGNETIC BUTTONS ═══════════════════ */

function initMagnetic() {
  if (reduced || matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ═══════════════════ 9. ORCHESTRATION ═══════════════════ */

async function main() {
  renderWork();
  renderExp();
  renderCerts();
  renderEdu();
  renderCarousel();
  initNav();
  initModal();
  initCounters();
  initMagnetic();
  initRoles(DATA.roles);
  initLogo();
  initRepos();

  if (reduced) {
    document.getElementById('boot').remove();
    initReveals();
    initCircuit();
    return;
  }
  await runBoot();
  initReveals();
  initCircuit();
}

main();

/* rebuild the circuit when the viewport height class changes (rotation, resize) */
let circT;
addEventListener('resize', () => {
  clearTimeout(circT);
  circT = setTimeout(() => { initCircuit(); initLogo(); }, 350);
});
