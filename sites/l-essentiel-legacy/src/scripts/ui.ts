// Interactions de la variante legacy : menu mobile, jour courant, formulaires sans envoi.
const NBSP = ' ';

// Menu mobile (dialog modal)
const dlg = document.querySelector<HTMLDialogElement>('[data-menu]');
if (dlg && typeof dlg.showModal === 'function') {
  const opener = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  opener?.addEventListener('click', () => { dlg.showModal(); opener.setAttribute('aria-expanded', 'true'); });
  dlg.querySelector('[data-menu-close]')?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => opener?.setAttribute('aria-expanded', 'false'));
  matchMedia('(min-width: 60rem)').addEventListener('change', (e) => { if (e.matches && dlg.open) dlg.close(); });
}

// Jour courant dans les horaires (fuseau de Namur)
const jour = new Intl.DateTimeFormat('fr-BE', { weekday: 'long', timeZone: 'Europe/Brussels' }).format(new Date()).toLowerCase();
document.querySelectorAll<HTMLElement>('.sched__row[data-jour]').forEach((r) => {
  if ((r.dataset.jour ?? '').toLowerCase() === jour) {
    r.setAttribute('aria-current', 'date');
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = ' (aujourd’hui)';
    r.querySelector('dt')?.append(sr);
  }
});

// Formulaires : validation au blur puis à l'input, aucun faux envoi
type Ctl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
const today = new Date(); today.setHours(0, 0, 0, 0);
const pad = (n: number) => String(n).padStart(2, '0');
const iso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

function problem(c: Ctl, field: HTMLElement): string {
  const v = c.value.trim();
  if (c.required && !v) return field.dataset.msg || 'Ce champ est à remplir.';
  if (!v) return '';
  if (c instanceof HTMLInputElement) {
    if (c.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return `Cette adresse semble incomplète. Écrivez-la sous la forme nom@exemple.be.`;
    if (c.type === 'tel' && v.replace(/\D/g, '').length < 8) return `Ce numéro semble incomplet. Écrivez-le avec l’indicatif, par exemple 0470 12 34 56.`;
    if (c.type === 'date') {
      if (v < iso) return 'Choisissez une date à venir.';
      const d = new Date(`${v}T12:00:00`).getDay();
      if (d === 0 || d === 1 || d === 2) return 'Le restaurant est fermé du dimanche au mardi. Choisissez un jour du mercredi au samedi.';
    }
  }
  return '';
}

document.querySelectorAll<HTMLFormElement>('form[data-endpoint]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const idle = status?.textContent ?? '';
  form.querySelectorAll<HTMLInputElement>('input[type=date]').forEach((d) => { d.min = iso; });
  const fields = [...form.querySelectorAll<HTMLElement>('[data-field]')];
  const ctl = (f: HTMLElement) => f.querySelector<Ctl>('input,select,textarea')!;
  const touched = new WeakSet<HTMLElement>();

  const check = (f: HTMLElement): boolean => {
    const c = ctl(f), help = f.querySelector<HTMLElement>('.field__help')!;
    const msg = problem(c, f);
    f.classList.toggle('is-invalid', !!msg);
    if (msg) { c.setAttribute('aria-invalid', 'true'); help.textContent = `Erreur :${NBSP}${msg}`; }
    else { c.removeAttribute('aria-invalid'); help.textContent = help.dataset.help ?? ''; }
    return !msg;
  };

  fields.forEach((f) => {
    const c = ctl(f);
    c.addEventListener('blur', () => { touched.add(f); check(f); });
    c.addEventListener('input', () => { if (touched.has(f)) check(f); });
    c.addEventListener('change', () => { touched.add(f); check(f); });
  });

  // Couverts : au-delà de six, menu uniquement (donnée du site d'origine)
  const couv = form.querySelector<HTMLSelectElement>('select[name=couverts]');
  const couvHelp = couv?.closest<HTMLElement>('[data-field]')?.querySelector<HTMLElement>('.field__help');
  couv?.addEventListener('change', () => { if (couvHelp) { couvHelp.dataset.help = Number(couv.value) > 6 ? `Pour plus de six couverts${NBSP}: menu uniquement.` : 'Au-delà de six couverts, menu uniquement.'; if (!couv.hasAttribute('aria-invalid')) couvHelp.textContent = couvHelp.dataset.help; } });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let first: Ctl | null = null, bad = 0;
    fields.forEach((f) => { touched.add(f); if (!check(f)) { bad++; first ??= ctl(f); } });
    if (!status) return;
    status.removeAttribute('data-placeholder');
    status.classList.toggle('is-error', bad > 0);
    if (bad) {
      status.textContent = bad === 1 ? `1 champ est à corriger avant d’envoyer.` : `${bad} champs sont à corriger avant d’envoyer.`;
      first?.focus();
      return;
    }
    if (!form.dataset.endpoint) {
      status.textContent = `Rien n’a été envoyé${NBSP}: ce formulaire n’est pas encore relié. Pour joindre le restaurant, appelez le ${form.dataset.fallbackTel ?? ''}.`;
      status.setAttribute('data-placeholder', 'true');
      return;
    }
    status.textContent = idle;
  });
});
