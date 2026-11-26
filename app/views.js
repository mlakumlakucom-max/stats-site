// Pages for DataNusa, built from data.js. Every value is escaped before it
// goes into the page. Views return HTML strings; main.js renders them and
// wires up the controls (search, sort, province detail).

import { INDICATORS, POPULATION_SERIES, GROWTH_SERIES, SECTOR_SHARES, SCHOOLING_SERIES, PROVINCES, CENSUS_TOTAL, RELEASES, SECTIONS } from './data.js';
import { lineChart, barChart } from './charts.js';

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function kpiCard(ind) {
  return `<a class="kpi" href="${ind.route}">
    <span class="kpi-label">${escape(ind.label)}</span>
    <span class="kpi-value">${escape(ind.value)}</span>
    <span class="kpi-detail">${escape(ind.detail)}</span>
    <span class="kpi-source">Sumber: ${escape(ind.source)}</span>
  </a>`;
}

function sectionCards() {
  const cards = [
    { route: '#/penduduk', title: 'Penduduk', text: 'Jumlah penduduk 2015–2024, hasil Sensus 2020, dan sebaran menurut pulau.' },
    { route: '#/ekonomi', title: 'Ekonomi', text: 'PDB, pertumbuhan, lapangan usaha, perdagangan, pengangguran, dan kemiskinan.' },
    { route: '#/provinsi', title: 'Provinsi', text: '38 provinsi: penduduk, ibu kota, dan pangsa nasional — bisa dicari dan diurutkan.' },
    { route: '#/pendidikan', title: 'Pendidikan', text: 'Lama sekolah, harapan lama sekolah, dan Indeks Pembangunan Manusia.' },
    { route: '#/kesehatan', title: 'Kesehatan', text: 'Umur harapan hidup, kematian bayi dan ibu, serta stunting balita.' },
    { route: '#/metodologi', title: 'Metodologi', text: 'Dari mana setiap angka berasal, dan bagaimana membacanya.' },
  ];
  return `<div class="cards">${cards.map((c) => `<a class="card" href="${c.route}">
    <span class="card-title">${escape(c.title)}</span>
    <span class="card-text">${escape(c.text)}</span>
    <span class="card-link">Buka ${escape(c.title)} &rarr;</span>
  </a>`).join('')}</div>`;
}

export function home() {
  const kpis = INDICATORS.map(kpiCard).join('');
  const releases = RELEASES.map((r) => `<li>
    <span class="rel-date">${escape(r.date)}</span>
    <a href="${r.route}">${escape(r.title)}</a>
    <span class="rel-source">${escape(r.source)}</span>
  </li>`).join('');
  return `
  <section class="hero">
    <p class="eyebrow">Statistik Indonesia &middot; Data resmi, dibaca mudah</p>
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Penduduk, ekonomi, provinsi, pendidikan, dan kesehatan — angka resmi
    dari Badan Pusat Statistik dan kementerian terkait, lengkap dengan sumber
    dan tahunnya, dalam satu tempat.</p>
    <label class="search" for="q">Cari indikator
      <input id="q" type="search" placeholder="misalnya: PDB, inflasi, stunting…" autocomplete="off">
    </label>
  </section>
  <section>
    <h2>Indikator utama</h2>
    <div class="kpi-grid" id="kpi-grid">${kpis}</div>
    <p class="empty-note" id="no-match" hidden>Tidak ada indikator yang cocok. Coba kata lain, misalnya “penduduk” atau “PDB”.</p>
  </section>
  <section>
    <h2>Penduduk terus bertambah</h2>
    <p>Jumlah penduduk Indonesia, pertengahan tahun, dalam juta jiwa. Sensus Penduduk
    2020 mencatat 270,20 juta jiwa; proyeksi BPS pertengahan 2024 mencapai 281,6 juta jiwa.</p>
    <div class="chart">${lineChart(POPULATION_SERIES, { unit: 'jt', color: '#0e7c6b' })}</div>
    <p class="source-note">Sumber: BPS, Proyeksi Penduduk 2015–2024 dan Sensus Penduduk 2020.</p>
    <p><a class="more" href="#/penduduk">Lihat halaman Penduduk &rarr;</a></p>
  </section>
  <section>
    <h2>Jelajahi data</h2>
    ${sectionCards()}
  </section>
  <section>
    <h2>Rilis terbaru</h2>
    <ul class="releases">${releases}</ul>
  </section>`;
}

