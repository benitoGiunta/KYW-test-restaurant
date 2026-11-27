# QA build : novobel / legacy

Build : `scripts/q.sh novobel-legacy-build-build` exit 0, `dist/novobel/legacy/`, 6 pages construites (404, blog, index, jobs, projects, services).
Serveur de contrôle : `dist` sur 127.0.0.1:4503 (arrêté après les captures).

## Captures et planches

Captures : `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/`
Shoot : 3 dossiers de page (home, novobel-item = /services/, 404). Les pages projects, jobs et blog ne sont pas capturées (crawl du shoot limité à 3 pages) ; l'audit les a crawlées.

| Page | Dossier de captures | Planche |
|---|---|---|
| home (/novobel/legacy/) | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/home/planche.png` |
| novobel-item (/novobel/legacy/services/) | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/novobel-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-legacy-build/404/planche.png` |

Note planche : `scripts/planche.py` a lu `--colonnes 4` et `--largeur 480` comme des fichiers (« ignoré ») ; planches générées avec les valeurs par défaut (1920 px de large, 19 images chacune).

## Chiffres (report.json)

| Mesure | home | services | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (desktop) | 1 : label-content-name-mismatch, serious, `.slab__mark` | 1 : label-content-name-mismatch, serious, `.slab__mark` | 1 : color-contrast, serious, 2 nœuds (`.kyw-footer__note` et un span, #6b787d sur #fbfaf8, 4.36:1, seuil 4.5:1) |
| Violations axe (mobile) | 0 | 0 | 0 |
| CLS desktop / mobile | 0.001 / 0.03 | 0.001 / 0.059 | 0 / 0 |
| LCP desktop / mobile (ms) | 436 (img) / 876 (img) | 392 (h1) / 772 (h1) | 40 (p) / 236 (p) |
| Débordement horizontal | non (desktop et mobile) | non (desktop et mobile) | non (desktop et mobile) |
| Éléments hors zone | aucun (desktop et mobile) | aucun (desktop et mobile) | desktop : « la page d'accueil » 128x20 (cible < 24 px) ; mobile : même lien |
| Texte caché en mouvement réduit | 0 | 0 | 0 |
| Clavier (arrêts de focus) | 12 | 12 | 3 |
| Hover | 5+ cibles avec changement de couleur ; pas de changement pour certaines | idem | « la page d'accueil » et « Réalisé par » sans changement au survol |

Hauteur de page : home 5067 px desktop / 5997 px mobile ; services 4118 / 5240 ; 404 900 / 844.
Chargement : home 761 ms desktop / 1437 ms mobile ; services 736 / 1528 ; 404 28 / 412.

## Audit (`audit.mjs`)

Journal : `/home/user/KYW-test-restaurant/.logs/novobel-legacy-build-audit.log`
Résultat : **0 FAIL, 22 WARN** ; 5 pages crawlées (/, /services/, /projects/, /jobs/, /blog/), poids le plus lourd ~276 KB.

WARN :
- canonical absent sur les 5 pages (5 WARN)
- og:image absent sur les 5 pages (5 WARN)
- twitter:card absent sur les 5 pages (5 WARN)
- robots.txt absent (site)
- sitemap absent (site) : le log du build indique `sitemap-index.xml` créé dans `sites/novobel-legacy/dist` ; sa présence dans `dist/novobel/legacy/` n'a pas été vérifiée
- police TTF/OTF livrée sur les 5 pages (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`, format woff2 attendu)
