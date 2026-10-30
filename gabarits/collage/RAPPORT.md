# RAPPORT « Collage »

**Concept** : le mur de flyers et de stickers à l'entrée d'une salle ; chaque activité du lieu est un aplat coloré cerné
d'un filet noir, et le logo en trois cases, collé en haut à gauche, absorbe une quatrième case avec le nom de la section
où l'on est.

## QA (une passe complète, 30/10/2026, port 4413, captures dans `.shots-collage/<page>`)

| Page | Console | LCP desktop | LCP mobile (throttlé) | CLS | Débordement | Reduced hiddenText | axe sérieux |
| --- | --- | --- | --- | --- | --- | --- | --- |
| accueil | 0 | 140 ms | 1,09 s | 0 | aucun | 0 | 1 (corrigé) |
| carte | 0 | 424 ms | 1,22 s | 0 | aucun | 0 | 1 (corrigé) |
| histoire | 0 | 520 ms | 1,01 s | 0 | aucun | 0 | 1 (corrigé) |
| réservation | 0 | 228 ms | 1,13 s | 0 | aucun | 0 | 1 (corrigé) |
| agenda | 0 | 228 ms | 3,14 s (corrigé : première affiche en 640 px eager) | 0,003 | aucun | 0 | 1 (corrigé) |
| privatisation | 0 | 368 ms | 1,91 s | 0 | aucun | 0 | 1 (corrigé) |
| 404 | 0 | 152 ms | 1,07 s | 0 | aucun | 0 | 1 (corrigé) |

- `audit.mjs` : 0 FAIL, 12 WARN (horaires répétés par page, citation MICHELIN deux fois sur l'accueil, robots/sitemap à
  la racine de l'origine et 404 de `dist/` : normaux sous `base`, saut h1 → h3 de l'agenda corrigé par un h2 sr-only).
- Clavier : `noVisibleFocus`, `invisibleFocus` vides, pas de blocage ; « Aller au contenu » premier arrêt.
- Hover : boutons et cellules inversés (fill complet), stickers soulevés, cartes d'agenda levées ; « Accueil » et
  « Réserver » sans changement quand ils sont la page courante (déjà inversés) ; le logo d'en-tête inverse ses cases
  (ajouté après la passe : le détecteur de shoot.mjs rend `none` sur les liens d'un en-tête fixe, à vérifier par
  mini-script).
- Idle : `desktop.idleMotion` true (dérive de la tasse dans la section brunch) ; premier écran immobile par décision.
- Loader : 2,5 s desktop ; mobile 4,4 à 5,4 s de boot mesuré, jugé sur le LCP (hero peint au premier rendu).

**Corrections mécaniques après la passe** (sources corrigées, rebuild, pré-contrôle Playwright repassé sur 7 pages × 2
largeurs : 0 erreur console, scrollWidth = viewport partout, 0 élément révélé resté caché) : `aria-label` sur un `<p>` du
pied de page → texte sr-only ; nowrap des lignes de menu qui débordait à 390 px ; cellule « Menu » tronquée dans
l'en-tête mobile quand la case de section est collée ; fiches d'équipe sans photo plus courtes que les portraits ; LCP
mobile de l'agenda. Ces correctifs n'ont pas été recapturés par `shoot.mjs` (une seule passe autorisée) : le relecteur
doit recapturer.

**Score critique** : non noté ici (la skill `jury` est faite par un agent distinct). Auto-lecture avec `quality-bar.md` :
le concept se lit en un écran (cases + aplats + logo qui se colle), la mécanique du logo est visible sur chaque page.

## Placeholders (15 drapeaux dans `site.ts`, tous marqués à l'écran)

- Activités « Scène » et « Brunch » (`reelle: false`) : post-it « Activité d'exemple » / « Formule d'exemple » dans la
  section, bandeau sans JS en tête de la page agenda, aucune billetterie ni CTA de réservation sur ces blocs.
- 6 événements (`placeholder: true`) : jour de semaine + « jour d'exemple », étiquette « exemple », « Billetterie à venir
  (démonstration) » ; aucune date.
- Formule brunch (32 €), 2 lignes de boissons, e-mail, rôles de Sara et Jordan, 2 avis (« Exemple d'avis », sans nom).
- Réels et prouvés par le dossier : menu 4 services et formules, horaires, adresse, téléphone, Zenchef, citation
  MICHELIN, privatisation du samedi, quartier (bord de Meuse, côté Citadelle), stickers (fait maison, produits des
  saisons, servi par les chefs), histoire (date relative « il y a quatorze ans » neutralisée).

## Ce qui manque

- Objets détourés photographiques (la tasse est un SVG dessiné) ; affiches d'événements (photos du restaurant à la
  place).
- Recapture `shoot.mjs` après les correctifs mécaniques ; revue `jury`.
- Vérifier à la main le menu mobile (ouverture, piège de focus, Escape) : non couvert par shoot.mjs.

## Leçons structurelles (à reporter dans `agents/lecons.md`)

- `.lignes li span + span { white-space: nowrap }` attrape aussi les `<span>` imbriqués dans la première cellule
  (marque « exemple », description) : cibler `li > span + span` et remettre `white-space: normal` sur les marques ; le
  pré-contrôle Playwright (scrollWidth à 390) l'a vu, pas le shoot (`overflow: null`).
- Un en-tête mobile « logo + case de section + 2 cellules » déborde dès que la case porte un mot long (« Privatiser ») :
  borner la case (`max-width` + ellipsis) et réduire le padding des cellules sous 768 px ; lire la planche mobile des
  pages intérieures, pas seulement celle de l'accueil.
- Une page dont le premier visuel est dans une liste (agenda) a son LCP sur cette image : la première `<img>` de la liste
  en `eager` + `fetchpriority="high"` et en 640 px (3,1 s → à recapturer).
- `flex: 0 0 min-content` sur un h1 de page à plusieurs mots (« Le lieu est à vous ») le casse en une ligne par mot
  (348 px de haut) : `flex: 0 1 auto; max-width: 100%` garde le repli du chapô sans casser le titre.