export function penduduk() {
  const java = PROVINCES.filter((p) => p.island === 'Jawa').reduce((s, p) => s + p.pop, 0);
  const javaShare = ((java / CENSUS_TOTAL) * 100).toFixed(1).replace('.', ',');
  return `
  <p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Penduduk</h1>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia.
  Sensus Penduduk 2020 mencatat 270,20 juta jiwa, dan proyeksi BPS
  pertengahan 2024 mencapai 281,6 juta jiwa.</p>
  <div class="kpi-grid">
    ${kpiCard({ label: 'Penduduk 2024', value: '281,6 jt', detail: 'proyeksi pertengahan tahun', source: 'BPS, Proyeksi Penduduk 2024', route: '#/penduduk' })}
    ${kpiCard({ label: 'Sensus 2020', value: '270,20 jt', detail: 'jiwa, September 2020', source: 'BPS, Sensus Penduduk 2020', route: '#/penduduk' })}
    ${kpiCard({ label: 'Tinggal di Jawa', value: javaShare + '%', detail: 'dari total penduduk 2020', source: 'BPS, Sensus Penduduk 2020', route: '#/provinsi' })}
    ${kpiCard({ label: 'Provinsi', value: '38', detail: 'sejak pemekaran Papua 2022', source: 'Kemendagri, 2022', route: '#/provinsi' })}
  </div>
  <section>
    <h2>Pertumbuhan penduduk 2015–2024</h2>
    <p>Dalam sepuluh tahun penduduk bertambah sekitar 26 juta jiwa — rata-rata
    sekitar 1 persen per tahun, dan laju itu terus melambat.</p>
    <div class="chart">${lineChart(POPULATION_SERIES, { unit: 'jt', color: '#0e7c6b' })}</div>
    <p class="source-note">Sumber: BPS, Proyeksi Penduduk 2015–2024; angka 2020 dari Sensus Penduduk 2020.</p>
  </section>
  <section>
    <h2>Cara membaca angka ini</h2>
    <p>Angka “pertengahan tahun” adalah perkiraan penduduk pada 30 Juni setiap tahun,
    dihitung BPS dari hasil sensus. Sensus Penduduk 2020 sendiri dilaksanakan pada
    September 2020 dan mencatat 270,20 juta jiwa — angka inilah yang dipakai sebagai
    dasar pembagian penduduk menurut provinsi di halaman <a href="#/provinsi">Provinsi</a>.</p>
    <p>Sebaran penduduk sangat tidak merata: lebih dari separuh penduduk tinggal di
    Pulau Jawa, yang luasnya hanya sekitar 7 persen dari luas daratan Indonesia.</p>
  </section>`;
}

