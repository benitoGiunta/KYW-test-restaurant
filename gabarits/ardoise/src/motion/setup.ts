// Motion « Ardoise » : s'efface et se réécrit. Loader ardoise à trait jaune, rideau qui balaie de gauche à droite,
// lignes qui s'écrivent, suggestion du jour effacée puis réécrite, aperçu photo qui suit le pointeur, marquee d'état.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, onScroll, prefersReducedMotion, isTouch } from '../engine';

gsap.registerPlugin(ScrollTrigger);

type Creneau = { ouverture: string; fermeture: string };
type Horaire = { jour: string; creneaux: Creneau[]; note?: string };
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(2, '0'));
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { autoAlpha: 0, y: -6, duration: 0.35, ease: ease.inOut, stagger: 0.05 })
      .to(root, { clipPath: 'inset(0 0 0 100%)', duration: 0.8, ease: ease.inOut }, '-=0.1'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: -100 }, { xPercent: 0, duration: 0.6, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: 100, duration: 0.6, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  onPage(() => {
    const cleanups = [etat(), suggestion(), onglets(), lignesEcrites(), apercu(), prixEcrits(), motsGeants(), aujourdhui(), formulaire()];
    return () => cleanups.forEach((c) => c && c());
  });
}

/* ---------- Outils horaires (aucune date en dur : tout vient de data-horaires et de l'horloge du visiteur) ---------- */
const minutes = (hhmm: string) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const hhmm = (s: string) => s.replace(':', 'h');
function etatOuverture(horaires: Horaire[], now = new Date()) {
  const jourIdx = now.getDay();
  const t = now.getHours() * 60 + now.getMinutes();
  const h = horaires.find((x) => x.jour === JOURS[jourIdx]);
  const ouvert = h?.creneaux.find((c) => t >= minutes(c.ouverture) && t < minutes(c.fermeture));
  if (ouvert) return { ouvert: true, texte: `Ouvert jusqu'à ${hhmm(ouvert.fermeture)}` };
  const plusTard = h?.creneaux.find((c) => t < minutes(c.ouverture));
  if (plusTard) return { ouvert: false, texte: `Fermé, ouvre aujourd'hui à ${hhmm(plusTard.ouverture)}` };
  for (let i = 1; i <= 7; i++) {
    const j = horaires.find((x) => x.jour === JOURS[(jourIdx + i) % 7]);
    if (j?.creneaux.length) return { ouvert: false, texte: `Fermé, ouvre ${i === 1 ? 'demain' : j.jour} à ${hhmm(j.creneaux[0].ouverture)}` };
  }
  return { ouvert: false, texte: 'Fermé' };
}

/** Barre d'état : texte calculé à l'heure du visiteur, défilement lent (idle du site), statique en reduced motion. */
function etat() {
  const root = document.querySelector<HTMLElement>('[data-etat]');
  if (!root) return;
  const horaires = JSON.parse(root.dataset.horaires || '[]') as Horaire[];
  const texte = root.querySelector<HTMLElement>('[data-etat-texte]');
  const copie = root.querySelector<HTMLElement>('[data-etat-copie]');
  const piste = root.querySelector<HTMLElement>('[data-etat-piste]');
  const maj = () => {
    const s = etatOuverture(horaires);
    const base = texte?.textContent?.split(' · ')[0] || '';
    const ligne = `${s.texte} · ${root.dataset.statique || base}`;
    root.dataset.statique = root.dataset.statique || base;
    if (texte) texte.textContent = ligne;
    if (copie) copie.textContent = ligne;
    root.dataset.ouvert = s.ouvert ? 'oui' : 'non';
  };
  maj();
  const id = setInterval(maj, 60_000);
  if (!prefersReducedMotion() && piste) piste.dataset.anime = '';
  return () => clearInterval(id);
}

