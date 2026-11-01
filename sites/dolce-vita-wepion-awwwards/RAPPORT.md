# Rapport · La Dolce Vita (Wépion) · variante awwwards

**Concept** : « Il neon », la salle le soir et le nom de la maison qui s'allume tube par tube (verbe : allumer). **Stack** : Astro 5 + GSAP + Lenis, OGL non (le halo est un `text-shadow` piloté par une variable, aucun shader nécessaire). Base `/dolce-vita-wepion/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/dolce-vita-wepion-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury (passe finale, auto-notation)

**Self-score, non indépendant** : aucun outil Agent dans la session d'agent, pas de critique neuf possible ; une seule passe, sur les captures `QA-build.md` et `.shots/`.

| Critère | Score | Preuve citée |
|---|---|---|
| Design (40 %) | 7,5 | Néon manuscrit sur fond nuit tenu sur 5 pages (`d-01-hero`, carte `d-01`), photos réelles ; galerie de l'accueil aérée au point de paraître vide par endroits (`d-04/d-05-scroll`). |
| Usability (30 %) | 8 | Carte en une page avec sommaire collant, « Réserver » et téléphone partout, 44 px au pied après correction, 0 erreur. |
| Creativity (20 %) | 7,5 | Allumage par paliers, tubes grillés de la 404 ; le repos reste trop discret pour être perçu (`idleMotion` false). |
| Content (10 %) | 8 | 86 plats réels et prix, horaires, chefs Armando et Antigone, aucun avis inventé. |
| Sem/SEO | 8 | lang, h1 unique, JSON-LD Restaurant, canonical, OG, sitemap. |
| Anim | 7,5 | Transitions 0,32/0,6 s, réduit complet ; FPS 50 sur l'accueil desktop. |
| A11y | 8 | 0 violation axe après correction, focus visible, menu à piège de focus. |
| WPO | 8 | LCP mobile 1,2 s, CLS 0, JS 61 Ko gz, page 959 Ko. |
| Responsive | 8 | 0 débordement 390/1440, sommaire mobile corrigé. |
| Markup | 8 | Composants Astro, pas de JSX dans le frontmatter, BASE_URL partout. |

Critique pondéré environ 7,8. Estimation jury « environ 8,9 » (critique + 1,1), à confirmer par un critique neuf. Lecture de l'idée : non probante (auto-notation). Évolution : passe unique.

## Mesures (passe finale)

Shoots ciblés après corrections (`.shots/home`, `.shots/carte`, `.shots/reservation`, téléphone bridé CPU 4x) :

| Indicateur | Accueil | Carte | Réservation |
|---|---|---|---|
| LCP mobile | 1224 ms | 1216 ms | 1160 ms |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| loaderMs | null | null | null |
| settledMs desktop | 3461 | non relevé | 2464 |
| FPS desktop / mobile | 54 (pire trame 83 ms, contre 50 et 133 avant) / 60 | 60 / 60 | 60 / 60 |
| axe sérieux | 0 (2 contrastes à revoir : tube à l'allumage, vus à l'œil) | 0 | 0 |
| overflowX | non / non | non / non | non / non |
| noHoverChange | vide | « La carte » (lien de la page courante, `aria-current`) | vide |
| smallTargets | vide | vide | vide après la 2e correction (mesure par script, 390 px) |
| idleMotion | false (repos assumé) | | false |
| Erreurs console / requêtes en échec | 0 / 0 | 0 / 0 | 0 / 0 |

`colorOnly` lu à l'œil : liens de nav, « Voir la carte » et téléphone = halo de néon par paliers ; « Wépion » couleur + soulignement ; « Ouvrir le plan » couleur, épaisseur et décalage du soulignement.
Audit final (`.shots/audit.txt`) : 0 FAIL, 1 WARN « no sitemap » (faux positif sous `base`, `sitemap-index.xml` présent et lié). Page la plus lourde ~959 Ko, JS 61 Ko gz. 404 servie en direct : `lang="fr"`, titre, h1 « Un tube a grillé. » (la 404 du shoot de l'agent captures est la réponse brute de `serve.mjs`).

## Points non résolus
- [Jury] Pas de critique indépendant : `/jury http://127.0.0.1:4400/dolce-vita-wepion/awwwards/` re-note le site avec un critique neuf.
- [Anim] `.shots/home/report.json` : `scrollFps` desktop 54 (pire trame 83 ms) après retrait du reveal de la galerie, sous la cible de 55 ; mobile 60. Piste : décoder les photos de la galerie plus tôt (`decoding="async"`, tailles plus petites).
- [Creativity] `desktop.idleMotion` false : repos assumé (DESIGN.md point 36) ; une respiration plus visible du hero le ferait détecter, au prix de `settledMs`.
- [Poids dist] Astro émet les JPG originaux dans `_astro/` (jusqu'à 725 Ko) sans les référencer : sans effet sur les pages, gonfle `dist/`.

## Placeholders et hypothèses (à remplacer par le client)
- Aucun `placeholder: true` : toutes les données affichées viennent du dossier.
- Hypothèses à confirmer : traduction KYW de la devise ; légendes de photos rédigées d'après `sujet` ; orthographe de la carte conservée (voir ci-dessous).

## Décisions de théâtre
- Loader : non, l'allumage du hero est le premier moment.
- GL : non, aucun besoin de shader.
- Repos : bourdonnement du néon (0,15 % de pixels par 0,5 s) et hoquets, volontairement discrets.
- Accessoire retiré : le reveal « up » échelonné de la galerie de l'accueil.

## Leçons structurelles
- `scroll-snap-type` sur une liste à défilement horizontal dont le conteneur a une gouttière (`.wrap`) aligne le premier élément sur le bord au téléphone : ajouter `scroll-padding-inline: var(--gutter)` (recopiée dans `agents/lecons/construction.md`).

## Historique des données (phase 1)

## Données douteuses (non corrigées, à confirmer par le client)
- Orthographe de la carte conservée telle quelle : « Fusili lunghi », « Strozzapretti », « Tartuffata » (scaloppine) à côté de « Tartufata » (preferite), « Esc. Panée ».
- Deux descriptions parasites de la capture supprimées (`null`) : « Les pizzas » (Cestino Gnocchi) et « À table » (pizza de l'ardoise).
- Date d'ouverture : 2017 seulement (mois non concordants entre Resto.be et Trouve Ton Resto).
- `restaurants.json` parle de réservation en ligne : démenti par le site client, la maquette ne propose que le téléphone et l'e-mail.
- Nombre de couverts (40, Trouve Ton Resto) non affiché.

## Fictif ou rédigé par KYW
- Traduction française de la devise (« Si c'est doux, la vie est plus belle »), signalée comme traduction KYW dans la page.
- Légendes de photos rédigées d'après le champ `sujet` de `photos/index.json` (aucun plat nommé sans preuve ; « pâtes aux palourdes » n'est pas un plat de la carte, la légende décrit la photo).
- Aucun plat, prix, avis, note ni distinction inventé ; aucun `placeholder: true` nécessaire en phase 1.

## Non affiché volontairement
- Avis et notes (Google 4,3, Tripadvisor 4,2, etc.) : chiffres non vérifiés.
- Fermeture exceptionnelle du 26 au 29 octobre : passée.
