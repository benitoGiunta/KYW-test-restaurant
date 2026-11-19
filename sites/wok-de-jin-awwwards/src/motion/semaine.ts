// Pilote du concept « La semaine à volonté ». Une seule variable : le service du moment (heure de Bruxelles par Intl),
// en cours ou prochain. Elle est distribuée à tout ce qui porte le concept : la case de la grille ([data-semaine]),
// le tarif du bandeau du hero ([data-bandeau]) et la pastille du jour au pied (.pied__semaine).
// Signature « les cases se servent » : à l'entrée de la grille, chaque case se remplit de bas en haut, jour après jour
// (variable --rempli tweenée par GSAP, la CSS ne pose que `scale: 1 var(--rempli)` sur ::before), puis son prix monte.
// Repos : sur le service du moment, une bande de vapeur hachurée s'écoule à vitesse constante (--flux, gsap.ticker),
// en pause hors écran ; le pointeur proche accélère le flux et la case visée allume sa ligne de légende.
// Mouvement réduit : l'état du service est posé (information), rien ne bouge, toutes les cases sont pleines.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, isTouch, ease } from '../engine';
import { semaine, services, tarifs, heure, type Tier } from '../data/site';

const TUILE = 12; // période du hachuré (px), voir site.css .vapeur
const VITESSE = 14; // px par seconde au repos
const POUSSEE = 2.2; // multiplicateur quand le pointeur est sur un porteur

type Moment = { jour: string; service: 'midi' | 'soir'; tier: Tier; statut: 'en-cours' | 'prochain'; texte: string; aujourdhui: string };

const minutes = (hm: string) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };

/** Le service du moment, d'après l'heure de Bruxelles (en cours, sinon le prochain). */
export function momentPresent(date = new Date()): Moment | null {
  const parts = new Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const auj = get('weekday').toLowerCase();
  const maintenant = Number(get('hour')) * 60 + Number(get('minute'));
  const i0 = semaine.findIndex((j) => j.id === auj);
  if (i0 < 0) return null;
  for (let k = 0; k < 8; k++) {
    const j = semaine[(i0 + k) % 7];
    if (j.ferme) continue;
    for (const s of services) {
      const sid = s.id as 'midi' | 'soir';
      const tier = j[sid]!;
      if (k === 0 && maintenant >= minutes(s.debut) && maintenant < minutes(s.fin)) {
        return { jour: j.id, service: sid, tier, statut: 'en-cours', texte: `En cours, jusqu’à ${heure(s.fin)}`, aujourdhui: auj };
      }
      if (k > 0 || maintenant < minutes(s.debut)) {
        const quand = k === 0 ? (sid === 'midi' ? 'Ce midi' : 'Ce soir') : k === 1 ? `Demain ${sid}` : `${j.nom} ${sid}`;
        return { jour: j.id, service: sid, tier, statut: 'prochain', texte: `${quand}, dès ${heure(s.debut)}`, aujourdhui: auj };
      }
    }
  }
  return null;
}

/** Pose le moment sur les porteurs présents ; renvoie les éléments qui portent la vapeur. */
function poser(m: Moment | null) {
  const porteurs: HTMLElement[] = [];
  document.querySelectorAll('.is-now, .is-today').forEach((el) => el.classList.remove('is-now', 'is-today'));
  document.querySelectorAll<HTMLElement>('[data-etiquette]').forEach((el) => { el.hidden = true; el.textContent = ''; });
  if (!m) return porteurs;
  const marquer = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add('is-now');
    el.dataset.statut = m.statut;
    const e = el.querySelector<HTMLElement>('[data-etiquette]');
    // Dans la case, le jour et le service se lisent déjà : étiquette courte.
    if (e) { e.textContent = el.classList.contains('case') ? (m.statut === 'en-cours' ? 'En cours' : 'Prochain') : m.texte; e.hidden = false; }
    porteurs.push(el);
  };
  marquer(document.querySelector<HTMLElement>(`[data-semaine] .jour[data-jour="${m.jour}"] .case[data-service="${m.service}"]`));
  marquer(document.querySelector<HTMLElement>(`[data-bandeau] [data-tarif="${m.tier}"]`));
  document.querySelector(`[data-semaine] .jour[data-jour="${m.aujourdhui}"]`)?.classList.add('is-today');
  document.querySelector(`.pied__semaine [data-jour="${m.aujourdhui}"]`)?.classList.add('is-today');
  return porteurs;
}

/** Signature : les cases se servent, jour après jour. */
function servir(grille: HTMLElement) {
  const jours = [...grille.querySelectorAll<HTMLElement>('.jour')];
  const cases = jours.flatMap((j) => [...j.querySelectorAll<HTMLElement>('.case')]);
  const textes = cases.map((c) => [...c.querySelectorAll<HTMLElement>('.case__prix, .case__quand')]);
  const noms = jours.map((j) => j.querySelector<HTMLElement>('.jour__nom')!);
  gsap.set(cases, { '--rempli': 0 });
  gsap.set(textes.flat(), { yPercent: 60, autoAlpha: 0 });
  gsap.set(noms, { '--trait': 0 });
  const tl = gsap.timeline({ paused: true });
  jours.forEach((j, i) => {
    const t = i * 0.08;
    tl.to(noms[i], { '--trait': 1, duration: 0.7, ease: ease.out }, t);
    j.querySelectorAll<HTMLElement>('.case').forEach((c, k) => {
      const at = t + k * 0.06;
      tl.to(c, { '--rempli': 1, duration: 0.75, ease: ease.out }, at);
      tl.to(textes[cases.indexOf(c)], { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: ease.out, stagger: 0.04, clearProps: 'transform,opacity' }, at + 0.25);
    });
  });
  return tl;
}

