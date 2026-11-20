// Pilote du concept « la journée de la maison » (patterns.md § 1). Une seule variable : l'heure, de 8 h à 18 h,
// lue sur le défilement entre les repères `data-heure` des tranches (et du pied, 18 h). Elle est distribuée à :
//   1. l'aiguille du cadran fixe (règle 8 h à 18 h, heure affichée) ;
//   2. le fond des tranches, qui glisse de la couleur de la tranche précédente vers la sienne (farine, blé, caramel, cacao),
//      l'encre choisie à chaque instant pour le meilleur contraste ;
//   3. la lumière du jour sur la façade du hero, qui avance avec l'heure, le pointeur et le temps de repos.
// Tout passe par gsap.ticker et ScrollTrigger (une horloge). Rien au niveau module ne touche le DOM.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, scrollState, prefersReducedMotion, ease } from '../engine';
import { idle } from './idle';

type Ton = 'matin' | 'midi' | 'gouter' | 'soir';
const TONS: Record<Ton, { bg: string; fg: string; muted: string; accent: string }> = {
  matin: { bg: '#e8e3da', fg: '#231713', muted: '#5c4f46', accent: '#1f5c3f' },
  midi: { bg: '#ebc98c', fg: '#231713', muted: '#4d3a25', accent: '#174a32' },
  gouter: { bg: '#c98a45', fg: '#231713', muted: '#3b2412', accent: '#1b3f2c' },
  soir: { bg: '#231713', fg: '#ece3d3', muted: '#c7b9a4', accent: '#e8a04a' },
};
const OUVERTURE = 8;
const FERMETURE = 18;

