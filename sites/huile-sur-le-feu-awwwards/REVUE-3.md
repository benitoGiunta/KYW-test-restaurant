# Revue awwwards · L’Huile sur le Feu · passe 3
Verdict : PUBLIABLE (0 F0, 0 F1, 0 F2, 3 F3)

Lecture en une ligne de l’idée du site : un site sombre bordeaux et or où une goutte d’huile descend le long de la page et donne sa couleur à chaque plat ; titres en Bodoni roman et italique, 404 « Le flacon est vide » (inchangé depuis les passes 1 et 2).

Base de preuves : `dist/` (17:10) postérieur à `src/` (dernière modification `site.css` 17:08) ; `QA-revue3.md` (17:21) postérieur au dist, donc réutilisé (accueil, carte, 404 brute : 0 erreur console, 0 requête en échec, 0 débordement, 0 cible trop petite, CLS ≤ 0,009, LCP mobile accueil 2356 ms et carte 1152 ms, audit 0 FAIL ; planches accueil et carte relues : composition desktop et mobile intactes). Mesure complémentaire : un script maison (port 4854, PID 30831, arrêté) sur 5 pages (accueil, carte, histoire, réservation, `404.html` réelle) x 8 largeurs (320, 390, 768, 1024, 1100, 1180, 1280, 1440) = 40 contextes, défilement à la molette, axe-core de `node_modules`, console, requêtes et statuts >= 400, `scrollWidth` du document, tous les `.split-line-mask` (scrollWidth > clientWidth).

Scores /10
- Design : 8,5. Palette et typographie tenues ; plus aucun titre coupé de 320 à 1440 px (0 `.split-line-mask` en écart, même à 1 px).
- Usabilité : 8,5. Sommaire de la carte à dégradé de bord (passe 2), parcours clavier de 12 arrêts logique, 0 cible trop petite, mobile pensé (QA : `m-*` accueil et carte).
- Créativité : 8. Goutte d’huile par plat et 404 propres au restaurant, inchangées.
- Contenu : 8. Aucun texte touché depuis la passe 2 (seul `site.css` a changé) : faits exacts, 0 invention ; reste la double phrase Oliviers & Co (F3-1).
- Technique : 9. 40 contextes : 0 erreur console, 0 requête en échec, 0 violation axe (toutes sévérités), 0 débordement ; 5 pages en 200, `sitemap-index.xml`, `og.png`, favicon en 200 ; JSON-LD `Restaurant` avec `OpeningHoursSpecification` ; `h1` unique, `lang="fr"`, noindex, mention et un `kyw-signature` sur chaque page.

## Vérification des corrections annoncées (REVISION-2)
| Annonce | Résultat | Preuve |
|---|---|---|
| F1-1 « Venir rue de Marchovelette » coupé à 1024 et 1100 | **Corrigé** | `site.css:87` présent dans le dist : `@media (min-width: 821px) and (max-width: 1279px) { .paire__texte--g { grid-column: 1 / 8; } }`. Mesure sur 5 pages x 1024, 1100, 1180, 1280, 1440 (et 320, 390, 768) : 0 `.split-line-mask` avec scrollWidth > clientWidth (tolérance 0 px, pas 2 px). |
| « Reste observé : accueil, 3 px à 1180 et 1280 (« Les menus et les heures », « étagères ») » | **Non reproduit** | Même mesure, 0 écart à 1180 et 1280 sur l’accueil après défilement complet ; le débordement d’italique évoqué n’existe pas dans cette mesure. |
| F3-1, F3-2, F3-3 non traités | Confirmé | Voir ci-dessous, hors périmètre F0/F1/F2. |

## Findings

### F3 finition (non bloquants, non traités depuis la passe 2)
- **F3-1 · Phrase Oliviers & Co dite deux fois** : `src/pages/index.astro:50` (« Les huiles viennent d’Oliviers & Co et se retrouvent dans la boutique, dans la même maison que la salle ») et `src/data/site.ts:66` (histoire : « … sur les étagères de la boutique, dans la même maison »). Retirer l’une ou la reformuler avec un fait du dossier.
- **F3-2 · Horaires en double sur la réservation** : flacons « Midi / Soir » puis tableau complet (`src/pages/reservation.astro:21-33`). Garder l’un des deux.
- **F3-3 · En-tête translucide** (`src/styles/site.css:40`, fond à 92 % sur photo claire) : deux teintes visibles au passage de la photo de boutique (`d-04-scroll.png`) ; contraste mesuré correct, axe 0. Fond opaque ou `backdrop-filter`.

## Vérifié sans écart
Critères PUBLIABLE : build OK (QA-revue3, exit 0, 5 pages), 0 erreur console, 0 lien mort (4 liens internes, sitemap, og, favicon en 200 ; liens externes inchangés), 0 fait faux (aucun texte modifié depuis la passe 2), 0 invention, 0 débordement, 0 violation axe, mention + logo + noindex présents sur les 5 pages. Faux positifs du QA ignorés : `skipLinkFirst: false` (lien d’évitement bien en 1er arrêt), 2 violations axe et « 404 sans h1 » de la 404 brute de `serve.mjs` (la vraie `404.html` a `lang="fr"`, `title`, `h1`), WARN robots et sitemap sous `base`. Mon script a imprimé `logos=0` par mauvais sélecteur (`.kyw-signature` au lieu de la classe du paquet) : vérifié par grep du dist, 1 `kyw-signature` par page.

## Ce qui est bien (à ne pas casser)
1. La goutte d’huile et sa couleur par huile, cohérentes de l’accueil à la 404.
2. Grille robuste : titres Bodoni intacts de 320 à 1440 px, y compris la plage 1024-1180 qui posait problème.
3. Contenu fidèle au dossier, OG composée, JSON-LD complet, 0 axe sur 40 contextes.
