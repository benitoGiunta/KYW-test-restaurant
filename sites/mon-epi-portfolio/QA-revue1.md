# QA revue 1 — mon-epi / portfolio (phase test, rôle captures)

Faits seulement, extraits des `report.json` et du journal d'audit. Build : `dist/mon-epi/portfolio/` (7 pages, exit 0). Serveur local : `dist` sur le port 4501, arrêté après usage.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/mon-epi/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-revue1/home/` (13 desktop `d-*`, 6 mobile `m-*`, `report.json`) | `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-revue1/home/planche.png` |
| Fiche produit « Les pains » (`/mon-epi/portfolio/pains/`) | `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-revue1/mon-epi-item/` (13 `d-*`, 6 `m-*`, `report.json`) | `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-revue1/mon-epi-item/planche.png` |
| Page 404 | `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-revue1/404/` (13 `d-*`, 6 `m-*`, `report.json`) | `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-revue1/404/planche.png` |

Remarques sur la couverture :
- `shoot.mjs --crawl --nav` n'a produit que 3 dossiers de pages (accueil, fiche, 404) : `summary.json` liste 3 pages.
- `audit.mjs` indique « 6 pages crawled » : les 3 autres pages (`/commander/`, `/farines/`, `/points-de-vente/`, `/boulanger/`, etc. selon le build) ne sont pas capturées dans ce passage. Écart à signaler.
- `scripts/planche.py` : `--colonnes` et `--largeur` sont traités comme fichiers (« ignoré 4 », « ignoré 480 »). Les planches sortent quand même en 1920 px de large (4 × 480) et 19 vignettes chacune.

## Chiffres par page (report.json)

| Indicateur | Accueil | Fiche « Les pains » | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contrast à vérifier 79) | 0 (serious 0, contrast à vérifier 140) | 1 règle `color-contrast`, serious : `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1, minimum 4,5:1) |
| LCP desktop | 76 ms (img) | 164 ms (img) | 40 ms (p) |
| LCP mobile (throttle) | 2084 ms (img) | 1088 ms (p.lead) | 228 ms |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments hors débordement (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 desktop / 0 mobile | 0 / 0 | 1 : « la page d'accueil » 128×20 (desktop et mobile) |
| Focus clavier | 12 arrêts, lien d'évitement non premier, 0 focus sans visibilité, 0 focus invisible | 12 arrêts, idem (0 / 0) | 3 arrêts, lien d'évitement non premier, 0 / 0 |
| Mouvement réduit | texte masqué 0, animation active non | 0, non | 0, non |
| Survol sans changement visible | 1 (« Monepi », h-07) | 1 (« Les pains », h-06) | 2 (« la page d'accueil », « Réalisé par ») |
| Survol couleur seule | 3 (« Lire la liste des pains », « Points de vente », adresse) | 4 (« 01 Blé complet 3,00 € », « Commander », « Les farines », « Monepi ») | 0 |
| FPS desktop / mobile (défilement) | 60 / 60 (pire trame 17 ms) | 60 / 60 (17 ms) | 60 / 60 (17 ms) |
| Titre | « Monepi | Boulangerie au four à bois à Loyers (Namur) » | « Les pains | Monepi » | « Page introuvable · KYW » |
| Nombre de titres h1 | 1 (« Monepi ») | 1 (« Les pains ») | 1 (« Page introuvable ») |

Notes du rapport : FPS desktop mesurés en headless sur GPU logiciel (plancher, non représentatif) ; les chiffres mobiles (4× CPU, 4G lente) sont ceux qui comptent.

Accueil, mobile : taille de page 8650 px, desktop 7764 px. Fiche : desktop 5233 px, mobile 7394 px. 404 : desktop 900 px.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2
  - « no robots.txt » (site)
  - « no sitemap » (site)
- Poids de la page la plus lourde (`/mon-epi/portfolio/`) : ~963 Ko ; HTML 18, JS 61 (gz), CSS 6 (gz), polices 89, images 789.

Le journal `.logs/mon-epi-portfolio-revue1-audit.log` contient 3 lignes contenant « WARN » ou « FAIL » (dont le récapitulatif « 0 FAIL, 2 WARN »).
