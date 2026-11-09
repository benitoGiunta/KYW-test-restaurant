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
