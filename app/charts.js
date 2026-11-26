// Charts for DataNusa: small SVG line and bar charts drawn from the site's
// own data. No library, no network — pure functions returning SVG strings.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function fmt(v, decimals = 1) {
  return Number(v).toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// A line chart. series: [{year, value}], unit is the y-axis unit label,
// color is the line colour. Returns an SVG string with labelled axes.
export function lineChart(series, { width = 640, height = 260, unit = '', color = '#0e7c6b', decimals = 1 } = {}) {
  const padL = 52, padR = 14, padT = 18, padB = 30;
  const values = series.map((p) => p.value);
  let min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  min -= span * 0.15; max += span * 0.15;
  const x = (i) => padL + (i * (width - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((max - v) * (height - padT - padB)) / (max - min);
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${padL},${y(min).toFixed(1)} ${points} ${x(series.length - 1).toFixed(1)},${y(min).toFixed(1)}`;
  const gridVals = [0, 0.5, 1].map((f) => min + f * (max - min));
  const grid = gridVals.map((v) => `
    <line x1="${padL}" y1="${y(v).toFixed(1)}" x2="${width - padR}" y2="${y(v).toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/>
    <text x="${padL - 8}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5a6b66">${esc(fmt(v, decimals))}${unit ? ' ' + esc(unit) : ''}</text>`).join('');
  const dots = series.map((p, i) => `
    <circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.5" fill="${color}" stroke="#fff" stroke-width="1.5"/>`).join('');
  const labels = series.map((p, i) => (i % 2 === 0 || i === series.length - 1)
    ? `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5a6b66">${p.year}</text>` : '').join('');
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis" xmlns="http://www.w3.org/2000/svg">
  ${grid}
  <polygon points="${area}" fill="${color}" fill-opacity="0.10"/>
  <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  ${dots}
  <text x="${x(series.length - 1).toFixed(1)}" y="${(y(last.value) - 10).toFixed(1)}" text-anchor="end" font-size="12" font-weight="700" fill="${color}">${esc(fmt(last.value, decimals))}${unit ? ' ' + esc(unit) : ''}</text>
  ${labels}
</svg>`;
}

// A horizontal bar chart. rows: [{name, value}], unit is the value unit.
// Bars are sorted largest first by the caller.
export function barChart(rows, { width = 640, unit = '', color = '#0e7c6b', decimals = 0 } = {}) {
  const rowH = 34, padL = 220, padR = 56, padT = 8;
  const height = padT + rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value));
  const bars = rows.map((r, i) => {
    const y = padT + i * rowH;
    const w = Math.max(2, ((width - padL - padR) * r.value) / max);
    return `
    <text x="${padL - 10}" y="${y + 17}" text-anchor="end" font-size="12.5" fill="#243b35">${esc(r.name)}</text>
    <rect x="${padL}" y="${y + 4}" width="${w.toFixed(1)}" height="18" rx="4" fill="${color}"/>
    <text x="${padL + w + 8}" y="${y + 18}" font-size="12.5" font-weight="700" fill="#243b35">${esc(fmt(r.value, decimals))}${unit ? ' ' + esc(unit) : ''}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik batang" xmlns="http://www.w3.org/2000/svg">${bars}
</svg>`;
}
