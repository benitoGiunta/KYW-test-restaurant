# Revue awwwards · Pépite, cave à manger · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 7 F2, 7 F3)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : une cave voûtée sombre, du lin et du cuivre, où un fil de cuivre vertical descend la page et pose une « pépite » (losange) devant chaque plat, avec un grand titre Boska fin et du DM Mono pour le corps.

Scores /10
- Design 8 : palette cave/lin/cuivre tenue sur 5 pages, hero `home/d-01-hero.png` net (nom géant, photo portrait, fil de cuivre), carte en frise `carte/d-02-scroll.png`, aucun défaut de débordement (scrollWidth = fenêtre sur 5 pages x 1440/390).
- Usabilité 7 : navigation courte, menu burger fonctionnel (ouvre, focus sur « Accueil », Échap ferme), 0 cible < 24 px ; mais page Réserver sans réservation en ligne directe et carte dont le premier plat est sous le pli à 1440 x 900.
- Créativité 7 : le motif du filon est cohérent et sobre ; le bandeau « à la bougie » et la page 404 (« La bougie s'est éteinte ») prolongent l'idée, pas de WebGL ni de scène forte.
- Contenu 7 : faits justes (adresse, horaires, 58 €, plats, 12 €, 45 €, 5,50 à 12,50 €), français propre, pas de filler ; quelques formulations affirment plus que le dossier (F1-2).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 lien mort (liens internes confrontés aux fichiers de `dist/`), CLS 0, LCP mobile 1088 ms (accueil) et 2232 ms (carte, sous CPU x4 + 4G), page la plus lourde 629 Ko ; 2 violations axe serious (F2).

Méthode : QA-revue1.md et ses planches lues (3 pages, 404 brute) ; `dist/` identique à `dist/pepite/awwwards/` et postérieur à `src/` (`find -newer` vide), captures du QA réutilisées. Histoire et réservation, non capturées par le QA, mesurées et capturées par script maison (axe-core de node_modules, console, requêtes, débordement, cibles, 5 pages x 1440/390, 404.html réelle comprise), serveur propre sur le port 4781 (arrêté par `kill`).

## Findings

### F1 (majeurs)
- **F1-1 · Photo « dessert » de la bande « Parfois, à la bougie » illisible, alt faux** (`src/pages/index.astro:59-61`, `Photo.astro`). Les trois vignettes sont des panneaux d'un triptyque (`dessert.jpg` 900 x 2969) affichés en `object-fit: cover; object-position: 50% 50%` dans un cadre 436 x 655 (390 px : 273 x 410). Le recadrage central du « dessert » ne montre qu'un fond flou rose (`strip-1440.png`, vignette centrale) : l'assiette est en bas du fichier, hors cadre. L'alt « Un dessert dressé sur une assiette, garni de filaments rouges » décrit donc une image invisible ; la vignette « service » coupe la bouteille et garde une bande blanche en haut (`service.jpg` : 400 px de blanc brûlé). L'effet est aussi pixellisé (agrandissement d'un panneau de 900 px). Correction : recadrer chaque panneau dans un fichier propre (service : visage + bouteille ; dessert : l'assiette, soit le bas du panneau) ou fixer `object-position` par vignette (`service` 50% 70 %, `dessert` 50% 92 %), couper la bande blanche, et réécrire les alt d'après ce qui est visible (« Une personne tient une bouteille de vin dans la salle à la bougie », « Une assiette de dessert à la betterave et aux filaments rouges » seulement si vérifié, sinon alt neutre). Le champ `sujet` de `photos/index.json` dit : « Triptyque : serveuse avec bouteille, dessert, bougie » ; « serveuse » est un rôle non prouvé : écrire « une personne ».
- **F1-2 · Affirmations plus fortes que le dossier (T-invente, procédures et fréquence)** :
  - `src/pages/reservation.astro:8` « Pour une table, appelez ou écrivez » et bouton « Écrire par e-mail » : le dossier donne Tablebooker + téléphone/SMS ; l'e-mail est un contact affiché sur le site, pas un canal de réservation. Retirer « ou écrivez » et le bouton, ou le renommer « Nous écrire » sans promettre la réservation.
  - `src/pages/carte.astro:11` « un tableau qui se réécrit » : `donnees.json` marque la fréquence « à confirmer ». Écrire « Voici le tableau du jeudi 12 au samedi 14 novembre 2026 ».
  - `src/data/site.ts:55` « Depuis, la cave voûtée accueille aussi des soirées à la bougie » (présent) et `index.astro` titre « Parfois, à la bougie » : seule preuve, un article du Vif de 2022 (« trois soirs par mois »). Passer au passé (« ont eu lieu ») comme déjà fait sur l'accueil ligne 56, ou retirer « Parfois ». Idem la méta description de l'accueil (« soirées à la bougie » au présent).

### F2 (mineurs)
- **F2-1 · axe `aria-prohibited-attr` (serious, 2 nœuds, accueil 1440 et 390)** : `<span class="hero__nom" aria-label="Pépite">` et `<span class="hero__sous" aria-label="cave à manger">` (SplitText pose `aria-label` sur des `span`). Absent du QA. Correction : option `aria: 'none'`/`aria-hidden` sur les lettres et `role="text"` n'est pas admis ; le plus sûr est un `<span class="sr-only">` + lettres `aria-hidden`.
- **F2-2 · axe `scrollable-region-focusable` (serious, accueil 390)** : `ul.strip` défile horizontalement (overflow auto, 3 vignettes dont 2 hors cadre, `right` = 578 et 867) sans contenu focalisable, donc inatteignable au clavier. Correction : `tabindex="0"` + `role="region"` + `aria-label="Photos des soirées à la bougie"` sur le scroller.
- **F2-3 · Doublon horaires/adresse** : l'accueil enchaîne « Venir chez Pépite » (horaires + adresse + CTA) et, juste dessous, le pied « À table. » (Venir, Horaires, Réserver) ; la page Réserver montre deux fois horaires et adresse (`reservation/` s1 et pied) ; le pied n'affiche que « cave dès 19 h », sans les horaires de la boutique, donc deux versions des horaires sur la même page. Correction : retirer la section « Venir chez Pépite » de l'accueil (ou le bloc horaires du pied sur cette page) et mettre les horaires de la boutique dans le pied.
- **F2-4 · Page Carte, vide à 1440 x 900** (`carte/d-01-hero.png`) : titre + chapeau occupent 70 % de la fenêtre, aucun plat avant le défilement, puis « Menu 5 services » seul sur une demi-page (`d-02-scroll.png`). Réduire la hauteur du hero (min-height 60 svh) et faire remonter le menu. Même constat noté dans RAPPORT.md, non traité.
- **F2-5 · Accueil, grand vide de 350 px** entre « Voir la carte » et la photo des vins (`home/d-04-scroll.png`) ; resserrer le padding de section.
- **F2-6 · Réservation faible** : « Réserver sur le site de Pépite » pointe vers `https://pepite-caveamanger.be/` (accueil du client), pas vers l'outil Tablebooker ; deux des trois actions sont des boutons contour en DM Mono 12 px nettement plus discrets que l'appel. Hypothèse acceptable (outil à confirmer), à garder dans le RAPPORT ; hiérarchiser le bouton de réservation.
- **F2-7 · Citation : coupes de ligne parasites** (`histoire/` s1 à 1440 : « Partager et Se Sentir Bien sont / les / mots qui… » ; 390 : « Bien / sont / les mots… »). Les lignes SplitText sont figées sur une mesure antérieure au chargement de la police : recalculer au `document.fonts.ready` ou retirer `data-split="lines"` du blockquote.

### F3 (finitions)
- **F3-1** Guillemets : « (espace simple) au lieu de U+00A0 dans la citation (accueil, histoire) ; le guillemet ouvrant italique est minuscule en tête de ligne.
- **F3-2** Photo hero `cave.jpg` source 598 x 899, servie en 432 px pour 437 px CSS : nette en DPR 1, molle en DPR 2 ; la source du client n'a pas mieux, ne pas l'agrandir.
- **F3-3** JSON-LD : `openingHoursSpecification` sans `closes` et sans horaires de la boutique ; 5 pages portent le même bloc (`url` de l'accueil sur toutes), `sameAs` Facebook avec accents non encodés.
- **F3-4** Alt de la photo des bouteilles : « alignées sur le comptoir » (le `sujet` dit seulement « rangée de bouteilles de vins, personne floue derrière »).
- **F3-5** Réservation, tableau d'horaires à 1440 : « boutique dès 10 h 30 » passe à la ligne (« 10 h / 30 ») ; élargir la colonne.
- **F3-6** « Du jeudi 12 au samedi 14 novembre 2026 » en dur dans les données ; périmé dès le 15 novembre. Prévoir une relecture ou une mention « semaine du … ».
- **F3-7** LCP mobile de la carte 2232 ms (limite 2,5 s) : le paragraphe d'accroche est encore en `data-reveal` sur cette page ; appliquer la correction faite sur l'accueil.

### Conformité vérifiée (sans écart)
Build OK ; `lang="fr"`, un seul `h1` par page, `noindex, nofollow` (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et logo KYW unique (`kyw-footer__logo` x 1) sur les 5 pages ; liens de réseaux = URL du dossier ; téléphone 0476 62 01 82 et e-mail conformes ; 404.html réelle (h1, title, lang, bougie, deux liens) ; reduced-motion : 0 texte caché ; clavier : 0 focus invisible ; 0 tiret cadratin, 0 apostrophe droite ; faits chiffrés confrontés à `donnees.json` (58 €, 12 €, 45 €, 5,50 à 12,50 €, 6 plats, horaires jeu./ven./sam.) : 0 écart. Aucune donnée fictive affichée.

## Ce qui est bien (à ne pas casser)
1. Le hero de l'accueil : nom géant en Boska, « cave à manger » en italique cuivre, photo de la cave voûtée et fil de cuivre qui descend (`home/d-01-hero.png`, `m-01-hero.png`), LCP de 1,1 s.
2. La frise du tableau de la semaine (fil de cuivre + losanges, plats en grand corps, descriptions en mono) : l'idée du site est lisible sur la carte à 1440 et 390.
3. Le pied : bandeau KYW clair, un seul logo, mention présente ; menu burger plein écran propre ; contenu honnête sur ce que le site ne publie pas (« La carte des vins et les prix des assiettes à la carte ne sont pas publiés sur ce site »).
