# QA revue 2 — wok-de-jin / portfolio (captures)

Build : `sites/wok-de-jin-portfolio` → `dist/wok-de-jin/portfolio/` (exit 0, 7 pages).
Serveur local : `dist` sur port 4501, arrêté après les captures.
Captures : `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue2/` (dossiers `home`, `wok-de-jin-item` = `/tarifs/`, `404`, et `summary.json`).
Journaux : `.logs/wok-de-jin-portfolio-revue2-*.log`.

## Planches

- Accueil : `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue2/home/planche.png`
- Tarifs (`/tarifs/`) : `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue2/wok-de-jin-item/planche.png`
- 404 : `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue2/404/planche.png`

Note : `scripts/planche.py` affiche « ignoré 4 » et « ignoré 480 » (valeurs des options prises pour des fichiers). Les planches sont produites, 1920 px de large, 19 images chacune.

## Chiffres par page (report.json)

| Page | Dossier | Erreurs console | Requêtes en échec | Axe (serious / violations) | Contrastes à vérifier | LCP desktop / CLS desktop | LCP mobile / CLS mobile | Débordement X | Petites cibles | FPS desktop / mobile | Focus visible absent / invisible | Survol sans changement |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/wok-de-jin/portfolio/` | home | 0 | 0 | 0 / 0 | 25 | 76 ms (span) / 0,021 | 1552 ms (img) / 0,006 | non | 0 | 60 / 59 | 0 / 0 | 0 |
| `/tarifs/` | wok-de-jin-item | 0 | 0 | 0 / 0 | 17 | 72 ms (h1) / 0,005 | 1088 ms (p.lead) / 0 | non | 0 | 60 / 60 | 0 / 0 | 0 |
| 404 | 404 | 0 | 0 | 1 / 1 (`color-contrast`, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) | 0 | 36 ms (p) / 0 | 236 ms (p) / 0 | non | 1 (« la page d'accueil » 128x20) | 61 / 61 | 0 / 0 | 2 (« la page d'accueil », « Réalisé par ») |

Autres champs du summary :
- Mouvement : `idleMotion` vrai sur accueil et tarifs, faux sur 404. `movingReduced` faux partout. `hiddenTextReduced` : 0 partout.
- `colorOnly` : 0 accueil, 2 tarifs, 0  404.
- `skipLinkFirst` : faux partout (le premier arrêt clavier est « Aller au contenu »).
- Accueil : premier arrêt clavier « Aller au contenu » ; `nav` vers `/wok-de-jin/portfolio/tarifs/` ; hauteur 7341 px desktop, 7546 px mobile.
- Tarifs : hauteur 3437 px desktop, 4909 px mobile.
- 404 : hauteur 900 px desktop, 844 px mobile ; titre « Page introuvable · KYW » (page hors site Wok de Jin, bouton de retour vers `/`).
- Sur le titre « Wok de Jin | Buffet asiatique à volonté à Jambes » (accueil), `glOn` faux (pas de WebGL détecté).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 14 WARN** ; 6 pages crawlées ; page la plus lourde `/wok-de-jin/portfolio/` (~894 KB, 791 KB d'images).
- WARN répétition de phrase (12 lignes) :
  - « Horaires du jour Midi et soir, fermé le mardi Avenue du Bourgmestre Je » répétée 2 fois sur chacune des 6 pages crawlées.
  - « 12:00 à 14:00, 18:00 à 22:30 » répétée 12x (accueil, réservation), 6x (tarifs, maison, réveillon, emporter).
- WARN site : pas de `robots.txt`, pas de `sitemap`.

Le crawl audit (6 pages) ne couvre pas la page 404 ; la capture 404 est un dossier séparé.
