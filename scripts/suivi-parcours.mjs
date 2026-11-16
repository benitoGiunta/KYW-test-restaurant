// Onglet « Parcours » de la page de suivi : une ligne par restaurant, découpée en colonnes = étapes
// (développement puis débogage). Une case pleine = étape faite ; un chiffre dans la case = nombre de passes
// quand l'étape a demandé plusieurs mises en place (ex. 3 = troisième approche de la méthode). Vue détaillée : chaque restaurant
// déplié avec ses 3 sites en dessous, sur les mêmes colonnes.
// Sources : sites/<slug>-<v>/ (REVUE-n, REVISION-n, CORRECTION-n), dist/, data/restaurants/, data/review/<slug>/.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const VARS = ['portfolio', 'awwwards', 'legacy'];
const NOM_V = { portfolio: 'Portfolio', awwwards: 'Awwwards', legacy: 'Inspi legacy' };
const NOM_CAT = { brouillon: 'brouillon', contenu: 'contenu', langue: 'langue', disposition: 'disposition', lisibilite: 'lisibilité', animation: 'animation', fonctionnel: 'fonctionnel' };
// Étapes, dans l'ordre des colonnes. g : groupe (dev | debug).
const ETAPES = [
  { k: 'dossier', nom: 'Dossier client', g: 'dev' },
  { k: 'construction', nom: 'Construction', g: 'dev' },
  { k: 'revue', nom: 'Revue', g: 'dev' },
  { k: 'revision', nom: 'Révision', g: 'dev' },
  { k: 'publication', nom: 'Publication', g: 'dev' },
  { k: 'identification', nom: 'Identification', g: 'debug' },
  { k: 'correction', nom: 'Correction', g: 'debug' },
  { k: 'republication', nom: 'Republication', g: 'debug' },
];

