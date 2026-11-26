// DataNusa — data for the site. Every figure carries its source and year.
// Sources: Badan Pusat Statistik (BPS), Kementerian Kesehatan (SSGI).
// Figures are the published values; nothing here is invented. Where a value
// is rounded, the page that shows it says so.

export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  note: 'Angka di situs ini adalah angka resmi yang diterbitkan BPS dan kementerian terkait. Setiap angka menyebut sumber dan tahunnya.',
};

// Key indicators shown on the home page.
export const INDICATORS = [
  { id: 'penduduk', label: 'Penduduk', value: '281,6 jt', detail: 'jiwa, pertengahan 2024', source: 'BPS, Proyeksi Penduduk 2024', route: '#/penduduk' },
  { id: 'pdb', label: 'PDB', value: 'Rp22.139 T', detail: 'harga berlaku, 2024', source: 'BPS, 2025', route: '#/ekonomi' },
  { id: 'tumbuh', label: 'Pertumbuhan ekonomi', value: '5,03%', detail: '2024 (y-on-y)', source: 'BPS, 2025', route: '#/ekonomi' },
  { id: 'perkapita', label: 'PDB per kapita', value: 'Rp78,62 jt', detail: 'US$4.960, 2024', source: 'BPS, 2025', route: '#/ekonomi' },
  { id: 'inflasi', label: 'Inflasi', value: '1,57%', detail: 'tahun kalender 2024', source: 'BPS, 2025', route: '#/ekonomi' },
  { id: 'tpt', label: 'Pengangguran terbuka', value: '4,91%', detail: 'Agustus 2024', source: 'BPS, Sakernas 2024', route: '#/ekonomi' },
  { id: 'miskin', label: 'Penduduk miskin', value: '8,57%', detail: '24,06 juta jiwa, Sep 2024', source: 'BPS, 2025', route: '#/ekonomi' },
  { id: 'ipm', label: 'Indeks Pembangunan Manusia', value: '75,02', detail: '2024', source: 'BPS, 2024', route: '#/pendidikan' },
  { id: 'ahh', label: 'Umur harapan hidup', value: '74,07 thn', detail: '2024', source: 'BPS, 2024', route: '#/kesehatan' },
  { id: 'stunting', label: 'Prevalensi stunting', value: '19,8%', detail: 'balita, 2024', source: 'Kemenkes, SSGI 2024', route: '#/kesehatan' },
];

// Population, mid-year, millions (BPS Proyeksi Penduduk; 2020 is the census).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.6 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
];

// Real GDP growth, percent year-on-year (BPS).
export const GROWTH_SERIES = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// GDP shares by field of business, 2024, rounded to whole percent (BPS).
export const SECTOR_SHARES = [
  { name: 'Industri pengolahan', share: 19 },
  { name: 'Perdagangan', share: 13 },
  { name: 'Pertanian, kehutanan, perikanan', share: 12 },
  { name: 'Konstruksi', share: 10 },
  { name: 'Pertambangan dan penggalian', share: 9 },
  { name: 'Lapangan usaha lainnya', share: 37 },
];

// Mean years of schooling (Rata-rata Lama Sekolah), years (BPS).
export const SCHOOLING_SERIES = [
  { year: 2015, value: 8.25 }, { year: 2018, value: 8.76 },
  { year: 2020, value: 8.89 }, { year: 2022, value: 8.97 },
  { year: 2024, value: 9.04 },
];

