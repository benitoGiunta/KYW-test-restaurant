// Le verbe du site sur les photos : elles « se posent d'un trait, en biais ». Le bord du masque suit la pente
// de l'accent (62°) et balaie la photo du bas à gauche vers le haut à droite. Jamais sur la photo du hero (LCP).
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, ease } from '../engine';

const FERME = 'polygon(0% 0%, 0% 0%, -34% 100%, -34% 100%)';
const OUVERT = 'polygon(0% 0%, 134% 0%, 100% 100%, -34% 100%)';

export const biais = () => onPage(() => {
  const cadres = [...document.querySelectorAll<HTMLElement>('[data-biais]')];
  if (!cadres.length || prefersReducedMotion()) return;
  cadres.forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    tl.fromTo(el, { clipPath: FERME }, { clipPath: OUVERT, duration: 1.3, ease: ease.out, clearProps: 'clipPath' }, 0);
    if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: ease.out, clearProps: 'transform' }, 0);
  });
});
