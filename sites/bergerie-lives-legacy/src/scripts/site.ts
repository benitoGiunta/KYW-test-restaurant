// Phase 2 : menu tactile, un seul reveal, rail galerie, formulaire sans envoi. Rien de ce script n'est requis pour lire le site.
const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Menu (Popover API) : libellé, fermeture au clic sur un lien et au retour en grand écran
const menu = document.getElementById('menu');
const bouton = document.querySelector<HTMLButtonElement>('.menu-btn');
if (menu && bouton && typeof menu.hidePopover === 'function') {
  menu.addEventListener('toggle', (e) => {
    const ouvert = (e as ToggleEvent).newState === 'open';
    bouton.textContent = ouvert ? 'Fermer' : 'Menu';
  });
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) menu.hidePopover();
  });
  window.matchMedia('(min-width: 60rem)').addEventListener('change', (m) => {
    if (m.matches && menu.matches(':popover-open')) menu.hidePopover();
  });
}

// ---- Reveal : posé par le script sur ce qui est sous le premier écran, donc rien n'est caché sans script
if (!reduit && 'IntersectionObserver' in window) {
  const cibles = document.querySelectorAll<HTMLElement>('main > .sec:not(.hero) .statement, main > .sec .index__row, main > .sec .split__txt, main > .sec .facts');
  const io = new IntersectionObserver((entrees) => {
    entrees.forEach((en) => {
      if (en.isIntersecting || en.boundingClientRect.top < 0) {
        (en.target as HTMLElement).classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  cibles.forEach((el) => {
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    el.setAttribute('data-reveal', '');
    io.observe(el);
  });
}

// ---- Rail galerie : boutons précédent et suivant, état désactivé aux extrémités
const rail = document.querySelector<HTMLElement>('.rail');
const ctl = document.querySelector<HTMLElement>('.rail__ctl');
if (rail && ctl) {
  ctl.hidden = false;
  const [prec, suiv] = Array.from(ctl.querySelectorAll<HTMLButtonElement>('button'));
  const pas = () => Math.max(rail.clientWidth * 0.7, 240);
  const maj = () => {
    prec.disabled = rail.scrollLeft <= 2;
    suiv.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  };
  prec.addEventListener('click', () => rail.scrollBy({ left: -pas(), behavior: reduit ? 'auto' : 'smooth' }));
  suiv.addEventListener('click', () => rail.scrollBy({ left: pas(), behavior: reduit ? 'auto' : 'smooth' }));
  rail.addEventListener('scroll', maj, { passive: true });
  window.addEventListener('resize', maj);
  maj();
}

// ---- Formulaire : validation au blur puis à l'input, jamais de faux envoi (data-endpoint vide)
document.querySelectorAll<HTMLFormElement>('form[data-endpoint]').forEach((form) => {
  const statut = form.querySelector<HTMLElement>('.form__status');
  const champs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[name], textarea[name]'));
  const message = (c: HTMLInputElement | HTMLTextAreaElement) => {
    if (c.validity.valueMissing) return c.dataset.vide ?? 'Ce champ est à remplir.';
    if (c.validity.typeMismatch || c.validity.patternMismatch) return c.dataset.format ?? 'Ce format n’est pas valide.';
    return '';
  };
  const aide = (c: HTMLElement) => document.getElementById(c.getAttribute('aria-describedby') ?? '');
  const verifier = (c: HTMLInputElement | HTMLTextAreaElement) => {
    const m = message(c);
    const cible = aide(c);
    if (m) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
    if (cible) cible.textContent = m || cible.dataset.aide || '';
    return !m;
  };
  champs.forEach((c) => {
    c.addEventListener('blur', () => { c.dataset.touche = '1'; verifier(c); });
    c.addEventListener('input', () => { if (c.dataset.touche) verifier(c); });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalides = champs.filter((c) => { c.dataset.touche = '1'; return !verifier(c); });
    if (invalides.length) {
      if (statut) { statut.textContent = invalides.length === 1 ? 'Un champ est à corriger.' : `${invalides.length} champs sont à corriger.`; statut.dataset.etat = 'erreur'; }
      invalides[0].focus();
      return;
    }
    if (!form.dataset.endpoint && statut) {
      statut.textContent = 'Rien n’a été envoyé : ce formulaire n’est pas encore relié.';
      statut.dataset.etat = 'info';
    }
  });
});
