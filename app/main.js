// DataNusa: the router and the controls. The pages live in views.js, the
// figures in data.js, the charts in charts.js. Routes:
//
//   #/                home — indicators, population chart, releases
//   #/penduduk        population
//   #/ekonomi         economy
//   #/provinsi        provinces — searchable, sortable table
//   #/pendidikan      education
//   #/kesehatan       health
//   #/metodologi      sources and notes
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PROVINCES, CENSUS_TOTAL, SECTIONS } from './data.js';
import { home, penduduk, ekonomi, provinsi, pendidikan, kesehatan, metodologi, missing } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

const TITLES = {
  '#/': 'DataNusa — Statistik Indonesia',
  '#/penduduk': 'Penduduk | DataNusa',
  '#/ekonomi': 'Ekonomi | DataNusa',
  '#/provinsi': 'Provinsi | DataNusa',
  '#/pendidikan': 'Pendidikan | DataNusa',
  '#/kesehatan': 'Kesehatan | DataNusa',
  '#/metodologi': 'Metodologi | DataNusa',
};

// Province table state: what the visitor typed, how the table is sorted,
// and which province's detail is open (Jawa Barat, the largest, is open
// when the page first loads, so the detail panel is never empty).
const provState = { query: '', sort: 'name', selected: 'Jawa Barat' };

function provRows() {
  const q = provState.query.trim().toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  if (provState.sort === 'pop-desc') rows = [...rows].sort((a, b) => b.pop - a.pop);
  else if (provState.sort === 'pop-asc') rows = [...rows].sort((a, b) => a.pop - b.pop);
  else if (provState.sort === 'island') rows = [...rows].sort((a, b) => a.island.localeCompare(b.island, 'id') || a.name.localeCompare(b.name, 'id'));
  else rows = [...rows].sort((a, b) => a.name.localeCompare(b.name, 'id'));
  return rows;
}

function renderProvTable() {
  const rows = provRows();
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  const empty = document.getElementById('prov-empty');
  if (!body) return;
  body.innerHTML = rows.map((p, i) => {
    const share = ((p.pop / CENSUS_TOTAL) * 100).toFixed(2).replace('.', ',');
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
    return `<tr data-name="${esc(p.name)}" class="${provState.selected === p.name ? 'selected' : ''}">
      <td>${i + 1}</td>
      <td class="name">${esc(p.name)}</td>
      <td>${esc(p.capital)}</td>
      <td>${esc(p.island)}</td>
      <td class="num">${esc(p.pop.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</td>
      <td class="num">${share}%</td>
    </tr>`;
  }).join('');
  if (count) count.textContent = `${rows.length} dari 38 provinsi ditampilkan.`;
  if (empty) empty.hidden = rows.length > 0;
}

function renderProvDetail() {
  const aside = document.getElementById('prov-detail');
  if (!aside) return;
  const sel = provState.selected ? PROVINCES.find((p) => p.name === provState.selected) : null;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  if (!sel) {
    aside.innerHTML = '<p>Klik salah satu baris tabel untuk melihat rincian provinsi di sini.</p>';
    return;
  }
  aside.innerHTML = `<h3>${esc(sel.name)}</h3>
    <dl>
      <dt>Ibu kota</dt><dd>${esc(sel.capital)}</dd>
      <dt>Pulau</dt><dd>${esc(sel.island)}</dd>
      <dt>Penduduk 2020</dt><dd>${esc(sel.pop.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))} juta jiwa</dd>
      <dt>Pangsa nasional</dt><dd>${esc(((sel.pop / CENSUS_TOTAL) * 100).toFixed(2).replace('.', ','))}% dari 270,20 juta jiwa</dd>
    </dl>
    <p class="source-note">Sumber: BPS, Sensus Penduduk 2020. Klik baris lain untuk melihat provinsi lain.</p>`;
}

function wireHomeSearch() {
  const input = document.getElementById('q');
  const grid = document.getElementById('kpi-grid');
  const note = document.getElementById('no-match');
  if (!input || !grid) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    grid.querySelectorAll('.kpi').forEach((card) => {
      const hit = !q || card.textContent.toLowerCase().includes(q);
      card.style.display = hit ? '' : 'none';
      if (hit) visible += 1;
    });
    if (note) note.hidden = visible > 0;
  });
}

function wireProvinsi() {
  const search = document.getElementById('prov-search');
  const sort = document.getElementById('prov-sort');
  const body = document.getElementById('prov-body');
  if (search) {
    search.addEventListener('input', () => {
      provState.query = search.value;
      renderProvTable();
    });
  }
  if (sort) {
    sort.addEventListener('change', () => {
      provState.sort = sort.value;
      renderProvTable();
    });
  }
  if (body) {
    body.addEventListener('click', (event) => {
      const row = event.target.closest('tr[data-name]');
      if (!row) return;
      provState.selected = row.getAttribute('data-name');
      body.querySelectorAll('tr').forEach((r) => r.classList.toggle('selected', r === row));
      renderProvDetail();
    });
  }
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const route = hash.split('?')[0];
  let html;
  if (route === '#/' || route === '' || route === '#') html = home();
  else if (route === '#/penduduk') html = penduduk();
  else if (route === '#/ekonomi') html = ekonomi();
  else if (route === '#/provinsi') html = provinsi({ rows: provRows(), query: provState.query, sort: provState.sort, selected: provState.selected });
  else if (route === '#/pendidikan') html = pendidikan();
  else if (route === '#/kesehatan') html = kesehatan();
  else if (route === '#/metodologi') html = metodologi();
  else html = missing();
  document.title = TITLES[route] || 'DataNusa — Statistik Indonesia';
  app.innerHTML = html;
  if (nav) {
    nav.querySelectorAll('a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === (TITLES[route] ? route : '#/'));
    });
  }
  if (route === '#/' || route === '' || route === '#') wireHomeSearch();
  if (route === '#/provinsi') wireProvinsi();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
