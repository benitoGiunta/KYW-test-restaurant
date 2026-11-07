// Drivers de page du gabarit « Affiche ». Chacun tourne sur chaque page via onPage() (test de présence), dans le
// gsap.context du moteur : tweens et ScrollTriggers sont revertés au changement de page ; le reste via le cleanup.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, isMobile, jumpTo, onPage, onScroll, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger, SplitText);
const CLAP = { duration: 0.35, ease: ease.spring } as const;
const q = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];

export function registerDrivers() {
  onPage(ouvert);
  onPage(aujourdhui);
  onPage(entete);
  onPage(menuMobile);
  onPage(claque);
  onPage(cercles);
  onPage(empile);
  onPage(galerie);
  onPage(marquee);
  onPage(idle);
  onPage(disque);
}

/* Pastille « ouvert jusqu'à » : calculée à l'heure du visiteur à partir des horaires (data-horaires). */
function ouvert() {
  const pastilles = q('[data-ouvert]');
  if (!pastilles.length) return;
  // Heure de Namur, quel que soit le fuseau du visiteur.
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  const jour = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(parts.weekday); // 0 = lundi
  const minutes = parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10);
  const toMin = (h: string) => parseInt(h.slice(0, 2), 10) * 60 + parseInt(h.slice(3, 5), 10);
  const noms = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  pastilles.forEach((p) => {
    const horaires: { ouverture: string; fermeture: string }[][] = JSON.parse(p.dataset.horaires || '[]');
    const auj = horaires[jour] || [];
    const enCours = auj.find((c) => minutes >= toMin(c.ouverture) && minutes < toMin(c.fermeture));
    const prochain = auj.find((c) => minutes < toMin(c.ouverture));
    let texte = '';
    let etat = 'ferme';
    if (enCours) { texte = `Ouvert jusqu'à ${enCours.fermeture.replace(':', 'h')}`; etat = 'ouvert'; }
    else if (prochain) { texte = `Ouvre à ${prochain.ouverture.replace(':', 'h')}`; etat = 'bientot'; }
    else {
      for (let d = 1; d <= 7; d++) {
        const j = (jour + d) % 7;
        if (horaires[j]?.length) { texte = `Fermé · ouvre ${noms[j]} ${horaires[j][0].ouverture.replace(':', 'h')}`; break; }
      }
    }
    if (texte) { p.textContent = texte; p.dataset.etat = etat; }
  });
}

/* Étiquette « aujourd'hui » sur la carte du jour courant. */
function aujourdhui() {
  const cartes = q('[data-horaires-cartes] [data-jour]');
  if (!cartes.length) return;
  const jour = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', weekday: 'short' }).format(new Date()));
  cartes.forEach((c) => {
    const ok = Number(c.dataset.jour) === jour;
    c.classList.toggle('is-aujourdhui', ok);
    const e = c.querySelector<HTMLElement>('[data-aujourdhui]');
    if (e) e.hidden = !ok;
  });
}

/* En-tête : s'efface vers le bas, revient vers le haut. */
function entete() {
  const h = document.querySelector<HTMLElement>('[data-header]');
  if (!h) return;
  let last = 0;
  const off = onScroll(({ y }) => {
    if (h.classList.contains('is-open')) return;
    h.classList.toggle('is-hidden', y > last && y > 120);
    last = y;
  });
  return () => { off(); h.classList.remove('is-hidden'); };
}

/* Menu mobile : bouton aria-expanded, affiche jaune plein écran. Focus : premier lien à l'ouverture, retour au bouton
   à la fermeture (Échap ou bouton), Tab et Maj+Tab bouclent dans le menu ; un lien suivi ferme le menu. */
