# Revue portfolio · Partage · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : une « ardoise » noire et crème où l'accueil est la carte (onglets Midi / Soir, suggestion du jour, barre d'état), signée « Charles Jeandrain » avec un trait ocre ; inchangée depuis la passe 1.

Sources : `REVISION-1.md`, `QA-revue2.md` et ses planches (accueil, carte, 404 : planches trop denses pour lire le détail, donc captures ciblées refaites), `dist/` relu contre `donnees.json` et `dossier.md`, mesures Playwright sur 6 pages × 1440 / 390 / 360 (`.shots-partage-portfolio-revue2b/`), contrôle HTTP des 14 URL internes. Serveur local `serve.mjs` port 4520 arrêté (kill PID). Pas de shoot complet relancé.

Scores /10
- Design 7 : tenue noire / crème / ocre intacte, en-tête mobile sur une ligne à 4 liens (`m.png`) ; premier écran desktop toujours sans image, colonne droite vide (`d-home.png`).
- Usabilité 8 : 0 cible < 24 px, 0 débordement (scrollWidth = largeur d'écran sur 18 combinaisons page × viewport), bandeaux fixes desktop 89 px au lieu de ~152, un seul « Réserver » visible dans l'en-tête et la page.
- Créativité 7 : l'accueil-carte et la signature restent propres au lieu ; pages secondaires (`d-formules.png` : trois blocs égaux à gros chiffres) toujours convenues.
- Contenu 7 : plus de règle inventée, de doublons ni de photo contradictoire ; reste une mention « Sur demande, par téléphone » non sourcée (F2-A) et la méta-description trop longue.
- Technique 9 : build OK (7 pages), console 0 et réponses ≥ 400 : 0 sur 18 chargements, 14 URL internes en 200, axe 0 (QA-revue2), CLS 0, LCP mobile 1,06 s / 1,08 s, `dist/` identique au commit, contraste de la légende 6,53:1.

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F0-1 règle « plus de six personnes » | confirmé | `grep -rlE 'six personnes\|plus de six' dist/partage/portfolio` : 0 fichier ; `reservation.note` absent de `site.ts:86` ; chapô de `/reservation/` = « En ligne via restaurantpartage.be, ou par téléphone au +32 81 81 00 98. Pour 20 à 30 personnes, la salle se privatise. » (`m-reservation.png`, `d-reservation.png`) ; champ Couverts `max=30` (hypothèse acceptable). |
| F2-1 croquettes / photo | confirmé | `apercu-jambon` : 0 occurrence dans `index.html` et `carte/index.html` ; première vignette de l'accueil = calamars (`apercu-calamars.webp`, photo de friture au citron, cohérente) puis verres pour les vins ; 560 px naturels, 56 px affichés, chargées après défilement ; légende « Photos de la maison, pas toujours du plat exact » visible en accueil et carte (`m.png`). |
| F2-2 chapô de la carte | confirmé | chapô = « Le soir, une carte à partager : … Le midi, un lunch en trois services pour la table entière. » ; dates et mention des photos en légende sous les boutons (`m-carte.png`, `d-carte.png`) ; « au survol » : 0. |
| F2-3 exemples de privatisation | confirmé | `repas d’entreprise` / `anniversaire, famille` : 0 dans `dist/`. |
| F2-4 doublons | confirmé | « Vins au verre » : 1 occurrence sur l'accueil (innerText, 1440 et 390) ; « Trois façons de partager » sans descriptions + lien « Le détail des formules » ; chapô de `/histoire/` = « Le bistro de Charles Jeandrain, ouvert en novembre 2024 : une trentaine de couverts et des assiettes au milieu de la table. » (faits du dossier). |
| F2-5 menu mobile | confirmé | 4 liens visibles (Carte, Lunch, Salle, Maison), bord droit 374 px à 390 et 344 px à 360, gouttière 16 px tenue, en-tête 57 px ; libellés courts lisibles (`m.png`). « Réserver » est porté par la barre basse (`.barre` = grid en mobile). |
| F2-6 bandeaux desktop | confirmé | `.barre` `display: none` à 1440, en-tête 57 px, pas de `padding-bottom` ; « Réserver » : en-tête + pied de page (accueil, carte, salle, réservation), + bloc dédié sur `/formules/` et `/histoire/`. |

Aucune régression constatée : noindex, mention « Maquette KYW, certaines données sont illustratives. » et `kyw-signature` présents sur les 7 pages (404 comprise) ; 1 `h1` par page ; 0 tiret cadratin ; 404.html directe : titre « Page introuvable | Partage », `lang="fr"`, `h1` « Effacé ».

## Findings

### F0 / F1
Aucun.

### F2 (mineur)
- **F2-A · T-invente (léger) · procédure de privatisation non sourcée.** « Sur demande, par téléphone » (`src/data/site.ts:382`, carte « La salle pour vous » de `/formules/`, `d-formules.png`) ; le dossier dit seulement « Privatisation 20 à 30 personnes » (`donnees.json:934`, `dossier.md:29`, `:54`), sans dire comment la demander. Le téléphone est un contact réel du restaurant, mais la modalité est écrite comme règle. Correction : remplacer `quand` par « Groupes de 20 à 30 personnes » (le bloc « Groupes et privatisation » plus bas garde le bouton « Appeler ») ou marquer la ligne `placeholder: true`.

### F3 (finition, non traités en passe 1, toujours ouverts)
- **F3-1 · Apostrophes droites** : 1 sur l'accueil (« Toute l'histoire »), 2 sur `/histoire/` (« L'équipe », « Ce qu'on en dit »), 4 sur `404.html` ; reste du site en `’`.
- **F3-2 · Méta-description d'accueil de 174 caractères** (audit WARN) et tournure « lus en un coup d’œil » : « Partage, bistro de Charles Jeandrain dans le piétonnier de Namur : carte à partager, lunch à 38 €, horaires et réservation. » (≈ 120), à reporter dans OG et JSON-LD.
- **F3-3 · 404 non servie par Vercel** (`dist/404.html` racine absent) : hors périmètre du site, à traiter côté dépôt.
- **F3-4 · Badge « À CONFIRMER » de `/reservation/`** toujours accolé au début de la phrase qui passe à la ligne dessous (`d-reservation.png`).
- **F3-5 · Alignements** : contenu de `/carte/` démarré à x ≈ 1411 contre un titre à 1316 (`d-carte.png`).
- **F3-7 · Fichier mort** : `dist/partage/portfolio/photos/apercu-jambon.webp` (86 Ko) n'est plus référencé.

## Ce qui est bien (à ne pas casser)
1. L'accueil-carte : onglet choisi selon le jour et l'heure, suggestion du jour avec phrase de fermeture réelle, légende honnête sur les photos.
2. La rigueur des données : prix, plats, horaires « à confirmer » et suggestion « illustrative » marqués ; le correctif F0-1 a retiré la règle plutôt que de la maquiller.
3. L'en-tête mobile à quatre libellés courts sur une seule ligne, sans débordement à 360 px.

## Pour la passe suivante
Corriger F2-A (une ligne), puis F3-1, F3-2, F3-4 ; après cela le site est PUBLIABLE (build OK, 0 console, 0 lien mort, 0 débordement, axe 0, mention + logo + noindex présents).
