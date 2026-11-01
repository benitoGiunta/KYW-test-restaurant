// Interactions du site : nav qui se rétracte, menu Popover, état « ouvert », reveal. Tout est un ajout :
// sans script, la page est complète (nav statique, menu en lien, horaires lisibles, rien de caché).
const NB = ' ';
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- nav ---------- */
const nav = document.querySelector<HTMLElement>('[data-nav]');
const menu = document.getElementById('menu');
const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
if (nav) {
  let last = scrollY;
  let tick = false;
  const maj = () => {
    tick = false;
    const y = Math.max(0, scrollY);
    nav.classList.toggle('is-solid', y > 24);
    const ouvert = menu?.matches(':popover-open');
    const bas = y > last + 6;
    const haut = y < last - 6;
    if (!ouvert && bas && y > 240) nav.classList.add('is-hidden');
    else if (haut || y <= 240 || ouvert) nav.classList.remove('is-hidden');
    if (bas || haut) last = y;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(maj); } }, { passive: true });
  maj();
}
if (menu && toggle) {
  menu.addEventListener('toggle', (e) => toggle.setAttribute('aria-expanded', String((e as ToggleEvent).newState === 'open')));
  matchMedia('(min-width: 60rem)').addEventListener('change', (e) => { if (e.matches && menu.matches(':popover-open')) menu.hidePopover(); });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.hidePopover()));
}

/* ---------- état « ouvert » depuis les horaires du tableau (heure de Bruxelles) ---------- */
const lignes = [...document.querySelectorAll<HTMLTableRowElement>('tr[data-jour]')];
if (lignes.length) {
  const jours = lignes.map((l) => l.dataset.jour!);
  const parts = new Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const jour = get('weekday').toLowerCase();
  const maintenant = Number(get('hour')) * 60 + Number(get('minute'));
  const mn = (hm: string) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
  const heure = (hm: string) => hm.replace(':', `${NB}h${NB}`);
  const creneaux = (l: HTMLTableRowElement) =>
    [['midi', l.dataset.midi, 'à midi'], ['soir', l.dataset.soir, 'ce soir']]
      .filter((c) => c[1])
      .map((c) => { const [d, f] = (c[1] as string).split('-'); return { nom: c[0] as string, deb: d, fin: f, mots: c[2] as string }; });

  const i = jours.indexOf(jour);
  let etat = '';
  let texte = '';
  if (i >= 0) {
    const auj = lignes[i];
    auj.classList.add('is-today');
    auj.setAttribute('aria-current', 'date');
    const cs = creneaux(auj);
    const en = cs.find((c) => maintenant >= mn(c.deb) && maintenant < mn(c.fin));
    if (en) {
      etat = 'ouvert';
      texte = `Ouvert, jusqu’à ${heure(en.fin)}`;
      auj.querySelector(`td[data-label="${en.nom === 'midi' ? 'Midi' : 'Soir'}"]`)?.classList.add('is-now');
    } else {
      const suite = cs.find((c) => maintenant < mn(c.deb));
      if (suite) {
        etat = 'bientot';
        texte = `Fermé pour l’instant, ouvre ${suite.mots} dès ${heure(suite.deb)}`;
      } else {
        for (let k = 1; k <= 7; k++) {
          const l = lignes[(i + k) % lignes.length];
          const c = creneaux(l)[0];
          if (!c) continue;
          const quand = k === 1 ? 'demain' : l.dataset.jour!;
          texte = `Fermé, ouvre ${quand} dès ${heure(c.deb)}`;
          break;
        }
      }
    }
  }
  if (texte) {
    document.querySelectorAll<HTMLElement>('[data-statut], [data-statut-menu]').forEach((el) => {
      el.textContent = texte;
      if (etat) el.dataset.etat = etat;
    });
  }
}

/* ---------- reveal : un seul, une fois, sur les blocs sous le premier écran ---------- */
if (!reduit && 'IntersectionObserver' in window) {
  const cibles = [...document.querySelectorAll<HTMLElement>('main > section:not(.hero):not(.phead):not(.fin) .container > *:not(.cols), main > section:not(.hero):not(.phead):not(.fin) .cols > *')];
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting || e.boundingClientRect.top < 0) { (e.target as HTMLElement).classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -6% 0px' });
  cibles.forEach((el, n) => {
    // décalage seulement entre frères d'un même parent, plafonné à 4
    const rang = [...(el.parentElement?.children ?? [])].indexOf(el);
    el.style.setProperty('--i', String(Math.min(rang, 4)));
    el.setAttribute('data-reveal', '');
    io.observe(el);
  });
}