function menuMobile() {
  const b = document.querySelector<HTMLButtonElement>('[data-burger]');
  const m = document.querySelector<HTMLElement>('[data-menu]');
  const h = document.querySelector<HTMLElement>('[data-header]');
  if (!b || !m || !h) return;
  const liens = () => [...m.querySelectorAll<HTMLElement>('a[href]')];
  const set = (open: boolean, rendreFocus = false) => {
    b.setAttribute('aria-expanded', String(open));
    b.textContent = open ? 'Fermer' : 'Menu';
    m.classList.toggle('is-open', open);
    h.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('lenis-stopped', open);
    if (open) liens()[0]?.focus({ preventScroll: true });
    else if (rendreFocus) b.focus({ preventScroll: true });
  };
  const ouvert = () => b.getAttribute('aria-expanded') === 'true';
  const toggle = () => set(!ouvert(), true);
  const clavier = (e: KeyboardEvent) => {
    if (!ouvert()) return;
    if (e.key === 'Escape') { set(false, true); return; }
    if (e.key !== 'Tab') return;
    const cycle = [b, ...liens()];
    const i = cycle.indexOf(document.activeElement as HTMLElement);
    const suivant = cycle[(i + (e.shiftKey ? -1 : 1) + cycle.length) % cycle.length];
    if (i === -1 || (e.shiftKey && i === 0) || (!e.shiftKey && i === cycle.length - 1)) { e.preventDefault(); suivant.focus(); }
  };
  const ferme = () => set(false);
  const redim = () => { if (innerWidth > 767 && ouvert()) set(false); };
  b.addEventListener('click', toggle);
  m.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) ferme(); });
  document.addEventListener('keydown', clavier);
  window.addEventListener('resize', redim);
  return () => { b.removeEventListener('click', toggle); document.removeEventListener('keydown', clavier); window.removeEventListener('resize', redim); set(false); };
}

/* Cartes qui claquent (bento, horaires, équipe, avis) : scale 1.06 → 1, y 24 → 0, stagger 0.06, en entrant. */
function claque() {
  if (prefersReducedMotion()) return;
  q('[data-claque]').forEach((grille) => {
    const cartes = [...grille.children];
    gsap.set(cartes, { autoAlpha: 0, scale: 1.06, y: 24 });
    ScrollTrigger.create({
      trigger: grille, start: 'top 85%', once: true,
      onEnter: () => gsap.to(cartes, { autoAlpha: 1, scale: 1, y: 0, ...CLAP, stagger: 0.06, clearProps: 'transform' }),
    });
  });
}

/* Numéros cerclés qui se remplissent (comment ça marche). */
function cercles() {
  if (prefersReducedMotion()) return;
  q('[data-cercles]').forEach((liste) => {
    const cercles = q('.cercle', liste);
    ScrollTrigger.create({
      trigger: liste, start: 'top 80%', once: true,
      onEnter: () => gsap.to(cercles, { '--rempli': 1, duration: 0.45, ease: ease.spring, stagger: 0.12 }),
    });
  });
}

/* Signature « ça s'empile » : scène sticky, timeline scrubée. Chaque couche tombe à son tour, l'item 0n s'allume,
   le prix claque en caractères au dernier état. Reduced : CSS (pile complète, liste allumée). */
function empile() {
  const section = document.querySelector<HTMLElement>('[data-empile]');
  if (!section) return;
  const couches = q('[data-couche]', section);
  const items = q('[data-empile-item]', section);
  const prix = section.querySelector<HTMLElement>('[data-empile-prix]');
  if (prefersReducedMotion() || !couches.length) { items.forEach((i) => i.classList.add('is-on')); return; }
  const split = prix ? SplitText.create(prix, { type: 'chars' }) : null;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true,
      onUpdate: (st) => { const n = Math.floor(st.progress * (couches.length + 0.4)); items.forEach((it, i) => it.classList.toggle('is-on', i < n)); } },
  });
  couches.forEach((c, i) => {
    tl.fromTo(c, { yPercent: -60, rotate: i % 2 ? 8 : -8, autoAlpha: 0, transformOrigin: '50% 50%' }, { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1, ease: ease.spring }, i * 0.9);
  });
  if (split) tl.from(split.chars, { yPercent: 110, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: ease.spring }, couches.length * 0.9 - 0.2);
  if (prix) tl.fromTo(prix, { rotate: -7, scale: 1.18 }, { rotate: -2, scale: 1, duration: 0.5, ease: ease.spring }, couches.length * 0.9 + 0.25);
  tl.to({}, { duration: 0.4 });
  return () => { split?.revert(); if (prix) gsap.set(prix, { clearProps: 'transform' }); items.forEach((i) => i.classList.remove('is-on')); };
}

