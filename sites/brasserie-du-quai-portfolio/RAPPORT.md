# RAPPORT — brasserie-du-quai, variante portfolio (gabarit Marée)

Phase 3 (QA), 01/11/2026. Sources : `QA-build.md` (agent « captures »), captures ciblées de cette passe.

## Résultat du shoot et de l'audit (agent « captures », avant corrections)

- Accueil et carte : 0 erreur console, 0 requête en échec, 0 violation axe (30 contrastes « à revoir » sur l'accueil :
  texte sur photo, contrôlé à l'œil), CLS 0,003 / 0,002, LCP desktop 196 / 160 ms, mobile bridé 1 436 / 1 044 ms,
  FPS défilement 57 / 60, 0 débordement, 0 cible tactile trop petite, 0 texte masqué en mouvement réduit.
- « 404 » du shoot : page de repli de `serve.mjs` (URL hors du site), pas la `404.html` du site, qui a bien un `h1`
  (« Cette page est partie avec la marée »). Les 2 violations axe et le WARN « 404 page has no <h1> » ne concernent pas le site.
- `audit.mjs` : 0 FAIL, 17 WARN.

## Corrections de cette passe (vérifiées par capture ciblée)

| Constat | Correction | Vérification |
| --- | --- | --- |
| Titre de l'accueil à 78 caractères (WARN) | « La Brasserie du Quai \| Brasserie et écailler sur la Meuse, Namur » (64) | `grep <title>` du dist |
| Horaires répétés 7 fois par page (14 WARN) et colonne du footer trop étroite à 1024-1280 px (créneaux sur 4 à 6 lignes) | `horairesGroupes()` dans `site.ts` : « Lundi, jeudi à samedi » / « Mardi, mercredi, dimanche (jours à confirmer) » ; jours au-dessus des créneaux dans le footer | hauteurs des `dd` : 22/22 px à 1024, 22/43 à 1280, 22/22 à 390 ; capture 1280 |
| Guillemets coupés en fin de ligne en mobile (« grises « / maison » ») | espaces insécables dans les guillemets de `site.ts` et `carte.astro` (28 occurrences) | 1 seule ligne pour « Croquettes de crevettes grises « maison » » à 390 |
| Heros photo de l'écailler et de la terrasse : en-tête et surtitre crème illisibles sur huîtres et citron | voile Meuse en haut (`[data-theme='sombre'] .hero__media::before`, comme l'accueil) et voile bas à 70 % de hauteur, 0,8 | captures 390 et 1440 de /ecailler/, 390 de /terrasse/ |

Pages intérieures non capturées par le crawl (écailler, terrasse, maison, réservation) : capturées en 390 pleine page,
0 erreur console, 0 débordement horizontal.

## WARN restants (assumés)

- `no robots.txt`, `no sitemap` : maquette `noindex, nofollow` servie sous `/brasserie-du-quai/portfolio/` ; un robots.txt
  n'aurait d'effet qu'à la racine du domaine (hors périmètre du site).
- `Tripadvisor, avis résumé (résumé, pas une citation mot à mot)` répété 3 fois sur /histoire/ : mention voulue sur chaque avis paraphrasé.
- Horaires encore présents deux fois par page (footer + bloc horaires de la page) : information utile, plus d'alerte de répétition à 4+.

## Placeholders (données illustratives)

- 3 desserts « exemple » (catégorie marquée illustratif) : Dame blanche, Crème brûlée à la vanille, Café gourmand.
- Règles maison « Animaux admis » et « Plats à emporter » (source Gault&Millau seule, affichées « à confirmer »).
- Jours d'ouverture mardi, mercredi, dimanche : « à confirmer » (jamais affichés ouverts ni fermés par le badge d'état).
- Année d'ouverture : à confirmer.
- Plan : schéma non à l'échelle (orientation de la Meuse supposée), à retracer sur OSM.
- Formulaire de réservation : démonstration sans envoi (lien réel vers la page Réservation de la maison).
- Aucune photo libre : les 24 photos viennent de la maison.

## Points ouverts

- Rythme du gabarit : 112 px de padding de section après la houle des heros intérieurs, un peu d'air vide en mobile ; non modifié (choix du gabarit).
- `gabarits/UTILISATION.md` : ligne `| maree | brasserie-du-quai |` à ajouter par l'orchestrateur.
- `pnpm-lock.yaml` modifié par `pnpm install` : laissé à l'orchestrateur.

## Leçons structurelles

- Une copie générée avec « « » et « » » séparés par des espaces simples se coupe entre le guillemet et le mot en mobile :
  toujours des espaces insécables (U+00A0) dans les guillemets français des données. Reportée dans `agents/lecons.md`.
