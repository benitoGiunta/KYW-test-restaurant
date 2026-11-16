// Onglet « Coûts » de la page de suivi : coût API par restaurant et par site pour le développement et la correction
// (débogage), baisse du coût moyen au fil des approches, et capacité en sites d'une limite hebdomadaire d'abonnement.
// Sources : data/usage/chantiers/chantiers.json (dev par site + commun), chantiers/configurations.json (approches dev),
// data/usage/correction-phase1.json, phase2.json, approche3.json, approche4.json (débogage),
// data/usage/limite-hebdo.json (estimation du prix d'une limite hebdomadaire, facultatif).
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const VARS = ['portfolio', 'awwwards', 'legacy'];
const NOM_V = { portfolio: 'Portfolio', awwwards: 'Awwwards', legacy: 'Inspi legacy' };

export function couts({ R, restos, esc }) {
  const ex = (p) => existsSync(join(R, p));
  const lire = (p) => (ex(p) ? JSON.parse(readFileSync(join(R, p), 'utf8')) : null);
  const eur = (x, d = 2) => `${(x ?? 0).toFixed(d).replace('.', ',')} $`;
  const chantiers = lire('data/usage/chantiers/chantiers.json') || [];
  const configs = (lire('data/usage/chantiers/configurations.json') || []).sort((a, b) => a.ordre - b.ordre);
  const approcheDev = {}; let rang = 1;
  configs.forEach((c, i) => { const n = c.restaurants.replace('Pépite, cave à manger', 'Pépite').split(',').filter((x) => x.trim()).length; for (let k = 0; k < n; k++) approcheDev[rang++] = i + 1; });

  // Débogage : coût par site (identifier + rectifier + part d'orchestration) et approche.
  const dbg = {};
  const ajoute = (approche, parSite, parResto) => {
    for (const [cle, s] of Object.entries(parSite || {})) {
      const [slug, v] = cle.split('|'); const orch = (parResto?.[slug]?.orch || 0) / 3;
      dbg[`${slug}|${v}`] = { approche, cout: (s.identifier || 0) + (s.rectifier || 0) + orch };
    }
  };
  const p1 = lire('data/usage/correction-phase1.json');
  if (p1) {
    const orch1 = ((p1.identifier?.orchestration?.cout || 0) + (p1.rectifier?.orchestration?.cout || 0)) / 12;
    for (const s of p1.agrege?.par_site || []) dbg[`${s.resto}|${s.variante}`] = { approche: 1, cout: s.total + orch1 };
  }
  for (const [n, f] of [[2, 'phase2.json'], [3, 'approche3.json'], [4, 'approche4.json']]) {
    const d = lire(`data/usage/${f}`)?.suivi; if (d) ajoute(n, d.par_site, d.par_restaurant);
  }
  const fbl = lire('data/usage/approche4.json')?.suivi?.ferme_blanche_legacy;
  if (fbl?.cout) dbg['ferme-blanche-d-asie|legacy'] = { approche: 4, cout: fbl.cout, reprise: true };

  const data = restos.map((r) => {
    const ch = chantiers.filter((c) => c.ordre === r.rang);
    const commun = ch.find((c) => /commun$/.test(c.chantier))?.cout || 0;
    const sites = VARS.map((v) => {
      const dev = (ch.find((c) => c.chantier.endsWith(`· ${v}`))?.cout || 0) + commun / 3;
      const d = dbg[`${r.slug}|${v}`];
      return { v, dev, debug: d?.cout ?? null, aDbg: d?.approche ?? null };
    });
    const dev = sites.reduce((a, s) => a + s.dev, 0), debug = sites.reduce((a, s) => a + (s.debug || 0), 0);
    const aDbg = Math.max(...sites.map((s) => s.aDbg || 0)) || null;
    return { ...r, sites, dev, debug, aDev: approcheDev[r.rang] || 1, aDbg };
  });

  const moy = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
  const groupe = (cle, val) => { const g = {}; for (const r of data) { const k = r[cle]; if (k == null) continue; (g[k] ||= []).push(val(r)); } return Object.entries(g).map(([k, xs]) => ({ k: +k, n: xs.length, moy: moy(xs) })).sort((a, b) => a.k - b.k); };
  const parDev = groupe('aDev', (r) => r.dev), parDbg = groupe('aDbg', (r) => r.debug);
  const totDev = data.reduce((a, r) => a + r.dev, 0), totDbg = data.reduce((a, r) => a + r.debug, 0);

  // Capacité d'une limite hebdomadaire (méthode actuelle = dernière approche dev + dernière approche débogage).
  const lim = lire('data/usage/limite-hebdo.json');
  const devActuel = parDev.at(-1)?.moy / 3, dbgActuel = parDbg.at(-1)?.moy / 3, siteActuel = (devActuel || 0) + (dbgActuel || 0);
  const siteMoyen = (totDev + totDbg) / (data.length * 3);
  const kpiLimite = lim ? (() => {
    const L = lim.limite_hebdo_dollars.estimation, bas = lim.limite_hebdo_dollars.bas, haut = lim.limite_hebdo_dollars.haut;
    const s = (x, c) => Math.floor(x / c);
    const mois = (x, c) => Math.floor((x / c) * 2 * 4 * 0.8);
    return `<h2>Ce que vaut une limite hebdomadaire</h2>
<div class="synthese">
<div class="tuile"><b>≈ ${eur(L, 0)}</b><span>prix API d'une limite hebdomadaire (fourchette ${eur(bas, 0)} à ${eur(haut, 0)})</span></div>
<div class="tuile"><b>≈ ${s(L, siteActuel)} sites</b><span>par limite hebdo avec la méthode actuelle (${eur(siteActuel)} par site, dev + correction ; fourchette ${s(bas, siteActuel)} à ${s(haut, siteActuel)})</span></div>
<div class="tuile"><b>≈ ${mois(L, siteActuel)} sites</b><span>par mois avec 2 abonnements, 4 semaines, 80 % consacrés aux sites (fourchette ${mois(bas, siteActuel)} à ${mois(haut, siteActuel)})</span></div>
<div class="tuile"><b>≈ ${s(L, siteMoyen)} sites</b><span>par limite hebdo au coût moyen de tout le chantier (${eur(siteMoyen)} par site) ; ${mois(L, siteMoyen)} par mois dans les mêmes conditions</span></div>
</div>
<p class="pc-note">${esc(lim.methode || '')}</p>`;
  })() : '<p class="pc-note">Estimation du prix d\'une limite hebdomadaire en cours de calcul.</p>';

  // Barres de coût par restaurant (dev + correction), dépliables par site.
  const maxR = Math.max(...data.map((r) => r.dev + r.debug), 0.01);
  const barre = (dev, debug, max, nom) => `<span class="cx-track">${dev ? `<i class="cx-s cx-dev" style="flex-basis:${(dev / max) * 100}%" data-tip="${esc(`${nom}\nDéveloppement : ${eur(dev)}`)}" tabindex="0"></i>` : ''}${debug ? `<i class="cx-s cx-dbg" style="flex-basis:${(debug / max) * 100}%" data-tip="${esc(`${nom}\nCorrection : ${eur(debug)}`)}" tabindex="0"></i>` : ''}</span>`;
  const lignes = data.map((r) => `<details class="cx-r"><summary class="cx-l"><span class="cx-nom"><span class="pc-rang">${r.rang}</span><b>${esc(r.nom)}</b></span>${barre(r.dev, r.debug, maxR, r.nom)}<span class="cx-val">${eur(r.dev)} <small>dev</small> · ${r.debug ? eur(r.debug) : '–'} <small>corr.</small></span></summary>
${r.sites.map((s) => `<div class="cx-l cx-site"><span class="cx-nom">${NOM_V[s.v]}</span>${barre(s.dev, s.debug, maxR / 3, `${r.nom} · ${NOM_V[s.v]}`)}<span class="cx-val">${eur(s.dev)} · ${s.debug != null ? eur(s.debug) : '–'}</span></div>`).join('')}</details>`).join('');

  // Colonnes : coût moyen par approche.
  const colonnes = (titre, serie, cls, unite, note) => {
    const max = Math.max(...serie.map((x) => x.moy), 0.01);
    return `<figure class="cx-fig"><figcaption><b>${titre}</b><small>${note}</small></figcaption><div class="cx-cols">${serie.map((x) => `<div class="cx-col" data-tip="${esc(`${titre} · approche ${x.k}\n${eur(x.moy / unite)} en moyenne (${x.n} restaurant${x.n > 1 ? 's' : ''})`)}" tabindex="0"><span class="cx-v" data-par-resto="${eur(x.moy)}" data-par-site="${eur(x.moy / 3)}">${eur(x.moy)}</span><i class="${cls}" style="height:${(x.moy / max) * 100}%"></i><span class="cx-x">A${x.k}</span></div>`).join('')}</div></figure>`;
  };
  // Global : dev + correction par restaurant, dans l'ordre de passage (les approches avancent avec les rangs).
  const maxG = Math.max(...data.map((r) => r.dev + r.debug), 0.01);
  const global = `<figure class="cx-fig cx-fig-large"><figcaption><b>Global : dev + correction par restaurant, dans l'ordre de passage</b><small>sous chaque colonne : approche dev · approche correction</small></figcaption><div class="cx-cols cx-cols-20">${data.map((r) => `<div class="cx-col" data-tip="${esc(`${r.nom}\nDev (approche ${r.aDev}) : ${eur(r.dev)}\nCorrection (approche ${r.aDbg ?? '–'}) : ${eur(r.debug)}\nTotal : ${eur(r.dev + r.debug)} · par site ${eur((r.dev + r.debug) / 3)}`)}" tabindex="0"><span class="cx-v" data-par-resto="${eur(r.dev + r.debug, 0)}" data-par-site="${eur((r.dev + r.debug) / 3, 1)}">${eur(r.dev + r.debug, 0)}</span><i class="cx-dbg" style="height:${(r.debug / maxG) * 100}%"></i><i class="cx-dev" style="height:${(r.dev / maxG) * 100}%"></i><span class="cx-x">${r.rang}<br><small>${r.aDev}·${r.aDbg ?? '–'}</small></span></div>`).join('')}</div></figure>`;

  const html = `
<div class="synthese">
<div class="tuile"><b>${eur(totDev, 0)}</b><span>développement des 20 restaurants (60 sites, hors gabarits du portfolio) · ${eur(totDev / 60)} par site</span></div>
<div class="tuile"><b>${eur(totDbg, 0)}</b><span>correction (identification + rectification) · ${eur(totDbg / 60)} par site</span></div>
<div class="tuile"><b>${eur(parDev[0]?.moy / 3)} → ${eur(devActuel)}</b><span>dev par site, approche 1 → ${parDev.length}</span></div>
<div class="tuile"><b>${eur(parDbg[0]?.moy / 3)} → ${eur(dbgActuel)}</b><span>correction par site, approche 1 → ${parDbg.length}</span></div>
</div>
${kpiLimite}
<h2>Coût par restaurant</h2>
<p class="pc-legende"><span><i class="cx-dev"></i>développement</span><span><i class="cx-dbg"></i>correction</span><span class="pc-sep">Clique sur un restaurant pour ses 3 sites ; survole une barre pour le montant.</span></p>
<div class="cx-grille">${lignes}</div>
<h2>Baisse du coût moyen au fil des approches</h2>
<div class="pc-bascule cx-unite" role="tablist" aria-label="Unité"><button role="tab" aria-selected="true" data-unite="resto">Par restaurant</button><button role="tab" aria-selected="false" data-unite="site">Par site</button></div>
${global}
<div class="cx-duo">${colonnes('Développement', parDev, 'cx-dev', 1, '6 approches : départ, méthode sobre, tests A-C, D-H, I, hook de lecture')}${colonnes('Correction', parDbg, 'cx-dbg', 1, '4 approches : revue séparée, agents légers F/H, q.sh + capture, hooks + couverture')}</div>
<p class="pc-note">Coûts au tarif API, mesurés dans les transcripts. Par site = coût du restaurant divisé par 3 (la recherche client et l'orchestration communes sont réparties). Hors gabarits du portfolio (${eur(chantiers.filter((c) => c.groupe === 'Portfolio').reduce((a, c) => a + c.cout, 0), 0)}), préparation et pilotage du projet. Ferme Blanche legacy : coût de la reprise (approche 4).</p>`;

  const css = `
.cx-dev{--c:var(--s-dev);background:var(--s-dev)}.cx-dbg{--c:var(--s-debug);background:var(--s-debug)}
.pc-legende i.cx-dev,.pc-legende i.cx-dbg{width:.8em;height:.8em}
.cx-grille{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.3rem .8rem .5rem}
.cx-l{display:grid;grid-template-columns:minmax(9rem,14rem) 1fr minmax(9rem,12rem);gap:.75rem;align-items:center;padding:.3rem 0}
.cx-r{border-top:1px solid var(--line)}.cx-r:first-child{border-top:0}
.cx-r>summary{list-style:none;cursor:pointer}.cx-r>summary::-webkit-details-marker{display:none}.cx-r>summary:hover{background:var(--bg)}
.cx-nom{display:flex;align-items:baseline;gap:.45rem;font-size:.88rem;min-width:0}
.cx-r>summary .cx-nom::before{content:"▸";color:var(--muted);font-size:.7rem}.cx-r[open]>summary .cx-nom::before{content:"▾"}
.cx-site .cx-nom{padding-left:2.2rem;font-size:.8rem;color:var(--muted)}
.cx-track{display:flex;gap:2px;height:14px;min-width:0}
.cx-s{display:block;height:100%;flex-grow:0;flex-shrink:0;min-width:2px}
.cx-s:first-child{border-radius:4px 0 0 4px}.cx-s:last-child{border-radius:0 4px 4px 0}.cx-s:only-child{border-radius:4px}
.cx-site .cx-track{height:9px}
.cx-s:hover,.cx-s:focus-visible{outline:2px solid var(--fg);outline-offset:1px}
.cx-val{font-size:.78rem;color:var(--muted);text-align:right;font-variant-numeric:tabular-nums}.cx-val small{font-size:.7rem}
.cx-unite{margin:0 0 1rem}
.cx-fig{margin:0 0 1.25rem;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.8rem 1rem}
.cx-fig figcaption{display:flex;flex-wrap:wrap;gap:.2rem .75rem;align-items:baseline;margin-bottom:.6rem}.cx-fig figcaption small{color:var(--muted);font-size:.78rem}
.cx-cols{display:flex;align-items:flex-end;gap:6px;height:190px;padding-top:1.2rem}
.cx-col{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:stretch;height:100%;position:relative;min-width:0;cursor:default}
.cx-col i{display:block;width:100%;min-height:2px}.cx-col i:first-of-type{border-radius:4px 4px 0 0}
.cx-col i+i{margin-top:2px}
.cx-col .cx-dbg+.cx-dev{border-radius:0}
.cx-v{font-size:.68rem;color:var(--muted);text-align:center;font-variant-numeric:tabular-nums;white-space:nowrap;margin-bottom:2px}
.cx-x{font-size:.7rem;color:var(--muted);text-align:center;margin-top:4px;line-height:1.1}.cx-x small{font-size:.62rem}
.cx-col:hover i,.cx-col:focus-visible i{filter:brightness(1.1)}.cx-col:focus-visible{outline:2px solid var(--fg);outline-offset:2px}
.cx-cols-20{gap:3px}.cx-cols-20 .cx-v{font-size:.6rem}
.cx-duo{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem}
@media (max-width:720px){.cx-l{grid-template-columns:1fr}.cx-val{text-align:left}.cx-cols-20 .cx-v{display:none}}`;

  const js = `<script>
(()=>{const q=(s,r=document)=>[...r.querySelectorAll(s)];
q('.cx-unite button').forEach(b=>b.addEventListener('click',()=>{q('.cx-unite button').forEach(x=>x.setAttribute('aria-selected',x===b));const site=b.dataset.unite==='site';q('.cx-v').forEach(v=>v.textContent=site?v.dataset.parSite:v.dataset.parResto)}));
})();
</script>`;
  return { css, html, js, resume: { totDev, totDbg, siteActuel } };
}
