# QA revue1 : terrasses-de-crupet, portfolio (faits)

Build : `dist/terrasses-de-crupet/portfolio/` (7 pages construites, exit 0).
Serveur local : `http://127.0.0.1:4501/terrasses-de-crupet/portfolio/` (arrêté après les captures).

## Captures et planches

Le crawl (`shoot.mjs --crawl --nav`) n'a produit que 3 dossiers. Les pages terrasse, histoire, emporter et reservation n'ont pas de dossier de captures.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/home/planche.png` |
| Carte `/carte/` (libellé `terrasses-de-crupet-item`) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/terrasses-de-crupet-item/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/terrasses-de-crupet-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/404/planche.png` |

Résumé des captures : `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue1/summary.json`.

## Chiffres par page (report.json)

| Indicateur | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 règle : `color-contrast` (2 nœuds : `.kyw-footer__note` #6b787d sur #fbfaf8, 4,36:1 ; un `span` identique, 4,36:1 ; seuil 4,5:1) |
| Contrastes à vérifier (axe needs-review) | 34 | 24 | n.d. |
| LCP desktop (ms) | 116 (`span.l2`) | 116 (`p.lead`) | 92 (`p`) |
| LCP mobile (ms, throttlé) | 3792 (`img`) | 1060 (`p.lead`) | 236 (`p`) |
| CLS desktop | 0 | 0,006 | 0 |
| CLS mobile | 0,046 | 0 | 0 |
| Débordement horizontal | non | non | non |
| Éléments hors cible (< 24 px, desktop/mobile) | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Texte masqué réduit | 0 | 0 | 0 |
| Focus clavier visible absent / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Pas de changement au survol | 0 | 0 | 2 |
| Contraste seul (couleur sans indice) | 0 | 1 | 0 |
| Pile de focus clavier | lien d'évitement en 1er : non (« Aller au contenu » présent) | idem | 2 arrêts puis « focus left the page » ; pas de lien d'évitement en 1er |
| FPS desktop / mobile (headless) | 59 / 60 | 60 / 60 | 61 / 61 |
| Mouvement idle | oui | oui | non |
| Titre `<title>` | « Les Terrasses de Crupet | Bistronomie à Crupet (…) » | « La carte | Les Terrasses de Crupet » | « Page introuvable · KYW » |

## Audit (audit.mjs)

- Résumé : 0 FAIL, 15 WARN.
- WARN par page (répétitions de phrases) :
  - Accueil : « Horaires du jour… Rue Basse 13, 5330 » répété 2x ; « Un lieu où il fera bon se restaurer… » répété 2x ; « 12:00 à 14:00, 18:00 à 22:00 » répété 14x.
  - Carte, histoire, terrasse, emporter : « Horaires du jour… » répété 2x ; « 12:00 à 14:00, 18:00 à 22:00 » répété 7x (carte, histoire, terrasse, emporter).
  - Réservation : « Horaires du jour… » répété 2x ; « 12:00 à 14:00, 18:00 à 22:00 » répété 14x.
- WARN site : pas de `robots.txt` ; pas de `sitemap`.

Note : la page 404 affiche « Page introuvable · KYW » ; l'audit n'a pas de FAIL.

## Lignes FAIL

Aucune (0 FAIL).

## Données à noter

- Les FPS desktop sont mesurés en headless sur GPU logiciel (plancher, pas une mesure matérielle), selon les notes du rapport.
- Le report de la page 404 signale une violation `color-contrast` sérieuse (seule violation axe sérieuse de la revue).
