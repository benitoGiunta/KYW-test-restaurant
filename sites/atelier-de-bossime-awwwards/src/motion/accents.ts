// Module pilote du concept « Les trois accents » (patterns.md § 1).
// Une variable par porteur, toujours la même règle : un accent i est tracé à clamp(v * 3 - i, 0, 1).
//   - en-tête : v = progression de lecture de la page (les accents marquent où vous en êtes) ;
//   - narration « Trois accents » de l'accueil : v = progression dans les trois chapitres (signature) ;
//   - hero, pied de page : v passe de 0 à 1 à l'intro ou à l'entrée dans l'écran (les accents se posent d'un trait).
// Entrée de repos : `--vent` sur <html>, une oscillation lente de 1 à 2 degrés et la direction du pointeur (±4°) :
// les trois traits bougent comme trois pousses au vent. Un seul setProperty par frame, sur le ticker GSAP.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, ease } from '../engine';
import { idle } from './idle';

gsap.registerPlugin(ScrollTrigger);

const trace = (v: number, i: number) => gsap.utils.clamp(0, 1, v * 3 - i);
/** Pose les trois variables d'un groupe d'accents (0 → 1 : aucun → les trois). */
export function poser(svg: Element | null, v: number) {
  if (!svg) return;
  const s = (svg as SVGElement).style;
  for (let i = 0; i < 3; i++) s.setProperty(`--a${i}`, trace(v, i).toFixed(3));
}
const groupe = (id: string) => document.querySelector(`[data-accents="${id}"]`);

export function startAccents() {
  const reduit = prefersReducedMotion();

  // 1. En-tête : progression de lecture.
  onScroll(({ progress }) => poser(groupe('tete'), progress));
  onPage(() => { poser(groupe('tete'), 0); });

  // 2. Hero : les trois accents se posent d'un trait, l'un après l'autre (intro de la page).
  onPage(({ intro }) => {
    const svg = groupe('hero');
    if (!svg || reduit) return;
    const o = { v: 0 };
    poser(svg, 0);
    intro.add(gsap.to(o, { v: 1, duration: 1.2, ease: 'power2.inOut', onUpdate: () => poser(svg, o.v) }), 0.25);
    const photo = document.querySelector('.cadre--hero img');
    if (photo) intro.add(gsap.fromTo(photo, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: ease.out }), 0);
  });

  // 3. Signature : « Trois accents ». Chaque chapitre trace son accent pendant qu'il traverse le milieu de l'écran.
  onPage(() => {
    const scene = document.querySelector<HTMLElement>('[data-trois]');
    const svg = groupe('trois');
    if (!scene || !svg) return;
    const etat = scene.querySelector<HTMLElement>('[data-trois-etat]');
    const chapitres = [...scene.querySelectorAll<HTMLElement>('[data-chapitre]')];
    const noms = ['Premier accent', 'Deuxième accent', 'Troisième accent'];
    if (reduit) { poser(svg, 1); return; }
    const parts = chapitres.map(() => 0);
    const maj = () => {
      const v = parts.reduce((a, b) => a + b, 0) / 3;
      poser(svg, v);
      const actif = parts.findLastIndex((p) => p > 0.02);
      scene.dataset.actif = String(actif);
      chapitres.forEach((c, i) => c.classList.toggle('is-actif', i === actif));
      const texte = actif < 0 ? 'Trois piliers' : `${noms[actif]} : ${chapitres[actif].dataset.titre?.toLowerCase()}`;
      if (etat && etat.textContent !== texte) etat.textContent = texte;
    };
    poser(svg, 0);
    chapitres.forEach((c, i) => ScrollTrigger.create({
      trigger: c, start: 'top 72%', end: 'center 45%', scrub: 0.6, invalidateOnRefresh: true,
      onUpdate: (st) => { parts[i] = st.progress; maj(); },
    }));
    maj();
  });

  // 4. Pied de page et accents de la réservation : se posent quand ils entrent à l'écran.
  onPage(() => {
    const cibles = [...document.querySelectorAll<SVGElement>('[data-accents="pied"], [data-accents="resa"], [data-accents^="facon-"]')];
    if (reduit) { cibles.forEach((s) => poser(s, 1)); return; }
    cibles.forEach((svg) => {
      const o = { v: 0 };
      poser(svg, 0);
      gsap.to(o, { v: 1, duration: 1.1, ease: 'power2.inOut', onUpdate: () => poser(svg, o.v),
        scrollTrigger: { trigger: svg, start: 'top 92%', once: true } });
    });
  });

  // 5. Repos : le vent dans les trois pousses.
  if (reduit) return;
  const html = document.documentElement;
  let dernier = '';
  gsap.ticker.add(() => {
    const v = Math.sin(idle.t * 0.9) * 1.6 + Math.sin(idle.t * 0.37 + 1.3) * 0.8 + idle.x * 8 + idle.y * 3;
    const s = v.toFixed(2);
    if (s !== dernier) { html.style.setProperty('--vent', s); dernier = s; }
  });
}
