// Module pilote du concept (patterns.md § 1) : UNE variable, la progression du service (0 → 3, quatre assiettes),
// distribuée à tout ce qui porte le concept sur l'accueil : la position et la rotation des assiettes sur la table,
// la légende « Service n sur 4 », la classe de chapitre actif. Entrée de repos : l'assiette en cours tourne lentement
// (comme une assiette que l'on tourne pour la présenter) et s'incline avec le pointeur. Sur les autres pages, les
// assiettes marquées [data-plate-idle] font la même chose, seules.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion } from '../engine';
import { idle } from './idle';

gsap.registerPlugin(ScrollTrigger);

type Etat = { plates: HTMLElement[]; legende: HTMLElement | null; titres: string[]; chapitres: HTMLElement[] };
let current = 0;

function apply(e: Etat, p: number, drift = 0, tilt = 0) {
  const n = e.plates.length;
  const actif = Math.round(gsap.utils.clamp(0, n - 1, p));
  e.plates.forEach((el, i) => {
    const d = p - i;                                   // distance au service en cours (en assiettes)
    const x = d * -118;                                // l'assiette suivante attend à droite, la précédente est débarrassée à gauche
    const rot = d * 28 + (i === actif ? drift : 0);    // elle se pose en tournant un peu, puis respire au repos
    const op = gsap.utils.clamp(0, 1, 1.25 - Math.abs(d) * 1.15);
    const sc = 1 - Math.min(0.12, Math.abs(d) * 0.1);
    el.style.transform = `translate3d(${x}%, 0, 0) rotate(${rot}deg) scale(${sc}) perspective(900px) rotateY(${tilt}deg)`;
    el.style.opacity = String(op);
  });
  if (e.legende) {
    const texte = `Service ${actif + 1} sur ${n}`;
    const spanN = e.legende.querySelector<HTMLElement>('[data-service-n]');
    const spanT = e.legende.querySelector<HTMLElement>('[data-service-titre]');
    if (spanN && spanN.textContent !== texte) spanN.textContent = texte;
    if (spanT && spanT.textContent !== e.titres[actif]) spanT.textContent = e.titres[actif];
  }
  e.chapitres.forEach((c, i) => c.classList.toggle('is-actif', i === actif));
}

export function startService() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    const section = document.querySelector<HTMLElement>('[data-service]');
    const offs: (() => void)[] = [];

    // Assiettes seules (carte, réservation, 404, hero de l'accueil) : respiration lente, inclinaison au pointeur.
    const seules = [...document.querySelectorAll<HTMLElement>('[data-plate-idle]')];
    if (seules.length) {
      const tick = () => {
        const rot = Math.sin(idle.t * 0.35) * 2.2 + idle.x * 4;
        const ty = idle.x * 6, tx = -idle.y * 5;
        for (const el of seules) el.style.transform = `perspective(900px) rotateX(${tx}deg) rotateY(${ty}deg) rotate(${rot}deg)`;
      };
      const sts = seules.map((el) => ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)) }));
      offs.push(() => { gsap.ticker.remove(tick); sts.forEach((s) => s.kill()); });
    }

    if (section) {
      const e: Etat = {
        plates: [...section.querySelectorAll<HTMLElement>('[data-plate]')],
        legende: section.querySelector<HTMLElement>('[data-service-legende]'),
        titres: [...section.querySelectorAll<HTMLElement>('[data-chapitre]')].map((c) => c.dataset.chapitre || ''),
        chapitres: [...section.querySelectorAll<HTMLElement>('[data-chapitre]')],
      };
      const liste = section.querySelector<HTMLElement>('[data-chapitres]')!;
      const n = e.plates.length;
      current = 0;
      apply(e, 0);
      // La variable : progression dans la liste des chapitres, lissée par scrub.
      const st = ScrollTrigger.create({
        trigger: liste, start: 'top 55%', end: 'bottom 55%', scrub: 0.6,
        invalidateOnRefresh: true,
        // Assiette i au centre quand le chapitre i passe la ligne des 55 % (révision 1 : progress * (n - 1) décalait la légende d'un service).
        onUpdate: (self) => { current = gsap.utils.clamp(0, n - 1, self.progress * n - 0.5); },
      });
      const tick = () => apply(e, current, Math.sin(idle.t * 0.35) * 2.2 + idle.x * 4, idle.x * 6);
      const vis = ScrollTrigger.create({ trigger: section, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)) });
      offs.push(() => { gsap.ticker.remove(tick); st.kill(); vis.kill(); });
    }
    return () => offs.forEach((f) => f());
  });
}
