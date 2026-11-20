# QA revue1 — pizzeria-doria / portfolio (phase test)

Source : `dist/pizzeria-doria/portfolio/` servi sur http://127.0.0.1:4501/pizzeria-doria/portfolio/ (build OK, exit 0).
Captures : `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-revue1/` (summary.json à la racine du dossier).
Planches : une par dossier de page, 4 colonnes, 480 px de large.

## Pages capturées (shoot.mjs --crawl --nav : 3 dossiers, 40 + 40 + 28 fichiers)

| Page | Dossier de captures | Planche |
|---|---|---|
| home (/pizzeria-doria/portfolio/) | `.shots-pizzeria-doria-portfolio-revue1/home/` | `.shots-pizzeria-doria-portfolio-revue1/home/planche.png` |
| pizzeria-doria-item (/carte/) | `.shots-pizzeria-doria-portfolio-revue1/pizzeria-doria-item/` | `.shots-pizzeria-doria-portfolio-revue1/pizzeria-doria-item/planche.png` |
| 404 (/__shoot-missing-page-…) | `.shots-pizzeria-doria-portfolio-revue1/404/` | `.shots-pizzeria-doria-portfolio-revue1/404/planche.png` |

Note : l'audit a crawlé 6 pages (home, carte, vins, histoire, emporter, reservation) ; le shoot n'en a capturé que 3 (home, carte, 404).

## Chiffres (summary.json et report.json)

| Indicateur | home | carte (pizzeria-doria-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 1 (color-contrast, 2 nœuds) |
| Axe contrastNeedsReview | 27 | 18 | 0 |
| LCP desktop (ms) | 164 | 96 | 40 |
| CLS desktop | 0 | 0.005 | n/d |
| LCP mobile (ms) | 1088 | 1148 | 236 |
| CLS mobile | 0.007 | 0.003 | 0 |
| FPS desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Débordement horizontal | non | non | non |
| Cibles tactiles < seuil | 0 | 0 | 1 |
| Texte caché réduit | 0 | 0 | 0 |
| Mouvement en prefers-reduced-motion | non | non | non |
| Hero stabilisé (ms) | null (encore en mouvement au plafond) | null | 2166 |
| Mouvement idle | oui | oui | non |
| Lien d'évitement en premier focus | non | non | non |
| Focus visible absent | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Focus bloqué (stuck) | non | non | non |
| Hover sans changement | 0 | 0 | 2 |
| Changement de couleur seule | 0 | 3 | 0 |

Parcours clavier : home 12 arrêts (dont « Aller au contenu » en premier, pas de lien d'évitement en premier focus selon le champ skipLinkFirst) ; carte 12 arrêts ; 404 2 arrêts puis sortie du document.

## Audit (audit.mjs) : 0 FAIL, 20 WARN

- 14 WARN « sentence repeated » sur carte, vins, histoire, emporter, reservation : répétition de « 12:00 à 13:30, 18:00 à 21:30 », « 12:00 à 13:30, 18:00 à 22:00 » et « Horaires du jour Fermé le mardi et le mercredi Rue Fond de Malonne 66, » (2 à 4 occurrences par page).
- 2 WARN site : pas de robots.txt ; pas de sitemap.
- Page la plus lourde : / (~607 KB ; HTML 7, JS 74 gz, CSS 7 gz, polices 69, images 450).

## Journaux
- Build : `.logs/pizzeria-doria-portfolio-revue1-build.log`
- Shoot : `.logs/pizzeria-doria-portfolio-revue1-shoot.log`
- Audit : `.logs/pizzeria-doria-portfolio-revue1-audit.log`
- Serveur : `.logs/serve-portfolio.log` (arrêté, PID 20626)
