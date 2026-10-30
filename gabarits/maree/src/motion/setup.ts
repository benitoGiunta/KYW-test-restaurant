// Motion globale « Marée » : loader en marée montante (0,00 m → 2,40 m), rideau écume à crêtes de houle,
// nom du hero qui se pose (letter-spacing 0.3em → -0.02em), ajustement bord à bord du nom, houle et ligne de temps.
import { gsap } from 'gsap';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile } from '../engine';
import { registerHoules, houleD } from './houle';

export function setupMotion() {
  setLoaderFormat((p) => ((p / 100) * 2.4).toFixed(2).replace('.', ',') + ' m');
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.45, ease: ease.inOut, stagger: 0.05 })
      .to(root, { yPercent: -112, duration: isMobile() ? 0.7 : 0.9, ease: ease.inOut }, '-=0.2'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.9, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
  // Crêtes statiques du loader et du rideau (elles ne sont pas pilotées par le scroll).
  document.querySelectorAll<SVGPathElement>('path[data-crete]').forEach((p) => p.setAttribute('d', houleD(10, 0)));

  onPage(({ intro }) => {
    const cleanups: (() => void)[] = [];
    cleanups.push(registerHoules(document));
    cleanups.push(fitNom());
    cleanups.push(heroIntro(intro));
    cleanups.push(ligneDeTemps());
    cleanups.push(planTrace());
    return () => cleanups.forEach((c) => c());
  });
}

/** Nom bord à bord : chaque ligne [data-fit] prend la largeur de son conteneur (police chargée, puis au resize). */
function fitNom() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-fit]')];
  if (!els.length) return () => {};
  const fit = () => {
    for (const el of els) {
      if (!el.offsetParent) continue; // ligne masquée (mobile / desktop)
      const box = el.parentElement!.clientWidth;
      el.style.fontSize = '100px';
      el.style.width = 'max-content';
      const w = el.getBoundingClientRect().width || 1;
      el.style.width = '';
      el.style.fontSize = `${Math.floor((100 * box * 0.985) / w * 100) / 100}px`;
    }
  };
  document.fonts.ready.then(fit);
  fit();
  addEventListener('resize', fit);
  return () => removeEventListener('resize', fit);
}

/** Intro du hero : la houle monte et révèle la photo, le nom se pose, mots-univers et CTA en fondu décalé. */
function heroIntro(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || prefersReducedMotion()) return () => {};
  const media = hero.querySelector('[data-hero-media]');
  const nom = hero.querySelectorAll('[data-fit]');
  const apres = hero.querySelectorAll('[data-hero-apres]');
  const titre = hero.querySelectorAll('.hero__bas .wrap > *');
  gsap.set(hero, { visibility: 'visible' });
  const tl = gsap.timeline({ paused: true });
  if (media) tl.fromTo(media, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: ease.out }, 0);
  if (nom.length) tl.fromTo(nom, { letterSpacing: '0.3em', autoAlpha: 0 }, { letterSpacing: '-0.02em', autoAlpha: 1, duration: 1.5, ease: ease.out, stagger: 0.08 }, 0.35);
  else if (titre.length) tl.fromTo(titre, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: ease.out, stagger: 0.12 }, 0.5);
  if (apres.length) tl.fromTo(apres, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: ease.out, stagger: 0.1 }, 0.9);
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); };
}

/** Ligne de temps des services : curseur « maintenant » et badge ouvert / prochain service (heure de Bruxelles). */
function ligneDeTemps() {
  const root = document.querySelector<HTMLElement>('[data-maree]');
  if (!root) return () => {};
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const services = JSON.parse(root.dataset.maree || '[]') as { jour: string; debut: string; fin: string; nom: string }[];
  const badge = root.querySelector<HTMLElement>('[data-maree-badge]');
  const min = (h: string) => parseInt(h.slice(0, 2)) * 60 + parseInt(h.slice(3));
  const update = () => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Brussels' }));
    const jour = jours[now.getDay()];
    const m = now.getHours() * 60 + now.getMinutes();
    const pct = Math.max(0, Math.min(100, ((m - 8 * 60) / (15 * 60)) * 100));
    root.style.setProperty('--maintenant', pct.toFixed(2) + '%');
    root.querySelectorAll<HTMLElement>('[data-jour]').forEach((r) => r.classList.toggle('is-aujourdhui', r.dataset.jour === jour));
    const encours = services.find((s) => s.jour === jour && m >= min(s.debut) && m < min(s.fin));
    if (badge) {
      if (encours) badge.textContent = `Ouvert, service du ${encours.nom} jusqu'à ${encours.fin.replace(':', 'h')}`;
      else {
        let prochain: typeof services[number] | undefined;
        let dans = '';
        for (let i = 0; i < 7 && !prochain; i++) {
          const j = jours[(now.getDay() + i) % 7];
          prochain = services.find((s) => s.jour === j && (i > 0 || m < min(s.debut)));
          if (prochain) dans = i === 0 ? 'ce ' + prochain.nom : i === 1 ? 'demain' : j;
        }
        badge.textContent = prochain ? `Fermé, prochain service ${dans} à ${prochain.debut.replace(':', 'h')}` : 'Fermé';
      }
      badge.classList.toggle('is-ouvert', !!encours);
    }
  };
  update();
  const id = setInterval(update, 60000);
  return () => clearInterval(id);
}

/** Plan au trait : les tracés se dessinent au scroll (stroke-dashoffset) ; pastilles qui ouvrent leur légende. */
function planTrace() {
  const plan = document.querySelector<HTMLElement>('[data-plan]');
  if (!plan) return () => {};
  const traits = plan.querySelectorAll<SVGPathElement>('path[data-trait]');
  const cleanups: (() => void)[] = [];
  if (!prefersReducedMotion()) {
    traits.forEach((p, i) => {
      const l = p.getTotalLength();
      gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      gsap.to(p, { strokeDashoffset: 0, duration: 1.6, delay: i * 0.12, ease: ease.out, scrollTrigger: { trigger: plan, start: 'top 75%', once: true } });
    });
    const pastilles = plan.querySelectorAll('[data-pastille]');
    gsap.from(pastilles, { scale: 0, transformOrigin: '50% 50%', duration: 0.6, stagger: 0.1, delay: 1.2, ease: ease.out, scrollTrigger: { trigger: plan, start: 'top 75%', once: true } });
  }
  const boutons = [...plan.querySelectorAll<HTMLButtonElement>('button[data-pastille]')];
  const ouvrir = (n: string | null) => {
    boutons.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.pastille === n)));
    plan.querySelectorAll<HTMLElement>('[data-legende]').forEach((l) => l.classList.toggle('is-active', l.dataset.legende === n));
  };
  boutons.forEach((b) => {
    const h = () => ouvrir(b.getAttribute('aria-expanded') === 'true' ? null : b.dataset.pastille!);
    b.addEventListener('click', h);
    cleanups.push(() => b.removeEventListener('click', h));
  });
  ouvrir('1');
  return () => cleanups.forEach((c) => c());
}