// Provinces. Population in millions from Sensus Penduduk 2020 (BPS); for the
// four Papuan provinces created in 2022, the figure is the 2020 census count
// for that territory, as published by BPS. Capitals are the provincial seats.
export const PROVINCES = [
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatera', pop: 5.27 },
  { name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatera', pop: 14.8 },
  { name: 'Sumatera Barat', capital: 'Padang', island: 'Sumatera', pop: 5.53 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatera', pop: 6.39 },
  { name: 'Jambi', capital: 'Jambi', island: 'Sumatera', pop: 3.55 },
  { name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatera', pop: 8.47 },
  { name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatera', pop: 2.01 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatera', pop: 9.01 },
  { name: 'Kepulauan Bangka Belitung', capital: 'Pangkal Pinang', island: 'Sumatera', pop: 1.46 },
  { name: 'Kepulauan Riau', capital: 'Tanjung Pinang', island: 'Sumatera', pop: 2.06 },
  { name: 'DKI Jakarta', capital: 'Jakarta', island: 'Jawa', pop: 10.56 },
  { name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa', pop: 48.27 },
  { name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa', pop: 36.52 },
  { name: 'DI Yogyakarta', capital: 'Yogyakarta', island: 'Jawa', pop: 3.67 },
  { name: 'Jawa Timur', capital: 'Surabaya', island: 'Jawa', pop: 40.67 },
  { name: 'Banten', capital: 'Serang', island: 'Jawa', pop: 11.9 },
  { name: 'Bali', capital: 'Denpasar', island: 'Bali', pop: 4.32 },
  { name: 'Nusa Tenggara Barat', capital: 'Mataram', island: 'Nusa Tenggara', pop: 5.32 },
  { name: 'Nusa Tenggara Timur', capital: 'Kupang', island: 'Nusa Tenggara', pop: 5.33 },
  { name: 'Kalimantan Barat', capital: 'Pontianak', island: 'Kalimantan', pop: 5.41 },
  { name: 'Kalimantan Tengah', capital: 'Palangka Raya', island: 'Kalimantan', pop: 2.67 },
  { name: 'Kalimantan Selatan', capital: 'Banjarmasin', island: 'Kalimantan', pop: 4.07 },
  { name: 'Kalimantan Timur', capital: 'Samarinda', island: 'Kalimantan', pop: 3.77 },
  { name: 'Kalimantan Utara', capital: 'Tanjung Selor', island: 'Kalimantan', pop: 0.7 },
  { name: 'Sulawesi Utara', capital: 'Manado', island: 'Sulawesi', pop: 2.62 },
  { name: 'Sulawesi Tengah', capital: 'Palu', island: 'Sulawesi', pop: 2.99 },
  { name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', pop: 9.07 },
  { name: 'Sulawesi Tenggara', capital: 'Kendari', island: 'Sulawesi', pop: 2.62 },
  { name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.19 },
  { name: 'Sulawesi Barat', capital: 'Mamuju', island: 'Sulawesi', pop: 1.42 },
  { name: 'Maluku', capital: 'Ambon', island: 'Maluku', pop: 1.85 },
  { name: 'Maluku Utara', capital: 'Sofifi', island: 'Maluku', pop: 1.28 },
  { name: 'Papua Barat', capital: 'Manokwari', island: 'Papua', pop: 0.54 },
  { name: 'Papua Barat Daya', capital: 'Sorong', island: 'Papua', pop: 0.61 },
  { name: 'Papua', capital: 'Jayapura', island: 'Papua', pop: 1.06 },
  { name: 'Papua Selatan', capital: 'Merauke', island: 'Papua', pop: 0.51 },
  { name: 'Papua Tengah', capital: 'Nabire', island: 'Papua', pop: 1.35 },
  { name: 'Papua Pegunungan', capital: 'Wamena', island: 'Papua', pop: 1.41 },
];

export const CENSUS_TOTAL = 270.2; // Sensus Penduduk 2020, juta jiwa (BPS)

// Latest releases, newest first. Each links to a page of this site.
export const RELEASES = [
  { date: '5 Feb 2025', title: 'Ekonomi Indonesia 2024 tumbuh 5,03 persen; PDB Rp22.139 triliun', source: 'BPS', route: '#/ekonomi' },
  { date: '15 Jan 2025', title: 'Penduduk miskin September 2024 turun menjadi 8,57 persen', source: 'BPS', route: '#/ekonomi' },
  { date: '2 Jan 2025', title: 'Inflasi tahun kalender 2024 tercatat 1,57 persen', source: 'BPS', route: '#/ekonomi' },
  { date: '15 Nov 2024', title: 'Indeks Pembangunan Manusia 2024 mencapai 75,02', source: 'BPS', route: '#/pendidikan' },
  { date: '2024', title: 'Prevalensi stunting balita 19,8 persen', source: 'Kemenkes, SSGI', route: '#/kesehatan' },
  { date: 'Jan 2021', title: 'Sensus Penduduk 2020: penduduk Indonesia 270,20 juta jiwa', source: 'BPS', route: '#/penduduk' },
];

// Sections of the site, for the navigation.
export const SECTIONS = [
  { route: '#/', label: 'Beranda' },
  { route: '#/penduduk', label: 'Penduduk' },
  { route: '#/ekonomi', label: 'Ekonomi' },
  { route: '#/provinsi', label: 'Provinsi' },
  { route: '#/pendidikan', label: 'Pendidikan' },
  { route: '#/kesehatan', label: 'Kesehatan' },
  { route: '#/metodologi', label: 'Metodologi' },
];
