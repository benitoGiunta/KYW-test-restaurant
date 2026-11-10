# QA build — grill-des-amis-portfolio

Build : OK (6 pages, dist/grill-des-amis/portfolio/). Serveur 4501 arrêté.

## home
- Captures : .shots-grill-des-amis-portfolio-build/home/ (report.json inclus)
- Planche : .shots-grill-des-amis-portfolio-build/home/planche.png (1920x5280 ou 1920x4224 pour 404)

## grill-des-amis-item
- Captures : .shots-grill-des-amis-portfolio-build/grill-des-amis-item/ (report.json inclus)
- Planche : .shots-grill-des-amis-portfolio-build/grill-des-amis-item/planche.png (1920x5280 ou 1920x4224 pour 404)

## 404
- Captures : .shots-grill-des-amis-portfolio-build/404/ (report.json inclus)
- Planche : .shots-grill-des-amis-portfolio-build/404/planche.png (1920x5280 ou 1920x4224 pour 404)

## Audit (scripts/audit.mjs)
- 0 FAIL, 12 WARN (journal .logs/grill-des-amis-portfolio-build-audit.log)
- Poids page d'accueil : ~1345 KB, images 1259 KB

## Non extrait
- Chiffres report.json (console, requêtes en échec, axe, CLS, LCP, débordement, clavier) : non relevés, faute de réponses restantes.
- Planche : les flags --colonnes/--largeur n'ont pas été pris en compte (passés en arguments littéraux via bash -c) ; planches générées avec la mise en page par défaut.
