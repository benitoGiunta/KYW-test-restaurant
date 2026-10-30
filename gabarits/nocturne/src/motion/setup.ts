// Motion globale « Nocturne » : loader horloge de service (19:00 → 21:00), rideau noir à filet ambré, lampe,
// volets du hero, statut « ouvert ce soir » calculé côté client, origin story au scroll, boutons de coin.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile } from '../engine';
import { initLampe, enregistrerFigures, allumer, lampeActive } from './lampe';

export function setupMotion() {
  const loader = document.getElementById('loader');
  const de = loader?.dataset.de || '19:00';
  const a = loader?.dataset.a || '21:00';
  const mn = (h: string) => parseInt(h.slice(0, 2)) * 60 + parseInt(h.slice(3));
  setLoaderFormat((p) => {
    const m = mn(de) + Math.round(((mn(a) - mn(de)) * p) / 100);
    return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  });
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { opacity: 0, duration: 0.25, ease: 'steps(3)', stagger: 0.08 })
      .to(root, { yPercent: -102, duration: isMobile() ? 0.6 : 0.9, ease: ease.inOut }, '-=0.05'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.8, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
  initLampe();

  onPage(({ intro }) => {
    const cleanups: (() => void)[] = [];
    cleanups.push(enregistrerFigures(document));
    cleanups.push(heroIntro(intro));
    cleanups.push(statut());
    cleanups.push(originStory());
    cleanups.push(coins());
    cleanups.push(scintille());
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : les volets s'écartent et révèlent le titre, la lampe s'allume. Mobile : simple fondu, titre déjà peint. */
function heroIntro(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (prefersReducedMotion()) { allumer(1, 0.01); return () => {}; }
  const volets = hero ? hero.querySelectorAll<HTMLElement>('[data-volet]') : [];
  const apres = hero ? hero.querySelectorAll<HTMLElement>('[data-hero-apres]') : [];
  const tl = gsap.timeline({ paused: true });
  if (volets.length && !isMobile()) {
    volets.forEach((v) => gsap.set(v, { xPercent: v.dataset.volet === 'gauche' ? 100 : -100 }));
    tl.to(volets, { xPercent: 0, duration: 1.4, ease: ease.inOut }, 0);
  }
  if (apres.length) tl.fromTo(apres, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: ease.out, stagger: 0.1 }, 0.7);
  tl.add(() => allumer(1, 1.6), 0.6);
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); };
}

/** Badge « ouvert ce soir jusqu'à … » calculé à l'heure de Bruxelles depuis site.horaires (data-statut = JSON). */
function statut() {
  const el = document.querySelector<HTMLElement>('[data-statut]');
  if (!el) return () => {};
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const horaires = JSON.parse(el.dataset.statut || '[]') as { jour: string; creneaux: { ouverture: string; fermeture: string }[] }[];
  const h = (s: string) => s.replace(':00', 'h').replace(':', 'h');
  const mn = (s: string) => parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3));
  const texte = el.querySelector<HTMLElement>('[data-statut-texte]') || el;
  const update = () => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Brussels' }));
    const jour = jours[now.getDay()];
    const m = now.getHours() * 60 + now.getMinutes();
    const auj = horaires.find((x) => x.jour === jour);
    const encours = auj?.creneaux.find((c) => m >= mn(c.ouverture) - 30 && m < mn(c.fermeture));
    let t = '';
    if (encours) t = `Ouvert, dernier service à ${h(encours.fermeture)}`;
    else {
      const soir = auj?.creneaux.find((c) => mn(c.ouverture) >= 17 * 60 && m < mn(c.ouverture) - 30);
      if (soir) t = `Ouvert ce soir dès ${h(soir.ouverture)}`;
      else {
        for (let i = 1; i <= 7 && !t; i++) {
          const j = jours[(now.getDay() + i) % 7];
          const c = horaires.find((x) => x.jour === j)?.creneaux[0];
          if (c) t = `Fermé ce soir, prochain service ${i === 1 ? 'demain' : j} à ${h(c.ouverture)}`;
        }
      }
    }
    texte.textContent = t || 'Fermé';
    el.classList.toggle('is-ouvert', !!encours);
  };
  update();
  const id = setInterval(update, 60000);
  return () => clearInterval(id);
}

/** Origin story : scène collante, une phrase active selon la progression du scroll. Reduced : empilée (CSS). */
function originStory() {
  const scene = document.querySelector<HTMLElement>('[data-origin]');
  if (!scene || prefersReducedMotion()) return () => {};
  const phrases = scene.querySelectorAll<HTMLElement>('[data-origin-phrase]');
  if (!phrases.length) return () => {};
  const n = phrases.length;
  let actuelle = -1;
  const activer = (i: number) => {
    if (i === actuelle) return;
    actuelle = i;
    phrases.forEach((p, k) => p.classList.toggle('is-active', k === i));
    scene.style.setProperty('--origin-p', String((i + 1) / n));
  };
  const st = ScrollTrigger.create({
    trigger: scene, start: 'top top', end: 'bottom bottom',
    onUpdate: (s) => activer(Math.min(n - 1, Math.floor(s.progress * n))),
    onEnter: () => activer(0),
  });
  activer(0);
  return () => st.kill();
}

/** Boutons de coin : se retirent quand le pied de page est visible (ils ne couvrent jamais un texte). */
function coins() {
  const coins = document.querySelector<HTMLElement>('[data-coins]');
  const footer = document.querySelector<HTMLElement>('.footer');
  if (!coins || !footer) return () => {};
  const io = new IntersectionObserver(([e]) => coins.classList.toggle('is-retire', e.isIntersecting), { threshold: 0.05 });
  io.observe(footer);
  return () => io.disconnect();
}

/** Tube : au survol ou au focus, le remplissage s'allume en trois crans (scintillement), seulement avec la lampe. */
function scintille() {
  if (!lampeActive()) return () => {};
  const tubes = document.querySelectorAll<HTMLElement>('[data-tube]');
  const offs: (() => void)[] = [];
  tubes.forEach((el) => {
    const on = () => { el.classList.add('is-plein'); gsap.fromTo(el, { '--tube-a': 0.9 }, { '--tube-a': 1, duration: 0.25, ease: 'steps(3)' }); };
    const off = () => el.classList.remove('is-plein');
    el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', off);
    el.addEventListener('focusin', on); el.addEventListener('focusout', off);
    offs.push(() => { el.removeEventListener('pointerenter', on); el.removeEventListener('pointerleave', off); el.removeEventListener('focusin', on); el.removeEventListener('focusout', off); });
  });
  return () => offs.forEach((f) => f());
}