function initSemaine({ intro }: { intro: gsap.core.Timeline }) {
  const reduit = prefersReducedMotion();
  const porteurs = poser(momentPresent());
  // L'heure passe : le moment est recalculé chaque minute (un service peut commencer pendant la visite).
  // Sur l'horloge GSAP (delayedCall), tuée avec le contexte de la page.
  let minuterie: gsap.core.Tween;
  const relire = () => { const p = poser(momentPresent()); porteurs.splice(0, porteurs.length, ...p); minuterie = gsap.delayedCall(60, relire); };
  minuterie = gsap.delayedCall(60, relire);
  const nettoyages: (() => void)[] = [() => minuterie.kill()];

  const grille = document.querySelector<HTMLElement>('[data-semaine] .semaine__jours');
  if (grille && !reduit) {
    const tl = servir(grille);
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { tl.play(); io.disconnect(); } }, { rootMargin: '0px 0px -18% 0px' });
    io.observe(grille);
    nettoyages.push(() => io.disconnect());
  }

  // Intro du hero : le filet du bandeau se trace, les prix montent d'un cran (rien n'est caché), la photo se pose.
  const bandeau = document.querySelector<HTMLElement>('[data-bandeau]');
  if (bandeau && !reduit) {
    intro.fromTo(bandeau, { '--trait': 0 }, { '--trait': 1, duration: 1.1, ease: ease.out }, 0.1);
    intro.fromTo(bandeau.querySelectorAll('b'), { y: 18 }, { y: 0, duration: 0.9, ease: ease.out, stagger: 0.06, clearProps: 'transform' }, 0.2);
    const img = document.querySelector('.hero__media img');
    if (img) intro.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: ease.out, clearProps: 'transform' }, 0);
  }

  // Pointeur : la case visée allume sa ligne de légende ; près d'un porteur, la vapeur accélère.
  const legende = document.querySelectorAll<HTMLElement>('[data-semaine] .legende [data-tarif]');
  let pousse = 0;
  let cible = 0;
  const surCase = (e: PointerEvent) => {
    const c = (e.target as HTMLElement).closest<HTMLElement>('.case[data-tarif]');
    document.querySelectorAll('.case.is-vise').forEach((x) => x !== c && x.classList.remove('is-vise'));
    c?.classList.add('is-vise');
    legende.forEach((l) => l.classList.toggle('is-vise', !!c && l.dataset.tarif === c.dataset.tarif));
  };
  const quitte = () => { document.querySelectorAll('.is-vise').forEach((x) => x.classList.remove('is-vise')); };
  const proche = (e: PointerEvent) => { cible = porteurs.some((p) => p.contains(e.target as Node)) ? 1 : 0; };
  if (!isTouch()) {
    grille?.addEventListener('pointerover', surCase);
    grille?.addEventListener('pointerleave', quitte);
    window.addEventListener('pointerover', proche, { passive: true });
    nettoyages.push(() => {
      grille?.removeEventListener('pointerover', surCase);
      grille?.removeEventListener('pointerleave', quitte);
      window.removeEventListener('pointerover', proche);
    });
  }

  // Repos : la vapeur s'écoule à vitesse constante sur les porteurs visibles (une horloge : gsap.ticker).
  if (!reduit && porteurs.length) startIdle(porteurs, () => { pousse += (cible - pousse) * 0.08; return 1 + pousse * (POUSSEE - 1); }, nettoyages);

  return () => { nettoyages.forEach((n) => n()); };
}

/** État de repos : écoulement du hachuré de vapeur, en pause hors écran, nul en mouvement réduit. */
function startIdle(porteurs: HTMLElement[], facteur: () => number, nettoyages: (() => void)[]) {
  const visibles = new Set<HTMLElement>();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const el = e.target as HTMLElement;
    if (e.isIntersecting) visibles.add(el); else visibles.delete(el);
  }));
  const suivis = new Set<HTMLElement>();
  const suivre = () => porteurs.forEach((p) => { if (!suivis.has(p)) { suivis.add(p); io.observe(p); } });
  suivre();
  const wrap = gsap.utils.wrap(0, TUILE);
  let flux = 0;
  const tick = (_t: number, dt: number) => {
    suivre();
    if (!visibles.size || document.hidden) return;
    flux = wrap(flux + (Math.min(dt, 50) / 1000) * VITESSE * facteur());
    const v = `${flux.toFixed(2)}px`;
    visibles.forEach((el) => { if (el.isConnected && el.classList.contains('is-now')) el.style.setProperty('--flux', v); });
  };
  gsap.ticker.add(tick);
  nettoyages.push(() => { gsap.ticker.remove(tick); io.disconnect(); });
}

export function startSemaine() {
  onPage(initSemaine);
}
