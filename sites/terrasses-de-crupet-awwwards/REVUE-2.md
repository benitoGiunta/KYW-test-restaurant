# Revue awwwards · Les Terrasses de Crupet · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1 ; reste F2-4 reporté par la révision et 8 F3 inchangés)
Lecture en une ligne de l'idée du site : des hublots ronds, comme les miroirs de la salle, sur un vert profond et un cuivre, en Young Serif très grande ; brasserie de village, carte lisible, réservation en deux gestes (inchangé depuis la passe 1).

Fraîcheur des preuves : `dist/` (04:37:32) postérieur à tout `src/` (dernier : `engine.css` 04:35:21). `QA-revue2.md` est un échec partiel (crawl bloqué sur l'accueil, aucune capture mobile, pas d'audit) : non utilisé, sauf comme preuve que le build passe (exit 0, 5 pages). Mesures propres : script maison (axe-core de `node_modules`, console, requêtes en échec, `scrollWidth`, `Range.getClientRects` de chaque texte contre la fenêtre, masques `.split-line-mask`, cibles < 24 px, h1, footers, mention, logo, robots) sur 5 pages x 5 largeurs (1440, 1024, 390, 360, 320) après défilement à la molette = 25 contextes, 0 écart ; captures ciblées (accent, accueil, carte, lieu, réserver, 404, menu à 390) ; grep Python du texte du dist ; LCP/CLS non bridés, Tab, menu, reduced-motion. Serveur propre port 4791 (PID 3201, arrêté).

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constat | résultat |
|---|---|---|---|
| F1-1 | `.brand__name` visually-hidden sous 560 px | 390/360/320 : `.brand` contient « Les Terrasses de Crupet » en 1x1 px, `clip: rect(0,0,0,0)` ; axe `link-name` : 0 sur 5 pages x 5 largeurs ; nom visible inchangé à 1440 et 1024 ; Tab 2 lit « T Les Terrasses de Crupet » | confirmé |
| F1-2 | `tabindex="0"` + `aria-label` sur `ul.trois__row` | `tabindex=0`, `aria-label="Terrasse, salle, bar"`, pas de `role` ; scrollWidth 902 pour clientWidth 390 (défile) ; le 7e Tab y arrive ; axe : 0 `scrollable-region-focusable` ni `listitem` à 390, 360, 320 | confirmé |
| F2-1 | accent de « À la carte » | `.split-line-mask` padding-top/margin-top ±0,2em ; captures `rev2-tdc-acc-1440.png` et `acc-390.png` : « À » complet avec grave visible ; 0 masque tronqué (`scrollWidth > clientWidth`) sur 25 contextes | confirmé |
| F2-2 | `.site-footer` en `<section aria-label="Contact">` | 1 seul `<footer` par page (5 sur 5) ; `aria-label="Contact"` présent partout ; axe 0 `landmark-no-duplicate-contentinfo` | confirmé |
| F2-3 | procédures retirées | grep du texte rendu : 0 « ou par e-mail », « renseign », « stationnement », « Ouvrir mon e-mail », « Votre demande » ; « Parking et accès : informations non communiquées » (lieu) et « Parking, accès et privatisation : informations non communiquées » (réserver) ; meta description de réservation sans e-mail ; l'adresse `resto@lesterrassesdecrupet.be` reste en `mailto:` (conforme au dossier) | confirmé |
| F2-4 | reporté | `src/data/site.ts:43-53` inchangé : Desserts = `cocktail`, Bières = `terrasse`, Boissons chaudes = `carte` | non traité (voir ci-dessous) |

Aucune régression : 0 erreur console, 0 requête en échec ou statut ≥ 400, 0 violation axe (toutes gravités) sur 25 contextes, 0 débordement (`scrollWidth`, `Range`), 0 cible < 24 px, 1 `h1` par page, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives » et 1 logo `kyw-signature` sur chaque page. Menu à 390 px : `aria-expanded` faux, vrai, faux après Échap ; reduced-motion : 0 texte à opacité < 0,5. CLS 0,002 (mobile) et 0 (desktop) ; LCP non bridé trop bas pour être significatif (56 et 100 ms), la valeur de la passe 1 (1952 ms mobile bridé) reste la référence, aucun changement de poids.

## Findings restants

### F2 mineur
- **F2-4 · Vignettes de la carte sans rapport avec la catégorie (reporté).** `src/data/site.ts:43-53` : `Desserts: 'cocktail'` (photo du cocktail orange), `Bières: 'terrasse'` (photo de la terrasse), `'Boissons chaudes': 'carte'` (couverture de menu, disque noir). Preuve : passe 1 `rs-carte-m.png` ; source inchangée. Correction : retirer ces 3 entrées de `photoCategorie` (le composant ne rend rien sans clé) ; garder les 6 autres (tartare, fondue, viande, burger, shaker, vin).

### F3 finition (inchangés, hors périmètre de la révision ; vérifiés sur le dist)
- F3-1 : « mise à jour sur le site du client » (carte, 1 occurrence) ; « selon le site du restaurant » (accueil, réservation).
- F3-2 : « Tous les jours durant les congés scolaires » toujours collé à « sept jours sur sept » (accueil, réservation ; visible sur `m-home-2`).
- F3-3 : apostrophes droites dans la carte (4 : « à l'ail », « d'abbaye »…), visibles sur `m-carte-0`/`m-carte-1`.
- F3-4 : « 69 € » avec espace ordinaire (7 « chiffre espace € » sur l'accueil dont les prix, 0 U+00A0 sur tout le site).
- F3-5 : « une cinquantaine de vins » (accueil, visible sur `m-home` dernière planche).
- F3-6 : `01-facade-ete` et `02-facade-vue-drone` (≈ 724 Ko) toujours dans `_astro/` sans page qui les appelle ; photo « chalet » (APRÈS-SKI) sur « Menus de fêtes à emporter ».
- F3-7 et F3-8 : non retouchés (sources `404` et `reservation` sans changement de ces points ; 7 lignes d'horaires identiques toujours présentes sur Réserver, `m-resa-1`).
- Observation non tranchée : la vignette de « À partager » sur la carte mobile (`m-carte-0`) apparaît à ~26 px contre ~70 px pour « Entrées » : probablement un reveal capturé en cours de route, à confirmer par une capture après 2 s si le correctif F2-4 est repris.

## Ce qui est bien (à ne pas casser)
1. Les 5 corrections annoncées tiennent à 5 largeurs (dont 320 et 1024, absentes de la passe 1) ; le correctif d'accent est global et propre (« À » intact desktop et mobile).
2. Fidélité aux faits maintenue : adresse, téléphone, e-mail, Zenchef, horaires, menus de fêtes conformes à `donnees.json` ; les procédures déduites ont disparu sans laisser de titre orphelin (« Écrire » n'affiche plus que l'adresse).
3. Le motif des hublots, le mobile recomposé (carrousel défilable et atteignable au clavier, menu plein écran, onglets collants) et l'accessibilité propre (0 violation axe sur 25 contextes) sont intacts.

## Décompte
F0 : 0 · F1 : 0 · F2 : 1 (F2-4) · F3 : 8.
Pour passer PUBLIABLE : traiter F2-4 (3 lignes dans `site.ts`) ; les F3 sont facultatifs.
