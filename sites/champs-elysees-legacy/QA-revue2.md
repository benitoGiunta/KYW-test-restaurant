# QA revue 2 : champs-elysees-legacy (faits)

Build : `sites/champs-elysees-legacy` → `dist/champs-elysees/legacy/`, exit 0 (5 pages, journal `.logs/champs-elysees-legacy-revue2-build.log`).
Serveur local : `dist/` sur 127.0.0.1:4503, arrêté après capture.
Audit : `.logs/champs-elysees-legacy-revue2-audit.log`, résumé « 0 FAIL, 10 WARN ». Crawl : 4 pages trouvées, 3 capturées (home, la-carte, sonde 404).

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-revue2/home/planche.png` |
| /la-carte/ | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-revue2/champs-elysees-item/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-revue2/champs-elysees-item/planche.png` |
| 404 (sonde `__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-legacy-revue2/404/planche.png` |

Note : `planche.py` lit `--colonnes` et `--largeur` comme fichiers (valeurs `4` et `480` signalées « ignoré »). Les planches sortent quand même en 1920 px (4 colonnes × 480) avec 19 images chacune.

## Chiffres (report.json)

| Métrique | home | la-carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Contraste à vérifier | 4 | 4 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms, élément) | 96 (img) | 124 (h1#h-carte) | 96 (p) |
| LCP mobile (ms, élément) | 1588 (img) | 1016 (p.lead) | 240 (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (reduced) | 0 | 0 | 0 |
| Cibles tactiles trop petites desktop / mobile | 8 / 0 | 8 / 0 | 1 / 1 |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop (pire frame) | 61 (17 ms) | 61 (17 ms) | 60 (17 ms) |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | focus sorti de la page |

Violation axe sur la 404 : `color-contrast`, cibles `081 23 14 26` (81x18 et 93x21).

## Audit

- FAIL : 0
- WARN : 10 (détail dans `.logs/champs-elysees-legacy-revue2-audit.log`)
- Page la plus lourde : `/champs-elysees/legacy/`, ~788 KB, 719 images, 58 polices.
