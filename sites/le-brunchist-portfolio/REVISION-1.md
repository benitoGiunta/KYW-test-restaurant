# Révision 1 · Le Brunchist · portfolio
Bilan : 11 corrigés (F1-1, F1-2, F2-1 à F2-9), 0 refusé, 0 impossible, + F3-2 (prénom seul). F3-1, F3-3, F3-4 non traités (hors périmètre F0 à F2). Publiable : oui.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | classe `.c1-4 { grid-column: span 4 }` définie (`styles/base.css`) | offsetWidth galerie : 206 px (768), 283 (1024), 408 (1440), 357 (390) ; scrollWidth 390 à 390 px |
| F1-2 | corrige | titre par défaut « Café-brunch à Namur » (`layouts/Base.astro`) | `<title>` accueil mesuré : « Le Brunchist \| Café-brunch à Namur » |
| F2-1 | corrige | moments 11h, 12h30, 14h30, 15h30 en `placeholder: true`, étiquette « repère illustratif » sur les titres, « La maison ferme à 15h30 » (`data/site.ts`, `pages/index.astro`) | build OK |
| F2-2 | corrige | « l'histoire de la maison » (`404.astro`) | grep |
| F2-3 | corrige | `maintenantBxl()` via `Intl.DateTimeFormat` Europe/Brussels pour heure, jour, badge, ciel (`motion/journee.ts`) | navigateur en America/Los_Angeles, horloge 09:00 UTC : badge « ouvert jusqu'à 15:30 », horloge cohérente avec Bruxelles |
| F2-4 | corrige | libellé « Service » (`components/Horaires.astro`) | grep |
| F2-5 | corrige | listes redondantes retirées : bas de `/carte/`, « À la carte » de `/brunch/`, « À boire » de l'accueil, remplacées par un renvoi à la carte | build OK, lecture du code |
| F2-6 | corrige | 7 chapeaux retirés sur 14 (carte, histoire x2, reservation, 404, brunch, accueil) | grep `chapeau` |
| F2-7 | corrige | SplitText `aria: 'none'` hors titres h1 à h6 (`engine/reveal.ts`) | axe : 0 violation sur 5 pages |
| F2-8 | corrige | pied du site en `<section aria-label>` ; un seul `<footer>` (kyw-footer) | axe : 0 violation, 1 footer par page |
| F2-9 | corrige | « du Brunchist » dans les 4 méta | grep |
| F3-2 | corrige (bonus) | « Wendy » (`data/site.ts`) | grep |

Remarque de méthode : `getBoundingClientRect` sur les figures `data-reveal="scale"` non encore révélées est gonflé par la transformation (410 px au lieu de 357 à 390 px, scrollWidth 400) ; mesurer en `offsetWidth` ou après défilement.
Hypothèses : pas de capture visuelle (mesures de boîtes et axe suffisent pour ces points) ; `dist/index.html` non régénéré, pas de `[publier]`.
