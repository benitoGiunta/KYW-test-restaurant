// Pilote du concept « Trente-quatre couverts ». Une seule variable, `n` (couverts allumés), distribuée à tout ce qui
// porte le concept : les plans de salle ([data-plan]), le registre du pied ([data-registre]) et la phrase d'état
// ([data-plan-etat]). Le champ « Nombre de couverts » de la réservation écrit `n`.
// Signature « la salle se dresse » : nappes puis 34 places posées une à une, puis `n` places s'allument.
// Repos : le maître d'hôtel cherche une place (une place libre s'allume doucement, un halo s'en écarte, puis une autre),
// sur l'horloge GSAP, en pause hors écran ; la place visée par le pointeur devient la suivante. Rien en mouvement réduit.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion, isTouch, ease } from '../engine';

const NS = 'http://www.w3.org/2000/svg';
const PERIODE = 2.4; // secondes par place cherchée (DESIGN.md, état de repos)
const PAS = 0.04; // délai entre deux places qui s'allument

type Porteur = { places: Element[]; n: number };
let porteurs: Porteur[] = [];
let n = 0;

/** Allume les `cible` premières places de chaque porteur ; `anime` étale l'allumage place par place. */
function poser(cible: number, anime: boolean) {
  n = cible;
  for (const p of porteurs) {
    const avant = p.n;
    p.places.forEach((el, i) => {
      const on = i < cible;
      if (el.classList.contains('is-lit') === on) return;
      const rang = on ? i - avant : avant - 1 - i;
      (el as HTMLElement).style.transitionDelay = anime ? `${Math.max(0, rang) * PAS}s` : '0s';
      el.classList.toggle('is-lit', on);
    });
    p.n = cible;
  }
  const total = Number(document.querySelector<HTMLElement>('[data-plan]')?.dataset.total || 34);
  document.querySelectorAll<HTMLElement>('[data-plan-etat]').forEach((el) => {
    const t = cible > total ? `La salle compte ${total} couverts au plus.`
      : cible > 0 ? `Votre table : ${cible} couvert${cible > 1 ? 's' : ''} sur les ${total} de la salle.`
      : (el.dataset.vide || '');
    if (el.textContent !== t) el.textContent = t;
  });
}

/** Signature : la salle se dresse. Renvoie la timeline (en pause). */
function dresser(svg: SVGSVGElement) {
  const nappes = svg.querySelectorAll('.plan__nappe');
  const places = svg.querySelectorAll('.plan__place');
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(nappes, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: ease.soft, stagger: 0.05 }, 0)
    .fromTo(places, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: ease.soft, stagger: 0.035 }, 0.25);
  return tl;
}

/** Repos et pointeur sur un plan. Renvoie le tick à brancher sur gsap.ticker. */
function veiller(svg: SVGSVGElement, pret: () => boolean) {
  const places = [...svg.querySelectorAll<SVGCircleElement>('.plan__place')];
  const halo = document.createElementNS(NS, 'circle');
  halo.setAttribute('class', 'plan__halo');
  halo.setAttribute('r', '7');
  svg.appendChild(halo);
  let cycle = -1;
  let cur: SVGCircleElement | null = null;
  let vise: SVGCircleElement | null = null;
  const choisir = (c: number) => {
    const libres = places.filter((p) => !p.classList.contains('is-lit'));
    if (!libres.length) return null;
    if (vise && libres.includes(vise)) return vise;
    return libres[(c * 13 + 5) % libres.length];
  };
  const tick = (t: number) => {
    if (!pret()) return;
    const c = Math.floor(t / PERIODE);
    const ph = (t % PERIODE) / PERIODE;
    if (c !== cycle) {
      cycle = c;
      cur?.classList.remove('is-veille');
      cur?.style.removeProperty('--v');
      cur = choisir(c);
      if (!cur) { halo.style.opacity = '0'; return; }
      cur.classList.add('is-veille');
      halo.setAttribute('cx', cur.getAttribute('cx')!);
      halo.setAttribute('cy', cur.getAttribute('cy')!);
    }
    if (!cur) return;
    cur.style.setProperty('--v', Math.sin(Math.PI * ph).toFixed(3));
    halo.setAttribute('r', (7 + 11 * ph).toFixed(2));
    halo.style.opacity = ((1 - ph) * 0.85).toFixed(3);
  };
  // Influence du pointeur : la place la plus proche est désignée et devient la prochaine cherchée.
  const move = (e: PointerEvent) => {
    const m = svg.getScreenCTM();
    if (!m) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    let best: SVGCircleElement | null = null, d = Infinity;
    for (const p of places) {
      const dd = (Number(p.getAttribute('cx')) - pt.x) ** 2 + (Number(p.getAttribute('cy')) - pt.y) ** 2;
      if (dd < d) { d = dd; best = p; }
    }
    if (best !== vise) { vise?.classList.remove('is-vise'); vise = best; vise?.classList.add('is-vise'); }
  };
  const leave = () => { vise?.classList.remove('is-vise'); vise = null; };
  if (!isTouch()) { svg.addEventListener('pointermove', move); svg.addEventListener('pointerleave', leave); }
  const stop = () => {
    svg.removeEventListener('pointermove', move);
    svg.removeEventListener('pointerleave', leave);
    cur?.classList.remove('is-veille');
    leave();
    halo.remove();
  };
  return { tick, stop };
}

