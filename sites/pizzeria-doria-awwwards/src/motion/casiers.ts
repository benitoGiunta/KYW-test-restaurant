// Module pilote « Casiers » : une seule variable, le tirage de chaque façade de tiroir (--tire-js, 0 = fermé,
// 1 = tiré), distribuée aux rangées du mur (accueil) et aux façades de la carte. Trois sources la nourrissent :
// la vitesse de défilement (les tiroirs glissent sous l'élan), la proximité du pointeur (le tiroir le plus proche
// s'entrouvre) et l'état de repos (startIdle : un tiroir après l'autre s'entrouvre puis se referme).
// Une seule horloge : gsap.ticker. Aucun code DOM au niveau du module ; tout passe par onPage() avec nettoyage.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, scrollToTarget, ease, prefersReducedMotion, isTouch } from '../engine';

type Face = { el: HTMLElement; v: number; idle: number; vu: boolean };

const IDLE_DELAI = 2.6; // secondes sans geste avant le repos
const SEL = '.rang, .tiroir__face';

export function setupCasiers() {
  let vitesse = 0;
  onScroll((s) => { vitesse = s.velocity || 0; });

  onPage(() => {
    if (prefersReducedMotion()) return;
    const faces: Face[] = [...document.querySelectorAll<HTMLElement>(SEL)].map((el) => ({ el, v: 0, idle: 0, vu: false }));
    if (!faces.length) return;

    // Entrée des rangées : elles coulissent depuis la gauche, une à une (opacité seule : restent focalisables).
    ScrollTrigger.batch(faces.map((f) => f.el), {
      start: 'top 92%',
      once: true,
      onEnter: (els) => gsap.from(els, { x: -48, opacity: 0, duration: 0.7, ease: ease.out, stagger: 0.06, clearProps: 'transform,opacity' }),
    });

    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => { const f = faces.find((x) => x.el === e.target); if (f) f.vu = e.isIntersecting; });
    });
    faces.forEach((f) => io.observe(f.el));

    let py = -1e4;
    let calme = 0; // secondes depuis le dernier geste
    let idleTl: gsap.core.Timeline | null = null;
    let idleIdx = 0;
    const geste = () => { calme = 0; if (idleTl) { idleTl.kill(); idleTl = null; faces.forEach((f) => { f.idle = 0; }); } };
    const move = (e: PointerEvent) => { py = e.clientY; geste(); };
    const sortie = () => { py = -1e4; };
    if (!isTouch()) addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', sortie);
    addEventListener('keydown', geste);
    addEventListener('wheel', geste, { passive: true });
    addEventListener('touchstart', geste, { passive: true });

    /** Repos : le tiroir visible suivant s'entrouvre lentement puis se referme, et ainsi de suite. */
    const startIdle = () => {
      const visibles = faces.filter((f) => f.vu && !f.el.closest('details[open]'));
      if (!visibles.length) return;
      const f = visibles[idleIdx++ % visibles.length];
      idleTl = gsap.timeline({ onComplete: () => { idleTl = null; if (calme >= IDLE_DELAI) startIdle(); } })
        .to(f, { idle: 1, duration: 1.1, ease: ease.inOut })
        .to(f, { idle: 0, duration: 1.1, ease: ease.inOut }, '+=0.5');
    };

    const tick = (_t: number, dt: number) => {
      const s = dt / 1000;
      calme += s;
      if (Math.abs(vitesse) > 0.2) geste();
      if (calme >= IDLE_DELAI && !idleTl) startIdle();
      const elan = Math.min(Math.abs(vitesse) / 40, 0.45);
      const lissage = 1 - Math.pow(0.001, s); // ~ même amortissement à 60 et 120 Hz
      for (const f of faces) {
        if (!f.vu) continue;
        let cible = Math.max(elan, f.idle);
        if (py > -1e3) {
          const r = f.el.getBoundingClientRect();
          const d = Math.abs(py - (r.top + r.height / 2));
          cible = Math.max(cible, 0.35 * Math.max(0, 1 - d / (r.height * 1.6)));
        }
        const v = f.v + (cible - f.v) * lissage;
        if (Math.abs(v - f.v) > 0.001 || (v === 0 && f.v !== 0)) f.el.style.setProperty('--tire-js', v.toFixed(3));
        f.v = v;
      }
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      idleTl?.kill();
      io.disconnect();
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', sortie);
      removeEventListener('keydown', geste);
      removeEventListener('wheel', geste);
      removeEventListener('touchstart', geste);
    };
  });

  // Signature : le tiroir coulisse (hauteur du fond, plats qui glissent en place). Sans mouvement : <details> natif.
  onPage(() => {
    const tiroirs = [...document.querySelectorAll<HTMLDetailsElement>('details.tiroir')];
    if (!tiroirs.length) return;
    const anime = !prefersReducedMotion();
    const enCours = new WeakMap<HTMLElement, gsap.core.Timeline>();

    const ouvrir = (d: HTMLDetailsElement, instant = false) => {
      const fond = d.querySelector<HTMLElement>('.tiroir__fond');
      enCours.get(d)?.kill();
      d.open = true;
      if (!anime || instant || !fond) return;
      const plats = [...fond.querySelectorAll<HTMLElement>('.plat, .tiroir__note')].slice(0, 24);
      const tl = gsap.timeline({ onComplete: () => { gsap.set(fond, { clearProps: 'height,overflow' }); } })
        .fromTo(fond, { height: 0, overflow: 'clip' }, { height: 'auto', duration: 0.6, ease: ease.out }, 0)
        .fromTo(plats, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: ease.out, stagger: 0.02, clearProps: 'transform,opacity' }, 0.12);
      enCours.set(d, tl);
    };
    const fermer = (d: HTMLDetailsElement) => {
      const fond = d.querySelector<HTMLElement>('.tiroir__fond');
      enCours.get(d)?.kill();
      if (!anime || !fond) { d.open = false; return; }
      const tl = gsap.timeline({ onComplete: () => { d.open = false; gsap.set(fond, { clearProps: 'height,overflow' }); } })
        .to(fond, { height: 0, overflow: 'clip', duration: 0.45, ease: ease.inOut });
      enCours.set(d, tl);
    };

    const clic = (e: Event) => {
      const s = (e.target as HTMLElement).closest('summary');
      const d = s?.parentElement as HTMLDetailsElement | null;
      if (!s || !d || !d.classList.contains('tiroir') || !anime) return;
      e.preventDefault();
      if (d.open && !d.querySelector('.tiroir__fond')?.style.height) fermer(d); else ouvrir(d);
    };
    document.addEventListener('click', clic);

    // Ancre (#pizzas, plaques d'index, liens du mur de l'accueil) : ouvrir le tiroir ciblé puis y aller.
    const cibler = (slug: string, instant: boolean) => {
      const d = document.getElementById(slug);
      if (!(d instanceof HTMLDetailsElement) || !d.classList.contains('tiroir')) return false;
      ouvrir(d, instant);
      gsap.delayedCall(0.05, () => scrollToTarget(d));
      return true;
    };
    const plaque = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a.plaque-lien');
      if (!a) return;
      const slug = a.hash.slice(1);
      if (cibler(slug, false)) { e.preventDefault(); history.replaceState(history.state, '', `#${slug}`); }
    };
    document.addEventListener('click', plaque);
    const auHash = () => { if (location.hash) cibler(decodeURIComponent(location.hash.slice(1)), false); };
    addEventListener('hashchange', auHash);
    if (location.hash) cibler(decodeURIComponent(location.hash.slice(1)), true);

    return () => {
      document.removeEventListener('click', clic);
      document.removeEventListener('click', plaque);
      removeEventListener('hashchange', auHash);
    };
  });

  // « Ouvert en ce moment » : calculé à l'heure de Bruxelles depuis les créneaux réels, lus sur les lignes
  // d'horaires rendues (data-jour, data-creneaux) pour ne pas embarquer la carte dans le script.
  onPage(() => {
    const cibles = document.querySelectorAll<HTMLElement>('[data-etat]');
    const lignes = [...document.querySelectorAll<HTMLElement>('.heures__liste [data-jour]')];
    if (!cibles.length || lignes.length !== 7) return;
    const jours = lignes.map((li) => ({
      cle: li.dataset.jour!, nom: li.dataset.nom!,
      creneaux: (li.dataset.creneaux || '').split(',').filter(Boolean).map((c) => { const [debut, fin] = c.split('-'); return { debut, fin }; }),
    }));
    const heure = (h: string) => h.replace(':', '\u00a0h\u00a0');
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    const idx = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(p.weekday);
    const now = `${p.hour}:${p.minute}`;
    const jour = jours[idx];
    const enCours = jour?.creneaux.find((c) => now >= c.debut && now < c.fin);
    let texte: string;
    if (enCours) texte = `Ouvert en ce moment, jusqu’à ${heure(enCours.fin)}.`;
    else {
      let suite = '';
      for (let k = 0; k < 8 && !suite; k++) {
        const j = jours[(idx + k) % 7];
        const c = j.creneaux.find((x) => k > 0 || now < x.debut);
        if (c) suite = `${k === 0 ? 'aujourd’hui' : k === 1 ? 'demain' : j.nom.toLowerCase()} à ${heure(c.debut)}`;
      }
      texte = `Fermé en ce moment. Prochain service ${suite}.`;
    }
    cibles.forEach((el) => { el.textContent = texte; el.dataset.etat = enCours ? 'ouvert' : 'ferme'; el.hidden = false; });
    lignes.forEach((li) => li.classList.toggle('est-aujourdhui', li.dataset.jour === jour?.cle));
  });
}
