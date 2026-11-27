# QA revue 1 : oh-la-vache, variante portfolio (captures)

Build : `pnpm build:site` via build-site.mjs, OK. Serveur local port 4501, arrêté après captures. Faits seulement, sans analyse de design.

## Pages

| Page | Captures | Planche |
|---|---|---|
| home | /home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-revue1/home/ | /home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-revue1/home/planche.png |
| oh-la-vache-item | /home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-revue1/oh-la-vache-item/ | /home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-revue1/oh-la-vache-item/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-revue1/404/ | /home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-revue1/404/planche.png |

## Chiffres par page (report.json)

| Page | Erreurs console | Requêtes en échec | Axe violations (sérieuses) | Contraste à revoir | CLS bureau / mobile | LCP bureau / mobile (ms) | Débordement X bureau / mobile | Éléments hors écran (offenders) bureau | Texte caché (reduced) | Éléments clavier | Cibles hover |
|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 0 | 0 | 0 (0) | 29 | 0.011 / 0.004 | 104 / 1212 | false / false | 0 | 0 (moving false) | 12 | 8 |
| oh-la-vache-item | 0 | 0 | 0 (0) | 18 | 0.003 / 0.002 | 96 / 1228 | false / false | 0 | 0 (moving false) | 12 | 6 |
| 404 | 0 | 0 | 1 (1) | 0 | 0 / 0 | 40 / 228 | false / false | 0 | 0 (moving false) | 3 | 2 |

## Audit (scripts/audit.mjs)

Résultat : 0 FAIL, 7 WARN.

WARN  /oh-la-vache/portfolio/       sentence repeated 2x: "Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc"
WARN  /oh-la-vache/portfolio/carte/  sentence repeated 2x: "Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc"
WARN  /oh-la-vache/portfolio/histoire/  sentence repeated 2x: "Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc"
WARN  /oh-la-vache/portfolio/terrasse/  sentence repeated 2x: "Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc"
WARN  /oh-la-vache/portfolio/reservation/  sentence repeated 2x: "Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc"
WARN  site                          no robots.txt
WARN  site                          no sitemap

Journal complet : /home/user/KYW-test-restaurant/.logs/oh-la-vache-portfolio-revue1-audit.log
