# Révision 1 · be-belge portfolio (F2 seulement, aucun F0/F1)

Hypothèse : les pages `/menu/` (carte détaillée) et `/carte/` (deux menus) sont inversées dans la revue ; la numérotation des fichiers fait foi. Décision de nommage : `/menu/` devient « La carte », `/carte/` devient « Les menus ».

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | `+7 €` et `+4 €` avec espace insécable (`site.ts`) ; `white-space: nowrap` sur `.menu__options strong` (`styles/base.css`) | grep dist : `+7 €` insécable ; Playwright 390/360/1440 : cellule prix sur une ligne (largeur 31 px), 0 débordement |
| F2-2 | corrige | description meta « carte de l'été 2026 dès 57 € » (`site.ts`) ; chapitre 2 de l'accueil : « Tarifs de la carte de l'été 2026, proposée du 13 août au 6 septembre ; à confirmer auprès du restaurant » (`index.astro`) | grep dist/index.html : description et texte présents |
| F2-3 | corrige | chapitre 2 : paragraphe qui redisait le titre remplacé par la mention de date (prix 57 € : une seule occurrence de texte, hors chiffre géant) ; chapitre 1 : sous-libellé « Ou quatre, avec le Menu du Chef » (`site.ts`) | comptage « 57 € » dans le texte de l'accueil : 1 |
| F2-4 | corrige | lien d'en-tête et pied « Les menus » (`Header`, `Footer`), title et h1 de `/carte/` « Les menus » ; `/menu/` « La carte » (title, h1, liens) ; suppléments retirés de `/carte/` (`carte.astro`) | grep dist : title/h1 conformes, 0 « Suppléments » sur `/carte/`, 0 « Formules » dans le menu ; l'aria-label « Formules de privatisation » reste (autre sens) |
| F2-5 | corrige | sur l'accueil seulement, le pied de page remplace la liste d'horaires par le lien « Horaires et réservation » (`Footer.astro`, détection de l'accueil) ; les autres pages gardent les horaires | dist/index.html : « Le midi » 1 occurrence, lien présent |

Aussi, au passage (même code) : format d'heure français « 12 h à 13 h 30 » avec insécables (F3-1, F3-7, `site.ts`, JSON-LD inchangé).
Non traités (F3) : 2, 3, 4, 5, 6, 8, 9. Rebuild OK (`pnpm build:site`, 7 pages). DESIGN.md inchangé.
