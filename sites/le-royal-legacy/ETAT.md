# ETAT le-royal · legacy · phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée, deal/draw/scaffold (Solstice, accent brique #963702), stamp, `DESIGN.md` (Picks, Approche, Composants, Sur-utilisation 1 à 7), `comp.md` (c1 Stage choisi).
- Contenu : `src/data/site.ts` + `donnees.json` (carte d'août 2026 complète avec prix, menu des fêtes, horaires, contacts).
- Pages : `/` (hero Stage, à propos, carte à deux états, moules jumbo et ardoise, menu des fêtes, horaires/contact/réservation, pied) et `/404`. Build OK : `dist/le-royal/legacy/`. `sloplint src` : 0 FAIL, 0 WARN. Noindex et mention KYW présents sur les deux pages.
- Photos du client en WebP (`public/photos/`) : façade, planche, terrasse, moules (non utilisée dans la page, voir reste), cocktails (non utilisée).

## Reste (phases 2 et 3)
- Phase 2 : menu téléphone (la nav passe en deux lignes sous 60 rem), barre de réservation collante au téléphone, un reveal, états `:active`/`:disabled` des contrôles, hover du Switcher, lien de nav actif, trois questions de reproduction du comp.
- Photos non placées : `02-moules`, `03-cocktails`, `01-bieres`, `05-plats`, `06-vins` (moules et cocktails sont déjà convertis). Une rangée de quatre vignettes (comme l'original) est possible sous « À propos » si la phase 2 veut plus de photos, en respectant un tiers sous le hero.
- Phase 3 : `sloplint --render`, entrée du journal `.hallmark/log.json` (`theme.mjs log`), `RAPPORT.md`, revues, vérif mobile 375 (hero et carte capturés une fois : bon à 1440, mobile à confirmer).

## Décisions et hypothèses
- Hero Stage (pas Poster ni Counter) : façade de 1200 px. Pied en statement (pas index columns : pas de plan de site).
- Accent : brique du client à la place du vermillon Solstice.
- Horaires : 12 h 00 à 14 h 30 et 18 h 00 à 22 h 00, 7 j sur 7 (site). La carte PDF dit « ouvert de 11h à 23h » : divergence non affichée, à confirmer avec le client.
- Adresse : Place du Théâtre 13 (une source donne le n° 2, à confirmer).
- Ardoise « moules jumbo à 20 € mardi et jeudi » : tirée d'une photo, marquée `data-a-verifier`, conditions à confirmer.
- Aucun avis, note Google, histoire, équipe ni dessert affichés (non prouvés ou absents du dossier). Lien Google Maps construit à partir de l'adresse (recherche), pas une fiche.
- `/contact/` d'origine fusionnée dans l'ancre `#contact` (dropped, noté dans DESIGN.md).
- Pas de `playwright install`, serveur de test (port 4873) arrêté par `kill`.

## Pièges
- `page.html` du site d'origine est gitignoré (copié en `.hallmark/site-actuel/index.html`, gitignoré aussi).
- Pas de 100vw (Floor 4) : la gouttière du hero Stage est calculée en pourcentage de la colonne texte (`100% / 0.44`).
