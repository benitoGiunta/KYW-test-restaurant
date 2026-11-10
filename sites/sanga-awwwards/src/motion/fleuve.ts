// Module pilote de Sanga : « le fil de l'eau » (patterns.md § 1). Une seule variable, le niveau (px), distribuée
// à tout ce qui porte le concept 河 :
//   - l'eau vermillon qui descend le fleuve (filet de gauche) jusqu'au niveau de lecture (62 % de l'écran) ;
//   - le sceau qui flotte à la pointe de l'eau et penche vers le pointeur ;
//   - le sceau de chaque strate, qui se remplit quand l'eau l'atteint (classe is-atteinte) ;
//   - le courant (tirets qui coulent dans l'eau) : état de repos, accéléré par la vitesse de défilement et le pointeur.
// Une horloge (gsap.ticker), en pause hors écran ; rien en mouvement réduit (le fleuve statique des strates reste).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, scrollState, prefersReducedMotion, ease } from '../engine';
import { idle, startIdle } from './idle';

const PERIODE = 48; // px : un tiret de 34 px et un blanc de 14 px (site.css .fleuve__eau)
const LECTURE = 0.62; // part de la hauteur d'écran où l'eau arrive

type Strate = { el: HTMLElement; y: number; ok: boolean };
let fleuve: HTMLElement | null = null;
let eau: HTMLElement | null = null;
let sceau: HTMLElement | null = null;
let strates: Strate[] = [];
let haut = 0;
let hauteur = 0;
const etat = { entree: 1, courant: 0, niveau: 0 };

function mesurer() {
  if (!fleuve) return;
  const r = fleuve.getBoundingClientRect();
  haut = r.top + scrollY;
  hauteur = r.height;
  strates = strates.map((s) => ({ ...s, y: s.el.getBoundingClientRect().top + scrollY - haut + 24 }));
}

function appliquer() {
  if (!fleuve || !eau || !sceau) return;
  const y = scrollY;
  if (y + innerHeight < haut || y > haut + hauteur) return; // hors écran : pause
  const dt = gsap.ticker.deltaRatio() / 60;
  const vise = gsap.utils.clamp(0, hauteur, y + innerHeight * LECTURE - haut);
  etat.niveau = vise * etat.entree;
  // courant : vitesse de base + défilement + pointeur (plus vif quand le pointeur s'approche du fleuve, à gauche)
  const vitesse = 48 + Math.min(260, Math.abs(scrollState().velocity) * 8) + Math.max(0, -idle.x) * 40;
  etat.courant = (etat.courant + vitesse * dt) % PERIODE;
  eau.style.clipPath = `inset(0 0 ${Math.max(0, hauteur - etat.niveau).toFixed(1)}px 0)`;
  eau.style.backgroundPosition = `0 ${etat.courant.toFixed(1)}px`;
  sceau.style.translate = `${(idle.x * 10 + Math.sin(idle.t * 1.3) * 1.5).toFixed(2)}px ${etat.niveau.toFixed(1)}px`;
  for (const s of strates) {
    const ok = etat.niveau >= s.y;
    if (ok !== s.ok) { s.ok = ok; s.el.classList.toggle('is-atteinte', ok); }
  }
}

export function startFleuve() {
  if (prefersReducedMotion()) return;
  startIdle();
  ScrollTrigger.addEventListener('refresh', mesurer);
  addEventListener('resize', mesurer, { passive: true });
  gsap.ticker.add(appliquer);
  onPage(({ intro }) => {
    fleuve = document.querySelector<HTMLElement>('[data-fleuve]');
    eau = fleuve?.querySelector<HTMLElement>('.fleuve__eau') ?? null;
    sceau = fleuve?.querySelector<HTMLElement>('.fleuve__sceau') ?? null;
    if (!fleuve) return;
    strates = [...document.querySelectorAll<HTMLElement>('main .strate:not(.strate--sans-sceau)')].map((el) => ({ el, y: 0, ok: false }));
    mesurer();
    // Entrée : l'eau descend depuis la source jusqu'au niveau de lecture (le premier mouvement du site).
    etat.entree = 0;
    intro.to(etat, { entree: 1, duration: 1.8, ease: ease.out }, 0);
    return () => { fleuve = eau = sceau = null; strates = []; };
  });
}
