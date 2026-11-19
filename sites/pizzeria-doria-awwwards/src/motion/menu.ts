// Menu téléphone : un tiroir plein écran (<dialog> modal : focus piégé et Échap natifs), aria-expanded tenu à jour,
// focus rendu au bouton à la fermeture, fermé avant la navigation (sinon il resterait au-dessus des volets).
import { onPage, stopScroll, startScroll } from '../engine';

export function setupMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
    const dlg = document.querySelector<HTMLDialogElement>('dialog.menu');
    if (!btn || !dlg) return;
    let viaLien = false;
    const ouvrir = () => { dlg.showModal(); btn.setAttribute('aria-expanded', 'true'); stopScroll(); };
    const fermer = () => { if (dlg.open) dlg.close(); };
    const surFermeture = () => {
      btn.setAttribute('aria-expanded', 'false');
      startScroll();
      if (!viaLien) btn.focus();
      viaLien = false;
    };
    const clic = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t === dlg || t.closest('[data-menu-fermer]')) fermer(); // clic sur le fond ou sur « Fermer »
      else if (t.closest('a')) { viaLien = true; fermer(); }
    };
    btn.addEventListener('click', ouvrir);
    dlg.addEventListener('close', surFermeture);
    dlg.addEventListener('click', clic);
    return () => {
      btn.removeEventListener('click', ouvrir);
      dlg.removeEventListener('close', surFermeture);
      dlg.removeEventListener('click', clic);
      if (dlg.open) { viaLien = true; dlg.close(); }
    };
  });
}
