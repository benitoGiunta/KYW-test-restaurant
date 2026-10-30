// Driver « Journée » : six moments ([data-ciel]) pilotent le ciel (deux arrêts), l'encre et la position du disque
// sur la frise (--heure), par ScrollTrigger onToggle + tween de variables CSS sur <html>. Le site s'ouvre à l'heure
// réelle : ciel du hero réglé au boot, horloge qui tourne (idle), badge « ouvert jusqu'à » calculé sur les horaires
// réels, invitation cliquable « aller au moment présent » dans le hero (aucun défilement automatique : le hero est
// toujours vu, révision 1). Le texte doux tient 4,5:1 sur les deux arrêts de chaque ciel. Les modules de page
// (chips, médaillons, horaires à flèches) vivent ici, chacun derrière onPage() avec test de présence.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion, ease } from '../engine';
import { moments, jours, type Jour } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export type Theme = 'aube' | 'midi' | 'ocre' | 'corail' | 'nuit' | 'nuitProfonde';
type Ciel = { haut: string; bas: string; encre: string; doux: string; ligne: string; voile: string; disque: string; heure: number };
// Mêmes valeurs que tokens.css (data-theme) ; ici en hex / rgba pour que GSAP les interpole.
const CIELS: Record<Theme, Ciel> = {
  aube: { haut: '#fbf6ec', bas: '#f4e3c8', encre: '#1b1b1b', doux: 'rgba(27,27,27,0.72)', ligne: 'rgba(27,27,27,0.16)', voile: 'rgba(255,255,255,0.55)', disque: '#e79a2e', heure: 7 },
  midi: { haut: '#ffffff', bas: '#fbf6ec', encre: '#1b1b1b', doux: 'rgba(27,27,27,0.72)', ligne: 'rgba(27,27,27,0.16)', voile: 'rgba(255,255,255,0.55)', disque: '#e79a2e', heure: 9 },
  ocre: { haut: '#ffffff', bas: '#f6e2b7', encre: '#1b1b1b', doux: 'rgba(27,27,27,0.72)', ligne: 'rgba(27,27,27,0.16)', voile: 'rgba(255,255,255,0.55)', disque: '#e79a2e', heure: 12 },
  corail: { haut: '#e79a2e', bas: '#d9614e', encre: '#1b1b1b', doux: 'rgba(27,27,27,1)', ligne: 'rgba(27,27,27,0.26)', voile: 'rgba(255,255,255,0.3)', disque: '#fbf6ec', heure: 17 },
  nuit: { haut: '#13203a', bas: '#223659', encre: '#fbf6ec', doux: 'rgba(251,246,236,0.66)', ligne: 'rgba(251,246,236,0.2)', voile: 'rgba(11,19,36,0.45)', disque: '#fbf6ec', heure: 19 },
  nuitProfonde: { haut: '#0b1324', bas: '#13203a', encre: '#fbf6ec', doux: 'rgba(251,246,236,0.66)', ligne: 'rgba(251,246,236,0.2)', voile: 'rgba(11,19,36,0.45)', disque: '#fbf6ec', heure: 23 },
};
const VARS = ['--ciel-haut', '--ciel-bas', '--encre', '--encre-doux', '--ligne', '--voile', '--disque', '--heure'];
const html = () => document.documentElement;
const pad = (n: number) => String(n).padStart(2, '0');

/** Moment courant selon l'heure réelle (décimale) : le dernier dont l'heure est passée, sinon la nuit profonde. */
export function momentCourant(h = heureDecimale()) {
  let m = moments[moments.length - 1];
  if (h >= moments[0].heure) for (const x of moments) if (x.heure <= h) m = x;
  return m;
}
const heureDecimale = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };

