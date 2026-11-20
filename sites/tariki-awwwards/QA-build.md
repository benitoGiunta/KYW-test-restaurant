# QA build — tariki / awwwards (passe build, phase test)

Build : `scripts/build-site.mjs sites/tariki-awwwards` : exit 0, 5 pages construites, dist/tariki/awwwards/.
Serveur local : `serve.mjs dist --port 4502`, arrêté après les captures.
Journaux : `.logs/tariki-awwwards-build-*.log`.

## Pages captées et planches

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| home | http://127.0.0.1:4502/tariki/awwwards/ | /home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/home/ | /home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/home/planche.png (1920x5280, 19 images) |
| tariki-item | http://127.0.0.1:4502/tariki/awwwards/carte/ | /home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/tariki-item/ | /home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/tariki-item/planche.png (1920x5280, 19 images) |
| 404 | http://127.0.0.1:4502/__shoot-missing-page-1795130722752 | /home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/404/ | /home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/404/planche.png (1920x5280, 19 images) |

Captures : home 13 desktop (d-) et 6 mobile (m-) ; tariki-item 41 fichiers au total. Le fichier de synthèse est
/home/user/KYW-test-restaurant/.shots-tariki-awwwards-build/summary.json.

Note : la capture ne couvre pas /tariki/awwwards/reservation/, que l'audit a crawlé ; aucun dossier de captures n'existe pour cette page.
Note : planche.py affiche « ignoré 4 » et « ignoré 480 » ; ce sont les valeurs de --colonnes et --largeur, les planches sont bien en 4 colonnes de 480 px.

## Chiffres par page (report.json)

| Indicateur | home | tariki-item (/carte/) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, à vérifier contraste : 16) | 0 (serious 0, à vérifier contraste : 8) | 1 règle color-contrast, serious, 2 nœuds (#6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1 : .kyw-footer__note et span) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 136 (p.hero__arabe) | 144 | 40 |
| LCP mobile (ms, throttlé) | 2044 (p.hero__arabe) | 1936 | 228 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Éléments GL masqués | 0 | 0 | 0 |
| FPS défilement desktop / mobile | 60 / 58 (pire trame mobile 50 ms) | 60 / 60 (pire trame 17 ms) | 60 / 61 |
| Clavier : focus invisible / sans focus visible | 0 / 0 ; bloqué : non | 0 / 0 ; bloqué : non | 0 / 0 ; focus quitte la page après 2 arrêts ; bloqué : non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 sur 7 cibles | 0 sur 7 cibles | n. d. |
| Texte caché / mouvement en réduit | 0 / non | 0 / non | 0 / non |

Les deux pages principales ne contiennent pas d'élément dans la liste des zones de hors cadre ni d'élément GL caché.
Le lien d'évitement « Aller au contenu » est présent dans les arrêts clavier de home et tariki-item, mais n'est pas le premier arrêt (« skipLinkFirst » vaut false).

## Audit (audit.mjs, 4 pages crawlées)

- FAIL : 0
- WARN : 4
  - /tariki/awwwards/ : phrase répétée 4 fois « 11 h 30 à 14 h »
  - /tariki/awwwards/reservation/ : phrase répétée 4 fois « 11 h 30 à 14 h »
  - site : pas de robots.txt
  - site : pas de sitemap

Poids de la page la plus lourde (/tariki/awwwards/) : environ 267 Ko ; 4 pages HTML, 61 JS (gz), 7 CSS (gz), 76 polices, 119 images.
