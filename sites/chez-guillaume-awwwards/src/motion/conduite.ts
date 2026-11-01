// Module pilote « La conduite » (patterns.md § 1). Une variable : le top actif, piloté par le défilement.
// Elle est distribuée à tout ce qui porte le concept : le time-code de chaque régie (les chiffres roulent depuis
// le top précédent, y compris d'une page à l'autre), la pastille rouge « top » qui se pose, la barre de régie du
// téléphone. Entrée de repos (startIdle) : la poursuite du hero dérive et suit le pointeur, l'horloge de
// l'en-tête bat la seconde à l'heure de Bruxelles. Une seule horloge : gsap.ticker. Code DOM dans onPage().
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, isTouch, ease } from '../engine';
import { tops } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const HEURE = /^\d\d:\d\d$/;
const DUREE_CHIFFRE = 0.6; // DESIGN.md § Mouvement : 0,6 s par chiffre, décalage 40 ms
const DECALAGE = 0.04;

/** Entrée de repos : t en secondes, x et y entre -0,5 et 0,5, amortis (motion.md, « Idle state »). */
export const idle = { t: 0, x: 0, y: 0 };
let idleDemarre = false;

export function startIdle() {
  if (idleDemarre || prefersReducedMotion()) return; // en mouvement réduit, l'entrée reste à zéro
  idleDemarre = true;
  const touch = isTouch();
  const vise = { x: 0, y: 0 };
  if (touch) onScroll(({ velocity }) => { vise.y = gsap.utils.clamp(-0.5, 0.5, velocity / 40); });
  else addEventListener('pointermove', (e) => { vise.x = e.clientX / innerWidth - 0.5; vise.y = e.clientY / innerHeight - 0.5; }, { passive: true });
  gsap.ticker.add((t) => {
    const r = gsap.ticker.deltaRatio();
    if (touch) vise.y *= Math.pow(0.9, r);
    const k = 1 - Math.pow(0.95, r);
    idle.t = t; idle.x += (vise.x - idle.x) * k; idle.y += (vise.y - idle.y) * k;
  });
}

/** Dernier time-code affiché : la conduite continue d'une page à l'autre. */
let dernier = '';

type Bandes = { node: HTMLElement; poser: (v: string) => void; aller: (v: string, de?: string) => gsap.core.Timeline };

/** Compteur à chiffres masqués (motion.md, « Counter ») : une bande 0 à 9 répétée deux fois par chiffre,
 *  déplacée en yPercent. Le compteur avance toujours, comme une horloge de régie : 8 vers 1 passe par 9 et 0 ;
 *  un top à la même heure fait un tour complet (la pastille « top » se pose en même temps). */
function bandes(valeur: string): Bandes {
  const node = document.createElement('span');
  node.className = 'tc';
  node.setAttribute('aria-hidden', 'true');
  const liste: HTMLElement[] = [];
  for (const ch of valeur) {
    if (ch === ':') {
      const s = document.createElement('span');
      s.className = 'tc__sep';
      s.textContent = ':';
      node.append(s);
      continue;
    }
    const c = document.createElement('span');
    c.className = 'tc__c';
    const b = document.createElement('span');
    b.className = 'tc__b';
    b.innerHTML = '01234567890123456789'.split('').map((d) => `<span>${d}</span>`).join('');
    c.append(b);
    node.append(c);
    liste.push(b);
  }
  const PAS = 5; // 20 cases : un chiffre = 5 % de la bande
  const chiffres = (v: string) => v.replace(':', '').split('').map(Number);
  const poser = (v: string) => chiffres(v).forEach((d, i) => gsap.set(liste[i], { yPercent: -d * PAS }));
  const aller = (v: string, de?: string) => {
    const a = chiffres(de ?? v);
    const b = chiffres(v);
    const pareil = a.join('') === b.join('');
    poser(de ?? v);
    const tl = gsap.timeline();
    b.forEach((d, i) => {
      if (!pareil && d === a[i]) return;
      const fin = d > a[i] ? d : d + 10;
      tl.to(liste[i], { yPercent: -fin * PAS, duration: DUREE_CHIFFRE, ease: ease.out, onComplete: () => gsap.set(liste[i], { yPercent: -d * PAS }) }, i * DECALAGE);
    });
    return tl;
  };
  poser(valeur);
  return { node, poser, aller };
}

