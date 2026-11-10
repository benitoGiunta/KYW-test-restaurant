# Révision 1 · Le Félicien legacy

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `.split:not(.split--rev) > .well` en colonnes 8-13, pleine largeur sous 60 rem (`page.css`) | `.well` = 528 px à 1440, 720 à 768, 358 à 390, 328 à 360 |
| F1-2 | corrigé | `.rows-block > .sched` en colonnes 5-13, pleine largeur sous 60 rem (`page.css`) | `.sched` = 864 / 720 / 358 / 328 px aux mêmes largeurs |
| F1-3 | corrigé | `scrollIntoView` seulement sur clic ou clavier, plus au chargement (`la-carte.astro`) | 1er Tab sur `/la-carte/` = « Aller au contenu » |
| F2-1 | corrigé | voile horizontal ≥ 64 rem sur `.hero::before` (`page.css`) | capture 1440 : titre lisible sur le rebord de l'assiette (contrôle visuel, pas de mesure p95) |
| F2-2 | corrigé | `Footer.astro` : `footer` devenu `section aria-label="Coordonnées"` | axe : 0 violation sur carte, contact, accueil, suggestions |
| F2-3 | corrigé | texte du lundi aligné sur `donnees.json` (`suggestions-de-la-semaine.astro`) | grep |
| F2-4 | corrigé | `aria-label` retiré du `nav.jump` en `role=none` (`la-carte.astro`) | axe `/la-carte/` : 0 violation |
| F3-1 | corrigé | `<span class="nw">` autour du téléphone (`contact.astro`) | 1 seule boîte de ligne à 360 px |
| F3-2 à F3-6 | non traités | hors liste ciblée | |

Hypothèse : le `section aria-label` remplace le `div` essayé d'abord (axe `region` sur `#infos`). Débordement de page : `scrollWidth` = largeur de fenêtre à 360, 390, 768, 1440 sur Contact. Build OK.
