// Signature : l'impression typographique (DESIGN.md, Concept Card). Chaque grand titre (.display de <main>)
// se pose en deux temps, comme un tirage : un premier passage pâle et légèrement décalé (le pressentiment),
// puis l'encre qui se cale à son repère. Titre d'ouverture (hero, tête de page, 404) : avec l'intro de page ;
// les autres : à l'entrée dans l'écran. Texte réel (SplitText), rien en mouvement réduit (le CSS laisse tout visible).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { onPage, ease, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function startImpression() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('main .display').forEach((el) => {
      const ouverture = !!el.closest('.hero, .page-tete, .perdue');
      const s = { done: false, requested: false, tl: undefined as gsap.core.Timeline | undefined };
      SplitText.create(el, {
        type: 'lines,words,chars',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          if (s.done) return;
          // Un mot seul (« Intuition ») s'imprime lettre à lettre, une phrase mot à mot.
          const cibles = self.words.length < 3 ? self.chars : self.words;
          const pas = self.words.length < 3 ? 0.045 : 0.05;
          const tl = gsap.timeline({ paused: !s.requested, onComplete: () => { s.done = true; } });
          tl.from(cibles, { yPercent: 108, duration: 1.1, ease: ease.out, stagger: pas }, 0)
            .fromTo(cibles, { opacity: 0.2, x: '0.05em' }, { opacity: 1, x: 0, duration: 0.8, ease: ease.soft, stagger: pas }, 0.55);
          s.tl = tl;
          return tl;
        },
      });
      const jouer = () => { s.requested = true; s.tl?.play(); };
      if (ouverture) intro.add(jouer, 0.1);
      else ScrollTrigger.create({ trigger: el, start: 'top 86%', once: true, onEnter: jouer });
    });
  });
}