function texteHeure(el: Element) {
  const c = el.cloneNode(true) as HTMLElement;
  c.querySelectorAll('.sr-only').forEach((n) => n.remove());
  return c.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

type Top = { s: HTMLElement; texte: string; libelle: string; pastille: HTMLElement | null; tc: Bandes | null; premier: boolean };

/** Monte le time-code d'une régie : le texte réel reste lu (sr-only), les bandes sont décoratives. */
function monter(h: HTMLElement, texte: string) {
  if (!HEURE.test(texte)) return null;
  const tc = bandes(texte);
  [...h.childNodes].forEach((n) => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
  const vrai = document.createElement('span');
  vrai.className = 'sr-only';
  vrai.textContent = texte;
  h.append(vrai, tc.node);
  return tc;
}

/** Barre de régie du téléphone, collée sous l'en-tête : reprend le top actif. */
function monterBarre(reduit: boolean, regieVue: (e: Top) => boolean) {
  const el = document.querySelector<HTMLElement>('[data-barre]');
  if (!el) return null;
  const h = el.querySelector<HTMLElement>('[data-barre-heure]')!;
  const l = el.querySelector<HTMLElement>('[data-barre-libelle]')!;
  const tc = bandes('00:00');
  const mot = document.createElement('span');
  mot.className = 'barre__mot';
  h.replaceChildren(tc.node, mot);
  let visible = false;
  gsap.set(el, { yPercent: -100, autoAlpha: 0 });
  let courant: Top | null = null;
  // Montrer ou cacher la barre : jamais tant que la régie en ligne du top actif est encore à l'écran (doublon).
  const montrer = (e: Top) => {
    const doit = !e.premier && !regieVue(e); // au premier top, la régie du hero est déjà à l'écran
    if (doit === visible) return;
    visible = doit;
    if (reduit) gsap.set(el, { yPercent: 0, autoAlpha: doit ? 1 : 0 });
    else gsap.to(el, { yPercent: doit ? 0 : -100, autoAlpha: doit ? 1 : 0, duration: 0.45, ease: ease.soft, overwrite: true });
  };
  const maj = (e: Top, prec: string, anim: boolean) => {
    courant = e;
    const num = HEURE.test(e.texte);
    tc.node.hidden = !num;
    mot.hidden = num;
    mot.textContent = num ? '' : e.texte;
    if (num) { if (anim && HEURE.test(prec)) tc.aller(e.texte, prec); else tc.poser(e.texte); }
    l.textContent = e.libelle;
    montrer(e);
  };
  return { maj, revoir: () => { if (courant) montrer(courant); } };
}

/** Poursuite du hero : un projecteur qui suit le pointeur et dérive au repos ; balaie la scène à l'intro. */
function poursuite(intro: gsap.core.Timeline) {
  const fig = document.querySelector<HTMLElement>('[data-poursuite]');
  if (!fig || prefersReducedMotion()) return;
  const balai = { x: -70, a: 0 };
  const tick = () => {
    const x = 50 + idle.x * 36 + Math.sin(idle.t * 0.3) * 7 + balai.x;
    const y = 40 + idle.y * 28 + Math.cos(idle.t * 0.22) * 5;
    fig.style.setProperty('--px', `${x.toFixed(2)}%`);
    fig.style.setProperty('--py', `${y.toFixed(2)}%`);
    fig.style.setProperty('--spot', balai.a.toFixed(3));
  };
  const st = ScrollTrigger.create({
    trigger: fig, start: 'top bottom', end: 'bottom top',
    onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
  });
  tick();
  const img = fig.querySelector('img');
  intro.add(() => {
    gsap.to(balai, { x: 0, duration: 1.6, ease: ease.out });
    gsap.to(balai, { a: 1, duration: 0.9, ease: ease.soft });
    if (img) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: ease.out });
  }, 0.1);
  return () => { gsap.ticker.remove(tick); st.kill(); };
}

// Horloge de régie (en-tête, bureau) : heure de Bruxelles et prochain top, calculé des tops réels.
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const minutes = (h: string) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
const SEMAINE: [number, number, string][] = [
  [0, minutes(tops.brunch.heure), 'Brunch'],
  [0, minutes(tops.matinee.heure), 'Spectacle'],
  ...[3, 4, 5, 6].map((j) => [j, minutes(tops.service.heure), 'Service'] as [number, number, string]),
];
const fmt = new Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

function maintenant() {
  const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { j: JOURS.indexOf(String(p.weekday).toLowerCase()), m: Number(p.hour) * 60 + Number(p.minute) };
}

export function prochainTop(j: number, m: number) {
  if (j >= 3 && j <= 6 && m >= minutes(tops.service.heure) && m < minutes(tops.service.fin)) return 'Service en cours';
  if (j === 0 && m >= minutes(tops.brunch.heure) && m < minutes(tops.brunch.fin)) return 'Brunch en cours';
  let best: [number, string, number, number] | null = null;
  for (const [tj, tm, lib] of SEMAINE) {
    let d = ((tj - j + 7) % 7) * 1440 + tm - m;
    if (d <= 0) d += 7 * 1440;
    if (!best || d < best[0]) best = [d, lib, tj, tm];
  }
  const [d, lib, tj, tm] = best!;
  if (d < 60) return `${lib} dans ${d} min`;
  if (d < 180) return `${lib} dans ${Math.floor(d / 60)} h ${String(d % 60).padStart(2, '0')}`;
  if (tj === j && d < 1440) return `${lib} à ${hhmm(tm)}`;
  if (tj === (j + 1) % 7 && d < 2880) return `${lib} demain, ${hhmm(tm)}`;
  return `${lib} ${JOURS[tj]}, ${hhmm(tm)}`;
}