export function ekonomi() {
  return `
  <p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Ekonomi</h1>
  <p class="lede">Perekonomian Indonesia 2024 tumbuh 5,03 persen dengan PDB
  Rp22.139 triliun — ekonomi terbesar di Asia Tenggara.</p>
  <div class="kpi-grid">
    ${kpiCard({ label: 'PDB 2024', value: 'Rp22.139 T', detail: 'harga berlaku', source: 'BPS, 2025', route: '#/ekonomi' })}
    ${kpiCard({ label: 'PDB per kapita', value: 'Rp78,62 jt', detail: 'US$4.960, 2024', source: 'BPS, 2025', route: '#/ekonomi' })}
    ${kpiCard({ label: 'Pertumbuhan 2024', value: '5,03%', detail: 'y-on-y', source: 'BPS, 2025', route: '#/ekonomi' })}
    ${kpiCard({ label: 'Inflasi 2024', value: '1,57%', detail: 'tahun kalender', source: 'BPS, 2025', route: '#/ekonomi' })}
    ${kpiCard({ label: 'Ekspor 2024', value: 'US$264,70 M', detail: 'miliar dolar AS', source: 'BPS, 2025', route: '#/ekonomi' })}
    ${kpiCard({ label: 'Impor 2024', value: 'US$233,66 M', detail: 'miliar dolar AS', source: 'BPS, 2025', route: '#/ekonomi' })}
    ${kpiCard({ label: 'Pengangguran terbuka', value: '4,91%', detail: '7,47 juta orang, Agu 2024', source: 'BPS, Sakernas 2024', route: '#/ekonomi' })}
    ${kpiCard({ label: 'Penduduk miskin', value: '8,57%', detail: '24,06 juta jiwa, Sep 2024', source: 'BPS, 2025', route: '#/ekonomi' })}
  </div>
  <section>
    <h2>Pertumbuhan ekonomi 2015–2024</h2>
    <p>Ekonomi tumbuh sekitar 5 persen hampir setiap tahun, kecuali 2020 ketika
    pandemi membuat ekonomi terkontraksi 2,07 persen, lalu pulih 3,70 persen
    pada 2021 dan 5,31 persen pada 2022.</p>
    <div class="chart">${lineChart(GROWTH_SERIES, { unit: '%', color: '#c4552d', decimals: 2 })}</div>
    <p class="source-note">Sumber: BPS, Produk Domestik Bruto 2015–2024 (pertumbuhan riil, y-on-y).</p>
  </section>
  <section>
    <h2>Apa yang menggerakkan ekonomi</h2>
    <p>Pangsa PDB menurut lapangan usaha, 2024. Industri pengolahan adalah
    lapangan usaha terbesar, diikuti perdagangan dan pertanian.</p>
    <div class="chart">${barChart(SECTOR_SHARES.map((s) => ({ name: s.name, value: s.share })), { unit: '%', color: '#0e7c6b' })}</div>
    <p class="source-note">Sumber: BPS, 2025. Pangsa dibulatkan ke persen terdekat; “lainnya” mencakup seluruh lapangan usaha di luar lima terbesar.</p>
  </section>
  <section>
    <h2>Perdagangan dan daya beli</h2>
    <p>Neraca perdagangan 2024 surplus US$31,04 miliar: ekspor US$264,70 miliar
    dan impor US$233,66 miliar (BPS, 2025). Garis kemiskinan September 2024
    adalah Rp595.242 per kapita per bulan — penduduk dengan pengeluaran di bawah
    garis itu dihitung sebagai penduduk miskin (BPS, 2025).</p>
  </section>`;
}

export function provinsi(state) {
  const rows = state.rows;
  const body = rows.map((p, i) => {
    const share = ((p.pop / CENSUS_TOTAL) * 100).toFixed(2).replace('.', ',');
    return `<tr data-name="${escape(p.name)}" data-pop="${p.pop}" data-island="${escape(p.island)}" class="${state.selected === p.name ? 'selected' : ''}">
      <td>${i + 1}</td>
      <td class="name">${escape(p.name)}</td>
      <td>${escape(p.capital)}</td>
      <td>${escape(p.island)}</td>
      <td class="num">${escape(p.pop.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</td>
      <td class="num">${share}%</td>
    </tr>`;
  }).join('');
  const sel = state.selected ? PROVINCES.find((p) => p.name === state.selected) : null;
  const detail = sel ? `<aside class="detail" id="prov-detail">
    <h3>${escape(sel.name)}</h3>
    <dl>
      <dt>Ibu kota</dt><dd>${escape(sel.capital)}</dd>
      <dt>Pulau</dt><dd>${escape(sel.island)}</dd>
      <dt>Penduduk 2020</dt><dd>${escape(sel.pop.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))} juta jiwa</dd>
      <dt>Pangsa nasional</dt><dd>${escape(((sel.pop / CENSUS_TOTAL) * 100).toFixed(2).replace('.', ','))}% dari 270,20 juta jiwa</dd>
    </dl>
    <p class="source-note">Sumber: BPS, Sensus Penduduk 2020. Klik baris lain untuk melihat provinsi lain.</p>
  </aside>` : `<aside class="detail" id="prov-detail"><p>Klik salah satu baris tabel untuk melihat rincian provinsi di sini.</p></aside>`;
  return `
  <p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Provinsi</h1>
  <p class="lede">38 provinsi, dari Aceh sampai Papua Pegunungan. Penduduk menurut
  Sensus Penduduk 2020 (BPS) — total 270,20 juta jiwa.</p>
  <div class="controls">
    <label>Cari provinsi <input id="prov-search" type="search" placeholder="misalnya: Jawa, Papua, Bali…" value="${escape(state.query)}" autocomplete="off"></label>
    <label>Urutkan
      <select id="prov-sort">
        <option value="name" ${state.sort === 'name' ? 'selected' : ''}>Nama A–Z</option>
        <option value="pop-desc" ${state.sort === 'pop-desc' ? 'selected' : ''}>Penduduk terbanyak</option>
        <option value="pop-asc" ${state.sort === 'pop-asc' ? 'selected' : ''}>Penduduk tersedikit</option>
        <option value="island" ${state.sort === 'island' ? 'selected' : ''}>Pulau</option>
      </select>
    </label>
  </div>
  <p class="result-count" id="prov-count">${rows.length} dari 38 provinsi ditampilkan.</p>
  <div class="prov-layout">
    <div class="table-wrap">
      <table class="prov">
        <thead><tr><th>#</th><th>Provinsi</th><th>Ibu kota</th><th>Pulau</th><th>Penduduk (jt)</th><th>Pangsa</th></tr></thead>
        <tbody id="prov-body">${body}</tbody>
      </table>
      <p class="empty-note" id="prov-empty" ${rows.length ? 'hidden' : ''}>Tidak ada provinsi yang cocok. Hapus kata pencarian untuk melihat semuanya.</p>
    </div>
    ${detail}
  </div>
  <p class="source-note">Sumber: BPS, Sensus Penduduk 2020. Untuk empat provinsi Papua hasil pemekaran 2022, angka adalah hasil Sensus 2020 untuk wilayah tersebut (BPS). Lihat <a href="#/metodologi">Metodologi</a>.</p>`;
}

