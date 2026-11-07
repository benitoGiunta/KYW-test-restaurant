// Statut du hero calculé depuis les horaires réels (heure de Bruxelles, pas celle du visiteur).
import { onPage } from '../engine';
import { services, fermeturesPlages } from '../data/site';

const NB = ' ';
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const OUVERTS = [3, 4, 5, 6]; // mercredi à samedi
const hm = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const heure = (s: string) => { const [h, m] = s.split(':'); return `${Number(h)}${NB}h${m === '00' ? '' : NB + m}`; };

function bruxelles(d: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' })
    .formatToParts(d).map((x) => [x.type, x.value]));
  const iso = `${p.year}-${p.month}-${p.day}`;
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return { iso, wd, min: Number(p.hour) * 60 + Number(p.minute) };
}
const ferme = (iso: string) => fermeturesPlages.find(([a, b]) => iso >= a && (b === null || iso <= b));
const lendemain = (iso: string, n: number) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const dateLisible = (iso: string) => new Intl.DateTimeFormat('fr-BE', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(iso + 'T12:00:00Z'));

export function texteStatut(now = new Date()) {
  const t = bruxelles(now);
  const [midi, soir] = services;
  const plage = ferme(t.iso);
  if (plage) return plage[1] ? `Fermeture annuelle jusqu’au ${dateLisible(plage[1])}` : 'Fermeture annuelle en cours';
  if (OUVERTS.includes(t.wd)) {
    if (t.min < hm(midi.fin)) return `Ouvert aujourd’hui, midi dès ${heure(midi.debut)} et soir dès ${heure(soir.debut)}`;
    if (t.min < hm(soir.fin)) return `Ce soir, service dès ${heure(soir.debut)}`;
  }
  const avant = OUVERTS.includes(t.wd) ? 'Service terminé' : 'Fermé aujourd’hui';
  for (let n = 1; n <= 60; n++) {
    const iso = lendemain(t.iso, n);
    const wd = (t.wd + n) % 7;
    if (!OUVERTS.includes(wd) || ferme(iso)) continue;
    return n === 1 ? `${avant}, prochain service demain midi dès ${heure(midi.debut)}` : `${avant}, prochain service ${JOURS[wd]} ${dateLisible(iso)} midi`;
  }
  return '';
}

export function initStatut() {
  onPage(() => {
    const el = document.querySelector<HTMLElement>('[data-statut]');
    if (!el) return;
    const txt = texteStatut();
    if (!txt) return;
    el.textContent = txt;
    el.hidden = false;
  });
}
