# ETAT phase 1/3 (construction-1) : portfolio, La Maison des Desserts

## Fait
- Gabarit collage copié et adapté ; DESIGN.md ; `src/data/site.ts` + `carte.json` (13 catégories, issues de donnees.json).
- Pages : accueil (hero, manifeste, 4 activités, fêtes, presse, infos), carte, fetes, histoire, contact, 404. Build OK (`dist/maison-des-desserts/portfolio/`, 6 pages), noindex, mention KYW et pied KYW présents.
- Photos WebP optimisées (15) dans public/photos, logo.png copié, favicon, og.jpg.

## Reste (phases 2 et 3)
- QA navigateur : captures desktop/mobile, clics d'en-tête réels (1440), bas de page visible, audit.
- Animations : vérifier les `data-split`, `data-reveal`, cases du logo (Pâtisserie, Boulangerie, Chocolaterie, Salon de thé, Les fêtes) ; tasse du salon ; hero photo `fetchpriority`.
- Mobile : `.split--inv` n'a pas de style dédié (j'utilise `order: 2` en ligne : à vérifier en 1 colonne, photo sous le texte attendue).
- Contraste ink sur cacao (#c98a5e, estimé 7:1) à mesurer ; sticker--ecru sur aplat bleu.
- Carte longue (142 lignes) : envisager sommaire plus fin ; prix du chocolat chaud viennois et des mignardises incertains (dossier).
- RAPPORT.md (hérité du gabarit : à réécrire), REVUE-1.md / REVISION-1.md hérités à ignorer ; retirer les fichiers hérités si inutiles.
- Ligne `collage | maison-des-desserts` à ajouter dans gabarits/UTILISATION.md (non touché).

## Décisions / hypothèses
- Pas de réservation de table (aucune dans le dossier) : CTA = boutique en ligne `shop.lamaisondesdesserts.be` (sous-domaine cité par le dossier).
- Avis : aucun, remplacés par 2 titres de presse réels (sans citation). Aucune donnée inventée ; `placeholder: true` seulement sur la photo chocolat.
- 31 décembre indiqué ouvert (fermeture 17h00) d'après la carte PDF ; galerie sans équipe.
- Tous les `rm` de glob refusés par le système : anciennes photos du gabarit déplacées dans le scratchpad.
