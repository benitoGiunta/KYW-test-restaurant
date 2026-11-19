#!/usr/bin/env node
// Génère dist/index.html : un restaurant par ligne, son site actuel et les 3 variantes publiées (portfolio, awwwards, inspi legacy),
// plus la galerie des gabarits du portfolio. Source : data/restaurants.json et la présence de dist/<slug>/<variante>/index.html.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, cpSync } from 'node:fs';
import { join, resolve } from 'node:path';
const racine = resolve(new URL('..', import.meta.url).pathname);
const tous = existsSync(join(racine, 'data/restaurants.json')) ? JSON.parse(readFileSync(join(racine, 'data/restaurants.json'), 'utf8')) : [];
const restos = tous.filter((r) => r.selection !== 'reserve');
// Lots affichés en onglets : lot 1 = restaurants de la phase de conception des agents (selection « retenu », sans campagne) ;
// puis un onglet par campagne (agents/production/campagnes/<campagne>.json : champs lot, run, file).
const dirCamp = join(racine, 'agents/production/campagnes');
const campagnes = existsSync(dirCamp) ? readdirSync(dirCamp).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(readFileSync(join(dirCamp, f), 'utf8'))) : [];
const parSlug = Object.fromEntries(tous.map((r) => [r.slug, r]));
const LOTS = [
  { id: 'lot-1', titre: 'Lot 1', run: 'Premier run exploratoire · conception des agents', note: 'Restaurants qui ont servi à concevoir et mettre au point les agents de développement et de débogage.', restos: restos.filter((r) => !r.campagne) },
  ...campagnes.map((c, i) => ({ id: `lot-${i + 2}`, titre: c.lot || `Lot ${i + 2}`, run: c.run || c.campagne, note: c.objet || '',
    restos: (c.file || []).map((slug) => parSlug[slug]).filter(Boolean) })),
];
const variantes = [['portfolio', 'Portfolio'], ['awwwards', 'Awwwards'], ['legacy', 'Inspi legacy']];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const gabarits = existsSync(join(racine, 'dist/gabarits')) ? readdirSync(join(racine, 'dist/gabarits')).filter((g) => existsSync(join(racine, 'dist/gabarits', g, 'index.html')) && existsSync(join(racine, 'gabarits', g, 'RAPPORT.md'))).sort() : [];
const ligne = (r, i) => {
  const liens = r.selection === 'reserve' ? '<span class="v v-attente" title="Dans la file de la campagne, pas encore lancé">à venir</span>' : variantes.map(([v, label]) => existsSync(join(racine, 'dist', r.slug, v, 'index.html'))
    ? `<a class="v v-${v}" href="/${r.slug}/${v}/">${label}</a>`
    : `<span class="v v-attente" title="En cours">${label}</span>`).join('');
  return `<tr><td class="n">${i + 1}</td><td class="nom"><strong>${esc(r.nom)}</strong><br><small>${esc(r.type_cuisine || '')}${r.commune ? ' · ' + esc(r.commune) : ''}</small></td><td><a class="actuel" href="${esc(r.site_actuel)}" target="_blank" rel="noopener">${esc(r.site_actuel.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a></td><td class="vs">${liens}</td></tr>`;
};
const complet = (r) => variantes.every(([v]) => existsSync(join(racine, 'dist', r.slug, v, 'index.html')));
const faits = restos.filter((r) => variantes.every(([v]) => existsSync(join(racine, 'dist', r.slug, v, 'index.html')))).length;
const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>KYW · Refontes de sites de restaurants namurois</title>
<link rel="icon" href="/kyw/favicon.svg" type="image/svg+xml">
<style>
:root{--ardoise:#314044;--clair:#E1E2E3;--peche:#FFB38A;--peche-texte:#C9693A;--lien:#B35A2E;--fond:#FBFAF8;--ligne:#E6E4E0}
*{box-sizing:border-box}html,body{overflow-x:clip}
body{margin:0;background:var(--fond);color:var(--ardoise);font:16px/1.5 "Red Hat Display",system-ui,-apple-system,"Segoe UI",sans-serif}
header{padding:3rem 1rem 1.5rem;max-width:1100px;margin:0 auto}
header img{height:34px;width:auto;display:block;margin-bottom:1.25rem}
h1{font-size:clamp(1.6rem,3.5vw,2.4rem);line-height:1.15;margin:0 0 .5rem;letter-spacing:-.01em}
header p{margin:0;max-width:62ch;color:#55646a}
main{max-width:1100px;margin:0 auto;padding:0 1rem 4rem}
.etat{margin:1rem 0 1.5rem;font-size:.9rem;color:#55646a}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--ligne);border-radius:10px;overflow:hidden}
th,td{padding:.8rem .9rem;text-align:left;vertical-align:top;border-top:1px solid var(--ligne)}
th{background:var(--clair);font-weight:600;font-size:.85rem;border-top:0}
td.n{color:#8a969a;width:2.5rem}td small{color:#6b787d}
a{color:var(--lien)}a:focus-visible,span:focus-visible{outline:2px solid var(--peche-texte);outline-offset:2px}
.actuel{word-break:break-all;font-size:.92rem}
.vs{display:flex;flex-wrap:wrap;gap:.4rem;min-width:16rem}
.v{display:inline-block;padding:.35rem .7rem;border-radius:999px;font-size:.85rem;text-decoration:none;border:1px solid var(--ligne);background:#fff;color:var(--ardoise);transition:background .15s,border-color .15s}
.v:hover{border-color:var(--peche-texte);background:#FFF6F1}
.v-attente{color:#9aa5a9;border-style:dashed;background:transparent}
h2{font-size:1.25rem;margin:3rem 0 .75rem}
.gab{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.6rem;padding:0;list-style:none;margin:0}
.gab a{display:block;padding:.75rem .9rem;border:1px solid var(--ligne);border-radius:8px;background:#fff;text-decoration:none;color:var(--ardoise)}
.gab a:hover{border-color:var(--peche-texte)}
.onglets{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 1rem}
.onglets button{font:inherit;color:inherit;text-align:left;display:flex;flex-direction:column;gap:.1rem;padding:.7rem 1rem;border:1px solid var(--ligne);border-top:4px solid var(--c);border-radius:10px;background:#fff;cursor:pointer;min-width:min(100%,15rem);flex:1 1 15rem}
.onglets button[aria-selected=true]{background:var(--cs);border-color:var(--c)}
.onglets b{font-size:1.05rem}.onglets span{font-size:.85rem}.onglets small{font-size:.78rem;color:#6b787d}
.lot-1{--c:#C9693A;--cs:#FFF3EC}.lot-2{--c:#2a8a89;--cs:#E6F5F4}.lot-3{--c:#6250d6;--cs:#EFEDFB}
section.lot table{border-top:4px solid var(--c)}
.lot-note{font-size:.9rem;color:#55646a;margin:0 0 .75rem}
.pastille{display:inline-block;background:var(--cs);color:var(--ardoise);border:1px solid var(--c);border-radius:999px;padding:.1rem .6rem;font-size:.8rem;font-weight:600;margin-right:.3rem}
footer{max-width:1100px;margin:0 auto;padding:1rem 1rem 3rem;font-size:.8rem;color:#6b787d}
@media(max-width:720px){table,thead,tbody,tr,td,th{display:block}thead{display:none}tr{border-top:1px solid var(--ligne);padding:.5rem 0}td{border:0;padding:.3rem .9rem}td.n{display:none}}
</style></head>
<body>
<header><img src="/kyw/kyw-signature-720.webp" alt="KYW, Know Your Website" width="720" height="144">
<h1>Refontes de sites de restaurants namurois</h1>
<p>Pour chaque restaurant : son site actuel, puis trois propositions. <strong>Portfolio</strong> adapte un gabarit de notre collection, <strong>Awwwards</strong> est une direction artistique libre au niveau des sites primés, <strong>Inspi legacy</strong> garde l'approche du site actuel et la refond entièrement. Maquettes : certaines données (plats, prix, équipe) sont illustratives.</p></header>
<main>
<p class="etat">${restos.length} restaurants lancés · ${faits} avec leurs 3 variantes publiées · mis à jour le ${esc(process.env.KYW_DATE || new Date().toISOString().slice(0, 10))}</p>
<div class="onglets" role="tablist" aria-label="Lots">${LOTS.map((l, i) => `<button role="tab" id="t-${l.id}" aria-controls="${l.id}" aria-selected="${i === 0}" class="lot-${(i % 3) + 1}"><b>${esc(l.titre)}</b><span>${esc(l.run)}</span><small>${l.restos.filter(complet).length} / ${l.restos.length} restaurants publiés</small></button>`).join('')}</div>
${LOTS.map((l, i) => `<section id="${l.id}" role="tabpanel" aria-labelledby="t-${l.id}" class="lot lot-${(i % 3) + 1}"${i ? ' hidden' : ''}>
<p class="lot-note"><span class="pastille">${esc(l.titre)} · ${esc(l.run)}</span> ${esc(l.note)}</p>
<table><thead><tr><th>#</th><th>Restaurant</th><th>Site actuel</th><th>Propositions KYW</th></tr></thead><tbody>
${l.restos.map(ligne).join('\n') || '<tr><td colspan="4">Aucun restaurant pour l\'instant.</td></tr>'}
</tbody></table></section>`).join('\n')}
<script>(()=>{const t=[...document.querySelectorAll('.onglets [role=tab]')];const ouvre=(id)=>{t.forEach(b=>b.setAttribute('aria-selected',b.getAttribute('aria-controls')===id));document.querySelectorAll('section.lot').forEach(s=>s.hidden=s.id!==id)};t.forEach(b=>b.addEventListener('click',()=>{ouvre(b.getAttribute('aria-controls'));history.replaceState(null,'','#'+b.getAttribute('aria-controls'))}));const h=location.hash.slice(1);if(h&&document.getElementById(h))ouvre(h)})()</script>
<h2><a href="/gabarits/">Collection de gabarits du portfolio</a> (${gabarits.length} publiés sur 15)</h2>
<ul class="gab">${gabarits.map((g) => `<li><a href="/gabarits/${g}/">${esc(g)}</a></li>`).join('') || '<li>En construction.</li>'}</ul>
</main>
<footer>KYW, filiale web de KYN · Namur · pages de démonstration non indexées · <a href="/suivi/">suivi du projet</a></footer>
</body></html>`;
mkdirSync(join(racine, 'dist/kyw'), { recursive: true });
cpSync(join(racine, 'packages/kyw-footer/kyw-signature-720.webp'), join(racine, 'dist/kyw/kyw-signature-720.webp'));
writeFileSync(join(racine, 'dist/index.html'), html);
const page404 = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Page introuvable · KYW</title>
<meta name="description" content="Cette page n'existe pas ou a changé d'adresse.">
<link rel="icon" href="/kyw/favicon.svg" type="image/svg+xml">
<style>
:root{--ardoise:#314044;--clair:#E1E2E3;--peche-texte:#C9693A;--lien:#B35A2E;--fond:#FBFAF8}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:var(--fond);color:var(--ardoise);font:16px/1.5 "Red Hat Display",system-ui,-apple-system,"Segoe UI",sans-serif}
main{flex:1;max-width:40rem;width:100%;margin:0 auto;padding:4rem 1rem 2rem}
h1{font-size:clamp(1.8rem,5vw,2.6rem);line-height:1.15;margin:0 0 1rem;letter-spacing:-.01em}
a{color:var(--lien)}a:focus-visible{outline:2px solid var(--peche-texte);outline-offset:2px}
footer{text-align:center;padding:1.5rem 1rem 2.5rem;font-size:.8rem;color:#6b787d;border-top:1px solid #E6E4E0}
footer p{margin:0 0 .75rem}footer a{display:inline-flex;flex-direction:column;align-items:center;gap:.4rem;text-decoration:none;color:inherit}
footer img{height:auto;width:min(180px,60vw)}
</style></head>
<body>
<main><h1>Page introuvable</h1>
<p>Cette adresse n'existe pas ou a changé. Retrouvez les maquettes de sites de restaurants namurois depuis <a href="/">la page d'accueil</a>.</p></main>
<footer class="kyw-footer" aria-label="Réalisation"><p class="kyw-footer__note">Maquette KYW, certaines données sont illustratives.</p>
<a class="kyw-footer__link" href="https://kyngroup.be" rel="noopener" aria-label="Site réalisé par KYW, Know Your Website"><span>Réalisé par</span><img class="kyw-footer__logo kyw-signature" src="/kyw/kyw-signature-720.webp" width="720" height="144" alt="KYW, Know Your Website" decoding="async"></a></footer>
</body></html>`;
writeFileSync(join(racine, 'dist/404.html'), page404);
import('node:child_process').then(({ execSync }) => { execSync('node scripts/galerie.mjs', { stdio: 'inherit', cwd: racine }); execSync('node scripts/suivi.mjs', { stdio: 'inherit', cwd: racine }); });
console.log(`✓ dist/index.html : ${restos.length} restaurants, ${faits} complets, ${gabarits.length} gabarits`);
