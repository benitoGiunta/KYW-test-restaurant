// Dessine les 4 couches illustrées du plat « Tawook » (vue de dessus, 1200 x 1200, fond transparent) : assiette, poulet grillé, légumes, toum et sauce.
// Illustration vectorielle marquée « illustrative » : aucune photo de plat n'existe dans le dossier. Usage : node scripts/couches.mjs public/couches
import sharp from 'sharp';
import fs from 'node:fs';
const out = process.argv[2] || 'public/couches';
fs.mkdirSync(out, { recursive: true });
const wrap = (b) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">${b}</svg>`;
const chunk = (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-64" y="-46" width="128" height="92" rx="30" fill="#b86a2a"/><rect x="-64" y="-46" width="128" height="92" rx="30" fill="none" stroke="#5a2e12" stroke-width="6" opacity=".55"/><path d="M-40 -22 L-8 24 M-6 -30 L26 20 M18 -34 L48 6" stroke="#2e1608" stroke-width="9" stroke-linecap="round" opacity=".7"/><ellipse cx="-24" cy="-26" rx="22" ry="9" fill="#e0a05a" opacity=".55"/></g>`;
const brochette = (cx, cy, rot) => {
  let s = `<g transform="translate(${cx} ${cy}) rotate(${rot})"><line x1="-330" y1="0" x2="330" y2="0" stroke="#8a6a3a" stroke-width="10" stroke-linecap="round"/>`;
  [-230, -115, 0, 115, 230].forEach((x, i) => { s += chunk(x, (i % 2) * 6 - 3, (i * 17) % 9 - 4); });
  return s + '</g>';
};
const couches = {
  fond: `<ellipse cx="600" cy="640" rx="520" ry="500" fill="#000" opacity=".28"/><circle cx="600" cy="600" r="500" fill="#e8dcc6"/><circle cx="600" cy="600" r="500" fill="none" stroke="#c9b894" stroke-width="10"/><circle cx="600" cy="600" r="390" fill="#f3eadb"/><circle cx="600" cy="600" r="390" fill="none" stroke="#d6c7a8" stroke-width="5"/>`,
  piece: brochette(560, 470, -14) + brochette(600, 650, -10) + brochette(640, 830, -6),
  garniture: `<g><path d="M250 760 q40 -110 150 -90 q60 90 -20 150 q-90 20 -130 -60z" fill="#c8421e"/><path d="M270 750 q40 -80 120 -70" stroke="#e98a4a" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M300 790 l70 30 M330 740 l60 40" stroke="#2e1608" stroke-width="9" stroke-linecap="round" opacity=".7"/></g><g><circle cx="900" cy="760" r="80" fill="#d2a54a"/><circle cx="900" cy="760" r="48" fill="none" stroke="#7a5416" stroke-width="7" opacity=".6"/><path d="M850 740 l100 36 M860 790 l80 -50" stroke="#2e1608" stroke-width="9" stroke-linecap="round" opacity=".65"/></g><g><circle cx="820" cy="900" r="60" fill="#b8321c"/><path d="M780 890 l80 24" stroke="#2e1608" stroke-width="8" stroke-linecap="round" opacity=".7"/></g><g><circle cx="340" cy="940" r="58" fill="#c8421e"/><path d="M305 925 l70 30" stroke="#2e1608" stroke-width="8" stroke-linecap="round" opacity=".7"/></g><g><path d="M260 560 q60 -50 130 -10 q-20 70 -90 70z" fill="#e6c88a"/><path d="M280 560 q40 -30 90 -8" stroke="#8a6a2a" stroke-width="7" fill="none"/></g>`,
  sauce: `<circle cx="935" cy="380" r="110" fill="#d8c9a8"/><circle cx="935" cy="380" r="90" fill="#fbf6ea"/><path d="M870 395 q30 -50 70 -20 q40 30 70 -25" stroke="#e7dcc3" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M290 380 q80 60 160 10 t170 20" stroke="#b8321c" stroke-width="16" fill="none" stroke-linecap="round" opacity=".92"/><g fill="#fbf6ea"><circle cx="700" cy="560" r="26"/><circle cx="520" cy="740" r="22"/><circle cx="760" cy="820" r="28"/></g><g fill="#b8321c"><circle cx="480" cy="540" r="14"/><circle cx="880" cy="640" r="12"/><circle cx="450" cy="900" r="13"/></g>`,
};
for (const [id, body] of Object.entries(couches)) await sharp(Buffer.from(wrap(body))).webp({ quality: 88 }).toFile(`${out}/${id}.webp`);
console.log('couches ok', Object.keys(couches).join(','));
