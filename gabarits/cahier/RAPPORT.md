# Rapport « Cahier »

**Concept en une ligne** : le site est le cahier de la cuisine (couverture kraft, pages quadrillées, mono tapé,
titres slab, annotations d'origine en bille bleue, timbres et polaroids, folios) où le menu du jour s'écrit sous les
yeux en Caveat tracée (SVG généré au build par fontkitten, `stroke-dashoffset`) avant que la date soit tamponnée.

## État

- Gabarit complet : accueil (couverture + 7 pages du cahier + dos), carte, producteurs, histoire (les potes),
  réservation, commander (traiteur et événements), 404 ; `dist/gabarits/cahier/` buildé.
- `node scripts/build-site.mjs gabarits/cahier` : OK (7 pages, noindex et pied de page KYW contrôlés).
- QA mécanique, passe 1 (shoot des 7 pages, `.shots-cahier/<page>/report.json`, audit `.shots-cahier/audit-cahier.txt`) :
  0 erreur console, 0 requête en échec, 0 débordement horizontal (desktop et mobile), 0 cible < 24 px, reduced
  motion sans mouvement et sans texte caché, clavier sans focus invisible ni blocage (`skipLinkFirst: false` = faux
  négatif connu du script, « Aller au contenu » est bien le premier arrêt), hover : `noHoverChange` vide partout
  (les `colorOnly` sont des boutons qui s'inversent entièrement en bille, à juger à l'œil sur `h-NN-hover.png`).
- Corrections mécaniques appliquées après la passe 1, puis rebuild : contraste `.dos__fin` sur kraft (seule
  violation axe sérieuse, sur toutes les pages, corrigée en encre), sauts de niveau h1 → h3 sur carte et commander
  (titres de catégories et de formules en h2), timbre dont l'image débordait du papier dentelé (`justify-items`),
  sommaire dont la colonne de marge écrasait les noms de plats (annotation sous la ligne), titre « Le menu du
  moment » dupliqué sur l'accueil, prix « inclus » en gris léger.
- Passe 2 (après corrections) : audit `.shots-cahier/audit-cahier-2.txt` (0 FAIL, 9 WARN : horaires répétés,
  robots/sitemap sous base, 404 de l'origine) ; re-shoot de la carte `.shots-cahier/carte-2/` : 0 erreur, 0
  débordement, 0 violation axe, CLS 0 / 0, LCP 712 ms desktop et 1348 ms mobile.
- Critique `jury` : non lancée ici (règle des agents : revue par un agent distinct).

## Mesures (passe 1, shoot en série, CPU partagé avec d'autres agents)

| Page | LCP desktop | LCP mobile (throttlé) | CLS d / m | Loader d / m | FPS desktop (logiciel) |
|---|---|---|---|---|---|
| Accueil | 540 ms (img) | 1304 ms (accroche) | 0 / 0 | 3514 / 6226 ms | 37 |
| Carte | 404 ms | 1340 ms | 0,064 / 0 | 3052 / 6013 ms | 60 |
| Producteurs | 388 ms | 1232 ms | 0,007 / 0 | 3000 / 6884 ms | 58 |
| Histoire | 448 ms | 1132 ms | 0 / 0 | 3071 / 5913 ms | 60 |
| Réserver | 336 ms | 1240 ms | 0 / 0 | 3166 / 4959 ms | 60 |
| Commander | 436 ms | 1172 ms | 0 / 0 | 3312 / 5262 ms | 57 |
| 404 | 372 ms | 1168 ms | 0 / 0 | 3125 / 4984 ms | 60 |

L'accroche de la couverture et la photo collée (`data-critical`, eager) sont peintes sous le loader : le LCP mobile
tient sous 2,5 s sur toutes les pages. `idleMotion: false` partout sauf la carte : décision écrite dans DESIGN.md (un
cahier posé ne bouge pas). Le CLS de 0,064 sur la carte en desktop (passe 1) n'apparaît plus en passe 2 (0). `audit.mjs` : 0 FAIL, WARN restants = horaires répétés (pied de page + section
pratique), robots/sitemap cherchés à la racine de l'origine, 404 de l'origine sans h1 (normaux sous `base`).

## Placeholders (`placeholder: true` dans `src/data/site.ts`)

e-mail de contact ; rôles de Sara et Jordan et les deux phrases d'équipe correspondantes ; menu du jour daté et ses
prix ; origines des produits (toutes les annotations « de chez… ») ; formule du midi (5 lignes) ; cave et bar (5
lignes) ; les 6 producteurs (prénoms, villages, photos reprises des photos du client) ; les 3 formules traiteur ;
deux avis clients (marqués « avis illustratif »). La mention « producteurs illustratifs » est écrite sur la page
Producteurs et « formules illustratives » sur Commander.

## Ce qui manque ou reste ouvert

- Les tracés manuscrits n'ont pas de crénage (fontkitten n'expose que les glyphes, pas `layout()`) : l'écriture est
  un peu plus espacée que Caveat rendue par le navigateur ; pour un rendu plus serré, passer par opentype.js ou
  fontTools si l'environnement le permet.
- Les boutons `.btn` sont classés `colorOnly` par shoot.mjs alors qu'ils s'inversent entièrement (fond bille, texte
  papier) : à confirmer à l'œil par la revue.
- Le timbre « Pierre, Rochefort » apparaît vide sur une capture mobile de la passe 1 (image lazy pas encore
  décodée au moment de la frame) : vérifier sur la passe de revue ; passer les timbres du mur en `loading="eager"`
  si cela se reproduit.
- Pas de critique extérieure ni de passe « retire un accessoire » : à faire par l'agent de revue. Candidats si
  besoin : le tampon « menu unique » de la carte, la deuxième polaroid de la section Pratique.
- Le plan est un SVG schématique ; la page Commander n'a ni panier ni paiement (téléphone et e-mail).

## Leçons structurelles (à reporter dans agents/lecons.md)

- `fontkitten` (dépendance hoistée d'Astro) convertit un texte en tracés SVG au build (`create(buffer)`,
  `glyphForCodePoint`, `path.toSVG()`, `advanceWidth`) : pas besoin d'opentype.js ni de fontTools pour une écriture
  tracée par `stroke-dashoffset` ; il n'a pas de `layout()` (pas de crénage). La déclarer dans le package.json du
  gabarit (`"fontkitten": "1.0.3"`, résolue hors ligne depuis le store pnpm).
- `font.mjs fontshare "Bespoke Slab"` échoue (« no woff2 found in provider CSS ») mais `fontshare "bespoke-slab"`
  (slug) passe : essayer le slug avant de changer de police.
- `planche.py` prend `--colonnes` et `--largeur` nulle part : ses valeurs sont lues comme des images quelle que soit
  leur position ; l'appeler sans options (3 colonnes, 640 px).
- `shoot.mjs` écrit `report.json` (pas `summary.json`) en mode URL unique ; clés utiles : `errors`, `failed`,
  `desktop.overflowX`, `a11y.violations`, `keyboard`, `hover.noHoverChange`, `reduced`.
- Un `.timbre` en `display: grid; justify-items: start` fait rétrécir le papier dentelé à sa largeur de contenu et
  l'image (`width: 100%`) reprend sa taille intrinsèque : `justify-items: stretch` + `width: 100%` sur le papier.
