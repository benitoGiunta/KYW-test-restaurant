# ETAT — terrasses-de-crupet · portfolio · phase 1 sur 3

## Fait
- Gabarit guinguette copié ; build OK (`node scripts/build-site.mjs sites/terrasses-de-crupet-portfolio` via q.sh), 7 pages : accueil, carte, la maison, terrasse, à emporter, réserver, 404.
- `src/data/site.ts` entièrement remplacé (carte réelle générée depuis donnees.json, menus de fêtes, horaires midi et soir 7j/7, Zenchef rid 367820, téléphone, e-mail du site, réseaux, 22 photos avec alt).
- 22 photos WebP + variantes `s/` 640 px dans `public/photos/`, `og.jpg` (drone), favicon, palette cuivre / vert profond (`tokens.css`).
- DESIGN.md (matrice, décisions, adéquation 78 %). Mentions KYW, noindex : héritées du gabarit (footer KYW présent, vérifié 1 occurrence « Maquette KYW » sur l'accueil).

## Décisions / hypothèses
- Aucun avis, histoire ni équipe au dossier : 4 cartes « Exemple d'avis » (placeholder), page La maison limitée aux faits ; pas de section équipe.
- Note Restaurant Guru (4,8) non reprise (non confirmée). GPS inconnu : `geo` optionnel, lien Itinéraire par recherche d'adresse OSM.
- Terrasse : « oui » (nom, photos) ; places, saison, jours non affichés. « Carte du 15 octobre » mentionnée, année inconnue.
- Hero : titre « Un moment hors du temps », slogan « au cœur du village de Crupet » (baseline du site actuel).

## Reste (phases 2 et 3)
- Motion : vérifier hero objets, table (12 tirages en 1440 et rail mobile), avis, marquee ; QA navigateur complète (shoot, audit, clics d'en-tête, bas de page) ; contrastes du cuivre `#d98a56` (boutons) et du texte `#9c4620` sur lin et sur vert.
- Mesures de débordement 320/360/390 ; tirages portrait recadrés en carré (vérifier cadrage visage/plat) ; 404 ; Lenis.
- Contrôler les `.illu` « exemple » sur les cartes d'avis ; relire la ponctuation (U+00A0) ; RAPPORT.md ; `pnpm index` + commit final `[publier]`.
- `gabarits/UTILISATION.md` : ajouter « guinguette | terrasses-de-crupet » (gabarits/ protégé, non modifié).
- Piège connu du gabarit : `Objet.astro` (6 objets génériques) ; hero 2 lignes, titre « hors du temps » plus long que « entre potes » : mesurer h1 à 390 px.
