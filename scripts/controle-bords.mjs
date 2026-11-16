#!/usr/bin/env node
// Contrôle automatique des bords (16/11/2026) : liste les éléments de contenu (texte, boutons, liens, cartes, images)
// dont la boîte touche le bord de l'écran à moins de 8 px ou le dépasse, y compris le débordement horizontal de la page.
// Ignore les fonds et photos plein cadre (bord à bord voulu). Les conteneurs à défilement horizontal (overflow-x auto/scroll,
// scroll-snap) sont parcourus arrêt par arrêt : l'élément aligné est testé ; le suivant, rogné par construction (aperçu),
// n'est pas une faute. Les pistes épinglées (overflow masqué + transformation) sont testées à leurs deux extrémités.
// Usage : node scripts/controle-bords.mjs <url> [--viewport 1440|390|LxH] [--out fichier.json] [--marge 8]
// Sortie : JSON {url, viewport, marge, debordementPage, violations[], defilements[], ok}. Code de sortie 0 (le JSON dit ok).
import fs from 'node:fs';
import { launch } from '../.claude/skills/awwwards/scripts/browser.mjs';

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:/.test(a));
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
if (!url) { console.error('usage : node scripts/controle-bords.mjs <url> [--viewport 1440|390] [--out f.json] [--marge 8]'); process.exit(1); }
const vp = opt('viewport', '390');
const [W, H] = vp.includes('x') ? vp.split('x').map(Number) : [Number(vp), Number(vp) >= 1000 ? 900 : 844];
const MARGE = Number(opt('marge', 8));
const out = opt('out', null);