export function startCouverts() {
  onPage(({ intro }) => {
    const plans = [...document.querySelectorAll<SVGSVGElement>('[data-plan]')];
    const registres = [...document.querySelectorAll<HTMLElement>('[data-registre]')];
    // Mouvement permis : les plans s'éteignent, ils s'allumeront à la fin du dressage.
    if (!prefersReducedMotion()) plans.forEach((s) => s.querySelectorAll('.plan__place.is-lit').forEach((p) => p.classList.remove('is-lit')));
    porteurs = [...plans.map((s) => s.querySelectorAll('.plan__place')), ...registres.map((r) => r.querySelectorAll('i'))]
      .map((l) => [...l].sort((a, b) => Number((a as HTMLElement).dataset.n || 0) - Number((b as HTMLElement).dataset.n || 0)))
      .map((places) => ({ places, n: places.filter((p) => p.classList.contains('is-lit')).length }));
    const lit = Number(plans[0]?.dataset.lit ?? 2);
    n = lit;
    const nettoyages: (() => void)[] = [];

    // La réservation écrit `n` (aussi en mouvement réduit : c'est une interaction, pas un décor).
    const champ = document.querySelector<HTMLInputElement>('[data-couverts]');
    if (champ) {
      const lire = () => { const v = parseInt(champ.value, 10); poser(Number.isFinite(v) && v > 0 ? v : lit, !prefersReducedMotion()); };
      champ.addEventListener('input', lire);
      nettoyages.push(() => champ.removeEventListener('input', lire));
    }

    if (!prefersReducedMotion()) {
      for (const svg of plans) {
        const tl = dresser(svg);
        let fini = false;
        tl.eventCallback('onComplete', () => { fini = true; poser(n, true); });
        if (svg.getBoundingClientRect().top < innerHeight * 0.9) intro.add(() => tl.play(), 0.1);
        else ScrollTrigger.create({ trigger: svg, start: 'top 85%', once: true, onEnter: () => tl.play() });
        const v = veiller(svg, () => fini);
        const st = ScrollTrigger.create({ trigger: svg, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? gsap.ticker.add(v.tick) : gsap.ticker.remove(v.tick)) });
        if (st.isActive) gsap.ticker.add(v.tick);
        nettoyages.push(() => { gsap.ticker.remove(v.tick); st.kill(); v.stop(); tl.kill(); });
      }
      for (const r of registres) {
        gsap.fromTo(r.querySelectorAll('i'), { autoAlpha: 0, scale: 0.4 }, {
          autoAlpha: 1, scale: 1, duration: 0.5, ease: ease.soft, stagger: 0.025,
          scrollTrigger: { trigger: r, start: 'top 92%', once: true },
        });
      }
    }
    return () => { nettoyages.forEach((f) => f()); porteurs = []; };
  });
}
