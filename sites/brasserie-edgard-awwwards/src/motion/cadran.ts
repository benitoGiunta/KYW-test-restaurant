// Module pilote « Le cadran ». Une variable : l'heure de Namur (Europe/Brussels), lue une fois par seconde sur gsap.ticker.
// Distribuée à tout ce qui porte le concept : aiguille de chaque cadran, arc courant allumé, statut écrit du hero,
// plage « maintenant » de la journée. Influence du pointeur : aiguille fantôme et lecture de l'heure survolée.
// Repos (startIdle) : la trotteuse balaie le cadran en continu, l'aiguille de la 404 cherche l'heure. Mouvement réduit : états posés, rien ne bouge.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, isTouch, ease } from '../engine';
import { site } from '../data/site';

const { ouverture, fermeture, pause } = site;
const DEG_PAR_H = 360 / 24;
const REPERE = 12.5; // l'aiguille est dessinée vers 12 h 30 dans Dial.astro
const ORIGINE = '240 240';

type Instant = { h: number; s: number; iso: string; dow: number };
const fmt = new Intl.DateTimeFormat('fr-BE', {
  timeZone: 'Europe/Brussels', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short',
});
const JOURS: Record<string, number> = { 'lun.': 1, 'mar.': 2, 'mer.': 3, 'jeu.': 4, 'ven.': 5, 'sam.': 6, 'dim.': 0 };

/** Heure de Namur, quel que soit le fuseau du visiteur. */
export function maintenant(d = new Date()): Instant {
  const p = Object.fromEntries(fmt.formatToParts(d).map((x) => [x.type, x.value]));
  const h = +p.hour + +p.minute / 60 + +p.second / 3600;
  return { h, s: +p.second, iso: `${p.year}-${p.month}-${p.day}`, dow: JOURS[p.weekday] ?? new Date(`${p.year}-${p.month}-${p.day}T12:00:00`).getDay() };
}

/** Jours fériés belges (fixes + Pâques, Ascension, Pentecôte). */
function feries(y: number) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
  const paques = Date.UTC(y, mois - 1, jour);
  const j = (n: number) => new Date(paques + n * 864e5).toISOString().slice(0, 10);
  return new Set([`${y}-01-01`, `${y}-05-01`, `${y}-07-21`, `${y}-08-15`, `${y}-11-01`, `${y}-11-11`, `${y}-12-25`, j(1), j(39), j(50)]);
}
const cuisineContinue = (t: Instant) => t.dow === 0 || t.dow === 6 || feries(+t.iso.slice(0, 4)).has(t.iso);

export type Etat = 'ferme-avant' | 'midi' | 'pause' | 'soir' | 'ferme-apres';
export function etat(h: number, continu: boolean): Etat {
  if (h < ouverture) return 'ferme-avant';
  if (h >= fermeture) return 'ferme-apres';
  if (h < pause.debut) return 'midi';
  if (h < pause.fin) return continu ? 'midi' : 'pause';
  return 'soir';
}
const hh = (h: number) => { const H = Math.floor(h), M = Math.round((h - H) * 60); return M ? `${H} h ${String(M).padStart(2, '0')}` : `${H} h`; };

function statut(t: Instant) {
  const continu = cuisineContinue(t);
  switch (etat(t.h, continu)) {
    case 'ferme-avant': return `Fermé pour l’instant. La salle ouvre à ${hh(ouverture)}.`;
    case 'ferme-apres': return `Fermé pour ce soir. Retour demain à ${hh(ouverture)}.`;
    case 'pause': return `Ouvert maintenant. Cuisine en pause, elle rouvre à ${hh(pause.fin)}.`;
    case 'midi': return continu ? `Ouvert maintenant. Cuisine ouverte sans pause aujourd’hui, jusqu’à ${hh(fermeture)}.` : `Ouvert maintenant. Cuisine ouverte jusqu’à ${hh(pause.debut)}.`;
    default: return `Ouvert maintenant. Cuisine ouverte jusqu’à ${hh(fermeture)}.`;
  }
}
function lecture(h: number, continu: boolean) {
  const e = etat(h, continu);
  const quoi = e === 'pause' ? 'cuisine en pause' : e === 'midi' || e === 'soir' ? 'cuisine ouverte' : 'fermé';
  return `${hh(Math.floor(h * 4) / 4)} · ${quoi}`;
}
/** Plage à allumer : le week-end, de 15 h à 18 h, c'est la « pause » qui devient cuisine ouverte. */
const cle = (t: Instant, e: Etat) => (e === 'midi' && t.h >= pause.debut ? 'pause' : e);
const angle = (h: number) => (h - REPERE) * DEG_PAR_H;

/** Pose l'état du jour sur un cadran (arc courant, pause ouverte le week-end). */
function poserEtat(svg: SVGSVGElement, t: Instant) {
  const continu = cuisineContinue(t);
  const e = etat(t.h, continu);
  svg.classList.add("is-pose");
  svg.classList.toggle('is-continu', continu);
  svg.classList.toggle('is-ouvert', e !== 'ferme-avant' && e !== 'ferme-apres');
  svg.querySelectorAll<SVGElement>('[data-arc]').forEach((a) => {
    const k = a.dataset.arc;
    const actif = (k === 'salle' && e !== 'ferme-avant' && e !== 'ferme-apres') || k === cle(t, e);
    a.classList.toggle('is-now', actif);
  });
}

