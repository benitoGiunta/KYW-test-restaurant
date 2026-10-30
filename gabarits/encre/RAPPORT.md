# RAPPORT — gabarit « Encre »

**Concept en une ligne.** Le site est un rouleau peint : ivoire, encre, un seul rouge (le sceau) ; la carte se déroule
à l'horizontale dans une section épinglée sous des traits de pinceau, les titres se lisent à la verticale et chaque
section s'ouvre par un signe numéroté.

## Construction
- Socle `_socle` → `gabarits/encre/` ; Base.astro (polices Shippori Mincho B1 + Spectral auto-hébergées, préchargement
  des photos LCP par page), Header (difference, heure locale calculée), Loader ivoire, Footer en diptyque décalé avec
  le sceau, composants `Rouleau`, `TitreV`, `Sceau`, `Plan`, `HeroPage`, `base.css`, `motion/setup.ts`, six pages.
- Hero peint au premier rendu : photo (`fetchpriority="high"`, 960 px en mobile, 10 à 26 Ko) et nom sans `data-reveal`
  ni `data-intro` ; l'intro n'anime que `transform` (scale 1,06 → 1), le trait vertical et le lien d'invitation.
- Rouleau : pin + scrub (`containerAnimation` pour les traits de pinceau et le sceau) ≥ 1024 px avec motion ; sinon
  défilement horizontal natif avec snap, barre de progression suivant `scrollLeft`, flèches clavier dans les deux modes.
- Reduced motion : rouleau natif, traits et masques déjà dessinés par le CSS, titres sans allumage, pas de pin.

## Scores du critique
Pas de critique dans cet agent (règle du 30/10/2026) : la skill `jury` et la revue sont faites ensuite par un agent
distinct. Auto-contrôle mécanique seulement (voir QA ci-dessous).

## QA (une passe complète + re-shoot de l'accueil, corrections mécaniques)
Serveur :4411, `shoot.mjs` page par page dans `.shots-encre/<page>` (journal `.shots-encre/journal.txt`),
`audit.mjs` → `.shots-encre/audit-encre.txt` : **0 FAIL, 8 WARN** (horaires répétés pied de page + section ; 404 et
robots/sitemap de l'origine, normaux sous `base`). Pré-contrôle Playwright 6 pages × 2 viewports : 0 erreur console,
0 requête échouée, `scrollWidth` = `clientWidth` (1440 et 390), 0 élément resté caché après défilement complet.
- Vitals (6 pages) : LCP desktop 184 à 428 ms, LCP mobile throttlé 1,1 à 1,5 s (404 : 2,8 s, photo du pied de page),
  CLS 0 à 0,001 ; 60 fps au défilement ; reduced-motion `hiddenText: 0`, rien ne bouge.
- Corrections faites après la première passe : titre vertical du hero en deux colonnes (`max-height`) → `white-space:
  nowrap` + taille calée (une colonne sur les 6 pages, mesuré) ; hero desktop recomposé en trois colonnes (trait, nom,
  phrase + lien), la phrase passait sous la ligne de flottaison ; titre du Rouleau horizontal → voie `--lane` dans
  `.rouleau__tete` ; axe `label-content-name-mismatch` sur le sceau (aria-label ≠ texte visible) → nom accessible
  issu du contenu (« PF Réserver »), 0 violation au re-shoot ; trait de pinceau élargi (210) ; photos du rouleau
  plafonnées à 46 svh pour que la ligne des noms reste dans la scène épinglée.
- Faux négatifs connus du détecteur de survol (lesson Marée) : liens de l'en-tête en `position: absolute`, « Dérouler
  la carte » (trait `::after` par transform) et le sceau (rotation d'un enfant) : CSS vérifié.
- `idleMotion: false` : la vapeur (opacité du voile 0,90 ↔ 1 sur 6 s) est trop lente pour le détecteur ; décision
  écrite : c'est le mouvement au repos voulu par le cahier (±3 à 5 %), pas une absence.
- Pas de critique (jury) dans cet agent ; seconde passe et « retire un accessoire » à faire par l'agent de révision.

## Placeholders (une donnée, un drapeau, une marque visible)
| Donnée | Drapeau dans `site.ts` | Marque à l'écran |
| --- | --- | --- |
| 12 plats du rouleau (nom, trois mots, prix) | `rouleau.plats[].placeholder` | « EXEMPLE » dans la tête du rouleau + astérisque vermillon sur chaque prix |
| Carte des boissons (2 lignes) | `carte[2].plats[].placeholder` | « Exemple » en tête de section + « exemple » par ligne |
| E-mail | `email.placeholder` | texte sans `mailto:` + « adresse d'exemple » (pied de page, réservation) |
| Temps de marche gare, stationnement | `acces.gare.placeholder`, `acces.parking.placeholder` | astérisque + « estimation illustrative » |
| Rôles de Sara et Jordan | `equipe[].placeholder` | « rôle illustratif, à confirmer » |
| Page « À emporter » | `emporter.placeholder` | bandeau sans JS en tête, « exemple » par ligne, prix astérisqués, pas de CTA |
| Avis d'exemple (2) | `avis[].placeholder` | non affichés (seule la citation MICHELIN, réelle, est montrée) |

Vérifié dans `dist/` : la citation MICHELIN, les quatre paragraphes d'histoire, la phrase « François et Damien
accompagnent eux-mêmes… épaulés par Sara et Jordan », le menu 4 services à 67 €, les formules, la privatisation du
samedi et les bons cadeaux viennent du dossier (phrases vraies 1 à 10, sans date relative). Le nombre de services est
la constante `servicesMenu`. Aucune date écrite ; l'heure de l'en-tête et le minimum du champ date sont calculés.

## Ce qui manque
- Photos réellement asiatiques (céramique, vapeur, bois) : le rouleau utilise 4 photos réelles des Potes au Feu sous
  des noms de plats d'exemple ; le `role="img"` porte la légende honnête de la photo.
- Un critique extérieur (jury) et la seconde passe de corrections.
- Le plan d'accès est un schéma générique à redessiner par restaurant.

## Leçons structurelles (à reporter dans `agents/lecons.md`)
- Un titre en `writing-mode: vertical-rl` se replie en colonnes dès que `max-height` est inférieur à sa longueur : ne
  jamais borner par `max-height`, mais `white-space: nowrap` et une taille de police calée sur le mot le plus long,
  puis mesurer `getBoundingClientRect().width` du h1 (une colonne = une largeur de police).
- `aria-label` sur un lien dont le texte visible diffère (« Réserver une table » vs « PF Réserver ») est une violation
  axe sérieuse (`label-content-name-mismatch`) : laisser le nom venir du contenu, ou l'aria-label doit contenir le texte
  visible tel quel.
- Un masque SVG natif (`<mask>` + `<path>` à gros `stroke-width` + `<image mask>`) animé par `stroke-dashoffset` avec
  `containerAnimation` de ScrollTrigger révèle une photo « au pinceau » sans canvas ni clip-path JS ; sans JS le trait
  est complet et la photo visible.
- Le détecteur d'idle de shoot.mjs ne voit pas une dérive d'opacité de 10 % sur 6 s : écrire la décision plutôt que
  d'accélérer le mouvement.
