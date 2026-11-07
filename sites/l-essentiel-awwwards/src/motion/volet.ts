// Menu plein écran (téléphone) : <dialog> modal, focus piégé, Échap ferme, focus rendu au bouton.
import { onPage, stopScroll, startScroll } from '../engine';

export function initVolet() {
  onPage(() => {
    const dlg = document.getElementById('volet') as HTMLDialogElement | null;
    const ouvrir = document.querySelector<HTMLButtonElement>('[data-volet-ouvrir]');
    if (!dlg || !ouvrir) return;
    const fermer = dlg.querySelector<HTMLButtonElement>('[data-volet-fermer]');
    const focusables = () => [...dlg.querySelectorAll<HTMLElement>('a[href], button')];
    const open = () => { stopScroll(); dlg.showModal(); ouvrir.setAttribute('aria-expanded', 'true'); document.documentElement.classList.add('volet-ouvert'); };
    const close = () => dlg.close();
    const onClose = () => { startScroll(); ouvrir.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('volet-ouvert'); ouvrir.focus(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const f = focusables(); const first = f[0]; const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    // Un lien ferme le volet avant la navigation : un <dialog> modal resterait au-dessus du rideau.
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) return close(); // clic sur le fond
      if ((e.target as HTMLElement).closest('a')) close();
    };
    ouvrir.addEventListener('click', open);
    fermer?.addEventListener('click', close);
    dlg.addEventListener('close', onClose);
    dlg.addEventListener('keydown', onKey);
    dlg.addEventListener('click', onClick);
    return () => {
      ouvrir.removeEventListener('click', open);
      fermer?.removeEventListener('click', close);
      dlg.removeEventListener('close', onClose);
      dlg.removeEventListener('keydown', onKey);
      dlg.removeEventListener('click', onClick);
      if (dlg.open) dlg.close();
      document.documentElement.classList.remove('volet-ouvert');
    };
  });
}
