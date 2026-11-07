# Révision 2 · L'Essentiel portfolio (révision ciblée)
| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F0 | rien à faire | - | aucun bloquant dans REVUE-2 |
| F1-3 nom tronqué | corrigé | `src/styles/base.css` : `.hero__texte` max-width 30rem -> 36rem | boîte h1 >= texte à 1440 (493), 1536 (485), 1920 (466), 2560 (466) ; capture 1920 : « L'ESSENTIEL » entier |
| F2-6 débordement 768/820 | corrigé | `base.css` : `.dressage__scene { grid-template-columns: minmax(0, 1fr) }` (la légende est masquée sous 768 px, `flex-wrap` inutile) | scrollWidth = 768 à 768 et 820 à 820 |
| F2-2bis surtitres | corrigé | retirés : `carte` (Accords, « À la carte »), `chambres` (2), `maison` (Plusieurs ambiances, L'équipe), `menu` (catégorie « Fromages et dessert », À votre table), `reservation` (Services, Fermetures annuelles) ; gardés : Le midi en semaine, Le soir comme le midi, Temploux XVIIe siècle, « Votre demande » et catégories (ce sont des h2) | mesure des `.petite-cap` hors pied sur 5 pages : ne restent que les gardés |
Hypothèses : F3 non traités (hors liste). Build via `pnpm build:site` OK (le chemin `node scripts/build-site.mjs` du prompt n'existe pas).
