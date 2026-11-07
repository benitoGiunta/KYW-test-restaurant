# ETAT, le-royal, portfolio, phase 1 (construction)

## Fait
- Gabarit Ardoise copié dans `sites/le-royal-portfolio/` (sans ETAT/RAPPORT/REVUE du gabarit), `pnpm install` et `pnpm build:site` OK (7 pages : /, /carte/, /formules/, /terrasse/, /histoire/, /reservation/, 404) ; `dist/le-royal/portfolio/` écrit.
- `src/data/site.ts` + `src/data/carte.json` (carte PDF d'août 2026 par script, 63 lignes, prix en « 18,90 € »), horaires 12h-14h30 / 18h-22h x 7, adresse, tél., e-mail, Zenchef, réseaux, menus fêtes patronales, note Google.
- Contrôle statique du dist : noindex, « Maquette KYW », un seul `kyw-signature`, un h1, aucun tiret cadratin, aucune trace des Potes au Feu sur les 7 pages.
- DESIGN.md (matrice, sections, art direction, adéquation 82 %). Photos WebP, OG, favicon.

## Reste (phases 2 et 3)
- Phase 2 : animations / motion à vérifier avec le contenu réel (suggestion « à l'ardoise » : le texte est plus long que dans le gabarit, vérifier la hauteur de la ligne ; onglets TABLE | BAR ; prix géants ; mots géants TERRASSE / THÉÂTRE / BRASSERIE à 390 px), loader (nom « Le Royal Namur » en trois mots, vérifier le débordement mobile).
- QA navigateur : shoot, audit, clics réels de l'en-tête, bas de page, `scrollWidth` 320/360/390, galerie terrasse (7 figures, `nth-child(3n)` en rangée double : vérifier les trous en 4 colonnes), aperçus au survol, LCP.
- Mesurer : `.mots` à 13 vw, `.ardoise__nom` avec « Le Royal / Namur », barre d'état statique longue.
- RAPPORT.md (placeholders, shoot/audit), UTILISATION.md (gabarits/ protégé : ligne `ardoise | le-royal` à ajouter à la main), sloplint.
- Index : `pnpm index`, commit, push.

## Décisions et hypothèses
- Onglets MIDI | SOIR remplacés par TABLE | BAR : la carte est identique midi et soir. `setup.ts` ouvre sur TABLE.
- Aucun placeholder `true` dans les données : tout vient de donnees.json. Marques visibles : « conditions à confirmer » (moules à 20 €, mardi et jeudi, d'après la photo de l'ardoise) ; la ligne « à l'ardoise » des autres jours est une spécialité de la carte (« à la carte tous les jours »), pas une suggestion quotidienne.
- Avis : l'extrait daté du 29/05/2026 (1,5/5) n'est pas repris ; note Google 4,0 / 577 (Rankeat) affichée. TripAdvisor écarté (fiche de l'ancienne adresse).
- Adresse : n° 13 (une source donne le n° 2, non retenue). Ouverture « 11h à 23h » de la carte signalée dans l'accès, cuisine 12h-14h30 / 18h-22h dans les horaires.
- Bon cadeau, privatisation, équipe, histoire : retirés (inconnus). Pas de desserts dans le PDF : aucune catégorie desserts.
- Aperçus 4:5 seulement sur 5 lignes (Moules marinières, Chouffe, Apéritif maison, Portion mixte, Le verre) : une photo non appariée n'est pas attribuée à un plat. Moins que les 8 recommandés par le gabarit ; l'aperçu vit moins.
- `gabarits/` non touché (protégé). Défaut à reporter dans le gabarit : `Categorie.service` et onglets midi / soir supposent deux cartes distinctes ; `telHref` ne convertit pas les numéros belges.