export function pendidikan() {
  return `
  <p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Pendidikan</h1>
  <p class="lede">Penduduk Indonesia makin lama bersekolah: rata-rata lama sekolah
  naik dari 8,25 tahun (2015) menjadi 9,04 tahun (2024).</p>
  <div class="kpi-grid">
    ${kpiCard({ label: 'Rata-rata lama sekolah', value: '9,04 thn', detail: 'penduduk 25 tahun ke atas, 2024', source: 'BPS, 2024', route: '#/pendidikan' })}
    ${kpiCard({ label: 'Harapan lama sekolah', value: '13,21 thn', detail: 'anak usia 7 tahun, 2024', source: 'BPS, 2024', route: '#/pendidikan' })}
    ${kpiCard({ label: 'Indeks Pembangunan Manusia', value: '75,02', detail: '2024 — kategori tinggi', source: 'BPS, 2024', route: '#/pendidikan' })}
  </div>
  <section>
    <h2>Lama sekolah 2015–2024</h2>
    <p>Rata-rata lama sekolah (RLS) penduduk usia 25 tahun ke atas, dalam tahun.
    Kenaikannya pelan tapi ajek: sekitar satu bulan tambahan setiap tahun.</p>
    <div class="chart">${lineChart(SCHOOLING_SERIES, { unit: 'thn', color: '#0e7c6b', decimals: 2 })}</div>
    <p class="source-note">Sumber: BPS, Indeks Pembangunan Manusia 2015–2024.</p>
  </section>
  <section>
    <h2>Apa arti angka-angka ini</h2>
    <p><strong>Rata-rata lama sekolah (RLS)</strong> mengukur berapa tahun rata-rata
    penduduk usia 25 tahun ke atas pernah bersekolah. Angka 9,04 tahun berarti
    rata-rata penduduk dewasa menamatkan kelas 9 — setara SMP.</p>
    <p><strong>Harapan lama sekolah (HLS)</strong> mengukur berapa tahun seorang anak
    usia 7 tahun diperkirakan akan bersekolah: 13,21 tahun berarti sampai sekitar
    kelas 1 SMA atau awal perguruan tinggi.</p>
    <p><strong>Indeks Pembangunan Manusia (IPM)</strong> menggabungkan kesehatan
    (umur harapan hidup), pendidikan (RLS dan HLS), dan standar hidup layak
    (pengeluaran per kapita). IPM Indonesia 2024 adalah 75,02 — masuk kategori
    “tinggi” menurut klasifikasi BPS.</p>
  </section>`;
}

