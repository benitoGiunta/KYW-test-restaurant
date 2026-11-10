// Interactions du site : menu mobile, jour courant, reveal, index de la carte. Tout est un ajout : sans ce script, la page est complète.
const root = document.documentElement;
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NB = ' ';

/* Menu mobile : <dialog> modal, seulement si le navigateur le gère */
const dlg = document.getElementById('menu-mobile');
const tog = document.querySelector('.nav__toggle');
if (dlg && tog && typeof dlg.showModal === 'function') {
  root.classList.add('menu-ok');
  tog.addEventListener('click', () => { dlg.showModal(); tog.setAttribute('aria-expanded', 'true'); });
  dlg.addEventListener('close', () => tog.setAttribute('aria-expanded', 'false'));
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('[data-close]') || e.target.closest('a')) dlg.close();
  });
  matchMedia('(min-width: 60rem)').addEventListener('change', (e) => { if (e.matches && dlg.open) dlg.close(); });
}

/* Horaires : jour courant et état ouvert ou fermé, à l'heure de Bruxelles, d'après les horaires du tableau */
const lignes = [...document.querySelectorAll('.sched__row')];
if (lignes.length) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Brussels', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const jour = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const maintenant = Number(get('hour')) * 60 + Number(get('minute'));
  const min = (s) => { const [a, b] = s.split(':'); return Number(a) * 60 + Number(b); };
  const aff = (s) => s.replace(':', `${NB}h${NB}`);
  const plages = (l) => { const t = [...l.querySelectorAll('time')].map((x) => x.getAttribute('datetime')); return t.length ? [[t[0], t[1]], [t[2], t[3]]] : []; };
  const jourDe = (n) => lignes.find((l) => Number(l.dataset.jour) === n);
  const nom = (l) => l.querySelector('dt').textContent.trim().toLowerCase();
  const auj = jourDe(jour);
  if (auj) { auj.classList.add('is-today'); auj.setAttribute('aria-current', 'date'); }
  const etat = document.querySelector('[data-now]');
  if (etat && auj) {
    const ouverte = plages(auj).find(([a, b]) => maintenant >= min(a) && maintenant < min(b));
    let txt; let ok = false;
    if (ouverte) { ok = true; txt = `Ouvert maintenant, jusqu’à ${aff(ouverte[1])}.`; }
    else {
      const suite = plages(auj).find(([a]) => min(a) > maintenant);
      if (suite) txt = `Fermé pour le moment, ouverture à ${aff(suite[0])}.`;
      else {
        for (let i = 1; i <= 7; i += 1) {
          const l = jourDe((jour + i) % 7); const p = l && plages(l);
          if (p && p.length) { txt = `Fermé pour le moment, réouverture ${i === 1 ? 'demain' : nom(l)} à ${aff(p[0][0])}.`; break; }
        }
      }
    }
    if (txt) { etat.textContent = `${txt} D’après les horaires habituels.`; etat.dataset.etat = ok ? 'ouvert' : 'ferme'; }
  }
}

/* Reveal : un seul, sur les rubriques de l'accueil ; rien n'est caché sans ce script ni en mouvement réduit */
const cibles = [...document.querySelectorAll('[data-reveal]')];
if (cibles.length && !reduit && 'IntersectionObserver' in window) {
  const bas = innerHeight;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  cibles.forEach((c) => { if (c.getBoundingClientRect().top < bas) c.classList.add('is-in'); });
  root.classList.add('reveal-on');
  cibles.forEach((c) => { if (!c.classList.contains('is-in')) io.observe(c); });
}

/* Index de la carte : rubrique en cours */
const index = document.querySelector('.index ul');
if (index && 'IntersectionObserver' in window) {
  const liens = new Map([...index.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a]));
  const marquer = (id) => {
    liens.forEach((a, k) => { if (k === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    const a = liens.get(id);
    if (a && index.scrollWidth > index.clientWidth) index.scrollTo({ left: a.offsetLeft - index.clientWidth / 2 + a.offsetWidth / 2, behavior: reduit ? 'auto' : 'smooth' });
  };
  const sections = [...document.querySelectorAll('.rub')];
  const so = new IntersectionObserver((es) => {
    const vu = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (vu) marquer(vu.target.id);
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach((s) => so.observe(s));
}
