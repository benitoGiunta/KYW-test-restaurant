# Révision 1 · La Ferme Blanche d'Asie · awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | rien à corriger | aucun | revue : « F0 : aucun » |
| F1-1 | corrige | `reservation.astro` : bouton « Écrire un e-mail » et mailto supprimés ; surtitre « Par téléphone ou sur place » ; description sans « par e-mail » (e-mail conservé dans le pied) | grep `dist/.../reservation/index.html` : 0 `mailto` hors pied, 0 « e-mail » dans la page |
| F1-2 | corrige | `Header.astro` : `aria-label="La Ferme Blanche d’Asie, accueil"` ; `site.css` : nom visible à 390 px (0,8 rem), visually-hidden sous 24 rem au lieu de `display:none` | axe 390 et 360 px, 4 pages : 0 violation ; 0 débordement (un premier essai « visible partout » débordait de 25 px à 360 px, corrigé) |
| F2-1 | corrige | `index.astro` : `.mur` et `.plateaux` en `tabindex="0"`, `role="group"`/`aria-label` | axe accueil 390 px : 0 `scrollable-region-focusable` |
| F2-2 | corrige | `index.astro` : tuile menu découverte « 1 », titre « {nbPlats-1} plats et un menu découverte » (55 + 1 = 56 = 4+20+31+1) | grep `dist` : « 55 plats et un menu découverte » |
| F2-3 | corrige | `index.astro` : titre « Plusieurs salles, une seule table. » (plus de nombre) | grep `dist` |
| F2-4 | corrige | `carte.json` : n° 2 « nid d’hirondelle » (complété d'après le menu de Noël du dossier), n° 17, 39, 40, 41, 113, 107, « Légumes sautés », n° 50 (« à partir de 2 personnes (18,50 € par personne) »), n° 1 (minuscule, sans virgule finale) ; prix et numéros inchangés | grep `dist/carte` ; à noter dans RAPPORT.md : correction éditoriale, fautes d'origine chez le client |

F3 (surtitres, horaires répétés, largeur 1600) : F3-3 fait au passage (`widths` + 1600 sur la photo de réservation) ; F3-1 et F3-2 non traités (hors périmètre F0 à F2).
Hypothèse : « Légumes sauté » et « Nouille sauté au poulet » corrigés aussi, même faute que celles listées.
