#!/usr/bin/env node
// Page de suivi du projet : grandes étapes, progression des 15 gabarits et des 20 restaurants, calculée depuis l'état du dépôt.
// Sorties : dist/suivi/index.html (Vercel, document complet) et data/suivi.html (fragment pour l'artefact claude.ai).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
const R = resolve(new URL('..', import.meta.url).pathname);
const ex = (p) => existsSync(join(R, p));
const lire = (p) => JSON.parse(readFileSync(join(R, p), 'utf8'));
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const suivi = (p) => { try { return execSync(`git ls-files --error-unmatch "${p}" 2>/dev/null`, { cwd: R }).toString().trim() !== ''; } catch { return false; } };
const date = process.env.KYW_DATE || new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const URL_PROD = 'https://kyw-test-restaurant.vercel.app';

// Gabarits
const dRaw = ex('data/portfolio/directions.json') ? lire('data/portfolio/directions.json') : [];
const directions = Array.isArray(dRaw) ? dRaw : dRaw.directions || [];
const ETAPES_G = ['en construction', 'construit', 'en ligne', 'revu', 'corrigé'];
const gabarits = directions.map((d) => {
  const g = `gabarits/${d.id}`;
  let niveau = 0; // 0 à faire
  if (ex(g)) niveau = 1;
  if (ex(`${g}/RAPPORT.md`)) niveau = 2;
  if (suivi(`dist/gabarits/${d.id}/index.html`)) niveau = 3;
  if (ex(`${g}/REVUE-1.md`)) niveau = 4;
  if (ex(`${g}/REVISION-1.md`)) niveau = 5;
  return { id: d.id, nom: d.nom, pitch: d.pitch, niveau, url: niveau >= 3 ? `${URL_PROD}/gabarits/${d.id}/` : null };
});
// Restaurants
const restos = (ex('data/restaurants.json') ? lire('data/restaurants.json') : []).filter((r) => r.selection !== 'reserve');
const VARS = ['portfolio', 'awwwards', 'legacy'];
const restaurants = restos.map((r) => {
  const dossier = ex(`data/restaurants/${r.slug}/donnees.json`) ? 2 : ex(`data/restaurants/${r.slug}`) ? 1 : 0;
  const variantes = VARS.map((v) => {
    const s = `sites/${r.slug}-${v}`;
    let n = 0;
    if (ex(s)) n = 1; if (ex(`${s}/RAPPORT.md`)) n = 2; if (ex(`${s}/REVUE-1.md`)) n = 3; if (ex(`${s}/REVISION-1.md`)) n = 4; if (suivi(`dist/${r.slug}/${v}/index.html`)) n = 5;
    return { v, n, url: n === 5 ? `${URL_PROD}/${r.slug}/${v}/` : null };
  });
  return { ...r, dossier, variantes };
});
const nbEvals = [1, 2, 3, 4, 5, 6, 7].reduce((a, i) => a + (ex(`data/portfolio/eval-${i}.json`) ? lire(`data/portfolio/eval-${i}.json`).length : 0), 0);
const gFaits = gabarits.filter((g) => g.niveau >= 5).length, gLigne = gabarits.filter((g) => g.niveau >= 3).length;
const rComplets = restaurants.filter((r) => r.variantes.every((x) => x.n === 5)).length;
const rVariantes = restaurants.reduce((a, r) => a + r.variantes.filter((x) => x.n === 5).length, 0);

