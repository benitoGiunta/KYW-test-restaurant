// Code de page (dans onPage, nettoyé par le contexte de l'engine) : la route de la carte suit la rubrique
// lue (aria-current="location", bande défilante recentrée au téléphone) ; la route de l'histoire allume
// ses étapes au fil de la lecture. Fonctionne aussi en mouvement réduit (aucune animation, des états).
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion } from '../engine';

export function startPages() {
  onPage(() => {
    const nav = document.querySelector<HTMLElement>('.carte__route');
    if (nav) {
      const liens = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
      liens.forEach((a) => {
        const sec = document.getElementById(a.hash.slice(1));
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec, start: 'top 45%', end: 'bottom 45%',
          // La dernière étape entrée reste courante entre deux rubriques (pas de trou dans l'état).
          onToggle: (s) => {
            if (!s.isActive) { if (s.direction < 0 && s.progress === 0 && a === liens[0]) a.removeAttribute('aria-current'); return; }
            liens.forEach((l) => l !== a && l.removeAttribute('aria-current'));
            a.setAttribute('aria-current', 'location');
            if (nav.scrollWidth > nav.clientWidth + 2) {
              nav.scrollTo({ left: a.parentElement!.offsetLeft - 16, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
            }
          },
        });
      });
    }
    const chemin = document.querySelector<HTMLElement>('.chemin__etapes');
    if (chemin) {
      const lis = [...chemin.querySelectorAll<HTMLElement>('li')];
      const allume = (p: number) => {
        chemin.style.setProperty('--fil', p.toFixed(3));
        lis.forEach((li, i) => li.classList.toggle('is-passe', p >= i / (lis.length - 1) - 0.02));
      };
      ScrollTrigger.create({
        trigger: chemin, start: 'top 70%', end: 'bottom 45%',
        onUpdate: (s) => allume(s.progress),
        onRefresh: (s) => allume(s.progress),
      });
    }
  });
}