// Exécuté dans la page. `cible` : null = balayage général ; sinon élément (aligné) à tester seul.
const SONDE = `(({ marge, W }) => {
  const sel = (el) => {
    const p = []; let e = el;
    while (e && e.nodeType === 1 && p.length < 4 && e !== document.body) {
      let s = e.tagName.toLowerCase();
      if (e.id) { s += '#' + e.id; p.unshift(s); break; }
      const c = [...e.classList].filter((x) => !/^is-|^astro-/.test(x)).slice(0, 2).join('.');
      if (c) s += '.' + c;
      p.unshift(s); e = e.parentElement;
    }
    return p.join(' > ');
  };
  const visible = (el, cs) => cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.05;
  const estScroller = (el) => {
    const cs = getComputedStyle(el);
    return (cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2;
  };
  const dansScroller = (el) => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) if (estScroller(a)) return a; return null; };
  const estEpingle = (el) => {
    const cs = getComputedStyle(el);
    return (cs.overflowX === 'hidden' || cs.overflowX === 'clip') && el.scrollWidth > el.clientWidth + 2 && el !== document.documentElement && el !== document.body && el.children.length === 1 && el.firstElementChild.children.length > 2 && el.firstElementChild.getBoundingClientRect().width > el.clientWidth * 1.3;
  };
  const dansEpingle = (el) => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) if (estEpingle(a)) return a; return null; };
  // rectangle visible après découpe par les ancêtres qui rognent
  const decoupe = (el, r) => {
    let { left, right, top, bottom } = r;
    for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        const b = a.getBoundingClientRect();
        if (cs.overflowX !== 'visible') { left = Math.max(left, b.left); right = Math.min(right, b.right); }
        if (cs.overflowY !== 'visible') { top = Math.max(top, b.top); bottom = Math.min(bottom, b.bottom); }
      }
    }
    return { left, right, top, bottom };
  };
  const rectTexte = (el) => {
    const rs = [];
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) { const g = document.createRange(); g.selectNodeContents(n); for (const r of g.getClientRects()) if (r.width > 0 && r.height > 0) rs.push(r); }
    if (!rs.length) return null;
    return { left: Math.min(...rs.map((r) => r.left)), right: Math.max(...rs.map((r) => r.right)), top: Math.min(...rs.map((r) => r.top)), bottom: Math.max(...rs.map((r) => r.bottom)) };
  };
  const type = (el, cs) => {
    const t = el.tagName;
    if (t === 'IMG' || t === 'VIDEO' || t === 'PICTURE' || t === 'CANVAS') return 'image';
    if (t === 'A') return 'lien';
    if (t === 'BUTTON' || t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA' || el.getAttribute('role') === 'button') return 'bouton';
    if (rectTexte(el)) return 'texte';
    const bg = cs.backgroundColor; const aBg = bg && !/rgba\\(0, 0, 0, 0\\)|transparent/.test(bg);
    const aBord = ['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none');
    if ((aBg || aBord || (cs.boxShadow && cs.boxShadow !== 'none')) && el.children.length) return 'carte';
    return null;
  };
  const mesure = (el) => {
    if (el === document.body || el === document.documentElement || el.closest('script,style,noscript,template,svg')) return null;
    const cs = getComputedStyle(el);
    if (!visible(el, cs)) return null;
    for (let a = el.parentElement; a; a = a.parentElement) { const c = getComputedStyle(a); if (c.display === 'none' || c.visibility === 'hidden' || parseFloat(c.opacity) < 0.05) return null; }
    const k = type(el, cs); if (!k) return null;
    let r = el.getBoundingClientRect();
    if (k === 'texte') r = rectTexte(el);
    if (!r || r.width < 1 || r.height < 1) return null;
    const rd = decoupe(el, r);
    if (rd.right - rd.left < 1 || rd.bottom - rd.top < 1) return null;
    if (rd.bottom <= 0 || rd.top >= innerHeight) return null; // hors écran verticalement
    if (k === 'image') {
      if (r.width >= W - 2 && r.left <= 1) return null; // plein cadre voulu
      const p = el.parentElement, pr = p && p.getBoundingClientRect();
      if (pr && r.width >= pr.width - 2 && (r.left <= pr.left + 1) && (pr.width >= W - 2)) return null; // remplit un cadre plein cadre
      if (cs.position === 'absolute' || cs.position === 'fixed') { if (r.width >= W * 0.9) return null; }
      if (r.width * r.height < 24 * 24) return null; // puce, icône
    }
    if (k === 'carte' || k === 'lien' || k === 'bouton') { if (r.width >= W - 2 && r.left <= 1) return null; if (r.width < 8) return null; }
    if (k === 'lien' && el.querySelector('img')) { /* lien-image : testé comme lien */ }
    return { k, rd, r };
  };
  const evalue = (el, ctx) => {
    const m = mesure(el); if (!m) return null;
    const { rd, k } = m;
    const gauche = rd.left, droite = W - rd.right;
    const d = Math.min(gauche, droite);
    if (d >= marge) return null;
    // un élément entièrement hors de la fenêtre n'est pas visible
    if (rd.right <= 0 || rd.left >= W) return null;
    return { type: k, selecteur: sel(el), texte: (el.innerText || el.alt || el.getAttribute('aria-label') || '').trim().replace(/\\s+/g, ' ').slice(0, 60),
      bord: gauche < droite ? 'gauche' : 'droit', distance: Math.round(d * 10) / 10, gauche: Math.round(gauche), droite: Math.round(droite),
      etat: d < 0 ? 'deborde' : 'colle', y: Math.round(rd.top + scrollY), contexte: ctx || undefined };
  };
  return { sel, estScroller, dansScroller, estEpingle, dansEpingle, evalue, mesure };
})`;