function horloge() {
  const el = document.querySelector<HTMLElement>('[data-horloge]');
  if (!el) return;
  el.innerHTML = '<span class="horloge__lieu">Namur</span> <span class="horloge__h"><span data-hh></span><span class="horloge__sep" data-sep>:</span><span data-mm></span></span> <span class="horloge__top" data-prochain></span>';
  const hh = el.querySelector<HTMLElement>('[data-hh]')!;
  const mm = el.querySelector<HTMLElement>('[data-mm]')!;
  const sep = el.querySelector<HTMLElement>('[data-sep]')!;
  const pro = el.querySelector<HTMLElement>('[data-prochain]')!;
  const reduit = prefersReducedMotion();
  let minute = -1;
  let allume = true;
  const maj = () => {
    const { j, m } = maintenant();
    if (m === minute) return;
    minute = m;
    hh.textContent = String(Math.floor(m / 60)).padStart(2, '0');
    mm.textContent = String(m % 60).padStart(2, '0');
    pro.textContent = j >= 0 ? prochainTop(j, m) : '';
  };
  maj();
  let acc = 0;
  const tick = (t: number) => {
    const on = reduit || t % 1 < 0.5; // les deux-points battent la seconde (immobiles en mouvement réduit)
    if (on !== allume) { allume = on; sep.style.opacity = on ? '1' : '0.2'; }
    if (t - acc >= 1) { acc = t; maj(); }
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

export function startConduite() {
  onPage(({ intro }) => {
    const reduit = prefersReducedMotion();
    const nettoyages: (() => void)[] = [];
    const arret = horloge();
    if (arret) nettoyages.push(arret);
    const p = poursuite(intro);
    if (p) nettoyages.push(p);

    const sections = [...document.querySelectorAll<HTMLElement>('main .top, .pied')];
    const restaurer: [HTMLElement, string][] = [];
    const etats: Top[] = sections.map((s, i) => {
      const h = s.querySelector<HTMLElement>('.regie__heure');
      const texte = h ? texteHeure(h) : '';
      if (h) restaurer.push([h, h.innerHTML]);
      return {
        s, texte, premier: i === 0,
        libelle: texteHeure(s.querySelector('.regie__libelle') ?? s),
        pastille: s.querySelector<HTMLElement>('.regie__pastille'),
        tc: h && !reduit ? monter(h, texte) : null,
      };
    });
    nettoyages.push(() => restaurer.forEach(([h, html]) => { h.innerHTML = html; }));
    // Régies en ligne visibles sous l'en-tête et la barre : la barre ne les double pas.
    const vues = new Set<Element>();
    const regieVue = (e: Top) => { const r = e.s.querySelector('.regie'); return !!r && vues.has(r); };
    const barre = monterBarre(reduit, regieVue);
    const haut = (document.querySelector('.tete')?.getBoundingClientRect().height ?? 68) + 40;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) vues.add(en.target); else vues.delete(en.target); });
      barre?.revoir();
    }, { rootMargin: `-${Math.round(haut)}px 0px 0px 0px` });
    sections.forEach((s) => { const r = s.querySelector('.regie'); if (r) io.observe(r); });
    nettoyages.push(() => io.disconnect());

    let actif = -1;
    let courant = 0;
    let pret = reduit; // avant l'intro, on note le top sans l'animer (le rideau couvre encore la page)
    const activer = (i: number) => {
      if (i === actif) return;
      actif = i;
      const e = etats[i];
      const prec = dernier;
      if (HEURE.test(e.texte)) dernier = e.texte;
      if (!reduit) {
        if (e.tc && HEURE.test(prec)) e.tc.aller(e.texte, prec);
        if (e.pastille) gsap.fromTo(e.pastille, { scale: 0 }, { scale: 1, duration: 0.5, ease: ease.out, delay: e.tc ? 0.2 : 0 });
      }
      barre?.maj(e, prec, !reduit);
    };

    // Sous le rideau : le premier time-code affiche encore l'heure de la page quittée, puis roule à l'intro.
    const e0 = etats[0];
    if (e0?.tc && HEURE.test(dernier)) e0.tc.poser(dernier);

    etats.forEach((e, i) => ScrollTrigger.create({
      trigger: e.s, start: 'top 55%', end: 'bottom 55%',
      onToggle: (st) => { if (!st.isActive) return; courant = i; if (pret) activer(i); },
    }));
    if (reduit) activer(courant);
    else intro.add(() => { pret = true; activer(courant); }, 0);

    return () => nettoyages.forEach((n) => n());
  });
}
