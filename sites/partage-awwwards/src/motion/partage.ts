// Module pilote de Partage (patterns.md § 1) : une seule variable, l'écart `--ecart`, porte le concept.
//   0   = le mot est entier (PAR et TAGE se touchent, le chemin de table est fermé, l'assiette est sous la ligne) ;
//   1   = la coupure de repos (mise en page statique : c'est l'état du mouvement réduit et du HTML sans JS) ;
//   > 1 = l'écart s'ouvre encore au défilement (l'assiette monte, les deux moitiés glissent vers les bords).
// La variable est écrite sur l'élément porteur (hero, en-tête de page, pied de page), jamais sur <html>.
// Entrée de repos : un reflet de lumière glisse lentement sur le chêne (`--reflet`), écrit sur les seules
// bandes visibles (IntersectionObserver, leçon atelier-de-bossime), décalé par le pointeur.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion, isTouch } from '../engine';

gsap.registerPlugin(ScrollTrigger);

const ecrire = (el: HTMLElement, v: number) => el.style.setProperty('--ecart', v.toFixed(4));

/** Coupure scrubbée : `intro` (0 → 1 à l'arrivée) + `defile` (0 → max au défilement). */
function coupure(el: HTMLElement, intro: gsap.core.Timeline, opts: { depart?: number; arrivee?: boolean; defile?: number; declencheur?: ScrollTrigger.Vars }) {
  const s = { i: opts.depart ?? 1, d: 0 };
  const maj = () => ecrire(el, s.i + s.d);
  maj();
  if (opts.arrivee) intro.to(s, { i: 1, duration: 1.2, ease: ease.inOut, onUpdate: maj }, 0.1);
  if (opts.defile) {
    ScrollTrigger.create({
      trigger: el, scrub: true, invalidateOnRefresh: true,
      start: 'top top', end: 'bottom top', ...opts.declencheur,
      onUpdate: (self) => { s.d = self.progress * opts.defile!; maj(); },
    });
  }
}

/** Le verbe : ce qui est sur les bords glisse vers le milieu, ce qui est sur le chemin de table monte (on le pose). */
function glisse(lignes: string, g: string, m: string, d: string) {
  gsap.utils.toArray<HTMLElement>(lignes).forEach((ligne) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ligne, start: 'top 92%', once: true } });
    const cg = ligne.querySelector(g), cm = ligne.querySelector(m), cd = ligne.querySelector(d);
    if (cg) tl.from(cg, { x: -36, autoAlpha: 0, duration: 0.6, ease: ease.out, clearProps: 'transform,opacity' }, 0);
    if (cd) tl.from(cd, { x: 36, autoAlpha: 0, duration: 0.6, ease: ease.out, clearProps: 'transform,opacity' }, 0.04);
    if (cm) tl.from(cm, { y: 18, autoAlpha: 0, duration: 0.5, ease: ease.out, clearProps: 'transform,opacity' }, 0.12);
  });
}

function reflet() {
  const visibles = new Set<HTMLElement>();
  let px = 0, cible = 0, n = 0;
  const touch = isTouch();
  if (!touch) addEventListener('pointermove', (e) => { cible = e.clientX / innerWidth - 0.5; }, { passive: true });
  gsap.ticker.add((t) => {
    if (!visibles.size) return;
    if (touch && (n++ & 1)) return; // un frame sur deux au toucher : le reflet est lent, le CPU du téléphone non
    px += (cible - px) * (1 - Math.pow(0.94, gsap.ticker.deltaRatio()));
    const base = ((t / 12) % 1) * 160 - 30; // un passage toutes les 12 s, de droite à gauche
    visibles.forEach((el) => {
      const decal = Number(el.dataset.refletDecal || 0);
      el.style.setProperty('--reflet', (base + decal - px * 24).toFixed(2));
    });
  });
  return visibles;
}

export function partage() {
  if (prefersReducedMotion()) return; // l'écart reste à 1 (CSS), aucun reflet : le concept tient immobile
  const visibles = reflet();

  onPage(({ intro }) => {
    const hero = document.querySelector<HTMLElement>('.hero');
    if (hero) coupure(hero, intro, { depart: 0, arrivee: true, defile: 0.6 });

    const tete = document.querySelector<HTMLElement>('.page-tete');
    if (tete) coupure(tete, intro, { depart: 0, arrivee: true, defile: 0.5 });

    const perdu = document.querySelector<HTMLElement>('.perdu');
    if (perdu) coupure(perdu, intro, { depart: 0, arrivee: true });

    const pied = document.querySelector<HTMLElement>('.pied__mot');
    if (pied) coupure(pied, intro, { depart: 0, defile: 1, declencheur: { start: 'top bottom', end: 'bottom bottom' } });

    glisse('.index__ligne', '.index__nom', '.index__marque span', '.index__origine');
    glisse('.plat', '.plat__nom', '.plat__prix', '.plat__desc');

    // Reflet : les bandes de chêne visibles reçoivent `--reflet`, décalé selon leur hauteur dans la page.
    const bandes = gsap.utils.toArray<HTMLElement>('.chemin, .hero__assiette, .index__marque, .page-tete h1 .fente');
    bandes.forEach((b, i) => { b.classList.add('reflet'); b.dataset.refletDecal = String((i % 5) * 9); });
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => (e.isIntersecting ? visibles.add(e.target as HTMLElement) : visibles.delete(e.target as HTMLElement)));
    });
    bandes.forEach((b) => io.observe(b));
    return () => { io.disconnect(); visibles.clear(); };
  });
}