function journee(t: Instant) {
  const c = cle(t, etat(t.h, cuisineContinue(t)));
  document.querySelectorAll<HTMLElement>('[data-plage]').forEach((li) => {
    const actif = li.dataset.plage === c;
    li.classList.toggle('is-now', actif);
    const m = li.querySelector<HTMLElement>('[data-maintenant]');
    if (m) m.hidden = !actif;
  });
}

export const cadran = () => onPage(({ intro }) => {
  const dials = [...document.querySelectorAll<SVGSVGElement>('[data-dial]')];
  const statutEl = document.querySelector<HTMLElement>('[data-statut]');
  if (!dials.length && !statutEl) return;
  const reduit = prefersReducedMotion();
  let t = maintenant();
  const off: (() => void)[] = [];

  const ecrire = () => {
    if (statutEl) { statutEl.textContent = statut(t); statutEl.hidden = false; }
    journee(t);
  };
  ecrire();

  const pleins = dials.filter((d) => !d.hasAttribute('data-vide'));
  const vides = dials.filter((d) => d.hasAttribute('data-vide'));
  const aiguilles = pleins.map((d) => d.querySelector<SVGGElement>('[data-dial-aiguille]')!);
  const trotteuses = pleins.map((d) => d.querySelector<SVGGElement>('[data-dial-trotteuse]')).filter(Boolean) as SVGGElement[];
  gsap.set([...aiguilles, ...trotteuses], { svgOrigin: ORIGINE });
  pleins.forEach((d) => poserEtat(d, t));

  // Signature : l'aiguille part de minuit et tourne jusqu'à l'heure de Namur, puis l'arc courant s'allume.
  pleins.forEach((d, i) => {
    const a = aiguilles[i];
    const hero = d.classList.contains('dial--hero');
    if (reduit || !hero) { gsap.set(a, { rotation: angle(t.h) }); return; }
    d.classList.add('is-attente');
    gsap.set(a, { rotation: angle(0) });
    intro.to(a, { rotation: angle(t.h), duration: 1.6, ease: ease.out, onComplete: () => d.classList.remove('is-attente') }, 0.15);
  });

  // Repos : trotteuse en temps réel, aiguille de la 404 qui cherche l'heure ; pause hors écran ; rien en mouvement réduit.
  const visibles = new Set<Element>();
  const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target))));
  dials.forEach((d) => io.observe(d));
  off.push(() => io.disconnect());
  const perdues = vides.map((d) => d.querySelector<SVGGElement>('[data-dial-aiguille]')!);
  gsap.set(perdues, { svgOrigin: ORIGINE });
  let derniere = 0;
  const startIdle = () => {
    const tick = (time: number) => {
      const ms = Date.now();
      if (ms - derniere > 1000) { derniere = ms; const n = maintenant(); const change = Math.floor(n.h * 60) !== Math.floor(t.h * 60); t = n; if (change) { ecrire(); pleins.forEach((d, i) => { poserEtat(d, t); if (!d.classList.contains('is-attente') && !d.matches(':hover')) gsap.to(aiguilles[i], { rotation: angle(t.h), duration: 0.6, ease: ease.soft }); }); } }
      if (reduit) return;
      const sec = ((ms / 1000) % 60) * 6;
      pleins.forEach((d, i) => { const tr = d.querySelector('[data-dial-trotteuse]'); if (tr && visibles.has(d)) gsap.set(tr, { rotation: sec }); void i; });
      vides.forEach((d, i) => { if (visibles.has(d)) gsap.set(perdues[i], { rotation: Math.sin(time * 0.7) * 140 + Math.sin(time * 1.9) * 35 }); });
    };
    gsap.ticker.add(tick);
    off.push(() => gsap.ticker.remove(tick));
  };
  startIdle();

  // Pointeur : sur un cadran, une aiguille fantôme suit l'heure survolée et le centre la lit (bureau seulement).
  if (!reduit && !isTouch()) pleins.forEach((d) => {
    const g = d.querySelector<SVGGElement>('[data-dial-fantome]');
    const txt = d.querySelector<SVGTextElement>('[data-dial-lecture]');
    if (!g || !txt) return;
    gsap.set(g, { svgOrigin: ORIGINE, rotation: 0 });
    const rot = gsap.quickTo(g, 'rotation', { duration: 0.45, ease: ease.soft });
    let courant = 0;
    const move = (e: PointerEvent) => {
      const r = d.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const h = ((Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360) / DEG_PAR_H; // midi en haut
      const heure = (h + 12) % 24;
      let cible = angle(heure);
      cible = courant + ((((cible - courant) % 360) + 540) % 360) - 180; // chemin le plus court
      courant = cible; rot(cible);
      txt.textContent = lecture(heure, cuisineContinue(t));
    };
    const enter = () => d.classList.add('is-survol');
    const leave = () => { d.classList.remove('is-survol'); };
    d.addEventListener('pointermove', move); d.addEventListener('pointerenter', enter); d.addEventListener('pointerleave', leave);
    off.push(() => { d.removeEventListener('pointermove', move); d.removeEventListener('pointerenter', enter); d.removeEventListener('pointerleave', leave); });
  });

  return () => off.forEach((f) => f());
});
