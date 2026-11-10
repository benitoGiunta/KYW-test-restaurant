// Module pilote « La Ligne » (patterns.md § 1). Une variable : la position de la cabine sur le câble (défilement).
// Elle donne la station atteinte (points allumés, étiquette de l'en-tête) ; la vitesse du défilement, le pointeur et
// l'horloge de repos donnent le balancement de la cabine autour de son crochet (pendule amorti, une seule horloge).
// En mouvement réduit : cabine immobile, toutes les stations allumées, aucun ticker.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, scrollState, prefersReducedMotion, ease } from '../engine';
import { idle } from './idle';

gsap.registerPlugin(ScrollTrigger);

export function startLigne() {
  onPage(({ intro }) => {
    const ligne = document.querySelector<HTMLElement>('.ligne');
    const cab = ligne?.querySelector<HTMLElement>('[data-cabine]');
    const arrivee = cab?.querySelector<HTMLElement>('.cabine__arrivee');
    const corps = cab?.querySelector<HTMLElement>('.cabine__corps');
    const label = document.querySelector<HTMLElement>('[data-station]');
    if (!ligne || !cab || !arrivee || !corps) { if (label) label.textContent = ''; return; }

    const points = [...ligne.querySelectorAll<HTMLElement>('.station__point')];
    const heures = points.map((p) => (p.parentElement?.textContent || '').trim());
    const depart = ligne.dataset.depart || 'Départ';
    let actif = -2;
    const poser = (i: number) => {
      if (i === actif) return;
      actif = i;
      points.forEach((p, k) => p.classList.toggle('is-lit', k <= i));
      if (label) label.textContent = i >= 0 ? `Station ${heures[i]}` : depart;
    };

    if (prefersReducedMotion()) { points.forEach((p) => p.classList.add('is-lit')); if (label) label.textContent = depart; return; }
    ligne.classList.add('is-ligne');

    // Station atteinte : le dernier point passé au-dessus du crochet de la cabine.
    const lire = () => {
      const y = corps.getBoundingClientRect().top;
      let i = -1;
      points.forEach((p, k) => { if (p.getBoundingClientRect().top <= y) i = k; });
      poser(i);
    };
    lire();
    const off = onScroll(lire);

    // Pendule : angle visé = inertie du défilement + souffle de repos + pointeur ; ressort amorti.
    let angle = 0, v = 0;
    const tick = () => {
      const r = gsap.ticker.deltaRatio();
      const vise = gsap.utils.clamp(-16, 16, -scrollState().velocity * 0.4) + Math.sin(idle.t * 1.15) * 1.6 + idle.x * 5;
      v += (vise - angle) * 0.05 * r;
      v *= Math.pow(0.9, r);
      angle += v * r;
      corps.style.rotate = `${angle.toFixed(2)}deg`;
    };
    const st = ScrollTrigger.create({
      trigger: ligne, start: 'top bottom', end: 'bottom top',
      onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });
    if (st.isActive) gsap.ticker.add(tick);

    // Intro : la cabine arrive à quai d'en haut, puis le pendule prend l'élan.
    intro.fromTo(arrivee, { yPercent: -420, autoAlpha: 0 }, {
      yPercent: 0, autoAlpha: 1, duration: 1.1, ease: ease.out, clearProps: 'transform,opacity',
      onComplete: () => { v += 4; },
    }, 0.15);

    return () => { off(); st.kill(); gsap.ticker.remove(tick); ligne.classList.remove('is-ligne'); };
  });
}
