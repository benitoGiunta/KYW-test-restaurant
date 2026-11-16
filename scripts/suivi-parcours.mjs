// Onglet « Parcours » de la page de suivi : ce qui a été fait sur chaque restaurant et chaque site,
// en deux temps (développement, puis débogage = identification + correction), vue condensée ou détaillée.
// Sources : data/usage/chantiers/chantiers.json (coûts de développement par site), sites/<slug>-<v>/ (revues,
// révisions, CORRECTION-1.md), data/review/<slug>/ (problèmes, brouillons), data/usage/correction-phase1.json
// et data/usage/phase2.json (coûts de débogage par site).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const VARS = ['portfolio', 'awwwards', 'legacy'];
const NOM_V = { portfolio: 'Portfolio', awwwards: 'Awwwards', legacy: 'Inspi legacy' };
const CATS = ['brouillon', 'contenu', 'langue', 'disposition', 'lisibilite', 'animation', 'fonctionnel'];
const NOM_CAT = { brouillon: 'Brouillon', contenu: 'Contenu', langue: 'Langue', disposition: 'Disposition', lisibilite: 'Lisibilité', animation: 'Animation', fonctionnel: 'Fonctionnel' };
const GRAV = { bloquant: '●', important: '▲', mineur: '○' };
// Séries de coût, ordre catégoriel fixe (palette validée : light et dark).
const SERIES = [
  { k: 'construction', nom: 'Construction' },
  { k: 'qa', nom: 'Revue et révision' },
  { k: 'identifier', nom: 'Identification' },
  { k: 'rectifier', nom: 'Correction' },
];

