# Révision 2 · Le D'Arville · portfolio

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `base.css` : filigrane `.chiffre--filigrane` en `display:none` sous 600 px (« 200 mètres » reste dans le texte) | Playwright 390 px sur `/barabas/` : display none, scrollWidth 390 ; 4 pages sans débordement à 390 et 360 |
| F1-2 | corrigé | `base.css` : `.onglets__photos` z-index -2 (le dégradé passe au-dessus), dégradé 0,9 à 30 % puis 0,95 | capture 1440 sans texte, pixel le plus clair : texte crème 7,6:1, orange pâle 5,7:1, titre orange (grand texte) 3,5:1 (seuil 3:1 ; 4,5:1 non atteint pour ce titre seul) |
| F2-1 | corrigé | `menu.astro` (phrase desserts retirée), `carte.astro` (accords « en option, 40 € ou 50 € »), `site.ts` (Bon Plan : jours seuls) | grep `dist/` : 0 « nous les demander », « à la demande », « Le site de la maison » |
| F2-2 | corrigé | `Footer.astro` : `<footer>` du site devenu `<section aria-label="Coordonnées">` | `dist/` : un seul `<footer` par page (celui de KYW) |
| F3-5 (bonus) | corrigé | `site.ts`, `index.astro` : plus de « affiche de la maison » | grep `dist/` : 0 occurrence |

F3-1 à F3-4 non traités (hors liste F0 à F2). Pas de changement de design (DESIGN.md inchangé). Hypothèse : la région `section aria-label` ne déclenche pas d'autre violation axe (non relancé, hors périmètre ciblé).
