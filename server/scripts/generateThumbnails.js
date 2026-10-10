const fs = require('fs');
const path = require('path');

const W = 640;
const H = 400;
const outDir = path.join(__dirname, '..', 'public', 'thumbnails');
fs.mkdirSync(outDir, { recursive: true });

const rect = (x, y, w, h, fill, r = 4, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const circle = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;

function frame(bg, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}">
<rect width="${W}" height="${H}" fill="${bg}"/>
${body}
</svg>
`;
}

function browserBar(color, dot) {
  return [rect(0, 0, W, 36, color, 0), circle(20, 18, 5, dot), circle(38, 18, 5, dot), circle(56, 18, 5, dot)].join('');
}

const designs = {
  launchpad() {
    const p = { bg: '#eef2ff', ink: '#312e81', accent: '#4f46e5', soft: '#c7d2fe' };
    const body = [
      browserBar('#ffffff', p.soft),
      rect(60, 70, 120, 14, p.soft, 7),
      rect(60, 110, 320, 30, p.ink, 6),
      rect(60, 152, 260, 30, p.ink, 6),
      rect(60, 202, 300, 10, p.soft, 5),
      rect(60, 222, 240, 10, p.soft, 5),
      rect(60, 256, 130, 38, p.accent, 19),
      rect(204, 256, 110, 38, '#ffffff', 19, `stroke="${p.accent}" stroke-width="2"`),
      rect(430, 80, 150, 200, '#ffffff', 14),
      rect(446, 98, 118, 70, p.soft, 8),
      rect(446, 184, 90, 10, p.accent, 5),
      rect(446, 204, 118, 8, p.soft, 4),
      rect(446, 220, 100, 8, p.soft, 4),
      rect(60, 326, 150, 44, '#ffffff', 10),
      rect(244, 326, 150, 44, '#ffffff', 10),
      rect(428, 326, 150, 44, '#ffffff', 10),
    ].join('');
    return frame(p.bg, body, 'Launchpad template preview');
  },

  'metric-board'() {
    const p = { bg: '#0f172a', panel: '#1e293b', line: '#334155', accent: '#38bdf8', alt: '#34d399' };
    const bars = [60, 90, 70, 120, 100, 140, 115, 160];
    const chart = bars.map((h, i) => rect(236 + i * 44, 330 - h, 28, h, i % 2 ? p.accent : p.alt, 4)).join('');
    const body = [
      rect(0, 0, 150, H, p.panel, 0),
      rect(20, 28, 80, 14, p.accent, 7),
      rect(20, 80, 110, 10, p.line, 5),
      rect(20, 110, 90, 10, p.line, 5),
      rect(20, 140, 100, 10, p.line, 5),
      rect(20, 170, 80, 10, p.line, 5),
      rect(176, 24, 200, 16, p.line, 8),
      rect(176, 64, 140, 70, p.panel, 10),
      rect(332, 64, 140, 70, p.panel, 10),
      rect(488, 64, 140, 70, p.panel, 10),
      rect(190, 80, 50, 8, p.line, 4),
      rect(190, 98, 80, 20, p.accent, 5),
      rect(346, 80, 50, 8, p.line, 4),
      rect(346, 98, 80, 20, p.alt, 5),
      rect(502, 80, 50, 8, p.line, 4),
      rect(502, 98, 80, 20, p.accent, 5),
      rect(176, 154, 452, 220, p.panel, 12),
      chart,
    ].join('');
    return frame(p.bg, body, 'Metric Board template preview');
  },

  folio() {
    const p = { bg: '#faf5ef', ink: '#1c1917', tiles: ['#e7c6a5', '#9fb8ad', '#d9a5a0', '#b8b5d6', '#f0d98c', '#a3c4d9'] };
    const tiles = [
      [40, 120, 170, 120, 0], [225, 120, 170, 170, 1], [410, 120, 190, 120, 2],
      [40, 255, 170, 120, 3], [225, 305, 170, 70, 4], [410, 255, 190, 120, 5],
    ].map(([x, y, w, h, i]) => rect(x, y, w, h, p.tiles[i], 6)).join('');
    const body = [
      rect(40, 36, 110, 20, p.ink, 4),
      rect(430, 40, 40, 10, p.ink, 4),
      rect(484, 40, 40, 10, p.ink, 4),
      rect(538, 40, 60, 10, p.ink, 4),
      rect(40, 84, 260, 10, '#a8a29e', 5),
      tiles,
    ].join('');
    return frame(p.bg, body, 'Folio template preview');
  },

  longform() {
    const p = { bg: '#ffffff', ink: '#292524', mute: '#d6d3d1', accent: '#b45309', hero: '#fde68a' };
    const body = [
      rect(0, 0, W, 54, '#fafaf9', 0),
      rect(60, 20, 90, 14, p.ink, 4),
      rect(470, 23, 40, 8, p.mute, 4),
      rect(526, 23, 54, 8, p.mute, 4),
      rect(130, 84, 380, 130, p.hero, 8),
      rect(130, 232, 70, 10, p.accent, 5),
      rect(130, 254, 300, 20, p.ink, 5),
      rect(130, 288, 380, 8, p.mute, 4),
      rect(130, 306, 360, 8, p.mute, 4),
      rect(130, 324, 340, 8, p.mute, 4),
      rect(130, 342, 200, 8, p.mute, 4),
    ].join('');
    return frame(p.bg, body, 'Longform template preview');
  },

  cartwheel() {
    const p = { bg: '#f0fdf4', ink: '#14532d', accent: '#16a34a', card: '#ffffff', imgs: ['#bbf7d0', '#fde68a', '#fecaca', '#bfdbfe', '#e9d5ff', '#fed7aa'] };
    const cards = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const x = 180 + c * 150;
        const y = 90 + r * 150;
        cards.push(
          rect(x, y, 134, 136, p.card, 10),
          rect(x + 10, y + 10, 114, 70, p.imgs[r * 3 + c], 6),
          rect(x + 10, y + 92, 80, 8, p.ink, 4),
          rect(x + 10, y + 108, 44, 8, p.accent, 4),
        );
      }
    }
    const body = [
      rect(0, 0, W, 54, p.ink, 0),
      rect(24, 20, 80, 14, '#bbf7d0', 4),
      circle(596, 27, 10, p.accent),
      rect(24, 90, 130, 12, p.ink, 5),
      rect(24, 122, 110, 8, '#bbf7d0', 4),
      rect(24, 144, 100, 8, '#bbf7d0', 4),
      rect(24, 166, 120, 8, '#bbf7d0', 4),
      rect(24, 188, 90, 8, '#bbf7d0', 4),
      cards.join(''),
    ].join('');
    return frame(p.bg, body, 'Cartwheel template preview');
  },

  'ledger-admin'() {
    const p = { bg: '#f8fafc', ink: '#334155', line: '#e2e8f0', head: '#e2e8f0', ok: '#86efac', warn: '#fcd34d', bad: '#fca5a5' };
    const statuses = [p.ok, p.warn, p.ok, p.bad, p.ok, p.warn, p.ok];
    const rows = statuses
      .map((s, i) => {
        const y = 150 + i * 32;
        return [rect(40, y + 30, 560, 1, p.line, 0), rect(56, y + 8, 120, 8, '#94a3b8', 4), rect(240, y + 8, 160, 8, p.line, 4), rect(470, y + 5, 70, 14, s, 7)].join('');
      })
      .join('');
    const body = [
      rect(40, 30, 140, 18, p.ink, 4),
      rect(470, 26, 130, 28, '#4f46e5', 6),
      rect(40, 72, 200, 28, '#ffffff', 6, `stroke="${p.line}" stroke-width="1.5"`),
      rect(40, 116, 560, 34, p.head, 6),
      rect(56, 128, 80, 8, '#64748b', 4),
      rect(240, 128, 80, 8, '#64748b', 4),
      rect(470, 128, 60, 8, '#64748b', 4),
      rows,
    ].join('');
    return frame(p.bg, body, 'Ledger Admin template preview');
  },

  plainmail() {
    const p = { bg: '#e5e7eb', paper: '#ffffff', ink: '#111827', accent: '#e11d48', mute: '#d1d5db' };
    const body = [
      rect(170, 0, 300, H, p.paper, 0),
      rect(200, 28, 100, 14, p.ink, 4),
      rect(200, 64, 240, 90, '#fecdd3', 6),
      rect(200, 172, 210, 16, p.ink, 4),
      rect(200, 202, 240, 8, p.mute, 4),
      rect(200, 218, 236, 8, p.mute, 4),
      rect(200, 234, 200, 8, p.mute, 4),
      rect(200, 262, 110, 32, p.accent, 16),
      rect(200, 316, 240, 1, p.mute, 0),
      rect(200, 334, 150, 8, p.mute, 4),
      rect(200, 350, 120, 8, p.mute, 4),
    ].join('');
    return frame(p.bg, body, 'Plainmail template preview');
  },

  tierlist() {
    const p = { bg: '#fdf2f8', ink: '#500724', accent: '#be185d', card: '#ffffff', mute: '#fbcfe8' };
    const plan = (x, featured) => {
      const y = featured ? 96 : 116;
      const h = featured ? 230 : 190;
      const fill = featured ? p.accent : p.card;
      const text = featured ? '#ffffff' : p.ink;
      const faint = featured ? '#f9a8d4' : p.mute;
      return [
        rect(x, y, 170, h, fill, 14),
        rect(x + 20, y + 24, 70, 10, text, 5),
        rect(x + 20, y + 50, 90, 24, text, 6),
        rect(x + 20, y + 94, 130, 8, faint, 4),
        rect(x + 20, y + 114, 120, 8, faint, 4),
        rect(x + 20, y + 134, 130, 8, faint, 4),
        rect(x + 20, y + h - 46, 130, 28, featured ? '#ffffff' : p.accent, 14),
      ].join('');
    };
    const body = [
      rect(220, 30, 200, 20, p.ink, 5),
      rect(250, 62, 140, 8, '#9d174d', 4),
      plan(50, false),
      plan(235, true),
      plan(420, false),
    ].join('');
    return frame(p.bg, body, 'Tierlist template preview');
  },
};

Object.entries(designs).forEach(([name, render]) => {
  fs.writeFileSync(path.join(outDir, `${name}.svg`), render());
});

console.log(`Wrote ${Object.keys(designs).length} thumbnails to ${outDir}`);