let courant: Theme | '' = '';
/** Applique un ciel : tween 1,1 s sous motion, réglage sec sinon. Le disque suit (--heure, 0,9 s via la même tween). */
export function applyCiel(theme: Theme, animate = true) {
  if (theme === courant) return;
  courant = theme;
  const c = CIELS[theme];
  const vars = { '--ciel-haut': c.haut, '--ciel-bas': c.bas, '--encre': c.encre, '--encre-doux': c.doux, '--ligne': c.ligne, '--voile': c.voile, '--disque': c.disque, '--heure': c.heure } as gsap.TweenVars;
  if (animate && !prefersReducedMotion()) gsap.to(html(), { ...vars, duration: 1.1, ease: ease.inOut, overwrite: 'auto' });
  else gsap.set(html(), vars);
  html().dataset.theme = theme;
  html().dataset.nuit = theme === 'nuit' || theme === 'nuitProfonde' ? 'true' : 'false';
  document.querySelectorAll<HTMLElement>('[data-chip]').forEach((ch) => {
    const actif = momentDuTheme(theme) === ch.dataset.chip;
    if (actif) ch.setAttribute('aria-current', 'true'); else ch.removeAttribute('aria-current');
  });
  document.querySelectorAll<HTMLElement>('[data-frise-cran]').forEach((cr) => cr.classList.toggle('is-active', cr.dataset.friseCran === String(c.heure)));
}
const momentDuTheme = (t: Theme) => moments.find((m) => m.theme === t)?.id;

export function initJournee() {
  // Ciel réglé à l'heure réelle avant le premier rendu visible (le loader couvre), puis la page décide.
  applyCiel(momentCourant().theme as Theme, false);

  onPage(() => {
    const page = html().dataset.theme as Theme | undefined;
    const sections = [...document.querySelectorAll<HTMLElement>('[data-ciel]')];
    courant = ''; // nouvelle page : on réapplique
    if (!sections.length) applyCiel(page && CIELS[page] ? page : 'aube', false);
    sections.forEach((el) => {
      const theme = (el.dataset.ciel === 'auto' ? momentCourant().theme : el.dataset.ciel) as Theme;
      ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => { if (self.isActive) applyCiel(theme); } });
    });
    if (sections.length) {
      const premier = sections[0];
      const theme = (premier.dataset.ciel === 'auto' ? momentCourant().theme : premier.dataset.ciel) as Theme;
      applyCiel(theme, false);
    }
    return () => { VARS.forEach((v) => html().style.removeProperty(v)); courant = ''; };
  });

  onPage(horloge);
  onPage(badges);
  onPage(medaillons);
  onPage(horairesFleches);
  onPage(invitation);
}

/** Horloge du hero : HH:MM en display, secondes en petit, anneau qui avance d'un cran par seconde (idle). */
function horloge() {
  const hm = document.querySelector<HTMLElement>('[data-horloge-hm]');
  if (!hm) return;
  const s = document.querySelector<HTMLElement>('[data-horloge-s]');
  const ring = document.querySelector<SVGCircleElement>('[data-horloge-ring]');
  const len = ring ? ring.getTotalLength() : 0;
  const tick = () => {
    const d = new Date();
    hm.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    if (s) s.textContent = pad(d.getSeconds());
    if (ring) ring.style.strokeDashoffset = String(len * (1 - d.getSeconds() / 60));
  };
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}

type Creneau = { ouverture: string; fermeture: string };
type Ligne = { j: Jour; c: Creneau[]; n: string };
const minutes = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const jourAujourdhui = (): Jour => jours[(new Date().getDay() + 6) % 7];

/** Badge « ouvert jusqu'à 21:00 » / « ouvre à 19:00 » / « fermé, ouvre lundi à 19:00 », depuis les horaires réels. */
function badges() {
  const badges = [...document.querySelectorAll<HTMLElement>('[data-badge]')];
  if (!badges.length) return;
  const calc = () => {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const jour = jourAujourdhui();
    badges.forEach((b) => {
      const lignes: Ligne[] = JSON.parse(b.dataset.horaires || '[]');
      const auj = lignes.find((l) => l.j === jour);
      let etat = 'ferme', texte = "fermé aujourd'hui";
      const ouvert = auj?.c.find((c) => minutes(c.ouverture) <= nowMin && nowMin < minutes(c.fermeture));
      const suivant = auj?.c.find((c) => minutes(c.ouverture) > nowMin);
      if (ouvert) { etat = 'ouvert'; texte = `ouvert jusqu'à ${ouvert.fermeture}`; }
      else if (suivant) { etat = 'bientot'; texte = `ouvre à ${suivant.ouverture}`; }
      else {
        const i = jours.indexOf(jour);
        for (let k = 1; k <= 7; k++) {
          const l = lignes.find((x) => x.j === jours[(i + k) % 7]);
          if (l?.c.length) { texte = `fermé, ouvre ${k === 1 ? 'demain' : l.j} à ${l.c[0].ouverture}`; break; }
        }
      }
      b.dataset.etat = etat;
      const t = b.querySelector<HTMLElement>('[data-badge-texte]');
      if (t && t.textContent !== texte) t.textContent = texte;
    });
  };
  calc();
  const id = setInterval(calc, 60000);
  return () => clearInterval(id);
}