/* Galerie inclinée : pan horizontal épinglé (desktop), scroll-snap natif (mobile, CSS). */
function galerie() {
  const section = document.querySelector<HTMLElement>('[data-galerie]');
  const piste = section?.querySelector<HTMLElement>('[data-galerie-piste]');
  if (!section || !piste || prefersReducedMotion() || isMobile()) return;
  const tw = gsap.to(piste, {
    x: () => -(piste.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${piste.scrollWidth - window.innerWidth}`, scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
  });
  // Clavier : un lien de la piste qui prend le focus hors écran (disque « Réserver une table ») ramène la piste
  // jusqu'à lui (scroll vertical équivalent, sans lissage) ; le scrub est terminé tout de suite.
  const onFocus = (e: FocusEvent) => {
    const st = tw.scrollTrigger;
    const el = e.target as HTMLElement;
    if (!st || !(el instanceof HTMLElement) || !piste.contains(el)) return;
    const max = piste.scrollWidth - window.innerWidth;
    if (max <= 0) return;
    const gauche = el.getBoundingClientRect().left - piste.getBoundingClientRect().left;
    const x = Math.min(max, Math.max(0, gauche + el.offsetWidth / 2 - window.innerWidth / 2));
    const y = st.start + (x / max) * (st.end - st.start);
    jumpTo(y);
    st.update();
    st.getTween?.()?.progress(1);
    gsap.set(piste, { x: -x });
  };
  section.addEventListener('focusin', onFocus);
  return () => section.removeEventListener('focusin', onFocus);
}

/* Marquee de la carte : un ticker, vitesse liée à la vélocité de scroll. Reduced : fixe. */
function marquee() {
  const piste = document.querySelector<HTMLElement>('[data-marquee]');
  if (!piste || prefersReducedMotion()) return;
  let moitie = piste.scrollWidth / 2;
  const mesure = () => { moitie = piste.scrollWidth / 2; };
  document.fonts.ready.then(mesure); // la police change la largeur : sans re-mesure, le raccord de la boucle saute
  window.addEventListener('resize', mesure);
  let x = 0;
  let v = 0;
  const off = onScroll((s) => { v = s.velocity; });
  const tick = (_t: number, dt: number) => {
    x -= (0.06 + Math.min(Math.abs(v), 40) * 0.01) * dt;
    if (x <= -moitie) x += moitie;
    piste.style.transform = `translate3d(${x}px,0,0)`;
  };
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); off(); window.removeEventListener('resize', mesure); };
}

/* Idle : un seul objet lévite (le plat du hero, ±6 px), pause hors écran, rien en reduced. */
function idle() {
  const plat = document.querySelector<HTMLElement>('[data-levite]');
  if (!plat || prefersReducedMotion()) return;
  const t = gsap.to(plat, { y: -6, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  ScrollTrigger.create({ trigger: plat, start: 'top bottom', end: 'bottom top', onToggle: (st) => (st.isActive ? t.play() : t.pause()) });
}

/* Disque CTA : rotation continue sur le ticker, ×3 au survol, immobile en reduced. */
function disque() {
  const disques = q('[data-disque]');
  if (!disques.length || prefersReducedMotion()) return;
  const offs: (() => void)[] = [];
  disques.forEach((d) => {
    const svg = d.querySelector<SVGElement>('[data-disque-texte]');
    if (!svg) return;
    let a = 0;
    let vitesse = 1;
    const tick = (_t: number, dt: number) => { a = (a + 0.018 * vitesse * dt) % 360; svg.style.transform = `rotate(${a}deg)`; };
    const on = () => { vitesse = 3; };
    const offh = () => { vitesse = 1; };
    gsap.ticker.add(tick);
    d.addEventListener('pointerenter', on);
    d.addEventListener('pointerleave', offh);
    offs.push(() => { gsap.ticker.remove(tick); d.removeEventListener('pointerenter', on); d.removeEventListener('pointerleave', offh); });
  });
  return () => offs.forEach((f) => f());
}