export function kesehatan() {
  return `
  <p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Kesehatan</h1>
  <p class="lede">Umur harapan hidup saat lahir mencapai 74,07 tahun pada 2024.
  Tantangan terbesar yang tersisa adalah kematian ibu dan stunting balita.</p>
  <div class="kpi-grid">
    ${kpiCard({ label: 'Umur harapan hidup', value: '74,07 thn', detail: 'saat lahir, 2024', source: 'BPS, 2024', route: '#/kesehatan' })}
    ${kpiCard({ label: 'Kematian bayi', value: '16,1', detail: 'per 1.000 kelahiran hidup, 2023', source: 'BPS, 2024', route: '#/kesehatan' })}
    ${kpiCard({ label: 'Kematian ibu', value: '189', detail: 'per 100.000 kelahiran hidup, 2020', source: 'BPS, Sensus 2020', route: '#/kesehatan' })}
    ${kpiCard({ label: 'Stunting balita', value: '19,8%', detail: '2024', source: 'Kemenkes, SSGI 2024', route: '#/kesehatan' })}
  </div>
  <section>
    <h2>Membaca keempat angka ini</h2>
    <p><strong>Umur harapan hidup 74,07 tahun</strong> berarti bayi yang lahir pada
    2024 diperkirakan hidup sampai usia 74 tahun bila pola kematian saat ini
    bertahan (BPS, 2024).</p>
    <p><strong>Angka kematian bayi 16,1</strong> berarti dari setiap 1.000 bayi
    lahir hidup, sekitar 16 meninggal sebelum usia satu tahun (BPS, 2024, data 2023).</p>
    <p><strong>Angka kematian ibu 189</strong> berarti dari setiap 100.000
    kelahiran hidup, 189 ibu meninggal karena sebab terkait kehamilan atau
    persalinan (BPS, Sensus Penduduk 2020, Long Form).</p>
    <p><strong>Stunting 19,8 persen</strong> berarti hampir satu dari lima balita
    bertubuh pendek untuk usianya akibat kekurangan gizi kronis — turun dari
    21,5 persen pada 2023, tapi masih di atas target nasional 14 persen pada
    2024 (Kemenkes, Survei Status Gizi Indonesia 2024).</p>
  </section>`;
}

export function metodologi() {
  return `
  <p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Metodologi</h1>
  <p class="lede">Dari mana setiap angka di situs ini berasal — dan bagaimana cara
  membacanya dengan benar.</p>
  <section>
    <h2>Sumber data</h2>
    <dl class="sources">
      <dt>Badan Pusat Statistik (BPS)</dt>
      <dd>Sensus Penduduk 2020; Proyeksi Penduduk 2015–2024; Produk Domestik Bruto 2015–2024; Survei Angkatan Kerja Nasional (Sakernas) 2024; Indeks Pembangunan Manusia 2024; profil kemiskinan September 2024; inflasi 2024.</dd>
      <dt>Kementerian Kesehatan</dt>
      <dd>Survei Status Gizi Indonesia (SSGI) 2024 untuk prevalensi stunting balita.</dd>
      <dt>Kementerian Dalam Negeri</dt>
      <dd>Jumlah dan nama 38 provinsi, termasuk empat provinsi Papua hasil pemekaran 2022.</dd>
    </dl>
    <p>DataNusa adalah situs independen dan bukan situs resmi BPS. Angka-angka di
    sini dikutip dari publikasi resmi yang disebutkan di atas; untuk angka
    terbaru, rujuk langsung ke publikasi BPS.</p>
  </section>
  <section>
    <h2>Catatan angka</h2>
    <ul>
      <li>Angka penduduk “pertengahan tahun” adalah perkiraan pada 30 Juni; angka sensus adalah hasil pencacahan.</li>
      <li>Pangsa PDB menurut lapangan usaha dibulatkan ke persen terdekat.</li>
      <li>Untuk provinsi hasil pemekaran 2022, angka penduduk adalah hasil Sensus 2020 untuk wilayah tersebut.</li>
      <li>Semua angka memakai koma desimal Indonesia (misalnya 5,03 persen).</li>
      <li>Situs ini tidak mengambil data dari internet: seluruh angka tersimpan di dalam berkas situs sendiri.</li>
    </ul>
  </section>
  <section>
    <h2>Tentang situs ini</h2>
    <p>DataNusa dibuat sebagai situs statistik nasional yang berdiri sendiri:
    seluruh halaman, grafik, dan angka tersimpan dalam berkas situs dan dapat
    dibuka tanpa jaringan. Grafik digambar dari data di atas dengan kode situs
    sendiri.</p>
  </section>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
  <p>Tidak ada halaman di alamat ini. <a href="#/">Kembali ke Beranda</a>.</p>`;
}