/** Médaillons du brunch : roulent en place (rotate -20 → 0) en entrant. */
function medaillons() {
  const items = document.querySelectorAll<HTMLElement>('[data-medaillons] .medaillon');
  if (!items.length || prefersReducedMotion()) return;
  gsap.from(items, { rotate: -20, scale: 0.86, autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: ease.out, scrollTrigger: { trigger: items[0].parentElement, start: 'top 80%', once: true } });
}

/** Horaires à flèches : un jour à la fois (le jour courant d'abord), lignes cuisine / bar. */
function horairesFleches() {
  const blocs = [...document.querySelectorAll<HTMLElement>('[data-horo]')];
  if (!blocs.length) return;
  const offs: (() => void)[] = [];
  blocs.forEach((bloc) => {
    const data: { jour: Jour; cuisine: string; bar: string }[] = JSON.parse(bloc.dataset.jours || '[]');
    if (!data.length) return;
    let i = Math.max(0, data.findIndex((d) => d.jour === jourAujourdhui()));
    const jourEl = bloc.querySelector<HTMLElement>('[data-horo-jour]');
    const cuisine = bloc.querySelector<HTMLElement>('[data-horo-cuisine]');
    const bar = bloc.querySelector<HTMLElement>('[data-horo-bar]');
    const render = () => {
      const d = data[i];
      if (jourEl) jourEl.textContent = d.jour === jourAujourdhui() ? `${d.jour} (aujourd'hui)` : d.jour;
      if (cuisine) cuisine.textContent = d.cuisine;
      if (bar) bar.textContent = d.bar;
    };
    const prev = () => { i = (i + data.length - 1) % data.length; render(); };
    const next = () => { i = (i + 1) % data.length; render(); };
    const bp = bloc.querySelector('[data-horo-prev]'), bn = bloc.querySelector('[data-horo-next]');
    bp?.addEventListener('click', prev); bn?.addEventListener('click', next);
    offs.push(() => { bp?.removeEventListener('click', prev); bn?.removeEventListener('click', next); });
    render();
  });
  return () => offs.forEach((f) => f());
}

/** Invitation « aller au moment présent » (remplace l'arrivée automatique, révision 1) : un lien du hero vers la
 *  section de l'heure réelle, suivi seulement au clic. Entre 23h et 7h (hors de la frise) il reste caché : jamais
 *  d'envoi vers le bas de page la nuit. Un moment illustratif est annoncé comme tel. */
function invitation() {
  const bloc = document.querySelector<HTMLElement>('[data-maintenant]');
  if (!bloc) return;
  const lien = bloc.querySelector<HTMLAnchorElement>('[data-maintenant-lien]');
  const texte = bloc.querySelector<HTMLElement>('[data-maintenant-texte]');
  const maj = () => {
    const d = new Date();
    const h = d.getHours() + d.getMinutes() / 60;
    if (h < moments[0].heure || h >= moments[moments.length - 1].heure || !lien || !texte) { bloc.hidden = true; return; }
    const m = momentCourant(h);
    lien.href = `#${m.id}`;
    texte.textContent = `Il est ${pad(d.getHours())}h${pad(d.getMinutes())} : aller au moment présent, ${m.titre.toLowerCase()}${m.placeholder ? ' (illustratif)' : ''}`;
    bloc.hidden = false;
  };
  maj();
  const id = setInterval(maj, 60000);
  return () => clearInterval(id);
}
