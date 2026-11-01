# Revue legacy · La Brasserie du Quai · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : une brasserie de nuit, fond presque noir et or, grandes photos de la terrasse et des baies sur la Meuse, un « 15 € » ocre géant comme repère (six Normandes) et un appel à réserver à chaque écran.

Scores /10
- Design 8 : palette noir/or tenue sur 7 pages, serif Young Serif lisible, hero plein écran sans débordement (`home/d-01-hero.png`, `m-01-hero.png`). Légère monotonie des pages internes (carte, écailler) en grand écran.
- Usabilité 8 : menu mobile OK (ouverture, 6 liens + téléphone, fermeture à Échap, vérifié), barre collante « Réserver / Appeler », skip link au premier Tab (`k-01-focus.png`), 0 cible < 24 px, 0 débordement à 390 et 1280.
- Créativité 7 : le « 15 € » en signature et le badge « en ce moment » (saison calculée, dimanche surligné sur l'écailler) donnent une idée, mais le reste suit une mise en page de brasserie assez attendue.
- Contenu 8 : 49 plats de `donnees.json` comparés à `/la-carte/` et `/lecailler/` (noms, prix, descriptions) : 0 écart ; faits, horaires, téléphone, e-mail, Zenchef (rid 379458) et Brydge conformes au dossier ; pas de tiret cadratin, pas de tutoiement ; fermeture « à confirmer » marquée `.fill` placeholder.
- Technique 8 : 0 erreur console et 0 requête en échec sur accueil, réservation, galerie, carte, écailler, bon cadeau, 404 ; LCP mobile 1036 ms (accueil), 824 ms (réservation) ; CLS ≤ 0,042 ; axe : 0 violation sérieuse ; 32 liens internes testés en `curl` : tous 200 ; aucune image > 300 Ko. Un seul point faible : LCP de la galerie (F1).

## Findings

### F1 (majeur)
- **F1-1 · Galerie : LCP mobile 4 128 ms (seuil 2,5 s).** Preuve : `shots-galerie/report.json` (`mobile.vitals.lcpMs` 4128, élément `img`, page de 9 865 px) ; `dist/brasserie-du-quai/legacy/galerie/index.html` : 23 images sur 24 portent `loading="lazy"`, y compris la première photo (`07-salle-baies-vitrees`, 1500×1001) qui est l'élément LCP. Correction : sur `src/pages/galerie.astro` (et `src/components/Photo.astro`), mettre `loading="eager"` + `fetchpriority="high"` sur la première photo seulement, et revoir `sizes` pour qu'elle serve la variante 640 w sur mobile.

### F2 (mineur)
- **F2-1 · JSON-LD `Restaurant` sans horaires.** Preuve : bloc JSON-LD de `dist/.../index.html` (adresse, geo, téléphone, `acceptsReservations`, mais pas d'`openingHoursSpecification`). Les horaires saisonniers sont connus (nov.-avril 12:00-14:30 / 18:00-21:30 ; mai-octobre 12:00-14:30 / 18:00-22:00). Correction : ajouter deux `openingHoursSpecification` avec `validFrom`/`validThrough` récurrents, sans inventer de jour de fermeture (inconnu).
- **F2-2 · Polices Google distantes, sans préchargement.** Preuve : `<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Instrument+Sans…">` dans toutes les pages, seulement deux `preconnect`. Effet : requête tierce (RGPD pour un public belge) et risque de repli de police au premier rendu. Correction : auto-héberger les deux polices (woff2 dans `public/fonts/`), `@font-face` avec `font-display: swap`, `<link rel="preload">` de la police du titre.
- **F2-3 · Même phrase répétée jusqu'à 4 fois sur l'accueil.** Preuve : « Au pied du pont du Luxembourg, sur les berges de la Meuse » en h2, sous-titre du hero, bloc adresse (« Au bord de la Meuse, au pied du pont du Luxembourg ») et devise du pied de page (répétée sur chaque page, voir texte de `reservation`, `galerie`, `404`). Correction : garder le h2 et le hero ; remplacer la devise du pied de page par l'adresse seule, ou une autre information (téléphone, horaires).

### F3 (finition)
- **F3-1 · Apostrophes droites dans les données de la carte.** Preuve : texte de `/la-carte/` et `/lecailler/` : « d'ici et d'ailleurs », « L'assiette de l'écailler », « Beurre maître d'hôtel », alors que la navigation et les titres utilisent « ’ » (`L’écailler`). Sloplint F1 : 5 occurrences. Correction : remplacer `'` par `’` dans `src/data/carte.json` (noms et descriptions).
- **F3-2 · Chaînes avec point médian et rupture de ligne.** Preuve : `m-carte` (légende de la photo) : « …caviar de hareng » puis ligne suivante « · 20 € » ; sur `/la-carte/` « 11 € · 22 € » et « 1 pièce · 2 pièces » (sloplint 63). Correction : légende en deux lignes ou prix collé avec espace insécable ; pour les croquettes et fondus, deux prix alignés en colonnes avec libellés `1 pièce` / `2 pièces`.
- **F3-3 · Format des heures.** Preuve : « Midi 12:00 à 14:30 » (redondance « Midi » / 12:00, notation informatique). Correction : « Midi, de 12 h 00 à 14 h 30 », « Soir, de 18 h 00 à 21 h 30 » (espaces insécables).
- **F3-4 · Image OG en webp.** Preuve : `og:image` = `photos/07-salle-baies-vitrees-1140.webp` ; certains réseaux n'affichent pas le webp. Correction : fournir un jpg 1200×630.
- **F3-5 · Contraste à trancher.** Preuve : axe « needs review » = 12 sur l'accueil (3 sur la réservation, 0 sur la galerie), aucune violation sérieuse. Correction : mesurer à la main le gris des légendes et des libellés secondaires sur fond noir (cible 4,5:1).

## Vérifié sans défaut (pour mémoire)
- Build : `.logs/brasserie-du-quai-legacy-revue1-build.log` : 7 pages, « Complete ».
- Chaque page : `noindex`, mention « Maquette KYW, certaines données sont illustratives », un seul `kyw-signature`, un seul `h1`, `lang="fr"`, title et description distincts, canonical (sauf 404), favicon, JSON-LD, 404 conçue (`d-e404.png`).
- Reduced motion : 0 texte masqué, 0 mouvement (`home/report.json`). Pas d'eyebrow, de trois cartes égales, de dégradé violet ni de glassmorphism relevés sur les captures.
- Alt des images : 2 `alt=""` sur le seul `logo.svg` décoratif (le nom est dans le texte voisin) ; légendes de la galerie cohérentes avec `photos/index.json` (ex. Saint-Jacques : photo Instagram du restaurant).

## Limites de cette passe
- `QA-revue1.md` n'existait pas : le shoot de revue avait échoué pour la réservation et la 404 (« Target page, context or browser has been closed »). Captures ciblées refaites par moi (réservation, galerie, carte, écailler, bon cadeau, 404.html, menu mobile) dans le scratchpad ; le crawl complet de l'accueil vient de `.shots-brasserie-du-quai-legacy-revue1/home/`.
- `sloplint` lancé sur les fichiers `dist/` en `file://` : les feuilles `/brasserie-du-quai/legacy/_astro/…` ne se chargent pas, donc ses FAIL 26a/34/44d/76 et les mesures `--render` sont des artefacts, non retenus. Seuls ses constats sur le texte (63, F1) sont repris. Un passage `--render --url` sur serveur n'a pas été fait.
- Modules Zenchef et Brydge : ni embarqués ni chargés par défaut (boutons « Ouvrir le module ici ») ; leur chargement réel n'a pas été re-testé (FAIL 26a signalé dans `ETAT.md`).
- Le contrôle automatique « skipLinkFirst: false » du shoot est un faux négatif : le premier arrêt de tabulation est bien « Aller au contenu ».

## Ce qui est bien (à ne pas casser)
1. Le « 15 € » ocre avec « € » en exposant et la carte fidèle au dossier : une signature qui parle de CE restaurant, pas d'un modèle.
2. L'accessibilité de base : skip link, focus visible, menu popover fermable à Échap, barre collante mobile, 0 débordement de 320 à 1440.
3. L'honnêteté du contenu : placeholders marqués (fermeture à confirmer, carte des desserts « pas encore publiée »), aucun avis ni distinction inventés.
