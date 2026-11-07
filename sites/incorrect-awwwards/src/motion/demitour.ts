// Module pilote « Le demi-tour ». Une variable, l'angle de chaque Я (rotationY, en degrés), distribuée à tout ce qui
// porte le concept : les r retournés des titres, la marque de l'en-tête, le R du rideau.
//   angle = tour (entrée, survol)  +  vitesse de défilement  +  pointeur et repos (titres h1 seulement)
// tour : 0 = Я (l'état du site), 180 = R à l'endroit. À l'entrée d'un titre, le Я fait son demi-tour et revient,
// comme la pizza qu'on tourne sur la pelle ; au survol il reste à l'endroit tant que le pointeur est là.
// Une horloge (gsap.ticker), seuls les titres visibles sont écrits, rien en mouvement réduit.
import { gsap } from 'gsap';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion } from '../engine';

type Etat = { tour: number; entre: boolean; h1: boolean; tete: boolean };

let vitesse = 0;
let vitesseCible = 0;
let dernierGeste = 0;
const pointeur = { x: 0, lisse: 0 };
const repos = { amp: 0 };

/** Entrée de repos : le Я du h1 se balance d'un quart de tour (± 26°) quand le visiteur ne fait rien. */
function startIdle() {
  gsap.to(repos, { amp: 1, duration: 1.2, ease: ease.soft, overwrite: true });
}
function geste() {
  dernierGeste = performance.now();
  if (repos.amp > 0) gsap.to(repos, { amp: 0, duration: 0.6, ease: ease.soft, overwrite: true });
}

export function demiTour() {
  if (prefersReducedMotion()) return;
  onScroll((s) => { vitesseCible = s.velocity || 0; if (Math.abs(vitesseCible) > 0.5) geste(); });
  if (!isTouch()) {
    addEventListener('pointermove', (e) => { pointeur.x = e.clientX / innerWidth - 0.5; geste(); }, { passive: true });
  }

  onPage(({ intro }) => {
    const etats: Etat[] = [];
    let els: HTMLElement[] = [];
    const visibles = new Set<HTMLElement>();
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((en) => {
        const el = en.target as HTMLElement;
        if (en.isIntersecting) visibles.add(el); else visibles.delete(el);
        const i = els.indexOf(el);
        const e = etats[i];
        if (en.isIntersecting && e && !e.entre && !e.tete && en.intersectionRatio > 0) {
          e.entre = true;
          entree(e, e.h1 ? 0.15 : 0.45);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    // SplitText (autoSplit) peut recréer les r après le chargement des polices : on recollecte par index.
    const collecte = () => {
      io.disconnect();
      visibles.clear();
      els = Array.from(document.querySelectorAll<HTMLElement>('.display .r:not(.menu .r)'));
      els.forEach((el, i) => {
        etats[i] ??= { tour: 0, entre: false, h1: !!el.closest('h1'), tete: !!el.closest('.entete') };
        gsap.set(el, { transformPerspective: 700 });
        io.observe(el);
      });
    };
    const entree = (e: Etat, delai: number) => {
      gsap.to(e, { tour: 180, duration: 0.7, ease: ease.inOut, delay: delai, yoyo: true, repeat: 1, repeatDelay: 0.35 });
    };
    collecte();
    // Le h1 de l'accueil fait son demi-tour avec l'intro de la page (premier frame : le Я, comme au repos).
    etats.forEach((e) => { if (e.h1) { e.entre = true; intro.add(() => entree(e, 0.1), 0); } });

    // Survol et focus : le titre ou la marque se remet à l'endroit tant que le pointeur ou le focus est là.
    const racines = Array.from(document.querySelectorAll<HTMLElement>('.entete__nom, h1.display, h2.display, [data-endroit]'));
    const vise = (racine: HTMLElement, v: number) => {
      const cibles = racine.matches('[data-endroit]') ? els : els.filter((el) => racine.contains(el));
      cibles.forEach((el) => { const e = etats[els.indexOf(el)]; if (e) gsap.to(e, { tour: v, duration: 0.6, ease: ease.inOut, overwrite: true }); });
    };
    const off: (() => void)[] = [];
    racines.forEach((r) => {
      const on = () => vise(r, 180);
      const no = () => vise(r, 0);
      const fin = (ev: FocusEvent) => { if ((ev.target as HTMLElement).matches(':focus-visible')) on(); };
      if (!isTouch()) { r.addEventListener('pointerenter', on); r.addEventListener('pointerleave', no); }
      r.addEventListener('focusin', fin); r.addEventListener('focusout', no);
      off.push(() => { r.removeEventListener('pointerenter', on); r.removeEventListener('pointerleave', no); r.removeEventListener('focusin', fin); r.removeEventListener('focusout', no); });
    });

    const recolle = () => gsap.delayedCall(0.2, collecte);
    document.fonts?.ready.then(recolle);
    addEventListener('resize', recolle);

    let compte = 0;
    const tick = (t: number) => {
      if (++compte % 30 === 0 && els[0] && !els[0].isConnected) collecte();
      vitesseCible *= 0.9;
      vitesse += (vitesseCible - vitesse) * 0.12;
      pointeur.lisse += (pointeur.x - pointeur.lisse) * 0.06;
      if (repos.amp === 0 && performance.now() - dernierGeste > 1400) startIdle();
      const v = gsap.utils.clamp(-50, 50, vitesse * 1.4);
      const balance = repos.amp * 26 * Math.sin((t / 3.4) * Math.PI * 2);
      visibles.forEach((el) => {
        const e = etats[els.indexOf(el)];
        if (!e) return;
        const a = e.tour + v + (e.h1 ? balance + pointeur.lisse * 40 : 0);
        gsap.set(el, { rotationY: Math.round(a * 10) / 10 });
      });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      removeEventListener('resize', recolle);
      off.forEach((f) => f());
      gsap.killTweensOf(etats);
    };
  });
}