/** Suggestion du jour : ouvre sur le jour réel ; flèches ; effacement (clip-path gauche → droite) puis réécriture mot à mot. */
function suggestion() {
  const root = document.querySelector<HTMLElement>('[data-jour]');
  if (!root) return;
  const data = JSON.parse(root.dataset.jour || '[]') as { jour: string; texte: string; prix: string | null; placeholder: boolean }[];
  const label = root.querySelector<HTMLElement>('[data-jour-label]')!;
  const texte = root.querySelector<HTMLElement>('[data-jour-texte]')!;
  const prix = root.querySelector<HTMLElement>('[data-jour-prix]')!;
  const marque = root.querySelector<HTMLElement>('[data-jour-marque]')!;
  const ligne = root.querySelector<HTMLElement>('[data-jour-ligne]')!;
  let i = data.findIndex((d) => d.jour === JOURS[new Date().getDay()]);
  if (i < 0) i = 0;
  const reduced = prefersReducedMotion();
  let tl: gsap.core.Timeline | null = null;
  const ecrire = (d: (typeof data)[number], estAujourdhui: boolean) => {
    label.textContent = estAujourdhui ? `Aujourd'hui, ${d.jour}` : d.jour[0].toUpperCase() + d.jour.slice(1);
    texte.innerHTML = d.texte.split(' ').map((m) => `<span class="mot">${m}</span>`).join(' ');
    prix.textContent = d.prix || '';
    marque.hidden = !d.placeholder;
  };
  const aller = (n: number) => {
    i = (n + data.length) % data.length;
    const d = data[i];
    const estAujourdhui = d.jour === JOURS[new Date().getDay()];
    if (reduced) { ecrire(d, estAujourdhui); return; }
    tl?.kill();
    tl = gsap.timeline()
      .to(ligne, { clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: ease.inOut })
      .add(() => ecrire(d, estAujourdhui))
      .set(ligne, { clipPath: 'inset(0 0 0 0)' })
      .from(ligne.querySelectorAll('.mot'), { yPercent: 60, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.08 })
      .from(prix, { autoAlpha: 0, duration: 0.4 }, '-=0.3');
  };
  ecrire(data[i], true);
  const prev = root.querySelector<HTMLButtonElement>('[data-dir="prev"]');
  const next = root.querySelector<HTMLButtonElement>('[data-dir="next"]');
  const onPrev = () => aller(i - 1);
  const onNext = () => aller(i + 1);
  prev?.addEventListener('click', onPrev);
  next?.addEventListener('click', onNext);
  return () => { prev?.removeEventListener('click', onPrev); next?.removeEventListener('click', onNext); tl?.kill(); };
}

/** Onglets midi / soir : soulignement jaune qui glisse ; aria-selected ; panneaux. Par défaut le service en cours ou le soir. */
function onglets() {
  const root = document.querySelector<HTMLElement>('[data-onglets]');
  if (!root) return;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const trait = root.querySelector<HTMLElement>('[data-trait]');
  const panneaux = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!);
  const poser = (tab: HTMLButtonElement, anime: boolean) => {
    if (!trait) return;
    const r = tab.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    if (!anime) gsap.set(trait, { width: r.width, x: r.left - rr.left });
    else gsap.to(trait, { width: r.width, x: r.left - rr.left, duration: 0.5, ease: ease.out });
  };
  const choisir = (idx: number, anime = true) => {
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === idx)); t.tabIndex = k === idx ? 0 : -1; panneaux[k].hidden = k !== idx; });
    poser(tabs[idx], anime);
    const lignes = panneaux[idx].querySelectorAll<HTMLElement>('[data-ecrit]');
    lignes.forEach((l) => ScrollTrigger.refresh());
  };
  const h = new Date().getHours();
  const defaut = tabs.findIndex((t) => t.dataset.service === (h < 15 ? 'midi' : 'soir'));
  choisir(defaut < 0 ? 0 : defaut, false);
  const handlers = tabs.map((t, k) => { const f = () => choisir(k); t.addEventListener('click', f); return f; });
  const clavier = (e: KeyboardEvent) => {
    const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; choisir(n); tabs[n].focus(); }
  };
  root.addEventListener('keydown', clavier);
  const resize = () => { const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'); if (cur >= 0) poser(tabs[cur], false); };
  addEventListener('resize', resize);
  return () => { tabs.forEach((t, k) => t.removeEventListener('click', handlers[k])); root.removeEventListener('keydown', clavier); removeEventListener('resize', resize); };
}