export function parcours({ R, restos, esc }) {
  const ex = (p) => existsSync(join(R, p));
  const lire = (p) => JSON.parse(readFileSync(join(R, p), 'utf8'));
  const compte = (dir, re) => (ex(dir) ? readdirSync(join(R, dir)).filter((f) => re.test(f)).length : 0);
  const decisions = (fichier) => {
    const d = { corrige: 0, refuse: 0, impossible: 0 };
    if (!ex(fichier)) return d;
    for (const l of readFileSync(join(R, fichier), 'utf8').split('\n')) {
      const c = l.split('|').map((x) => x.trim()).filter((x, i, a) => !(x === '' && (i === 0 || i === a.length - 1)));
      if (c.length < 4) continue;
      const v = c[2].toLowerCase();
      if (/^corrig/.test(v)) d.corrige++; else if (/^refus/.test(v)) d.refuse++; else if (/^impossib/.test(v)) d.impossible++;
    }
    return d;
  };
  const libelles = (fichier, cle) => { try { const x = lire(fichier)[cle]; return x ? Object.keys(x).length : 0; } catch { return null; } };
  const pl = (n, s) => `${n} ${s}${n > 1 ? 's' : ''}`;
  // Approches de développement : chaque version de la méthode, appliquée à une suite de restaurants (par rang).
  const configs = ex('data/usage/chantiers/configurations.json') ? lire('data/usage/chantiers/configurations.json').sort((a, b) => a.ordre - b.ordre) : [];
  const approcheDev = {}; let rang = 1;
  configs.forEach((c, i) => {
    const n = c.restaurants.replace('Pépite, cave à manger', 'Pépite').split(',').filter((x) => x.trim()).length;
    for (let k = 0; k < n; k++) approcheDev[rang++] = { n: i + 1, quoi: c.nouveaute };
  });
  // Approches de débogage : 1 = phase 1 (revue puis correction, contexte complet), 2 = phase 2 (après mesure : agents légers F/H).
  const APPROCHE_DEBUG = { 1: 'revue Sonnet puis correcteur, scan des brouillons ajouté ensuite', 2: 'ajustements actés après mesure : agents projet légers, brouillons intégrés, configurations F et H', 3: 'approche 2 (F) + q.sh obligatoire, sorties sobres, capture ciblée après correction', 4: 'q.sh et marqueur imposés par hook, captures par page avec couverture prouvée et relance si revue incomplète, aucun fait retiré sans source' };

  const data = restos.map((r) => {
    const dossier = ex(`data/restaurants/${r.slug}/donnees.json`);
    const sites = VARS.map((v) => {
      const dir = `sites/${r.slug}-${v}`;
      const rev = ex(`data/review/${r.slug}/${v}.json`) ? lire(`data/review/${r.slug}/${v}.json`) : null;
      const probs = rev?.problemes || [];
      const parCat = {}; for (const p of probs) parCat[p.categorie] = (parCat[p.categorie] || 0) + 1;
      const nCorr = compte(dir, /^CORRECTION-\d+\.md$/);
      const ad = approcheDev[r.rang] || { n: 1, quoi: '' };
      const ab = rev?.couverture ? 4 : r.rang <= 4 ? 1 : r.rang <= 8 ? 2 : r.rang <= 13 ? 3 : 4; // couverture = format de revue de l'approche 4
      const tA = (n, quoi) => `Approche ${n}${quoi ? ' : ' + quoi : ''}`;
      const dec = decisions(`${dir}/CORRECTION-${nCorr || 1}.md`);
      const traites = dec.corrige + dec.refuse + dec.impossible || probs.length;
      const avant = rev ? (libelles(`data/review/${r.slug}/brouillon.json`, `${r.slug}/${v}`) ?? parCat.brouillon ?? 0) : null;
      const apres = rev ? libelles(`data/review/${r.slug}/brouillon-apres.json`, `${r.slug}/${v}`) : null;
      const publie = ex(`dist/${r.slug}/${v}/index.html`);
      // Phase 1 (rangs 1-4) : les brouillons ont été relevés par un scan séparé, après la revue (2e approche).
      const n = { revue: compte(dir, /^REVUE-\d+\.md$/), revision: compte(dir, /^REVISION-\d+\.md$/) };
      const e = {
        dossier: { fait: dossier, n: 1, tip: dossier ? 'Recherche client faite (donnees.json)' : 'Dossier à faire' },
        construction: { fait: ex(`${dir}/RAPPORT.md`), n: ad.n, tip: `${tA(ad.n, ad.quoi)}\nSite construit` },
        revue: { fait: n.revue > 0, n: ad.n, tip: `${tA(ad.n, ad.quoi)}\n` + (n.revue ? `${pl(n.revue, 'revue')} avant publication` : 'Pas encore revu') },
        revision: { fait: n.revision > 0, n: ad.n, tip: `${tA(ad.n, ad.quoi)}\n` + (n.revision ? `${pl(n.revision, 'révision')} (corrections suite aux revues)` : 'Pas de révision') },
        publication: { fait: publie, n: 1, tip: publie ? 'En ligne' : 'Pas encore publié' },
        identification: { fait: !!rev, n: rev ? ab : 0, tip: rev ? `${tA(ab, APPROCHE_DEBUG[ab])}\n${pl(probs.length, 'problème')} relevé${probs.length > 1 ? 's' : ''}${Object.keys(parCat).length ? ' : ' + Object.entries(parCat).map(([c, k]) => `${NOM_CAT[c] || c} ${k}`).join(', ') : ''}${avant != null && !parCat.brouillon ? ` (+ ${pl(avant, 'libellé')} de brouillon)` : ''}` : 'Débogage à venir' },
        correction: { fait: nCorr > 0, n: nCorr ? ab : 0, tip: nCorr ? `${tA(ab, APPROCHE_DEBUG[ab])}\n${dec.corrige} corrigé${dec.corrige > 1 ? 's' : ''}${dec.refuse ? `, ${dec.refuse} refusé${dec.refuse > 1 ? 's' : ''} (justifié)` : ''}${dec.impossible ? `, ${dec.impossible} impossible${dec.impossible > 1 ? 's' : ''}` : ''}` : 'Correction à venir' },
        republication: { fait: nCorr > 0 && publie, n: nCorr > 0 ? 1 : 0, tip: nCorr > 0 ? `Corrections en ligne${apres != null ? ` · libellés de brouillon ${avant ?? '?'} → ${apres}` : ''}` : 'À venir' },
      };
      return { v, e, debug: !!rev, traites, corriges: dec.corrige, avant: avant || 0, apres: apres || 0 };
    });
    // Ligne restaurant : étape faite si les 3 sites l'ont faite, partielle sinon ; chiffre = passes max.
    const e = Object.fromEntries(ETAPES.map((x) => {
      const faits = sites.filter((s) => s.e[x.k].fait).length;
      const n = Math.max(...sites.map((s) => s.e[x.k].n));
      const tip = x.k === 'dossier' ? sites[0].e.dossier.tip : sites.map((s) => `${NOM_V[s.v]} : ${s.e[x.k].tip}`).join('\n');
      return [x.k, { fait: faits === 3, partiel: faits > 0 && faits < 3, n, tip }];
    }));
    return { ...r, sites, e, debugues: sites.filter((s) => s.debug).length, traites: sites.reduce((a, s) => a + s.traites * s.debug, 0), corriges: sites.reduce((a, s) => a + s.corriges, 0) };
  });

  const all = data.flatMap((r) => r.sites), dbg = all.filter((s) => s.debug);
  const T = { sites: all.length, publies: all.filter((s) => s.e.publication.fait).length, debugues: dbg.length, traites: dbg.reduce((a, s) => a + s.traites, 0), corriges: dbg.reduce((a, s) => a + s.corriges, 0), avant: dbg.reduce((a, s) => a + s.avant, 0), apres: dbg.reduce((a, s) => a + s.apres, 0) };

  const cases = (e) => ETAPES.map((x) => {
    const c = e[x.k];
    const cls = c.fait ? 'fait' : c.partiel ? 'partiel' : 'vide';
    return `<span class="pc-c pc-${x.g} ${cls}" data-tip="${esc(`${x.nom}\n${c.tip}`)}" tabindex="0">${c.n > 1 ? `<b>${c.n}</b>` : ''}</span>`;
  }).join('');
  const etat = (r) => (r.debugues ? `${r.corriges}/${r.traites} corrigés` : 'débug à venir');
  const lignes = data.map((r) => `<details class="pc-r"><summary class="pc-l"><span class="pc-nom"><span class="pc-rang">${r.rang}</span><b>${esc(r.nom)}</b></span>${cases(r.e)}<span class="pc-etat">${etat(r)}</span></summary>
${r.sites.map((s) => `<div class="pc-l pc-site"><span class="pc-nom">${NOM_V[s.v]}</span>${cases(s.e)}<span class="pc-etat">${s.debug ? `${s.corriges}/${s.traites}` : ''}</span></div>`).join('')}</details>`).join('');

  const html = `
<div class="synthese">
<div class="tuile"><b>${T.publies} / ${T.sites}</b><span>sites développés et publiés</span></div>
<div class="tuile"><b>${T.debugues} / ${T.sites}</b><span>sites débogués</span></div>
<div class="tuile"><b>${T.corriges} / ${T.traites}</b><span>points corrigés sur relevés</span></div>
<div class="tuile"><b>${T.avant} → ${T.apres}</b><span>libellés de brouillon avant → après</span></div>
</div>
<div class="pc-barre-outils"><div class="pc-bascule" role="tablist" aria-label="Niveau de détail"><button role="tab" aria-selected="true" data-vue="condense">Condensé</button><button role="tab" aria-selected="false" data-vue="detaille">Détaillé par site</button></div>
<p class="pc-legende"><span><i class="pc-dev fait"></i>développement fait</span><span><i class="pc-debug fait"></i>débogage fait</span><span><i class="partiel pc-dev"></i>fait sur une partie des sites</span><span><i class="vide"></i>à faire</span><span><i class="pc-dev fait pc-num">3</i>n° de l'approche utilisée (méthode améliorée après mesure de la conso)</span></p></div>
<div class="pc-grille">
<div class="pc-l pc-tete pc-groupes"><span></span><span class="pc-gdev">Développement</span><span class="pc-gdebug">Débogage</span><span></span></div>
<div class="pc-l pc-tete"><span class="pc-nom">Restaurant</span>${ETAPES.map((x) => `<span class="pc-h">${x.nom}</span>`).join('')}<span class="pc-etat">Débug</span></div>
${lignes}
</div>
<p class="pc-note">Clique sur un restaurant pour voir ses 3 sites. Survole une case pour le détail de l'étape et ce que l'approche a changé. Pas de chiffre = approche 1. Développement : 6 approches successives (point de départ, méthode sobre, tests A à I, hook de lecture). Débogage : approche 1 pour les restaurants 1 à 4, approche 2 pour 5 à 8, approche 3 pour 9 à 13, approche 4 pour 14 à 20 (et la reprise de Ferme Blanche legacy).</p>`;

  const css = `
.onglets{display:flex;gap:.25rem;border-bottom:1px solid var(--line);margin:0 0 1.5rem;overflow-x:auto}
.onglets button,.pc-bascule button{font:inherit;color:var(--muted);background:none;border:0;padding:.6rem .9rem;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap}
.onglets button[aria-selected=true]{color:var(--fg);border-bottom-color:var(--accent);font-weight:600}
:root{--s-dev:#2a78d6;--s-debug:#1baf7a}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--s-dev:#3987e5;--s-debug:#199e70}}
:root[data-theme="dark"]{--s-dev:#3987e5;--s-debug:#199e70}
.pc-barre-outils{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem 1.5rem;margin:1.5rem 0 .75rem}
.pc-bascule{display:inline-flex;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:3px}
.pc-bascule button{border:0;border-radius:999px;padding:.35rem .9rem}
.pc-bascule button[aria-selected=true]{background:var(--fg);color:var(--bg)}
.pc-legende{display:flex;flex-wrap:wrap;gap:.4rem 1rem;color:var(--muted);font-size:.8rem;margin:0}
.pc-legende i{display:inline-grid;place-items:center;width:1.1rem;height:.9rem;border-radius:3px;margin-right:.35em;vertical-align:-2px;font-style:normal;font-size:.62rem;font-weight:700;color:#fff}
.pc-grille{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.3rem .8rem .5rem;overflow-x:auto}
.pc-l{display:grid;grid-template-columns:minmax(10rem,14rem) repeat(8,minmax(2.6rem,1fr)) 6.5rem;align-items:center;min-width:700px}
.pc-tete{font-size:.72rem;color:var(--muted);padding:.4rem 0}
.pc-groupes{padding-bottom:0}.pc-gdev{grid-column:2/span 5;border-bottom:2px solid var(--s-dev);padding-bottom:.2rem;margin-right:6px;text-transform:uppercase;letter-spacing:.08em}.pc-gdebug{grid-column:7/span 3;border-bottom:2px solid var(--s-debug);padding-bottom:.2rem;text-transform:uppercase;letter-spacing:.08em}
.pc-h{text-align:center;line-height:1.15;padding:0 2px;border-left:1px solid var(--line)}
.pc-h:nth-child(7){border-left:2px solid var(--muted)}
.pc-r{border-top:1px solid var(--line)}
.pc-r>summary{list-style:none;cursor:pointer;padding:.35rem 0}.pc-r>summary::-webkit-details-marker{display:none}
.pc-r>summary:hover{background:var(--bg)}
.pc-nom{min-width:0;display:flex;align-items:baseline;gap:.45rem;font-size:.88rem;padding-right:.5rem}
.pc-r>summary .pc-nom::before{content:"▸";color:var(--muted);font-size:.7rem;transition:transform .15s}
.pc-r[open]>summary .pc-nom::before{transform:rotate(90deg)}
.pc-rang{font-family:var(--mono);font-size:.72rem;color:var(--muted);min-width:1.2rem;text-align:right}
.pc-c{height:22px;display:grid;place-items:center;border-left:1px solid var(--line);padding:0 3px;position:relative}
.pc-c:nth-child(7){border-left:2px solid var(--muted)}
.pc-c::before{content:"";position:absolute;inset:3px 3px;border-radius:4px;background:var(--todo);opacity:.55}
.pc-c.fait::before{opacity:1;background:var(--sc)}
.pc-c.partiel::before{opacity:1;background:repeating-linear-gradient(135deg,var(--sc) 0 4px,transparent 4px 7px);outline:1px solid var(--sc);outline-offset:-1px}
.pc-dev{--sc:var(--s-dev)}.pc-debug{--sc:var(--s-debug)}
.pc-legende i.fait{background:var(--sc)}.pc-legende i.partiel{background:repeating-linear-gradient(135deg,var(--sc) 0 3px,transparent 3px 5px);outline:1px solid var(--sc);outline-offset:-1px}.pc-legende i.vide{background:var(--todo)}
.pc-c b{position:relative;font-size:.72rem;color:#fff;font-variant-numeric:tabular-nums}
.pc-c:hover::before,.pc-c:focus-visible::before{outline:2px solid var(--fg);outline-offset:0}
.pc-c:focus-visible{outline:none}
.pc-etat{font-size:.76rem;color:var(--muted);text-align:right;font-variant-numeric:tabular-nums}
.pc-site{padding:.15rem 0 .15rem 0}.pc-site .pc-nom{padding-left:2.2rem;font-size:.8rem;color:var(--muted)}
.pc-site:last-child{padding-bottom:.45rem}
.pc-tip{position:fixed;z-index:10;pointer-events:none;background:var(--fg);color:var(--bg);font-size:.78rem;padding:.35rem .6rem;border-radius:6px;max-width:20rem;white-space:pre-line}
.pc-note{color:var(--muted);font-size:.78rem;margin-top:1rem}`;

  const js = `<script>
(()=>{const q=(s,r=document)=>[...r.querySelectorAll(s)];
const onglet=(id)=>{q('.onglets button').forEach(b=>b.setAttribute('aria-selected',b.dataset.onglet===id));q('[data-panneau]').forEach(p=>p.hidden=p.dataset.panneau!==id);try{localStorage.setItem('suivi-onglet',id)}catch(e){}};
q('.onglets button').forEach(b=>b.addEventListener('click',()=>onglet(b.dataset.onglet)));
try{const m=localStorage.getItem('suivi-onglet');if(m&&document.querySelector('[data-panneau="'+m+'"]'))onglet(m)}catch(e){}
q('.pc-bascule button').forEach(b=>b.addEventListener('click',()=>{q('.pc-bascule button').forEach(x=>x.setAttribute('aria-selected',x===b));q('.pc-r').forEach(d=>d.open=b.dataset.vue==='detaille')}));
const t=document.querySelector('.pc-tip');const show=(el)=>{t.textContent=el.dataset.tip;t.hidden=false;const r=el.getBoundingClientRect();t.style.left=Math.min(innerWidth-t.offsetWidth-8,Math.max(8,r.left+r.width/2-t.offsetWidth/2))+'px';const y=r.top-t.offsetHeight-8;t.style.top=(y<8?r.bottom+8:y)+'px'};
q('[data-tip]').forEach(el=>{el.addEventListener('mouseenter',()=>show(el));el.addEventListener('focus',()=>show(el));el.addEventListener('mouseleave',()=>t.hidden=true);el.addEventListener('blur',()=>t.hidden=true);el.addEventListener('click',e=>{if(el.closest('summary')){e.preventDefault();show(el)}})});
})();
</script>`;
  return { css, html, js };
}