// Luminance relative WCAG d'une couleur « rgb(a)(r, g, b) » ou « #rrggbb ».
function lum(c: string) {
  const v = c.startsWith('#') ? [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) : (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const [r, g, b] = v.map((x) => { const s = x / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contraste = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

/** Format de l'heure affichée : « 10 h 05 ». */
export const formatHeure = (h: number) => {
  const c = gsap.utils.clamp(OUVERTURE, FERMETURE, h);
  const hh = Math.floor(c);
  const mm = Math.min(59, Math.floor((c - hh) * 60));
  return `${hh} h ${String(mm).padStart(2, '0')}`;
};

// Fond d'une tranche qui glisse de `avant` vers `apres` (p de 0 à 1). L'encre suit le côté le plus lisible.
function peindre(el: HTMLElement, avant: Ton, apres: Ton, p: number) {
  const A = TONS[avant], B = TONS[apres];
  const bg = gsap.utils.interpolate(A.bg, B.bg, p) as string;
  const cote = contraste(bg, A.fg) >= contraste(bg, B.fg) ? A : B;
  const s = el.style;
  s.setProperty('--c-bg', bg);
  s.setProperty('--c-fg', cote.fg);
  s.setProperty('--c-muted', cote.muted);
  s.setProperty('--c-accent', cote.accent);
  s.setProperty('--c-accent-texte', cote.accent);
}
const effacer = (el: HTMLElement) => ['--c-bg', '--c-fg', '--c-muted', '--c-accent', '--c-accent-texte'].forEach((k) => el.style.removeProperty(k));

export function startJournee() {
  const reduit = prefersReducedMotion();
  let reperes: { y: number; h: number }[] = [];
  let zones: { haut: number; bas: number; ton: string }[] = [];
  let finHero = 0;
  let debutPied = Infinity;
  let cadran: HTMLElement | null = null;
  let heureTxt: HTMLElement | null = null;
  let setAiguille: ((v: number) => void) | null = null;
  let regle = 0;
  let visible = false;
  let tonCadran = '';
  let heure = OUVERTURE;   // heure lue sur le défilement
  let lumiere: HTMLElement | null = null;
  let setLumiere: ((v: number) => void) | null = null;
  let heroActif = false;

  const mesurer = () => {
    const y0 = scrollState().y;
    reperes = [...document.querySelectorAll<HTMLElement>('[data-heure]')]
      .map((el) => ({ y: el.getBoundingClientRect().top + y0, h: parseFloat(el.dataset.heure || '') }))
      .filter((r) => !Number.isNaN(r.h))
      .sort((a, b) => a.y - b.y);
    zones = [...document.querySelectorAll<HTMLElement>('.tranche[data-ton], .pied')].map((el) => {
      const r = el.getBoundingClientRect();
      return { haut: r.top + y0, bas: r.bottom + y0, ton: el.classList.contains('pied') ? 'soir' : el.dataset.ton || 'matin' };
    });
    const hero = document.querySelector<HTMLElement>('.hero, .entete');
    finHero = hero ? hero.getBoundingClientRect().bottom + y0 : 0;
    const pied = document.querySelector<HTMLElement>('.pied');
    debutPied = pied ? pied.getBoundingClientRect().top + y0 : Infinity;
    regle = cadran?.querySelector<HTMLElement>('.cadran__regle')?.clientWidth || 0;
  };

  // Heure sous la ligne de lecture (milieu de l'écran), interpolée entre deux repères.
  const lire = (y: number) => {
    if (reperes.length < 2) return OUVERTURE;
    if (y <= reperes[0].y) return reperes[0].h;
    for (let i = 0; i < reperes.length - 1; i++) {
      const a = reperes[i], b = reperes[i + 1];
      if (y < b.y) return a.h + ((b.h - a.h) * (y - a.y)) / Math.max(1, b.y - a.y);
    }
    return reperes[reperes.length - 1].h;
  };

  const montrer = (v: boolean) => {
    if (!cadran || v === visible) return;
    visible = v;
    gsap.to(cadran, { autoAlpha: v ? 1 : 0, y: v ? 0 : 12, duration: 0.5, ease: ease.soft, overwrite: true });
  };

  // Applique l'heure (défilement + dérive de repos) au cadran et à la lumière du hero.
  const appliquer = (derive = 0) => {
    const h = gsap.utils.clamp(OUVERTURE, FERMETURE, heure + derive);
    const p = (h - OUVERTURE) / (FERMETURE - OUVERTURE);
    if (cadran && heureTxt) {
      const t = formatHeure(h);
      if (heureTxt.textContent !== t) heureTxt.textContent = t;
      setAiguille?.(p * regle);
    }
    setLumiere?.(p + derive * 0.7);
  };

  const surDefilement = () => {
    const { y } = scrollState();
    heure = lire(y + innerHeight * 0.5);
    if (cadran) {
      const yc = y + innerHeight - 40;
      const z = zones.find((r) => yc >= r.haut && yc < r.bas);
      if (z && z.ton !== tonCadran) { tonCadran = z.ton; cadran.dataset.ton = z.ton; }
      montrer(reperes.length >= 2 && y + innerHeight * 0.55 > finHero && yc < debutPied);
    }
    if (!heroActif) appliquer();
  };

  // Repos : l'aiguille et la lumière avancent d'elles-mêmes (écoulement lent en aller-retour, sans point mort),
  // le pointeur les pousse de plus ou moins un quart d'heure.
  const repos = () => appliquer(gsap.utils.wrapYoyo(0, 0.75, idle.t * 0.13) + idle.x * 0.5);

  onScroll(() => surDefilement());

  onPage(() => {
    cadran = document.querySelector<HTMLElement>('.cadran');
    heureTxt = cadran?.querySelector<HTMLElement>('.cadran__heure') || null;
    const aiguille = cadran?.querySelector<HTMLElement>('.cadran__aiguille');
    setAiguille = aiguille ? (gsap.quickSetter(aiguille, 'x', 'px') as (v: number) => void) : null;
    lumiere = document.querySelector<HTMLElement>('.hero__lumiere');
    setLumiere = lumiere ? ((v: number) => gsap.set(lumiere, { xPercent: -14 + v * 40 })) : null;
    visible = false; tonCadran = '';
    if (cadran) gsap.set(cadran, { autoAlpha: 0, y: 12 });
    const kills: (() => void)[] = [];

    // 2. Le fond glisse d'une tranche à l'autre (scrub, mouvement autorisé seulement).
    if (!reduit) {
      const tranches = [...document.querySelectorAll<HTMLElement>('main .tranche[data-ton]')];
      tranches.forEach((el, i) => {
        const avant = tranches[i - 1]?.dataset.ton as Ton | undefined;
        const apres = el.dataset.ton as Ton;
        if (!avant || avant === apres || !TONS[avant] || !TONS[apres]) return;
        const st = ScrollTrigger.create({
          trigger: el, start: 'top bottom', end: 'top 35%',
          onUpdate: (s) => peindre(el, avant, apres, s.progress),
          onRefresh: (s) => peindre(el, avant, apres, s.progress),
        });
        kills.push(() => { st.kill(); effacer(el); });
      });
    }

    // 3. Lumière du hero : en repos sur le ticker tant que le hero est à l'écran.
    if (lumiere && !reduit) {
      const st = ScrollTrigger.create({
        trigger: '.hero', start: 'top bottom', end: 'bottom top',
        onToggle: (s) => { heroActif = s.isActive; s.isActive ? gsap.ticker.add(repos) : gsap.ticker.remove(repos); },
      });
      heroActif = st.isActive;
      if (heroActif) gsap.ticker.add(repos);
      kills.push(() => { st.kill(); gsap.ticker.remove(repos); heroActif = false; });
    }

    // Compteur sur un chiffre vrai (142 lignes de la carte), une fois.
    document.querySelectorAll<HTMLElement>('[data-compte]').forEach((el) => {
      if (reduit) return;
      const n = parseInt(el.dataset.compte || '0', 10);
      const o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, { v: n, duration: 1.6, ease: ease.out, onUpdate: () => { el.textContent = String(Math.round(o.v)); },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });

    const refresh = () => { mesurer(); surDefilement(); };
    ScrollTrigger.addEventListener('refresh', refresh);
    refresh();
    return () => {
      ScrollTrigger.removeEventListener('refresh', refresh);
      kills.forEach((k) => k());
      cadran = heureTxt = lumiere = null; setAiguille = setLumiere = null;
    };
  });
}
