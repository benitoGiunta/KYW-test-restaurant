# ETAT novobel-portfolio (phase 1 sur 3, construction-1)

## Fait
- Décision : Novobel est une entreprise de rénovation (pas un restaurant) ; site d'entreprise, gabarit Ardoise détourné (DESIGN.md).
- `src/data/site.ts` réécrit depuis le dossier ; 7 pages : accueil, services, projets, maison, carrière, contact (devis), 404 ; composants Header, Footer, Projets, Img ; `src/styles/site.css`.
- Photos WebP dans `public/photos/`, favicon, OG ; footer KYW, noindex, lang fr, mention « Maquette KYW » vérifiés dans le `dist` (7 pages, aucun tiret cadratin).
- Build OK : `scripts/q.sh np-build node scripts/build-site.mjs sites/novobel-portfolio` (7 pages, `dist/novobel/portfolio/`).

## Reste (phases 2 et 3)
- QA navigateur (shoot, audit, clics réels de l'en-tête, bas de page en 1440) ; mobile (nav 5 liens, barre basse à 2 actions).
- Vérifier `setup.ts` sans `[data-etat]`, `[data-jour]`, `[data-onglets]` (absents : fonctions censées sortir tôt) ; `[data-apercu]` présent sur accueil et projets.
- Animations : motion du gabarit conservé (lignes écrites, aperçu au survol, curseur, rideau) ; ajouter si souhaité un reveal des étapes.
- Contraste jaune sur clair non utilisé en texte (boutons pleins : encre sur jaune).
- Logo client (`02-site.png`, 5000×1602) non intégré.
- `pnpm index` et publication non faits (hors phase 1). `gabarits/UTILISATION.md` à compléter par la session mère (ardoise : novobel).

## Décisions et hypothèses
- Ne pas inventer de restauration ; « 25 ans » omis (contredit la BCE 2019) ; e-mail du site (info@) et non celui de la BCE.
- Photos : stock probable, marquées illustratives, non rattachées aux projets nommés ; une photo de voilier (13) et une image vide (07) écartées.
- Formulaire de devis = démonstration (mailto), « devis gratuit sous 24 h » repris du site actuel.
- Pièges : `.barre` du gabarit est à 3 colonnes (surchargé à 2) ; `.entete h1` en nowrap (surchargé).
