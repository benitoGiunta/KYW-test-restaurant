# QA revue 2 — epices-et-nous / legacy (captures)

Build : `sites/epices-et-nous-legacy` → `dist/epices-et-nous/legacy/` (OK, 7 pages Astro).
Serveur local : `dist/` sur port 4503 (arrêté en fin de passe).
Journaux : `.logs/epices-et-nous-legacy-revue2-{build,shoot,audit}.log`.

## Pages capturées

Le crawl de `audit.mjs` liste 6 pages ; `shoot.mjs --crawl --nav` n'a capturé que 3 dossiers (home, carte, une page 404 de contrôle).

| Page | Dossier de captures | Planche | Captures |
|---|---|---|---|
| Accueil `/epices-et-nous/legacy/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-revue2/home/planche.png` | 40 fichiers |
| Carte `/epices-et-nous/legacy/carte/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-revue2/epices-et-nous-item/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-revue2/epices-et-nous-item/planche.png` | 40 fichiers |
| 404 de contrôle `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-revue2/404/planche.png` | 28 fichiers |

Non capturées par le shoot : menu, réservation, à-propos, actualités (présentes dans l'audit, sans dossier de captures).

## Mesures (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, serious) |
| Contraste à vérifier (axe) | 0 | 0 | 0 |
| LCP desktop (ms) | 536 (img) | 464 | 40 |
| LCP mobile (ms) | 740 (img) | 820 | 220 |
| CLS desktop | 0.001 | 0.002 | 0 |
| CLS mobile | 0.001 | 0.001 | 0 |
| Débordement horizontal mobile / desktop | non / non | non / non | non / non |
| Éléments hors écran mobile (offenders) | 0 | 0 | 0 |
| Cibles tactiles petites (mobile) | 0 | 0 | 1 (« la page d'accueil », 128×20) |
| FPS défilement desktop (headless) | 61 | 60 | n/a |
| FPS défilement mobile (worst frame) | 61 (17 ms) | n/a | n/a |
| Texte caché en mouvement reduced-motion | 0 / non | 0 / non | 0 / non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Survol : cibles testées / sans changement / couleur seule | 7 / 2 / 5 | 7 / 1 / 6 | n/a |

Remarques : `skipLinkFirst` vaut `false` sur les trois pages alors que le premier arrêt clavier est le lien « Aller au contenu » (champ à lire avec prudence). FPS desktop mesuré en headless logiciel : plancher, non une mesure matérielle.

## Audit (audit.mjs)

Résultat : **0 FAIL, 20 WARN**.

WARN :
- Canonical absent : `/a-propos/`, `/actualites/` (2)
- Site : pas de `robots.txt`, pas de `sitemap` à la racine servie (2)
- Fonte TTF/OTF livrée au lieu de WOFF2 : 2 fichiers × 6 pages (12)
- Le WARN « ttf/otf » concerne `ieVq2YZ…Ncs2Za4Q.ttf` et `ieVq2YZ…NcgWZa4Q.ttf`.

## Lignes FAIL

Aucune.