const phases = [
  { n: 1, titre: 'Sélection des restaurants', detail: `140 candidats vérifiés, 31 actifs, ${restos.length} retenus`, pct: 100 },
  { n: 2, titre: 'Infrastructure et publication', detail: 'dépôt, workspace Astro, pied de page KYW, projet Vercel, index', pct: 100 },
  { n: 3, titre: 'Skills et prompts des rôles', detail: 'awwwards, jury, hallmark explorées ; 10 prompts, workflow, session fille', pct: 100 },
  { n: 4, titre: 'Recherche du portfolio', detail: `106 sites collectés, ${nbEvals} évalués en navigateur, 15 directions artistiques`, pct: 100 },
  { n: 5, titre: 'Socle Astro commun', detail: 'moteur de motion, layout complet, données du restaurant 1', pct: 100 },
  { n: 6, titre: 'Gabarits du portfolio', detail: `${gLigne} en ligne, ${gFaits} revus et corrigés sur 15`, pct: Math.round(gabarits.reduce((a, g) => a + g.niveau, 0) / (15 * 5) * 100) },
  { n: 7, titre: 'Dossiers clients', detail: `${restaurants.filter((r) => r.dossier === 2).length} sur ${restos.length}`, pct: Math.round(restaurants.filter((r) => r.dossier === 2).length / Math.max(1, restos.length) * 100) },
  { n: 8, titre: 'Sites des restaurants (3 variantes)', detail: `${rVariantes} variantes publiées sur ${restos.length * 3}, ${rComplets} restaurants complets`, pct: Math.round(restaurants.reduce((a, r) => a + r.variantes.reduce((b, x) => b + x.n, 0), 0) / Math.max(1, restos.length * 15) * 100) },
  { n: 9, titre: 'Reporting de consommation', detail: 'session dédiée, tableau de bord, méthode sobre appliquée', pct: 100 },
];
const total = Math.round(phases.reduce((a, p) => a + p.pct, 0) / phases.length);
const ETAPES_R = ['à faire', 'en cours', 'construit', 'revu', 'corrigé', 'publié'];
const corps = `
<meta name="claude:viewport-fit-sides" content="cover">
<title>Suivi KYW Restaurants</title>
<style>
/* Mise en page : tableau de bord lu en une colonne, bandeau de synthèse puis trois blocs (étapes, gabarits, restaurants). */
:root{--bg:#FBFAF8;--fg:#314044;--muted:#6b787d;--line:#E3E1DC;--card:#FFFFFF;--accent:#C9693A;--accent-soft:#FFE3D2;--ok:#2F7D5B;--ok-soft:#DDF0E6;--wip:#B8860B;--wip-soft:#FFF1C7;--todo:#D9D6D0;--font:"Red Hat Display",system-ui,-apple-system,"Segoe UI",sans-serif;--mono:ui-monospace,"SF Mono",Menlo,monospace}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#171F22;--fg:#E6E8E8;--muted:#9AA7AC;--line:#2C373B;--card:#1F292D;--accent:#FFB38A;--accent-soft:#4A3022;--ok:#7FD1A8;--ok-soft:#1F3B2F;--wip:#F0C75E;--wip-soft:#3E3416;--todo:#3A4549;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#171F22;--fg:#E6E8E8;--muted:#9AA7AC;--line:#2C373B;--card:#1F292D;--accent:#FFB38A;--accent-soft:#4A3022;--ok:#7FD1A8;--ok-soft:#1F3B2F;--wip:#F0C75E;--wip-soft:#3E3416;--todo:#3A4549;color-scheme:dark}
*{box-sizing:border-box}html,body{overflow-x:clip}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 var(--font);padding-block:1.5rem 3rem;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.wrap{max-width:1080px;margin:0 auto}
h1{font-size:clamp(1.5rem,3vw,2.1rem);letter-spacing:-.01em;margin:0 0 .25rem;text-wrap:balance}
.sub{color:var(--muted);margin:0 0 1.5rem}
.sub a{color:var(--accent)}
.synthese{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.75rem;margin-bottom:2rem}
.tuile{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.9rem 1rem;min-width:0}
.tuile b{display:block;font-size:1.7rem;font-variant-numeric:tabular-nums;line-height:1.1}
.tuile span{color:var(--muted);font-size:.85rem}
h2{font-size:1.15rem;margin:2rem 0 .75rem}
.etapes{display:grid;gap:.5rem}
.etape{display:grid;grid-template-columns:2rem 1fr 7rem;gap:.75rem;align-items:center;padding:.6rem .8rem;background:var(--card);border:1px solid var(--line);border-radius:8px;min-width:0}
.etape .n{font-family:var(--mono);color:var(--muted);font-size:.85rem}
.etape .t{font-weight:600}.etape small{display:block;color:var(--muted);font-weight:400}
.barre{height:8px;background:var(--todo);border-radius:999px;overflow:hidden;position:relative}
.barre i{position:absolute;inset:0;width:var(--p);background:var(--accent);border-radius:999px}
.barre.ok i{background:var(--ok)}
.pct{font-variant-numeric:tabular-nums;font-size:.85rem;text-align:right;color:var(--muted)}
.legende{display:flex;flex-wrap:wrap;gap:.5rem 1rem;color:var(--muted);font-size:.82rem;margin:.25rem 0 .75rem}
.legende i{display:inline-block;width:.8em;height:.8em;border-radius:3px;margin-right:.3em;vertical-align:-1px}
.grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:.6rem}
.gab{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:.7rem .8rem;min-width:0;border-left:5px solid var(--todo)}
.gab.n1,.gab.n2{border-left-color:var(--wip)}.gab.n3,.gab.n4{border-left-color:var(--accent)}.gab.n5{border-left-color:var(--ok)}
.gab b{display:block}.gab small{color:var(--muted);display:block;font-size:.8rem;line-height:1.35}
.gab .etat{display:inline-block;margin-top:.4rem;font-size:.75rem;padding:.1rem .5rem;border-radius:999px;background:var(--todo)}
.gab.n1 .etat,.gab.n2 .etat{background:var(--wip-soft)}.gab.n3 .etat,.gab.n4 .etat{background:var(--accent-soft)}.gab.n5 .etat{background:var(--ok-soft)}
.gab a{color:var(--accent)}
.tableau{overflow-x:auto;border:1px solid var(--line);border-radius:10px;background:var(--card)}
table{border-collapse:collapse;width:100%;min-width:640px}
th,td{padding:.55rem .7rem;text-align:left;border-top:1px solid var(--line);vertical-align:middle}
th{border-top:0;font-size:.82rem;color:var(--muted);font-weight:600}
td.num{color:var(--muted);font-family:var(--mono);font-size:.82rem;width:2.5rem}
.pastille{display:inline-block;min-width:5.6rem;text-align:center;font-size:.78rem;padding:.15rem .5rem;border-radius:999px;background:var(--todo)}
.pastille.n1,.pastille.n2{background:var(--wip-soft)}.pastille.n3,.pastille.n4{background:var(--accent-soft)}.pastille.n5,.pastille.d2{background:var(--ok-soft)}
.pastille a{color:inherit;text-decoration:none;border-bottom:1px solid currentColor}
a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
footer{color:var(--muted);font-size:.8rem;margin-top:2rem}
@media (max-width:640px){.etape{grid-template-columns:1.6rem 1fr}.etape .pct{grid-column:2;text-align:left}}
</style>
<div class="wrap">
<h1>Suivi du projet KYW Restaurants</h1>
<p class="sub">Refonte de ${restos.length} restaurants namurois en 3 variantes. Mis à jour le ${esc(date)} depuis l'état du dépôt. Liens : <a href="${URL_PROD}/">index des restaurants</a> · <a href="${URL_PROD}/gabarits/">galerie des gabarits</a> · <a href="https://claude.ai/artifact/39eBZZyjPAnwQfhAAx2Bxq">consommation de jetons</a>.</p>
<div class="synthese">
<div class="tuile"><b>${total} %</b><span>avancement global (moyenne des 9 étapes)</span></div>
<div class="tuile"><b>${gLigne} / 15</b><span>gabarits en ligne (${gFaits} revus et corrigés)</span></div>
<div class="tuile"><b>${rVariantes} / ${restos.length * 3}</b><span>variantes de sites publiées</span></div>
<div class="tuile"><b>${rComplets} / ${restos.length}</b><span>restaurants avec leurs 3 variantes</span></div>
</div>
<h2>Grandes étapes</h2>
<div class="etapes">${phases.map((p) => `<div class="etape"><span class="n">${String(p.n).padStart(2, '0')}</span><div class="t">${esc(p.titre)}<small>${esc(p.detail)}</small></div><div><div class="barre${p.pct === 100 ? ' ok' : ''}"><i style="--p:${p.pct}%"></i></div><div class="pct">${p.pct} %</div></div></div>`).join('')}</div>
<h2>Gabarits du portfolio (${gLigne} en ligne sur 15)</h2>
<p class="legende"><i style="background:var(--todo)"></i>à faire <i style="background:var(--wip)"></i>en construction ou construit <i style="background:var(--accent)"></i>en ligne, en revue <i style="background:var(--ok)"></i>revu et corrigé</p>
<div class="grille">${gabarits.map((g) => `<div class="gab n${g.niveau}"><b>${esc(g.nom)}</b><small>${esc(g.pitch)}</small><span class="etat">${g.niveau ? ETAPES_G[g.niveau - 1] : 'à faire'}</span>${g.url ? ` <small><a href="${g.url}">voir</a></small>` : ''}</div>`).join('')}</div>
<h2>Restaurants (${rComplets} complets sur ${restos.length})</h2>
<p class="legende">Pour chaque variante : à faire, en cours, construit, revu, corrigé, publié.</p>
<div class="tableau"><table><thead><tr><th>#</th><th>Restaurant</th><th>Dossier</th><th>Portfolio</th><th>Awwwards</th><th>Inspi legacy</th></tr></thead><tbody>
${restaurants.map((r, i) => `<tr><td class="num">${i + 1}</td><td><b>${esc(r.nom)}</b><br><small style="color:var(--muted)">${esc(r.type_cuisine || '')}</small></td><td><span class="pastille d${r.dossier}">${['à faire', 'en cours', 'complet'][r.dossier]}</span></td>${r.variantes.map((x) => `<td><span class="pastille n${x.n}">${x.url ? `<a href="${x.url}">publié</a>` : ETAPES_R[x.n]}</span></td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>
<footer>KYW, filiale web de KYN. Page régénérée par <code>scripts/suivi.mjs</code> à chaque publication.</footer>
</div>`;
mkdirSync(join(R, 'dist/suivi'), { recursive: true });
mkdirSync(join(R, 'data'), { recursive: true });
writeFileSync(join(R, 'dist/suivi/index.html'), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">${corps.replace('<meta name="claude:viewport-fit-sides" content="cover">', '')}</body></html>`.replace('<div class="wrap">', '</head><body><div class="wrap">'));
writeFileSync(join(R, 'data/suivi.html'), corps);
console.log(`✓ suivi : ${total} % global, gabarits ${gLigne}/15 en ligne, variantes ${rVariantes}/${restos.length * 3}`);
