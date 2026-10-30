// Driver du concept : la frontière. Écrit --split (0 à 100, largeur de la colonne verte en %) et --split-dx (px)
// sur <html>. Chaque section déclare data-voix="deux|gauche|droite|commune|finale" ; un ScrollTrigger par
// section donne la cible. Idle : oscillation au pointeur (quickTo) + respiration (ticker), une seule horloge.
// Scroll différencié : dans les sections [data-decale], la colonne droite reçoit un y scrubbé (15 % de la
// distance parcourue), désactivé sous 768 px et en reduced motion. [data-rejoint] s'ouvre depuis la ligne.
// Liste à stage : [data-stage] + [data-stage-for] (accueil).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isMobile, isTouch, onPage, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger);

const CIBLE: Record<string, number> = { deux: 50, gauche: 100, droite: 0, commune: 50, finale: 50 };
const html = () => document.documentElement;
let versCible: gsap.core.Tween | null = null;

function viser(v: number) {
  const h = html();
  if (prefersReducedMotion()) { h.style.setProperty('--split', String(v)); return; }
  versCible?.kill();
  versCible = gsap.to(h, { '--split': v, duration: 1.1, ease: ease.inOut, overwrite: 'auto' });
}

function idle() {
  if (prefersReducedMotion()) return () => {};
  const h = html();
  const etat = { pointeur: 0, souffle: 0 };
  const versPointeur = gsap.quickTo(etat, 'pointeur', { duration: 0.9, ease: ease.soft });
  const souffle = gsap.to(etat, { souffle: 3, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  const move = (e: PointerEvent) => versPointeur(((e.clientX / innerWidth) * 2 - 1) * 6);
  if (!isTouch()) addEventListener('pointermove', move, { passive: true });
  const tick = () => h.style.setProperty('--split-dx', `${(etat.pointeur + etat.souffle - 1.5).toFixed(2)}px`);
  gsap.ticker.add(tick);
  return () => { removeEventListener('pointermove', move); gsap.ticker.remove(tick); souffle.kill(); h.style.setProperty('--split-dx', '0px'); };
}

export function initDiptyque() {
  const stopIdle = idle();
  addEventListener('pagehide', stopIdle, { once: true });

  onPage(({ intro }) => {
    const reduit = prefersReducedMotion();
    viser(50);

    // Chapitres
    const sections = [...document.querySelectorAll<HTMLElement>('[data-voix]')];
    sections.forEach((s) => {
      const cible = CIBLE[s.dataset.voix || 'deux'] ?? 50;
      ScrollTrigger.create({ trigger: s, start: 'top 55%', end: 'bottom 55%', onToggle: (st) => { if (st.isActive) viser(cible); } });
    });

    // Scroll différencié (colonne droite plus lente)
    if (!reduit && !isMobile()) {
      document.querySelectorAll<HTMLElement>('[data-decale] > .dip__d').forEach((col) => {
        const sec = col.parentElement!;
        gsap.fromTo(col, { y: () => -0.075 * (sec.offsetHeight + innerHeight) }, {
          y: () => 0.075 * (sec.offsetHeight + innerHeight),
          ease: 'none',
          scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        });
      });
    }

    // Sections communes qui s'ouvrent depuis la frontière
    if (!reduit) {
      document.querySelectorAll<HTMLElement>('[data-rejoint]').forEach((el) => {
        gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: ease.inOut, scrollTrigger: { trigger: el, start: 'top 78%', once: true } });
      });
    }

    // Intro du hero : le nom monte derrière sa ligne de base, le reste suit via data-reveal/data-intro
    const nomHero = document.querySelector<HTMLElement>('.hero [data-nom]');
    if (nomHero && !reduit) {
      gsap.set(nomHero.children, { yPercent: 105 });
      intro.to(nomHero.children, { yPercent: 0, duration: 1.4, ease: ease.out }, 0);
    }

    // Liste à stage
    const stage = document.querySelector<HTMLElement>('[data-stage]');
    const lignes = [...document.querySelectorAll<HTMLElement>('[data-stage-for]')];
    if (stage && lignes.length) {
      const images = [...stage.querySelectorAll<HTMLImageElement>('img')];
      const legende = stage.querySelector<HTMLElement>('[data-stage-legende]');
      const montrer = (ligne: HTMLElement) => {
        const id = ligne.dataset.stageFor;
        lignes.forEach((l) => l.classList.toggle('is-on', l === ligne));
        images.forEach((img) => img.classList.toggle('is-on', img.dataset.stage === id));
        if (legende) legende.textContent = ligne.dataset.stageLegende || '';
      };
      montrer(lignes[0]);
      const offs = lignes.flatMap((l) => {
        const on = () => montrer(l);
        l.addEventListener('pointerenter', on);
        l.addEventListener('focus', on);
        return [() => l.removeEventListener('pointerenter', on), () => l.removeEventListener('focus', on)];
      });
      return () => offs.forEach((f) => f());
    }
  });
}
