# ETAT — ferme-blanche-d-asie · portfolio · phase 1/3 (09/11/2026)

## Fait
- Gabarit **encre** copié (hors node_modules, dist, REVUE/REVISION/RAPPORT/ETAT/apercu du gabarit), choix argumenté dans DESIGN.md.
- `src/data/site.ts` + `src/data/carte.json` : contenu réel (56 plats, menu découverte, fêtes, salles, horaires, avis cités). Aucune donnée inventée.
- Pages : `/`, `/carte/`, `/maison/`, `/salles/`, `/reservation/`, `/404`. Plan, Rouleau, Footer, Header, Base adaptés. `histoire` et `emporter` supprimés.
- Photos : recadrage anti-filigrane, WebP, variantes 960 (héros), og.jpg, favicon FB.
- Build OK (`node scripts/build-site.mjs`), 6 pages, 173 liens internes vérifiés, noindex + mention KYW + footer présents partout.
- `gabarits/UTILISATION.md` mis à jour.

## Reste (phases 2 et 3)
- QA navigateur : héros (nom en 3 colonnes `.hero__nom span`, 1440 et 390), en-tête à 4 liens en mobile, rouleau (12 plats sans photo : vérifier le rythme visuel), plan SVG (textes dans le viewBox), carte longue (lignes 3 chiffres, desc/allergènes), diptyques 4:5 avec photos 5:3.
- Mini-script Playwright du prompt (clics en-tête, bas de page).
- Animations avancées éventuelles, LCP/CLS, audit, RAPPORT.md.
- Envisager photo de plat réelle si le client en fournit ; desserts de Noël à compléter.

## Décisions et pièges
- **Pas de rm autorisé** (garde de sécurité) : `public/photos/` contient encore ~19 fichiers du gabarit (chef-*.webp, plat-*.webp, logo.png, logo-pictogramme.svg, salle-clients-bar*, salle-ampoules*, portrait-damien*, etc., photos des Potes au Feu) non référencés mais publiés dans dist. À supprimer (`git rm` ciblé) avant publication.
- Réservation : téléphone (aucun outil en ligne au dossier) ; formulaire de démonstration → mailto prérempli. `site.reservation.url` = `tel:`.
- Rouleau : plats réels sans photo (aucun plat photographié lisible) ; `ph` neutralisé dans Rouleau.astro (code photo conservé, désactivé).
- Rouleau « mots » : dérivés des noms de plats ou descriptions du dossier uniquement ; n° de carte affichés.
- Notes Resto.be 9,1/10 (201 avis) affichées « à confirmer » sur `/maison/`.
- Photos 11 et 12 (1916/1919 px de large) non redimensionnées à 1800 px : à faire en phase 2 si le poids pèse.
- Non commité : voir git status ; dist/ à régénérer et `pnpm index` en publication, pas en phase 1.

---
# Phase 2/3 (09/11/2026) : motion, interactions, mobile, finitions

## Fait
- Rouleau (signature) : numéro fantôme géant par plat (`.plat::before`, `data-n`, hors accessibilité), plat actif (`.is-actif`, nom et prix passent de pierre à encre, numéro teinté de vermillon), compteur « 05 / 12 » (`data-rouleau-n`) mis à jour au scrub (épinglé) et au défilement natif (mobile, reduced motion). Noms plus grands en épinglé (`--t-l`), fin de course et clavier ← → inchangés (testés : épinglé n=07 après 4 flèches ; reduced : natif, n=11 après 6).
- En-tête sur photo : `mix-blend-mode: normal` quand la page a un `.hero` (le mode difference délavait liens et marque sur les photos claires) + dégradé d'encre de 9 rem en tête du voile. La 404 (ivoire) garde difference.
- `data-reveal` retirés sur 14 blocs contenant liens, boutons ou formulaire (restaient hors tabulation) : accueil, carte, maison, salles, réservation.
- Horaires : « Lundi Au Vendredi » (capitalize) corrigé en majuscule initiale seule.
- Contrôles : 0 erreur console (1440, 390, reduced) sur 5 pages ; pas de débordement 320/360/390 ; clics réels sur chaque lien d'en-tête (1440, 5 pages) OK ; bas de page (accueil, carte, réservation) : bande, mention KYW et logo visibles ; reduced motion : rien de caché. Hero, vapeur, tracés, sceaux, rideau et loader : inchangés du gabarit, vérifiés visuellement.
- Build OK (`scripts/q.sh`, 6 pages). Serveur 4471 arrêté. Aucun shoot complet (agent captures).

## Reste (phase 3 et publication)
- Audit axe / contraste sur le rouleau (`color-mix` du numéro fantôme est en pseudo-élément, non audité), LCP/CLS, sloplint, RAPPORT.md.
- **public/photos/** : 29 fichiers du gabarit non référencés (liste : chef-*, cuisine-*, plat-*, portrait-damien*, salle-ampoules*, salle-banquette, salle-bar-panoramique, salle-clients-bar*, service-*, equipe-trio, dessert-tarte-pomme, bar-cocktails*, logo-fba.png, logo-pictogramme.svg). `git rm` seul passe, mais la suppression sur disque (`git clean`) a été refusée par la garde : à faire par l'utilisateur ou un agent autorisé avant publication (sinon ils partent dans dist).
- Rouleau sans photo de plat (aucune au dossier) : l'espace au-dessus des plats repose sur le numéro fantôme ; à revoir si une photo de plat arrive.
- Pied de page : `kyw-signature` présent une fois par page (vérifié sur l'accueil).

## Pièges
- Un numéro posé en `::before` avec `content: attr(data-n)` échappe à axe et reste hors lecteur d'écran (décor).
- `body:has(.hero) .header` : seul moyen CSS d'ôter le mode difference sans toucher à Base.astro.
