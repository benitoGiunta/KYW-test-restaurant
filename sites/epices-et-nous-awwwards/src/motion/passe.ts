// Module pilote « Deux voix » (patterns.md § 1). Une variable : le côté du passe où se tient le visiteur,
// de -1 (cuisine, à gauche de l'axe) à +1 (salle, à droite), lue au pointeur et lissée.
// Elle est distribuée à tout ce qui porte le concept :
//   - chaque & posé sur l'axe ([data-passe]) penche vers la voix qui parle (rotation) ;
//   - la variable CSS --cote sur <html> décale la pastille safran du filet de l'axe ([data-pastille]).
// État de repos (startIdle) : une pastille safran descend le passe à vitesse constante, comme une assiette
// qui passe de la cuisine à la salle, et revient par le haut ; le & oscille de quelques degrés.
// Une horloge (gsap.ticker), pause hors écran, rien en mouvement réduit.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, isTouch } from '../engine';

const etat = { cote: 0, cible: 0, t: 0 };

function startIdle(pastilles: HTMLElement[], visibles: Set<Element>) {
  // Écoulement constant (lecons : une respiration sinusoïdale seule passe par des points morts).
  const descente = 46; // px par seconde
  return (dt: number) => {
    etat.t += dt;
    pastilles.forEach((p) => {
      if (!visibles.has(p)) return;
      const h = p.parentElement?.clientHeight ?? 0;
      if (h < 40) return;
      const y = gsap.utils.wrap(-24, h, etat.t * descente);
      gsap.set(p, { y });
    });
  };
}

export function startPasse() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    const ets = [...document.querySelectorAll<HTMLElement>('[data-passe]')];
    const pastilles = [...document.querySelectorAll<HTMLElement>('[data-pastille]')];
    if (!ets.length && !pastilles.length) return;

    const visibles = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
    });
    [...ets, ...pastilles].forEach((el) => io.observe(el));

    const surPointeur = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      etat.cible = gsap.utils.clamp(-1, 1, (e.clientX - innerWidth / 2) / (innerWidth / 2));
    };
    if (!isTouch()) addEventListener('pointermove', surPointeur, { passive: true });

    const repos = startIdle(pastilles, visibles);
    const html = document.documentElement;
    const tick = (_t: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      etat.cote += (etat.cible - etat.cote) * Math.min(1, dt * 4);
      repos(dt);
      const oscille = Math.sin(etat.t * ((Math.PI * 2) / 6.5)) * 4;
      ets.forEach((el) => {
        if (visibles.has(el)) gsap.set(el, { rotation: etat.cote * 9 + oscille });
      });
      html.style.setProperty('--cote', etat.cote.toFixed(3));
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      removeEventListener('pointermove', surPointeur);
      io.disconnect();
      html.style.removeProperty('--cote');
    };
  });
}