/** Les lignes s'écrivent de haut en bas (clip-path gauche → droite, stagger 0,04). CSS : .motion [data-ecrit] .ligne clip fermé. */
function lignesEcrites() {
  if (prefersReducedMotion()) return;
  const listes = document.querySelectorAll<HTMLElement>('[data-ecrit]');
  listes.forEach((l) => {
    const lignes = l.querySelectorAll<HTMLElement>('.ligne');
    ScrollTrigger.create({
      trigger: l, start: 'top 92%', once: true,
      onEnter: () => {
        l.classList.add('est-ecrit');
        gsap.fromTo(lignes, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: ease.out, stagger: 0.04, clearProps: 'clipPath' });
      },
    });
  });
}

/** Aperçu photo qui suit le pointeur et s'incline selon la vitesse (desktop pointeur fin) ; aussi au focus.
 *  Tout défilement le cache ; il revient au prochain mouvement du pointeur sur une ligne. */
function apercu() {
  const box = document.querySelector<HTMLElement>('[data-apercu]');
  const lignes = [...document.querySelectorAll<HTMLElement>('[data-preview]')];
  if (!box || !lignes.length || isTouch() || prefersReducedMotion() || innerWidth < 1024) return;
  const img = box.querySelector('img')!;
  const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
  const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
  const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
  let lastX = 0, visible = false, src = '';
  const montrer = (s: string) => {
    if (src !== s) { src = s; img.src = s; }
    if (visible) return;
    visible = true;
    gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out', overwrite: true });
  };
  const cacher = () => { if (!visible) return; visible = false; gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: 'expo.out', overwrite: true }); };
  const move = (e: PointerEvent) => {
    x(e.clientX); y(e.clientY); rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6)); lastX = e.clientX;
    const sous = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('[data-preview]');
    if (sous) montrer(sous.dataset.preview!); else cacher();
  };
  const focus = (e: Event) => {
    const el = e.currentTarget as HTMLElement; const r = el.getBoundingClientRect();
    x(r.right - 140); y(r.top + r.height / 2); montrer(el.dataset.preview!);
  };
  lignes.forEach((a) => { a.addEventListener('focus', focus); a.addEventListener('blur', cacher); });
  addEventListener('pointermove', move, { passive: true });
  addEventListener('scroll', cacher, { passive: true });
  const off = onScroll(cacher);
  lignes.slice(0, 8).forEach((a) => { const i = new Image(); i.src = a.dataset.preview!; });
  return () => { removeEventListener('pointermove', move); removeEventListener('scroll', cacher); off(); lignes.forEach((a) => { a.removeEventListener('focus', focus); a.removeEventListener('blur', cacher); }); };
}

/** Prix géants des formules : les chiffres s'écrivent (yPercent par caractère). Texte visible sans JS. */
function prixEcrits() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-prix-ecrit]').forEach((el) => {
    const t = el.textContent || '';
    el.innerHTML = [...t].map((c) => `<span style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    gsap.from(el.children, { yPercent: 70, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
}

/** Mots géants de la salle : glissent à des vitesses différentes au défilement. */
function motsGeants() {
  if (prefersReducedMotion()) return;
  const mots = document.querySelectorAll<HTMLElement>('[data-mots] li');
  if (!mots.length) return;
  mots.forEach((m, k) => {
    const v = [-60, 50, -35][k % 3];
    gsap.fromTo(m, { x: -v }, { x: v, ease: 'none', scrollTrigger: { trigger: m.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/** Tableau des horaires : la ligne du jour réel est marquée (aucune date en dur). */
function aujourdhui() {
  const jour = JOURS[new Date().getDay()];
  document.querySelectorAll<HTMLElement>(`[data-jour-ligne-tab="${jour}"]`).forEach((tr) => { tr.dataset.aujourdhui = ''; });
}

/** Formulaire sans backend : la validation ouvre l'outil de réservation réel ; date minimale = aujourd'hui. */
function formulaire() {
  const form = document.querySelector<HTMLFormElement>('[data-reservation]');
  if (!form) return;
  const date = form.querySelector<HTMLInputElement>('input[type="date"]');
  if (date) { const d = new Date(); date.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
  const go = (e: SubmitEvent) => { e.preventDefault(); window.open(form.action, '_blank', 'noopener'); };
  form.addEventListener('submit', go);
  return () => form.removeEventListener('submit', go);
}
