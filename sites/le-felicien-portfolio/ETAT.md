# ETAT, Le Félicien portfolio (gabarit Ardoise), fin de la phase 3 (QA faite)

## Phase 3 : faite
- Descriptions raccourcies (accueil, histoire), doublon « Le lundi midi » retiré, rebuild exit 0, capture ciblée histoire ok, RAPPORT.md écrit. Reste : `pnpm index`, commit et push de `dist/` à la publication.

## Phase 2 (la phase 1 est décrite plus bas)

## Phase 2 (motion, interactions, mobile, reduced motion) : faite
- Marquee d'état : copies clonées jusqu'à couvrir la fenêtre (2n paragraphes, recalcul au resize et après les polices), pause au survol ; en reduced motion ou sans JS : une seule copie qui passe à la ligne (plus de texte tronqué).
- Lignes d'ardoise : `ecrireListe()` idempotente, plus de `once` (un panneau fermé consommait le déclencheur) ; rejouée à l'ouverture d'un onglet (écriture vue : clip-path en cours puis ouvert) ; 10 listes de la carte toutes écrites après défilement.
- Prix des formules : texte sr-only + copie `aria-hidden` animée. Suggestion du jour (signature « s'efface et se réécrit ») testée : flèches, label « Aujourd'hui, mardi », écriture mot à mot.
- Interactions : nom du plat qui glisse au survol (pointeur fin), zoom léger des photos, états `:active`, `:focus-visible` des boutons de suggestion, champs de formulaire (survol, focus, `:user-invalid`), aperçu photo au survol vérifié (visible, bonne source).
- Mobile : onglets sans sous-titre sous 768 px (hauteur 135 px → 57 px), nom du hero calé sur la largeur (`/ 4.7`), mots géants calculés (`/ 6.8`, plus de `clamp` qui écrasait la media query), `.acces` en `minmax(0, 1fr)`, horaires compactés sous 400 px, en-tête resserré sous 360 px. Mesures à 320/360/390/768/1440 sur les 7 pages : aucun `scrollWidth` ni élément hors fenêtre, aucune erreur console.
- Clics réels sur les 5 liens de l'en-tête à 1440 : cible `<a>`, navigation faite. Bas de page en fenêtre : bande KYW et mention « Maquette KYW, certaines données sont illustratives » visibles, barre fixe visible.
- Pied du site passé de `<footer>` à `<section aria-label>` (un seul `<footer>`, celui de `kyw-footer`) ; `.footer, .kyw-footer` en `position: relative; z-index: var(--z-content)` ; bordure grise du gabarit de la barre basse remplacée par `color-mix` sur le vert.
- Reduced motion (390) : `html.motion` absent, 0 élément caché, 0 clip-path résiduel, marquee `none`.
- Build : `scripts/q.sh … pnpm build:site sites/le-felicien-portfolio` exit 0 (7 pages), `dist/le-felicien/portfolio/` à jour.

## Reste pour la phase 3 / l'agent captures
- Shoot complet, audit axe (contraste `.ex` et `.petite-cap` muted sur vert, jaune sur clair), LCP et loader (série, deux passes), `sloplint`.
- Vérifier visuellement : onglets sticky sous l'en-tête à 390 après défilement, aperçu au survol en 1440, pages carte et formules en 768.
- `RAPPORT.md` (placeholders, shoot, audit, leçons) ; `pnpm index` et commit de `dist/` à la publication (non fait ici, `dist/le-felicien/portfolio/` seulement reconstruit).
- Pas de mesure de l'état « ouvert » à plusieurs instants (`page.clock.install`) : le texte du jour réel est correct (mardi, fermé avant 12h00 à l'heure du bac à sable).

## Pièges phase 2
- `flex: 0 0 auto` sur le `<p>` du marquee empêche tout retour à la ligne en statique : `flex: 0 1 100%`.
- Un serveur lancé en `( … & )` a survécu à l'appel Bash ici (port 4533, PID dans le scratchpad) ; arrêté par `kill <PID>`.

## Phase 1 : fait
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

## Revue passe 1 (relecteur-site, 10/11/2026) : faite
- `REVUE-1.md` écrit : verdict A_CORRIGER, 0 F0, 1 F1 (aperçu photo qui ne suit plus le curseur : `overwrite: true` tue les `quickTo`, `src/motion/setup.ts:209` et `:211`), 4 F2, 7 F3. Rien n'a été corrigé (rôle relecteur).
- Reste : révision ciblée de la liste F1/F2/F3, puis passe 2. Pas de rebuild fait pendant la revue (`dist/` du 10/11 00:29 relu tel quel).
- Pièges : le QA ne couvre que 3 pages sur 7 et sa « 404 » est brute ; axe complet (hors shoot) montre `region` et `aria-prohibited-attr` sur `.etat` et `.ligne__in`.

## Revue 2 (relecteur-site) : faite
- REVUE-2.md : PUBLIABLE (0 F0, 0 F1, 0 F2, 9 F3 dont 2 nouveaux). Restent : F3 de texte (maison, bambins, accès, 12h00/12:00, formulaire GET), `pnpm index`, commit et push de `dist/`.
- Piège : QA-revue2.md n'existait pas ; captures refaites par scripts maison. Aperçu au survol inactif tant que `data-preview` est absent.