const browser = await launch();
const resultat = { url, viewport: `${W}x${H}`, marge: MARGE, debordementPage: null, violations: [], defilements: [], ok: true };
try {
  const mobile = W < 800;
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(1800);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  // premier passage : déclenche les apparitions au scroll
  for (let y = 0; y < total; y += H) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
  await page.evaluate(`window.__bords = ${SONDE}({ marge: ${MARGE}, W: ${W} })`);

  // 1. débordement horizontal de la page
  resultat.debordementPage = await page.evaluate(({ W }) => {
    const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const fautifs = [];
    if (sw > W + 1) {
      const B = window.__bords;
      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect(); if (r.right <= W + 1 || r.width < 1) continue;
        if (B.dansScroller(el) || B.dansEpingle(el)) continue;
        let clip = false; for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.overflowX !== 'visible' && a.getBoundingClientRect().right <= W + 1) { clip = true; break; } }
        if (clip) continue;
        const cs = getComputedStyle(el); if (cs.position === 'fixed' || cs.visibility === 'hidden' || cs.display === 'none') continue;
        fautifs.push({ selecteur: B.sel(el), droite: Math.round(r.right), exces: Math.round(r.right - W) });
        if (fautifs.length >= 8) break;
      }
    }
    return { scrollWidth: sw, largeur: W, deborde: sw > W + 1, fautifs };
  }, { W });
  if (resultat.debordementPage.deborde) { resultat.ok = false; }

  const vus = new Set();
  const ajoute = (v, ctx) => { const c = `${v.selecteur}|${v.texte}|${v.bord}|${ctx || ''}`; if (vus.has(c)) return; vus.add(c); resultat.violations.push(v); };

  // 2. balayage vertical (demi-écran), éléments hors défilement horizontal
  const pas = Math.round(H * 0.5);
  for (let y = 0; y < total; y += pas) {
    await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(160);
    const lot = await page.evaluate(() => {
      const B = window.__bords, res = [];
      for (const el of document.body.querySelectorAll('*')) {
        if (B.dansScroller(el) || B.dansEpingle(el) || B.estScroller(el) || B.estEpingle(el)) continue;
        const v = B.evalue(el); if (v) res.push(v);
      }
      return res;
    });
    for (const v of lot) ajoute(v);
  }

  // 3. conteneurs à défilement horizontal : un arrêt par enfant direct de la bande, élément aligné testé
  await page.evaluate(() => window.scrollTo(0, 0));
  const scrollers = await page.evaluate(() => {
    const B = window.__bords, res = [];
    document.body.querySelectorAll('*').forEach((el, i) => {
      if (B.estScroller(el) || B.estEpingle(el)) {
        el.setAttribute('data-bords-id', String(i));
        const cs = getComputedStyle(el);
        res.push({ id: String(i), sel: B.sel(el), epingle: B.estEpingle(el), snap: cs.scrollSnapType, padG: cs.paddingLeft, padD: cs.paddingRight, scrollPadG: cs.scrollPaddingLeft, scrollPadD: cs.scrollPaddingRight });
      }
    });
    return res;
  });
  for (const s of scrollers) {
    const info = { selecteur: s.sel, epingle: s.epingle, snap: s.snap, paddingG: s.padG, paddingD: s.padD, scrollPaddingG: s.scrollPadG, scrollPaddingD: s.scrollPadD, arrets: 0, fautes: 0 };
    const centrer = (id) => page.evaluate((id) => { const el = document.querySelector(`[data-bords-id="${id}"]`); const r = el.getBoundingClientRect(); window.scrollTo(0, Math.max(0, scrollY + r.top - Math.max(0, (innerHeight - r.height) / 2))); }, id);
    await centrer(s.id); await page.waitForTimeout(300);
    if (!s.epingle) {
      const n = await page.evaluate((id) => { const el = document.querySelector(`[data-bords-id="${id}"]`); const piste = el.firstElementChild && el.firstElementChild.children.length > 1 && getComputedStyle(el.firstElementChild).display !== 'block' ? el.firstElementChild : el; el.__items = [...piste.children].filter((c) => c.getBoundingClientRect().width > 0); return el.__items.length; }, s.id);
      for (let i = 0; i < n; i++) {
        const faute = await page.evaluate(async ({ id, i }) => {
          const el = document.querySelector(`[data-bords-id="${id}"]`), it = el.__items[i], B = window.__bords;
          // alignement : celui du snap si défini, sinon début
          const cs = getComputedStyle(it); const al = (cs.scrollSnapAlign || 'start').split(' ')[0];
          const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
          const r0 = it.getBoundingClientRect(), c0 = el.getBoundingClientRect();
          const ancre = al === 'center' ? (c0.width - r0.width) / 2 : al === 'end' ? c0.width - r0.width - (parseFloat(getComputedStyle(el).scrollPaddingRight) || 0) : pad;
          const cible = el.scrollLeft + (r0.left - c0.left) - ancre;
          el.style.scrollSnapType = 'none'; el.style.scrollBehavior = 'auto';
          el.scrollLeft = Math.max(0, Math.min(cible, el.scrollWidth - el.clientWidth));
          await new Promise((r) => setTimeout(r, 120));
          const res = [];
          const tester = (e) => { const v = B.evalue(e, 'arrêt ' + (i + 1)); if (v) res.push(v); };
          // l'élément aligné et ses descendants de contenu (le suivant rogné est un aperçu voulu)
          const r1 = it.getBoundingClientRect();
          const desc = [it, ...it.querySelectorAll('*')];
          for (const e of desc) { const er = e.getBoundingClientRect(); if (er.left >= -1 && er.right <= innerWidth + 1) tester(e); else if (er.left < 0 || er.right > innerWidth) { if (er.left < 0 && er.right > 0) tester(e); } }
          el.style.scrollSnapType = ''; el.style.scrollBehavior = '';
          return { res, aligne: Math.round(r1.left), droite: Math.round(innerWidth - r1.right) };
        }, { id: s.id, i });
        info.arrets++;
        for (const v of faute.res) { ajoute(v, `arrêt ${i + 1}`); info.fautes++; }
      }
      await page.evaluate((id) => { const el = document.querySelector(`[data-bords-id="${id}"]`); el.scrollLeft = 0; }, s.id);
    } else {
      // piste épinglée : début et fin de la section, premier et dernier élément de la bande
      const ext = await page.evaluate(async (id) => {
        const el = document.querySelector(`[data-bords-id="${id}"]`);
        const sec = el.closest('section') || el.parentElement;
        const bande = el.firstElementChild; const items = [...bande.children];
        const pos = (ancre) => new Promise((ok) => { window.scrollTo(0, ancre); setTimeout(ok, 500); });
        const hautSec = sec.getBoundingClientRect().top + scrollY, bas = hautSec + sec.offsetHeight - innerHeight;
        await pos(hautSec + 2);
        const p = items[0].getBoundingClientRect();
        await pos(Math.max(hautSec + 2, bas - 2));
        const d = items[items.length - 1].getBoundingClientRect();
        return { premierGauche: Math.round(p.left), dernierDroite: Math.round(innerWidth - d.right) };
      }, s.id);
      info.extremites = ext; info.arrets = 2;
      for (const [nom, d, bord] of [['premier', ext.premierGauche, 'gauche'], ['dernier', ext.dernierDroite, 'droit']]) {
        if (d < MARGE) { ajoute({ type: 'piste', selecteur: s.sel, texte: `${nom} élément de la piste épinglée`, bord, distance: d, etat: d < 0 ? 'deborde' : 'colle', contexte: 'piste épinglée' }, 'epingle-' + nom); info.fautes++; }
      }
    }
    resultat.defilements.push(info);
  }
  resultat.ok = resultat.violations.length === 0 && !(resultat.debordementPage && resultat.debordementPage.deborde);
  await page.close();
} finally { await browser.close(); }
const json = JSON.stringify(resultat, null, 2);
if (out) { fs.mkdirSync(out.replace(/[^/]*$/, '') || '.', { recursive: true }); fs.writeFileSync(out, json); }
console.log(json);
