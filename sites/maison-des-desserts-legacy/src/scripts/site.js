// La Maison des Desserts, variante legacy : tout le script de la page (nav, switcher, horaires, formulaires, galerie, reveal).
// Chaque bloc est facultatif : sans script, le contenu reste entier et lisible.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* nav : popover sous 60rem */
(() => {
  const menu = $('#menu'), btn = $('.nav__toggle');
  if (!menu || !btn || !menu.showPopover) return;
  const label = $('.nav__toggle-t', btn);
  menu.addEventListener('toggle', (e) => {
    const open = e.newState === 'open';
    btn.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Fermer' : 'Menu';
  });
  const wide = matchMedia('(min-width: 60.0625rem)');
  wide.addEventListener('change', () => { if (wide.matches && menu.matches(':popover-open')) menu.hidePopover(); });
})();

/* switcher des métiers */
(() => {
  const root = $('[data-switch]');
  if (!root) return;
  const tabs = $$('[role=tab]', root), panels = $$('[role=tabpanel]', root);
  $('[role=tablist]', root).hidden = false;
  root.classList.add('is-on');
  const show = (i, focus) => {
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    panels.forEach((p, k) => { p.hidden = k !== i; });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const n = tabs.length; let j = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + n) % n;
      else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
      if (j !== null) { e.preventDefault(); show(j, true); }
    });
  });
  show(0);
})();

/* horaires : jour courant et état d'ouverture (heure de Bruxelles) */
(() => {
  const tables = $$('[data-schedule]');
  if (!tables.length) return;
  const parts = Object.fromEntries(new Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false, day: 'numeric', month: 'numeric' }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  const jour = parts.weekday.toLowerCase(), now = Number(parts.hour) * 60 + Number(parts.minute);
  const ferie = (parts.day === '25' && parts.month === '12') || (parts.day === '1' && parts.month === '1');
  tables.forEach((t) => {
    const row = $$('tbody tr', t).find((r) => $('th', r).textContent.trim().toLowerCase() === jour);
    if (!row) return;
    row.classList.add('is-today');
    row.setAttribute('aria-current', 'date');
    const th = $('th', row), tag = document.createElement('span');
    tag.className = 'today'; tag.textContent = 'aujourd’hui';
    th.append(' ', tag);
    const m = $('time', row)?.textContent.match(/(\d{1,2})\s*h\s*(\d{2}).*?(\d{1,2})\s*h\s*(\d{2})/);
    let msg = 'Fermé aujourd’hui';
    if (m && !ferie) {
      const a = +m[1] * 60 + +m[2], b = +m[3] * 60 + +m[4];
      const fin = `${m[3]} h ${m[4]}`;
      msg = now >= a && now < b ? `Ouvert maintenant, jusqu’à ${fin}` : now < a ? `Ouvre aujourd’hui à ${m[1]} h ${m[2]}` : 'Fermé pour le moment';
    }
    const cap = $('caption', t);
    if (cap) { const s = document.createElement('span'); s.className = 'schedule__now'; s.textContent = msg; cap.append(' · ', s); }
  });
})();

/* formulaires qui ne postent nulle part : validation au blur puis à l'input */
(() => {
  const message = (el) => {
    const v = el.validity;
    if (v.valueMissing) return 'Renseignez ce champ.';
    if (el.type === 'email' && (v.typeMismatch || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(el.value))) return 'Saisissez une adresse complète, par exemple nom@exemple.be.';
    if (el.type === 'tel' && (el.value.replace(/\D/g, '').length < 8 || !/^[+\d][\d\s./()-]*$/.test(el.value.trim()))) return 'Saisissez un numéro, par exemple 0470 00 00 00.';
    return '';
  };
  $$('form[data-endpoint]').forEach((form) => {
    const fields = $$('input, textarea', form), status = $('[data-status]', form);
    const check = (el) => {
      const text = message(el), out = document.getElementById(`${el.id}-m`);
      el.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (out) out.textContent = text;
      return !text;
    };
    fields.forEach((el) => {
      el.addEventListener('blur', () => { if (el.value || el.dataset.touched) { el.dataset.touched = '1'; check(el); } else el.dataset.touched = '1'; });
      el.addEventListener('input', () => { if (el.dataset.touched) check(el); if (status) status.textContent = ''; });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = fields.filter((el) => { el.dataset.touched = '1'; return !check(el); });
      if (bad.length) { bad[0].focus(); if (status) status.textContent = ''; return; }
      if (status) status.textContent = 'Rien n’a été envoyé : ce formulaire n’est pas encore relié à la boîte de la maison.';
    });
  });
})();

/* galerie : agrandissement dans un dialog natif */
(() => {
  const box = $('#lightbox');
  if (!box || !box.showModal) return;
  const img = $('img', box), cap = $('.lightbox__cap', box);
  $$('.zoom').forEach((b) => b.addEventListener('click', () => {
    img.src = b.dataset.full; img.alt = b.dataset.cap; cap.textContent = b.dataset.cap;
    box.showModal();
  }));
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
})();

/* carte : rubrique courante dans l'index */
(() => {
  const links = $$('.carte__index a');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.setAttribute('aria-current', 'false'));
      byId.get(e.target.id)?.setAttribute('aria-current', 'location');
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  $$('.cat').forEach((s) => io.observe(s));
})();

/* reveal : un seul, posé par script, jamais sous mouvement réduit */
(() => {
  if (reduce || !('IntersectionObserver' in window)) return;
  const els = $$('.reveal');
  els.forEach((el) => el.setAttribute('data-reveal', ''));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
  // un saut d'ancre ou de molette peut dépasser un bloc sans qu'il ait croisé l'écran : on le montre sans animation
  addEventListener('scroll', () => els.forEach((el) => { if (!el.classList.contains('is-in') && el.getBoundingClientRect().bottom < 0) { el.classList.add('is-in'); io.unobserve(el); } }), { passive: true });
})();
