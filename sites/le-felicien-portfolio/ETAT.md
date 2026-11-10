# ETAT, Le Félicien portfolio (gabarit Ardoise), fin de la phase 1

## Fait
- Gabarit choisi (Ardoise, 28/30, matrice dans DESIGN.md), copié dans `sites/le-felicien-portfolio/`, `pnpm install` ok.
- `src/data/site.ts` entièrement réécrit : carte d'automne 2026 réelle (68 lignes, onglets `carte` / `midi` / `bar`), horaires 7j/7 réels, suggestions, formules (suggestions 25 €, bambins dès 10 €, banquets dès 27 €), histoire, équipe, presse, photos, crédits.
- Pages : accueil, carte, formules (+ ancre `#evenements`), salle, histoire, réservation (Tablebooker), 404 ; header, barre basse, footer (logo client + KywFooter).
- Palette vert brasserie (`tokens.css`), favicon, OG, photos WebP dans `public/photos/`.
- Build : `scripts/q.sh felicien-build pnpm build:site sites/le-felicien-portfolio` exit 0, 7 pages, `dist/le-felicien/portfolio/` ; `noindex, nofollow` et « Maquette KYW » vérifiés par grep sur l'accueil.
- `gabarits/UTILISATION.md` mis à jour.

## Reste (phases 2 et 3)
- Phase 2 : animations (suggestion du jour, onglets à 3 entrées, prix qui s'écrivent, mots géants, loader et transition : textes du loader à contrôler), puis QA navigateur : captures 1440/390, débordements (onglets à 3 entrées en mobile : libellés `small` longs), clics réels de l'en-tête, bas de page en fenêtre (mention KYW visible), aperçu au survol, contraste axe (vert `#1e3224` + muted `#a5b5a8`, jaune sur clair interdit), LCP.
- Contrôler `setup.ts` et `Base.astro` pour des restes de texte de gabarit (le grep « Potes / Zenchef / cadeau » est propre dans `src/`).
- `RAPPORT.md` (placeholders, shoot, audit, leçons) en fin de variante ; `pnpm index` et commit `dist/` à la publication.

## Décisions et hypothèses
- Ardoise retenu malgré deux usages précédents : écart de 8 points, seule matière viable avec 1 photo.
- Carte identique midi et soir (le site publie une seule carte) : onglet « La carte » au lieu de MIDI | SOIR ; défaut « La carte ».
- Suggestions mardi à vendredi : plats réels de la semaine du 3 au 6 novembre, attribués aux jours à titre illustratif (`placeholder: true`).
- Pas de bon cadeau, pas d'avis, pas de portraits : rien au dossier. Capacité 300 couverts : marquée à confirmer (400 dans des articles plus anciens). Faillite de 2025 non mentionnée (réouverture seulement).
- Photos libres Picsum/Unsplash ids 395, 292, 431, 429, 493, 425 (crédits dans `site.ts` et sur la page salle), à remplacer par de vraies photos.
- Formulaire de réservation : démonstration, couverts max 20 (arbitraire), e-mail `info@lefelicien.be` réel.

## Pièges
- `rm public/photos/*` est refusé par la sécurité : déplacer vers le scratchpad ou supprimer par nom.
- Les prix du type « 10 € (2 pièces) / 16 € en plat » ont été scindés : prix principal à droite, reste dans la description.
- Le dossier donne des liens Unsplash pour 493 et 425 d'après `credits.json` (fichier temporaire du scratchpad).
