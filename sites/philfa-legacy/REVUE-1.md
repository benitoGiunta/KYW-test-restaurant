# Revue legacy · PhilFa · passe 1
Verdict : A_CORRIGER (0 F0, 0 F1, 3 F2, 5 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une page unique sobre, vert olive très foncé, serif de titrage et boutons jaunes, qui met le menu du moment (35 € / 41 €), les horaires du jour et la réservation avant tout le reste, avec la carte complète en onglet.

Méthode : build et captures du QA (`QA-revue1.md`, captures 16:44, postérieures au dist 16:40 ; aucun fichier de `src/` ni de `public/` plus récent) relus par planches ; la « 404 » du QA est la 404 racine du dépôt (fond crème, tableau « Refontes de sites »), pas celle du site : `/philfa/legacy/404.html` mesurée et capturée à part. Mesures maison (axe-core complet, console, requêtes, débordement, cibles, 1440 / 390 / 320 px), onglets (clic, flèches, sans JavaScript), menu mobile, reduced-motion. Texte du `dist/` extrait et confronté à `donnees.json` et `dossier.md`.

Scores /10
- Design 7,5 : palette tenue (olive, ivoire, jaune), rythme clair, tableau d'horaires lisible (`d-02-scroll.png`), mais bande pleine largeur sur photo un peu molle (`d-05-scroll.png`).
- Usabilité 8 : réserver à 3 endroits, téléphone cliquable, onglets au clavier (flèche droite OK), menu mobile qui s'ouvre et se ferme à Échap, cibles toutes ≥ 24 px, carte lisible à 390 px (`carte-390.png`).
- Créativité 6 : conforme au genre legacy, sobre et propre, peu de signature (pas de motif propre à la maison, aucune photo de plat).
- Contenu 8 : 24 lignes de carte et le menu du moment correspondent à `donnees.json` (0 écart de nom ni de prix), horaires, adresse, téléphone, URL de réservation et réseaux conformes, aucune invention détectée, vouvoiement et ponctuation correctes.
- Technique 8,5 : 0 erreur console, 0 requête en échec, pas de débordement à 390 et 320 px, LCP mobile 1 656 ms, CLS 0,001, 1 seul `h1`, JSON-LD `Restaurant` avec adresse et horaires, `lang="fr"`, noindex, mention et logo KYW présents ; un seul défaut axe (moderate).

## Findings

**F2-1 · Deux `<footer>` : axe `landmark-no-duplicate-contentinfo` (moderate)** — `src/pages/index.astro:130` (`<footer slot="pied" class="pied">`) plus le `<footer>` de `kyw-footer`. Preuve : axe à 1440, 390 et 320 px, nœud `.pied`, absent de la page 404 (un seul footer). Correction : passer le pied du site en `<div class="pied">` (ou `<section aria-label="Coordonnées">`), garder le `<footer>` du paquet `kyw-footer` intact ; contrôler ensuite qu'axe ne signale pas `region`.

**F2-2 · Titre du héros coupé au trait d'union : « centre- / ville à Namur. »** — `src/pages/index.astro:15`. Preuve : `d-01-hero.png` (1440 px) : « de centre- » en fin de ligne 2, « ville à Namur. » en ligne 3, le nom composé est déchiré (`text-wrap: balance` de `base.css:8` coupe au tiret). Correction : insécable (« centre‑ville » avec U+2011, ou `<span style="white-space: nowrap">centre-ville</span>`), vérifier à 390 px où le titre passe sur « de centre-ville » sans coupe.

**F2-3 · Troisième indicateur du héros à l'envers : « toutes les 6 semaines » en grand, « Renouvelé » en légende** — composant des chiffres du héros (`src/pages/index.astro`, bloc après « 41 € »). Preuve : `d-01-hero.png` : la lecture donne « toutes les 6 semaines / Renouvelé », sans sujet (le menu), alors que les deux autres colonnes lisent « 35 € / Menu du moment, deux services ». Correction : grand texte « 6 semaines » (ou « Toutes les 6 semaines »), légende « Le menu du moment est renouvelé » ; la donnée reste celle du dossier (« change toutes les 6 semaines »).

**F3-1 · Photo plein cadre de la salle molle et mal cadrée** — `04-salle-lampe-table` affichée à 1440 px de large sur 590 px de haut. Preuve : `d-05-scroll.png` : feuille floue occupant le tiers gauche, détails de la table à droite empâtés (fichier source de 1080 px étiré). Correction : `object-position` à droite (environ 70 % 50 %) ou cadre moins large (max 1200 px), pour ne montrer que la partie nette.

**F3-2 · Bande vert clair vide de 120 px sous l'en-tête de la 404** — Preuve : `404-1440.png` (y 102 à 222), sans contenu ; le titre est descendu au milieu de la page. Correction : retirer la bande ou la remplir (photo de salle), remonter le bloc.

**F3-3 · Description de la 404 identique au titre** — `404.html` : `<meta description>` « Cette page n'existe pas. » = texte du `h1`. Correction : « Cette adresse n'existe pas sur la maquette PhilFa. Retour à la carte, aux horaires ou à la réservation. »

**F3-4 · Pas de réaction au survol du logo « PhilFa » et de l'onglet actif** — Preuve : QA `noHoverChange` (`a "PhilFa"`, `button "Menu du moment"`). L'onglet actif est un faux positif (état sélectionné) ; le logo reste sans retour visuel. Correction : soulignement ou léger éclaircissement au survol du logo.

**F3-5 · Horaires en notation « 12:00 à 14:30 »** — `d-02-scroll.png` : forme informatique à la place de « 12 h à 14 h 30 », cohérence avec « 18:15 à 21:00 » à garder. Correction : notation française « 12 h à 14 h 30 », « 18 h 15 à 21 h » (aligné sur le JSON-LD, qui reste en `12:00`). La mention « Fermé le 11 novembre. » (14 px, bas de section) est discrète pour une exception : la rapprocher du tableau.

Points vérifiés sans écart : liens internes (ancres `#carte`, `#salle`, `#maison`, `#infos`, `#contenu`, `#top`, 404 vers l'accueil) et liens externes conformes au dossier (Barestho, shopping Barestho présent dans `site-actuel/`, Facebook, Instagram, philfa.be, PDF du site) ; photos d'après `photos/index.json` (alt conformes aux `sujet`) ; poids images ≤ 262 Ko par fichier ; contenu complet sans JavaScript ; reduced-motion : 0 texte à l'opacité 0.

## Ce qui est bien (à ne pas casser)
1. Hiérarchie de l'accueil : 35 € / 41 € et réservation visibles dès le premier écran, jaune réservé aux actions (`d-01-hero.png`).
2. Tableau d'horaires avec « Aujourd'hui » en jaune, lundi et dimanche atténués ; carte en lignes nom / prix alignées (`d-02-scroll.png`, `carte-1440.png`) et version mobile en pile (`carte-390.png`).
3. Pied de page : mention « Maquette KYW, certaines données sont illustratives », un seul logo, noindex, 404 propre à la maison (0 violation axe).
