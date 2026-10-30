#!/usr/bin/env node
// Génère dist/gabarits/index.html : galerie des gabarits publiés (aperçu, nom, pitch, cible) depuis directions.json et gabarits/<id>/apercu.png.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
const racine = resolve(new URL('..', import.meta.url).pathname);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let directions = [];
try { const d = JSON.parse(readFileSync(join(racine, 'data/portfolio/directions.json'), 'utf8')); directions = Array.isArray(d) ? d : d.directions || []; } catch {}
const parId = Object.fromEntries(directions.map((d) => [d.id, d]));
const dg = join(racine, 'dist/gabarits');
mkdirSync(dg, { recursive: true });
const publies = existsSync(dg) ? readdirSync(dg).filter((g) => existsSync(join(dg, g, 'index.html'))).sort() : [];
const cartes = publies.map((id) => {
  const d = parId[id] || {};
  const ap = join(racine, 'gabarits', id, 'apercu.png');
  let img = '';
  if (existsSync(ap)) { copyFileSync(ap, join(dg, id, 'apercu.png')); img = `<img src="/gabarits/${id}/apercu.png" alt="Aperçu du gabarit ${esc(d.nom || id)}" loading="lazy" width="1440" height="900">`; }
  return `<li><a href="/gabarits/${id}/">${img || '<div class="vide">Aperçu à venir</div>'}<h2>${esc(d.nom || id)}</h2><p>${esc(d.pitch || '')}</p>${d.cible ? `<small>${esc(Array.isArray(d.cible) ? d.cible.join(', ') : d.cible)}</small>` : ''}</a></li>`;
}).join('\n');
const aVenir = directions.filter((d) => !publies.includes(d.id)).map((d) => `<li class="attente"><h2>${esc(d.nom)}</h2><p>${esc(d.pitch || '')}</p><small>En construction</small></li>`).join('\n');
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>KYW · Collection de gabarits</title><link rel="icon" href="/kyw/favicon.svg" type="image/svg+xml">
<style>:root{--ardoise:#314044;--clair:#E1E2E3;--peche-texte:#C9693A;--lien:#B35A2E;--fond:#FBFAF8;--ligne:#E6E4E0}*{box-sizing:border-box}html,body{overflow-x:clip}
body{margin:0;background:var(--fond);color:var(--ardoise);font:16px/1.5 "Red Hat Display",system-ui,sans-serif}header,main,footer{max-width:1200px;margin:0 auto;padding:0 1rem}
header{padding-top:3rem}header img{height:34px;width:auto;display:block;margin-bottom:1.25rem}h1{font-size:clamp(1.6rem,3.5vw,2.4rem);margin:0 0 .5rem;letter-spacing:-.01em}header p{margin:0 0 2rem;max-width:62ch;color:#55646a}
.retour{display:inline-block;margin-bottom:1rem;color:var(--lien)}ul{list-style:none;padding:0;margin:0 0 3rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.2rem}
li a{display:block;background:#fff;border:1px solid var(--ligne);border-radius:12px;overflow:hidden;text-decoration:none;color:inherit;transition:border-color .15s,transform .15s}li a:hover{border-color:var(--peche-texte);transform:translateY(-2px)}li a:focus-visible{outline:2px solid var(--peche-texte);outline-offset:3px}
img,.vide{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;background:var(--clair)}.vide{display:grid;place-items:center;color:#8a969a}
h2{font-size:1.15rem;margin:.9rem 1rem .25rem}li p{margin:0 1rem .5rem;font-size:.92rem;color:#55646a}li small{display:block;margin:0 1rem 1rem;color:#8a969a}
li.attente{background:transparent;border:1px dashed var(--ligne);border-radius:12px;color:#8a969a}li.attente h2{color:#8a969a}
footer{padding:1rem 1rem 3rem;font-size:.8rem;color:#6b787d}</style></head>
<body><header><img src="/kyw/kyw-signature-720.webp" alt="KYW, Know Your Website" width="720" height="144"><a class="retour" href="/">← Les 20 restaurants</a>
<h1>Collection de gabarits KYW</h1><p>Quinze directions artistiques originales pour sites de restaurants, construites sur les données des Potes au Feu (Namur) et des données d'illustration. Chaque gabarit est ensuite adapté à un restaurant pour sa variante « Portfolio ».</p></header>
<main><ul>${cartes}${aVenir}</ul></main><footer>${publies.length} gabarit(s) publié(s) sur ${directions.length}. Maquettes non indexées.</footer></body></html>`;
writeFileSync(join(dg, 'index.html'), html);
console.log(`✓ dist/gabarits/index.html : ${publies.length} publiés, ${directions.length - publies.length} à venir`);
