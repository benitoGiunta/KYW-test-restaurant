# QA revue 2 — pizzeria-doria / legacy

Faits seulement. Build : `scripts/q.sh pizzeria-doria-legacy-revue2-build` (exit 0, dist/pizzeria-doria/legacy/).
Serveur local : `dist/` sur 127.0.0.1:4503 (arrêté après usage).
Captures : `shoot.mjs --crawl --nav` (3 dossiers de page ; le crawl relève 4 URL : `/`, `/menu/`, `/vins/`, `/contact/`, et la 404).
Journal audit : `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-legacy-revue2-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/pizzeria-doria/legacy/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/home/planche.png` |
| Menu `/pizzeria-doria/legacy/menu/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/pizzeria-doria-item/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/pizzeria-doria-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/404/planche.png` |

Résumé global : `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue2/summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 règle `color-contrast` (serious), 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1 |
| Contrast à revoir | 0 | 0 | 0 |
| LCP desktop | 360 ms (img) | 400 ms (h1#menu-titre) | 40 ms (p) |
| LCP mobile (throttled) | 924 ms (img) | 788 ms (p.lead) | 232 ms (p) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Éléments GL cachés desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS défilement desktop / mobile | 61 / 60 | 60 / 60 | 60 / 60 |
| Hauteur page desktop / mobile | 5 872 / 7 990 px | 14 703 / 20 878 px | 900 / 844 px |
| Temps de chargement desktop / mobile | 668 / 1 383 ms | 704 / 1 473 ms | 25 / 413 ms |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : lien d'évitement premier | non | non | non |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : focus sorti de la page | non | non | oui (dernier arrêt : « (body: focus left the page) ») |
| Survol : cibles sans changement | 2 | 0 | 2 |
| Survol : changement couleur seulement | 3 | 5 | 0 |
| Survol : cibles recouvertes / suiveur de curseur | 0 / non | 0 / non | 0 / non |
| Mouvement réduit : texte caché / animations actives | 0 / non | 0 / non | 0 / non |
| Titre (desktop) | « Pizzeria Doria, pizzas et pâtes à Malonne, Namur » | « Menu 2026, Pizzeria Doria à Malonne » | « Page introuvable · KYW » |

Notes du rapport : FPS desktop mesurés en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; mobile à 4x de ralentissement CPU, 4G lente.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 31 (4 pages crawlées ; journal complet dans `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-legacy-revue2-audit.log`)
- Catégories relevées dans les WARN : phrases répétées 2x (horaires, « Venez passer un moment… » sur `/contact/`) ; absence de lien canonique et de `twitter:card` sur `/contact/` ; absence de `robots.txt` et de `sitemap` au niveau du site ; polices TTF/OTF embarquées (3 par page, à convertir en woff2) sur `/`, `/menu/`, `/vins/`, `/contact/`.
- Page la plus lourde : `/pizzeria-doria/legacy/` (~520 KB ; HTML 6, JS 1 gz, CSS 5 gz, polices 286, images 222).

## Incidents de la passe

- Première tentative de capture : serveur non démarré (port 4503 déjà utilisé au lancement). Le serveur a été relancé ; la capture a été refaite entièrement, le dossier précédent a été supprimé.
- Planches : `planche.py` a traité `4` et `480` comme des fichiers (avertissements « ignoré ») ; les planches ont été produites à 4 colonnes et 480 px (1920 px de large, 19 images).
