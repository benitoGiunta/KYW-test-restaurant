# Revue awwwards · L’Huile sur le Feu · passe 2
Verdict : A_CORRIGER (0 F0, 1 F1, 0 F2, 3 F3)

Lecture en une ligne de l’idée du site : un site sombre bordeaux et or où une goutte d’huile descend le long de la page et donne sa couleur à chaque plat, titres en Bodoni roman et italique ; l’huile d’olive est le point de départ de chaque assiette (inchangé depuis la passe 1).

Base de preuves : `dist/` (16:52) postérieur à `src/` (dernière modification 16:50) et aux REVISION-1 (16:51) ; captures du QA (`QA-revue2.md`, 17:00) postérieures au dist, donc réutilisées (accueil, carte : 0 erreur console, 0 requête en échec, 0 axe, 0 débordement, LCP mobile 2376 / 1176 ms, CLS ≤ 0,009, audit 0 FAIL). Pages et largeurs non couvertes par le QA : script maison unique sur serveur propre (port 4871, PID 23682, arrêté ; le port 4783 prévu était déjà pris par un autre agent), 5 pages (accueil, carte, histoire, réservation, `404.html` réelle) x 7 largeurs (320, 360, 390, 412, 768, 1024, 1440), défilement par pas de 300 px, axe-core complet de `node_modules`, console, requêtes, `scrollWidth`, enfants dépassant la fenêtre, `.split-line-mask` dont `scrollWidth` > `clientWidth`, `h1`, `lang`, noindex, mention, logo ; puis script ciblé sur les titres (Range vs boîte) à 1024, 1100, 1280, 1440 et 1920, et sur le sommaire de la carte à 390 et 1440.

Scores /10
- Design : 8. Palette et typographie tenues, OG désormais composée ; retenue à 8 par « Marchovelette » dont le dernier « e » est coupé à 1024 px (`rev2-resa-h2-1024.png`).
- Usabilité : 8. Sommaire de la carte signalé par un dégradé de bord et dernier lien (« Vins rosés ») entièrement visible en fin de défilement (390 : right 334 px ; 1440 : 1384 px) ; colonnes de texte pleine largeur sur mobile.
- Créativité : 8. Goutte d’huile et 404 « Le flacon est vide » inchangées, propres au restaurant.
- Contenu : 8. Faits inchangés et exacts (adresse, +32 81 24 19 03, info@lhuilesurlefeu.be, Barestho, Facebook, Instagram, 51 plats) ; 0 invention ; répétition de phrases presque résolue, reste la ligne Oliviers & Co (F3-1).
- Technique : 8. 0 erreur console, 0 requête en échec, 0 violation axe (35 cas page x largeur), 0 `scrollWidth` > fenêtre, 4 liens internes + sitemap + og.png + favicon en 200, noindex, mention, un logo et un `h1` sur les 5 pages ; retenue par le F1-1.

## Vérification des corrections annoncées (REVISION-1)
| Annonce | Résultat | Preuve |
|---|---|---|
| F1-1 classes `.paire__texte--g` / `.paire__b--etroit`, styles en ligne retirés | Corrigé à 320, 360, 390, 412, 768 ; **incomplet à 1024 et 1100** | `.paire__texte` pleine largeur 280/320/350/372/715 px ; plus aucun `style="grid-column` dans histoire/reservation ; mais voir F1-1 ci-dessous. L’écart « 2 px d’italique » annoncé n’apparaît dans aucune mesure de cette passe (0 `.split-line-mask` coupé sous 1024 et au-dessus de 1100). |
| F2-1 sommaire de la carte | Corrigé | `rev2-nav-planche.png` : à 390 et 1440, « Vins r… » s’estompe au bord droit (masque), défilement jusqu’au bout montre « Vins rosés » en entier ; 11 liens. |
| F2-2 `og.png` recomposé | Corrigé | `dist/.../og.png` 1200 x 630, 399 Ko (3,6 Ko avant) : nom en Bodoni, baseline, adresse, photo de flambage ; lisible. |
| F2-3 répétitions | Corrigé en grande partie | « Partenaire huile » : 0 occurrence ; « chaque assiette reçoit l’huile choisie pour elle » : accueil seulement ; « grandi dans les Pouilles » : récit seulement (la fiche est nettoyée). Reste F3-1. |
| F3 non traités | Confirmé | Horaires toujours en double sur la réservation (F3-2) ; l’en-tête translucide n’a pas été revu (F3-3). |