export function parcours({ R, restos, esc, URL_PROD }) {
  const ex = (p) => existsSync(join(R, p));
  const lire = (p) => JSON.parse(readFileSync(join(R, p), 'utf8'));
  const eur = (x) => (x == null ? '–' : `${x.toFixed(2).replace('.', ',')} $`);
  const chantiers = ex('data/usage/chantiers/chantiers.json') ? lire('data/usage/chantiers/chantiers.json') : [];
  const p1 = ex('data/usage/correction-phase1.json') ? lire('data/usage/correction-phase1.json') : null;
  const p2 = ex('data/usage/phase2.json') ? lire('data/usage/phase2.json').suivi : null;
  const coutDebug = {};
  for (const s of p1?.agrege?.par_site || []) coutDebug[`${s.resto}|${s.variante}`] = { phase: 1, identifier: s.identifier, rectifier: s.rectifier };
  for (const [k, s] of Object.entries(p2?.par_site || {})) coutDebug[k] = { phase: 2, identifier: s.identifier, rectifier: s.rectifier };
  const config2 = p2?.par_restaurant || {};

  const compte = (dir, re) => (ex(dir) ? readdirSync(join(R, dir)).filter((f) => re.test(f)).length : 0);
  const decisions = (fichier) => {
    const d = { corrige: 0, refuse: 0, impossible: 0 };
    if (!ex(fichier)) return null;
    for (const l of readFileSync(join(R, fichier), 'utf8').split('\n')) {
      const c = l.split('|').map((x) => x.trim()).filter((x, i, a) => !(x === '' && (i === 0 || i === a.length - 1)));
      if (c.length < 4) continue;
      const v = c[2].toLowerCase();
      if (/^corrig/.test(v)) d.corrige++; else if (/^refus/.test(v)) d.refuse++; else if (/^impossib/.test(v)) d.impossible++;
    }
    return d;
  };
  const libelles = (fichier, cle) => { try { const x = lire(fichier)[cle]; return x ? Object.keys(x).length : 0; } catch { return null; } };

  const data = restos.map((r) => {
    const ch = chantiers.filter((c) => c.ordre === r.rang);
    const commun = ch.find((c) => /commun$/.test(c.chantier));
    const sites = VARS.map((v) => {
      const c = ch.find((x) => x.chantier.endsWith(`· ${v}`)) || {};
      const dir = `sites/${r.slug}-${v}`;
      const rev = ex(`data/review/${r.slug}/${v}.json`) ? lire(`data/review/${r.slug}/${v}.json`) : null;
      const probs = rev?.problemes || [];
      const parCat = {}; for (const p of probs) (parCat[p.categorie] ||= []).push(p);
      const dec = rev ? decisions(`${dir}/CORRECTION-1.md`) : null;
      const cd = coutDebug[`${r.slug}|${v}`] || null;
      const avant = rev ? (libelles(`data/review/${r.slug}/brouillon.json`, `${r.slug}/${v}`) ?? (parCat.brouillon || []).length) : null;
      const apres = rev ? libelles(`data/review/${r.slug}/brouillon-apres.json`, `${r.slug}/${v}`) : null;
      return {
        v, url: `${URL_PROD}/${r.slug}/${v}/`,
        dev: { construction: c.t_construction || 0, revue: c.t_revue || 0, revision: c.t_revision || 0, captures: c.t_captures || 0, publication: c.t_publication || 0, total: c.cout || 0, appels: c.appels || 0, revues: compte(dir, /^REVUE-\d+\.md$/), revisions: compte(dir, /^REVISION-\d+\.md$/) },
        debug: rev ? { traites: dec && (dec.corrige + dec.refuse + dec.impossible) ? dec.corrige + dec.refuse + dec.impossible : probs.length, phase: cd?.phase ?? (r.rang <= 4 ? 1 : 2), problemes: probs, parCat, dec, identifier: cd?.identifier ?? null, rectifier: cd?.rectifier ?? null, avant, apres } : null,
      };
    });
    const somme = (f) => sites.reduce((a, s) => a + (f(s) || 0), 0);
    const debugues = sites.filter((s) => s.debug).length;
    return {
      ...r, sites, commun: commun ? { recherche: commun.t_recherche || 0, orchestration: commun.t_orchestration || 0, lecons: commun.t_lecons || 0, total: commun.cout || 0 } : null,
      config: config2[r.slug]?.config || (debugues && r.rang <= 4 ? 'phase 1' : null),
      seg: {
        construction: somme((s) => s.dev.construction),
        qa: somme((s) => s.dev.revue + s.dev.revision + s.dev.captures),
        identifier: somme((s) => s.debug?.identifier),
        rectifier: somme((s) => s.debug?.rectifier),
      },
      debugues, trouves: somme((s) => s.debug?.traites), corriges: somme((s) => s.debug?.dec?.corrige),
    };
  });

  // Agrégats
  const all = data.flatMap((r) => r.sites);
  const devTotal = all.reduce((a, s) => a + s.dev.total, 0) + data.reduce((a, r) => a + (r.commun?.total || 0), 0);
  const dbg = all.filter((s) => s.debug);
  const dbgTotal = dbg.reduce((a, s) => a + (s.debug.identifier || 0) + (s.debug.rectifier || 0), 0);
  const trouves = dbg.reduce((a, s) => a + s.debug.traites, 0);
  const corriges = dbg.reduce((a, s) => a + (s.debug.dec?.corrige || 0), 0);
  const brouillons = dbg.reduce((a, s) => a + (s.debug.avant || 0), 0);
  const brouillonsRestants = dbg.reduce((a, s) => a + (s.debug.apres || 0), 0);
  const revues = all.reduce((a, s) => a + s.dev.revues, 0), revisions = all.reduce((a, s) => a + s.dev.revisions, 0);
  const max = Math.max(...data.map((r) => SERIES.reduce((a, x) => a + r.seg[x.k], 0)), 0.01);

  const barre = (r) => {
    const tot = SERIES.reduce((a, x) => a + r.seg[x.k], 0);
    const segs = SERIES.filter((x) => r.seg[x.k] > 0).map((x) => `<i class="pc-s pc-${x.k}" style="flex-basis:${(r.seg[x.k] / max) * 100}%" data-tip="${esc(`${r.nom} · ${x.nom} : ${eur(r.seg[x.k])}`)}" tabindex="0"></i>`).join('');
    return `<div class="pc-bar" role="img" aria-label="${esc(`${r.nom} : ${SERIES.map((x) => `${x.nom} ${eur(r.seg[x.k])}`).join(', ')}`)}"><span class="pc-track">${segs}</span><span class="pc-tot">${eur(tot)}</span></div>`;
  };
  const etat3 = (r) => `<span class="pc-3">${r.sites.map((s) => `<b class="${s.debug ? 'ok' : ''}" title="${esc(`${NOM_V[s.v]} : ${s.debug ? 'débogué' : 'développé, pas encore débogué'}`)}">${s.v[0].toUpperCase()}</b>`).join('')}</span>`;

  const condense = `
<div class="pc-legende" aria-hidden="true">${SERIES.map((x) => `<span><i class="pc-${x.k}"></i>${x.nom}</span>`).join('')}<span class="pc-sep">P · A · L = Portfolio, Awwwards, Inspi legacy ; vert = débogué</span></div>
<div class="pc-lignes">${data.map((r) => `<div class="pc-ligne"><div class="pc-nom"><span class="pc-rang">${r.rang}</span><b>${esc(r.nom)}</b>${r.config ? `<em>${esc(r.config === 'F' || r.config === 'H' ? `débug phase 2 · ${r.config}` : `débug ${r.config}`)}</em>` : ''}</div>${barre(r)}<div class="pc-res">${etat3(r)}${r.debugues ? `<span>${r.corriges} corrigés sur ${r.trouves}</span>` : '<span class="pc-muted">débug à venir</span>'}</div></div>`).join('')}</div>`;

  const chipsCat = (s) => (!s.debug.parCat.brouillon && s.debug.avant ? `<span class="pc-chip" title="Libellés relevés par le scan des brouillons">Brouillon <b>${s.debug.avant}</b><i class="pc-g0">●</i></span>` : '') + CATS.filter((c) => s.debug.parCat[c]).map((c) => {
    const ps = s.debug.parCat[c];
    const g = ['bloquant', 'important', 'mineur'].map((x) => ps.filter((p) => p.gravite === x).length);
    return `<span class="pc-chip" title="${esc(ps.map((p) => `${GRAV[p.gravite] || '·'} ${p.titre}`).join('\n'))}">${NOM_CAT[c]} <b>${ps.length}</b>${g.map((n, i) => (n ? `<i class="pc-g${i}">${['●', '▲', '○'][i]}${n}</i>` : '')).join('')}</span>`;
  }).join('');
  const decBar = (d) => {
    if (!d) return '<span class="pc-muted">compte rendu de correction absent</span>';
    const t = Math.max(1, d.corrige + d.refuse + d.impossible);
    return `<div class="pc-dec" role="img" aria-label="${d.corrige} corrigés, ${d.refuse} refusés, ${d.impossible} impossibles">${d.corrige ? `<i class="d-ok" style="flex-basis:${(d.corrige / t) * 100}%"></i>` : ''}${d.refuse ? `<i class="d-ref" style="flex-basis:${(d.refuse / t) * 100}%"></i>` : ''}${d.impossible ? `<i class="d-imp" style="flex-basis:${(d.impossible / t) * 100}%"></i>` : ''}</div><small>${d.corrige} corrigés${d.refuse ? ` · ${d.refuse} refusés (justifiés)` : ''}${d.impossible ? ` · ${d.impossible} impossible${d.impossible > 1 ? 's' : ''}` : ''}</small>`;
  };
  const carteSite = (s) => `<div class="pc-site"><h4>${NOM_V[s.v]} <a href="${s.url}" title="Ouvrir le site">↗</a></h4>
<div class="pc-lane"><span class="pc-lt">Développement</span><ol class="pc-steps">
<li class="pc-construction"><b>Construction</b><span>${eur(s.dev.construction)}</span></li>
<li class="pc-qa"><b>Revue${s.dev.revues > 1 ? ` ×${s.dev.revues}` : ''}</b><span>${eur(s.dev.revue + s.dev.captures)}</span></li>
<li class="pc-qa"><b>Révision${s.dev.revisions > 1 ? ` ×${s.dev.revisions}` : ''}</b><span>${eur(s.dev.revision)}</span></li>
<li class="pc-pub"><b>Publié</b><span>en ligne</span></li></ol></div>
<div class="pc-lane"><span class="pc-lt">Débogage${s.debug ? ` · phase ${s.debug.phase}` : ''}</span>${s.debug ? `<ol class="pc-steps">
<li class="pc-identifier"><b>Identification</b><span>${s.debug.traites} point${s.debug.traites > 1 ? 's' : ''} · ${eur(s.debug.identifier)}</span></li>
<li class="pc-rectifier"><b>Correction</b><span>${eur(s.debug.rectifier)}</span></li></ol>
<div class="pc-chips">${chipsCat(s) || '<span class="pc-muted">aucun problème relevé</span>'}</div>
${s.debug.traites ? decBar(s.debug.dec) : ''}
${s.debug.avant != null ? `<small class="pc-br">Libellés de brouillon : ${s.debug.avant} → ${s.debug.apres ?? '?'}</small>` : ''}` : '<p class="pc-muted pc-todo">Pas encore débogué</p>'}</div></div>`;
  const detaille = `<p class="pc-legende"><span><i class="pc-g0b">●</i>bloquant</span><span><i class="pc-g1b">▲</i>important</span><span><i class="pc-g2b">○</i>mineur</span><span><i class="d-ok"></i>corrigé</span><span><i class="d-ref"></i>refusé (justifié)</span><span><i class="d-imp"></i>impossible</span><span class="pc-sep">Survole une catégorie pour lire les problèmes.</span></p>
<div class="pc-restos">${data.map((r, i) => `<details class="pc-resto"${i === 0 ? ' open' : ''}><summary><span class="pc-rang">${r.rang}</span><b>${esc(r.nom)}</b>${etat3(r)}<span class="pc-sum">dev ${eur(r.seg.construction + r.seg.qa)}${r.debugues ? ` · débug ${eur(r.seg.identifier + r.seg.rectifier)} · ${r.corriges} corrigés sur ${r.trouves} traités` : ''}</span></summary>
${r.commun ? `<p class="pc-commun">Commun au restaurant : recherche client ${eur(r.commun.recherche)} · orchestration ${eur(r.commun.orchestration)}${r.commun.lecons ? ` · leçons ${eur(r.commun.lecons)}` : ''}</p>` : ''}
<div class="pc-sites">${r.sites.map(carteSite).join('')}</div></details>`).join('')}</div>`;

  const flux = `<div class="pc-flux" aria-label="Étapes du parcours d'un site">
<div class="pc-phase"><span class="pc-lt">Développement</span><div class="pc-noeuds">
<div class="pc-n pc-construction"><b>Construction</b><small>${all.length} sites</small></div><span class="pc-fl">→</span>
<div class="pc-n pc-qa"><b>Revue</b><small>${revues} revues</small></div><span class="pc-fl">→</span>
<div class="pc-n pc-qa"><b>Révision</b><small>${revisions} révisions</small></div><span class="pc-fl">→</span>
<div class="pc-n pc-pub"><b>Publication</b><small>${all.length} en ligne</small></div></div></div>
<div class="pc-phase"><span class="pc-lt">Débogage</span><div class="pc-noeuds">
<div class="pc-n pc-identifier"><b>Identification</b><small>${dbg.length} sites · ${trouves} points</small></div><span class="pc-fl">→</span>
<div class="pc-n pc-rectifier"><b>Correction</b><small>${corriges} corrigés · ${brouillons} libellés retirés</small></div><span class="pc-fl">→</span>
<div class="pc-n pc-pub"><b>Republication</b><small>${brouillonsRestants} libellé restant</small></div></div></div></div>`;

  const html = `
<div class="synthese">
<div class="tuile"><b>${all.length} / ${all.length}</b><span>sites développés et publiés (${eur(devTotal)})</span></div>
<div class="tuile"><b>${dbg.length} / ${all.length}</b><span>sites débogués (${eur(dbgTotal)})</span></div>
<div class="tuile"><b>${corriges} / ${trouves}</b><span>points corrigés sur traités (problèmes et libellés de brouillon)</span></div>
<div class="tuile"><b>${brouillons} → ${brouillonsRestants}</b><span>libellés de brouillon avant → après</span></div>
</div>
${flux}
<div class="pc-bascule" role="tablist" aria-label="Niveau de détail"><button role="tab" aria-selected="true" data-vue="condense">Condensé</button><button role="tab" aria-selected="false" data-vue="detaille">Détaillé par site</button></div>
<section id="pc-condense"><h2>Coût par restaurant et état du débogage</h2>${condense}</section>
<section id="pc-detaille" hidden><h2>Détail par restaurant et par site</h2>${detaille}</section>
<div class="pc-tip" role="tooltip" hidden></div>
<p class="pc-note">Coûts au tarif de l'API. Développement : construction, revues, révisions, captures et publication de chaque site (la recherche client et l'orchestration communes au restaurant sont indiquées dans la vue détaillée). Débogage : phase 1 pour les restaurants 1 à 4, phase 2 (configurations F et H) pour les restaurants 5 à 8.</p>`;

  const css = `
.onglets{display:flex;gap:.25rem;border-bottom:1px solid var(--line);margin:0 0 1.5rem;overflow-x:auto}
.onglets button,.pc-bascule button{font:inherit;color:var(--muted);background:none;border:0;padding:.6rem .9rem;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap}
.onglets button[aria-selected=true]{color:var(--fg);border-bottom-color:var(--accent);font-weight:600}
.pc-bascule{display:inline-flex;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:3px;margin:1.5rem 0 0}
.pc-bascule button{border:0;border-radius:999px;padding:.35rem .9rem}
.pc-bascule button[aria-selected=true]{background:var(--fg);color:var(--bg)}
:root{--s1:#2a78d6;--s2:#eb6834;--s3:#1baf7a;--s4:#eda100;--g0:#d03b3b;--g1:#ec835a;--g2:#b8860b;--d-ok:#2F7D5B;--d-ref:#9AA7AC;--d-imp:#d03b3b}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--g2:#fab219;--d-ok:#7FD1A8}}
:root[data-theme="dark"]{--s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--g2:#fab219;--d-ok:#7FD1A8}
.pc-construction{--c:var(--s1)}.pc-qa{--c:var(--s2)}.pc-identifier{--c:var(--s3)}.pc-rectifier{--c:var(--s4)}.pc-pub{--c:var(--muted)}
.pc-flux{display:grid;gap:.75rem;margin:1rem 0}
.pc-phase{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.8rem 1rem;min-width:0}
.pc-lt{display:block;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:.5rem}
.pc-noeuds{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem}
.pc-n{border-top:4px solid var(--c);background:var(--bg);border-radius:6px;padding:.45rem .7rem;min-width:8.5rem;flex:1}
.pc-n b{display:block;font-size:.9rem}.pc-n small{color:var(--muted);font-size:.78rem}
.pc-fl{color:var(--muted)}
.pc-legende{display:flex;flex-wrap:wrap;gap:.4rem 1rem;color:var(--muted);font-size:.8rem;margin:.25rem 0 .75rem}
.pc-legende i{display:inline-block;width:.8em;height:.8em;border-radius:3px;margin-right:.35em;vertical-align:-1px;background:var(--c);font-style:normal}
.pc-legende .pc-construction,.pc-legende i.pc-construction{background:var(--s1)}.pc-legende i.pc-qa{background:var(--s2)}.pc-legende i.pc-identifier{background:var(--s3)}.pc-legende i.pc-rectifier{background:var(--s4)}
.pc-legende i[class^=pc-g]{background:none;width:auto;height:auto}.pc-g0b{color:var(--g0)}.pc-g1b{color:var(--g1)}.pc-g2b{color:var(--g2)}
.pc-legende i.d-ok{background:var(--d-ok)}.pc-legende i.d-ref{background:var(--d-ref)}.pc-legende i.d-imp{background:var(--d-imp)}
.pc-sep{flex-basis:100%}
.pc-lignes{display:grid;gap:2px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.4rem .8rem}
.pc-ligne{display:grid;grid-template-columns:minmax(11rem,15rem) 1fr minmax(9rem,13rem);gap:.75rem;align-items:center;padding:.4rem 0;border-top:1px solid var(--line)}
.pc-ligne:first-child{border-top:0}
.pc-nom{min-width:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:.15rem .45rem}.pc-nom b{font-size:.9rem}.pc-nom em{font-style:normal;font-size:.72rem;color:var(--muted);flex-basis:100%;padding-left:1.7rem}
.pc-rang{font-family:var(--mono);font-size:.75rem;color:var(--muted);width:1.3rem;text-align:right;display:inline-block}
.pc-bar{display:flex;align-items:center;height:14px;min-width:0}.pc-track{flex:1;display:flex;gap:2px;height:100%;min-width:0}
.pc-s{display:block;height:100%;background:var(--c);flex-grow:0;flex-shrink:0;min-width:2px}
.pc-s:first-child{border-radius:4px 0 0 4px}.pc-s:last-of-type{border-radius:0 4px 4px 0}.pc-s:only-of-type{border-radius:4px}
.pc-s.pc-construction{--c:var(--s1)}.pc-s.pc-qa{--c:var(--s2)}.pc-s.pc-identifier{--c:var(--s3)}.pc-s.pc-rectifier{--c:var(--s4)}
.pc-s:hover,.pc-s:focus-visible{outline:2px solid var(--fg);outline-offset:1px}
.pc-tot{font-size:.78rem;color:var(--muted);font-variant-numeric:tabular-nums;margin-left:.5rem;white-space:nowrap;width:4.2rem;text-align:right;flex-shrink:0}
.pc-res{display:flex;align-items:center;gap:.5rem;font-size:.8rem;min-width:0}
.pc-3{display:inline-flex;gap:2px;flex-shrink:0}.pc-3 b{width:1.35rem;height:1.35rem;display:grid;place-items:center;border-radius:4px;font-size:.68rem;background:var(--todo);color:var(--muted)}
.pc-3 b.ok{background:var(--ok-soft);color:var(--ok)}
.pc-muted{color:var(--muted)}
.pc-restos{display:grid;gap:.6rem}
.pc-resto{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.2rem .9rem}
.pc-resto summary{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem .6rem;padding:.6rem 0;cursor:pointer}
.pc-sum{color:var(--muted);font-size:.8rem;margin-left:auto}
.pc-commun{font-size:.8rem;color:var(--muted);margin:0 0 .6rem}
.pc-sites{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:.6rem;padding-bottom:.9rem}
.pc-site{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:.7rem .8rem;min-width:0}
.pc-site h4{margin:0 0 .5rem;font-size:.95rem;display:flex;justify-content:space-between}.pc-site h4 a{color:var(--accent);text-decoration:none}
.pc-lane{margin-top:.6rem}
.pc-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(5.5rem,1fr));gap:.3rem}
.pc-steps li{border-left:3px solid var(--c);padding:.15rem .45rem;background:var(--card);border-radius:0 5px 5px 0;min-width:0}
.pc-steps b{display:block;font-size:.78rem}.pc-steps span{font-size:.74rem;color:var(--muted);font-variant-numeric:tabular-nums}
.pc-chips{display:flex;flex-wrap:wrap;gap:.3rem;margin:.5rem 0 .4rem}
.pc-chip{font-size:.74rem;border:1px solid var(--line);border-radius:999px;padding:.08rem .5rem;background:var(--card);cursor:help}
.pc-chip i{font-style:normal;margin-left:.3rem}.pc-g0{color:var(--g0)}.pc-g1{color:var(--g1)}.pc-g2{color:var(--g2)}
.pc-dec{display:flex;gap:2px;height:8px;margin:.3rem 0 .2rem}.pc-dec i{display:block;height:100%}
.pc-dec i:first-child{border-radius:4px 0 0 4px}.pc-dec i:last-child{border-radius:0 4px 4px 0}.pc-dec i:only-child{border-radius:4px}
.d-ok{background:var(--d-ok)}.d-ref{background:var(--d-ref)}.d-imp{background:var(--d-imp)}
.pc-site small{display:block;font-size:.74rem;color:var(--muted)}
.pc-todo{font-size:.8rem;margin:.2rem 0 0}
.pc-tip{position:fixed;z-index:10;pointer-events:none;background:var(--fg);color:var(--bg);font-size:.78rem;padding:.3rem .55rem;border-radius:6px;max-width:16rem}
.pc-note{color:var(--muted);font-size:.78rem;margin-top:1.25rem}
@media (max-width:720px){.pc-ligne{grid-template-columns:1fr}.pc-nom em{padding-left:1.7rem}.pc-sum{margin-left:0;flex-basis:100%}}`;

  const js = `<script>
(()=>{const q=(s,r=document)=>[...r.querySelectorAll(s)];
const onglet=(id)=>{q('.onglets button').forEach(b=>b.setAttribute('aria-selected',b.dataset.onglet===id));q('[data-panneau]').forEach(p=>p.hidden=p.dataset.panneau!==id);try{localStorage.setItem('suivi-onglet',id)}catch(e){}};
q('.onglets button').forEach(b=>b.addEventListener('click',()=>onglet(b.dataset.onglet)));
try{const m=localStorage.getItem('suivi-onglet');if(m&&document.querySelector('[data-panneau="'+m+'"]'))onglet(m)}catch(e){}
q('.pc-bascule button').forEach(b=>b.addEventListener('click',()=>{q('.pc-bascule button').forEach(x=>x.setAttribute('aria-selected',x===b));document.getElementById('pc-condense').hidden=b.dataset.vue!=='condense';document.getElementById('pc-detaille').hidden=b.dataset.vue!=='detaille'}));
const t=document.querySelector('.pc-tip');const show=(e,el)=>{t.textContent=el.dataset.tip;t.hidden=false;const r=el.getBoundingClientRect();t.style.left=Math.min(innerWidth-t.offsetWidth-8,Math.max(8,(e&&e.clientX?e.clientX:r.left+r.width/2)-t.offsetWidth/2))+'px';t.style.top=(r.top-t.offsetHeight-8)+'px'};
q('[data-tip]').forEach(el=>{el.addEventListener('mousemove',e=>show(e,el));el.addEventListener('focus',()=>show(null,el));el.addEventListener('mouseleave',()=>t.hidden=true);el.addEventListener('blur',()=>t.hidden=true)});
})();
</script>`;
  return { css, html, js, resume: { sites: all.length, debugues: dbg.length, trouves, corriges } };
}
