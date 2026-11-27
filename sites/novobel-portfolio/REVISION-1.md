# Révision 1 · Novobel · portfolio
F0 : aucun. Rebuild OK (`pnpm build:site`), `pnpm index` relancé.

| id | décision | changé (fichier) | vérification |
|---|---|---|---|
| F1-1 | Non tranché par le reviseur : hors périmètre (décision humaine). Consigné ; ne pas publier avant décision de la session mère. | `data/restaurants/novobel/ETAT.md` | note ajoutée |
| F1-2 | Corrigé : mention « Photo illustrative » sur toute photo `placeholder` | `components/Img.astro`, `styles/base.css` | grep : présent sur accueil et maison |
| F2-1 | Corrigé : 5 liens en mobile (« Maison » raccourci) | `components/Header.astro`, `styles/base.css` | 390 px : scrollWidth 390, dernier lien à x=374 |
| F2-2 | Corrigé : un seul contentinfo (pied du site en `div`), bandeau métiers en `aside` nommé | `Footer.astro`, `Header.astro` | grep : 1 `<footer`, 1 `<aside` ; axe non relancé |
| F2-3 | Corrigé : mentions de source supprimées | `maison.astro`, `services.astro` | grep : 0 occurrence |
| F2-4 | Corrigé : accroches reformulées sur les faits du dossier, répétition « remise des clés » réduite | `data/site.ts`, `index.astro`, `services.astro` | relecture |
| F2-5 | Corrigé : photo `silhouettes` en colonne droite du premier écran, bloc aligné sur la marge du logo ; bande retirée | `index.astro`, `base.css` | capture 1440 px |

Hypothèse : « Photo illustrative » aussi sur la galerie projets (doublon discret avec le badge existant). Non vérifié : axe complet, F3.
