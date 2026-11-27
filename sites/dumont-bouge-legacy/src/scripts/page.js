// Comportements de la maquette Dumont Bouge. Chaque bloc ne fait rien si son élément est absent ; sans script, tout reste lisible.

// 1. Onglets du tea-room : flèches, début et fin (modèle ARIA des onglets, activation automatique).
document.querySelectorAll('[data-switcher]').forEach((sw) => {
  const tabs = [...sw.querySelectorAll('[role=tab]')];
  const show = (tab, focus) => {
    tabs.forEach((o) => {
      const on = o === tab;
      o.setAttribute('aria-selected', on ? 'true' : 'false');
      o.tabIndex = on ? 0 : -1;
      sw.querySelector('#' + o.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(tab, false));
    tab.addEventListener('keydown', (e) => {
      const to = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      show(tabs[to], true);
    });
  });
});

// 2. Horaires : le jour courant, à l'heure de Bruxelles.
const jour = new Intl.DateTimeFormat('fr-BE', { weekday: 'long', timeZone: 'Europe/Brussels' }).format(new Date()).toLowerCase();
document.querySelectorAll('.schedule dl > div').forEach((row) => {
  if (row.querySelector('dt')?.textContent.trim().toLowerCase() === jour) row.setAttribute('aria-current', 'date');
});

// 3. Formulaire de réservation : validation au blur puis à l'input, aucun envoi (data-endpoint vide).
const NB = ' ';
const form = document.querySelector('form[data-endpoint]');
if (form) {
  const status = form.querySelector('.form__status');
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Brussels' }).format(new Date());
  const date = form.elements.date;
  if (date) date.min = today;
  const messages = {
    personnes: () => 'Choisissez le nombre de personnes.',
    date: (el) => (el.value && el.value < today ? 'Choisissez une date à partir d’aujourd’hui.' : 'Choisissez le jour de la visite.'),
    heure: () => 'Choisissez une heure entre 7' + NB + 'h' + NB + '00 et 18' + NB + 'h' + NB + '00.',
    nom: () => 'Écrivez votre nom.',
    telephone: () => 'Écrivez un numéro où vous joindre, par exemple 0470' + NB + '00' + NB + '00' + NB + '00.',
  };
  const check = (el) => {
    let ok = el.checkValidity();
    if (ok && el.name === 'date' && el.value < today) ok = false;
    if (ok && el.name === 'telephone' && el.value.replace(/\D/g, '').length < 8) ok = false;
    const help = form.querySelector('#' + el.id + '-help');
    if (!ok) { el.setAttribute('aria-invalid', 'true'); help.textContent = messages[el.name](el); help.dataset.error = ''; }
    else { el.removeAttribute('aria-invalid'); help.textContent = help.dataset.hint || ''; delete help.dataset.error; }
    return ok;
  };
  const fields = [...form.querySelectorAll('input, select')];
  fields.forEach((el) => {
    el.addEventListener('blur', () => { el.dataset.touched = ''; check(el); });
    const live = () => { if ('touched' in el.dataset || el.hasAttribute('aria-invalid')) check(el); };
    el.addEventListener('input', live);
    el.addEventListener('change', live);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const bad = fields.filter((el) => !check(el));
    if (bad.length) { bad[0].focus(); return; }
    if (!form.dataset.endpoint) status.textContent = 'Rien n’a été envoyé' + NB + ': ce formulaire n’est pas encore relié.';
  });
}