## Findings

### F1 majeur
- **F1-1 · Titre « Venir rue de Marchovelette » coupé à 1024 et 1100 px (réservation)**
  - Fichiers : `src/pages/reservation.astro:37` (h2 dans `.paire__texte--g`), `src/styles/site.css:86` (`.paire__texte--g { grid-column: 1 / 7 }`).
  - Preuve : à 1024 px la colonne fait 464 px, le mot « Marchovelette » en italique fait 484 px ; `.split-line-mask` est en `overflow: clip` (scrollWidth 484 pour 464) : le dernier « e » est tronqué, visible sur `rev2-resa-h2-1024.png` (« Marchovelett » + demi-lettre). À 1100 : 510 pour 500 (10 px coupés). À 1280, 1440 et 1920 : 0 écart ; 768 et en dessous : pleine largeur, 0 écart. Même classe de défaut que le F1-1 de la passe 1 (titre coupé), la révision l’a mesurée à 320/390/412/768 mais pas sur la plage 1024-1180 (tablette paysage, petit portable).
  - Correction attendue : sur la réservation, élargir la colonne du titre (`grid-column: 1 / 8` entre 821 et 1279 px) ou réduire la taille du h2 par `clamp()` plafonné à la largeur de colonne ; contrôle : à 1024, 1100, 1180, 1280, `.split-line-mask` sans scrollWidth > clientWidth sur tous les h1/h2 de toutes les pages.

### F3 finition
- **F3-1 · Phrase Oliviers & Co encore dite deux fois** : accueil (« Les huiles viennent d’Oliviers & Co et se retrouvent dans la boutique, dans la même maison que la salle ») et histoire (« Les huiles viennent d’Oliviers & Co et se retrouvent sur les étagères de la boutique, dans la même maison »). Reformuler l’une avec un fait nouveau du dossier ou la retirer.
- **F3-2 · Horaires en double sur la réservation** (ex F3-1, non traité) : les deux flacons « Midi / Soir » puis le tableau complet (`reservation.astro:21-33`). Garder l’un des deux.
- **F3-3 · En-tête translucide à deux teintes** sur photo claire (ex F3-2, non traité ; contraste mesuré correct). Fond plus opaque ou `backdrop-filter`.

## Vérifié sans écart
5 pages x 7 largeurs : 0 erreur console, 0 requête en échec, 0 axe (toutes sévérités), 0 débordement de page, 0 enfant hors fenêtre, un seul `h1`, `lang="fr"`, noindex, mention « Maquette KYW, certaines données sont illustratives », un logo `kyw-signature` par page, JSON-LD présent sur chaque page, titres de pages uniques. 404 réelle (`404.html`) : mêmes contrôles OK. Faits du dossier inchangés depuis la passe 1 (textes touchés par REVISION-1 relus : aucun fait ajouté). LCP mobile accueil 2376 ms (≤ 2,5 s), carte 1176 ms (le F3-3 de la passe 1 est levé). Faux positifs du QA ignorés : `skipLinkFirst: false`, « 404 » brute de `serve.mjs` (2 violations axe, sans title ni lang, absentes de `404.html`), WARN robots/sitemap sous `base`.

## Ce qui est bien (à ne pas casser)
1. La goutte d’huile et sa couleur par huile, cohérentes d’une page à l’autre jusqu’à la 404.
2. Contenu fidèle au dossier, rien d’inventé, sommaire de la carte désormais lisible et signalé.
3. Robustesse mesurée : 0 axe, 0 console, grille mobile propre de 320 à 768 px, OG de partage réussie.
