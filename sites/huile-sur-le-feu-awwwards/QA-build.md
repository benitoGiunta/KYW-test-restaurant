# QA build : huile-sur-le-feu-awwwards

Passe : build · Rôle : captures · Serveur local : `dist/` sur http://127.0.0.1:4502/huile-sur-le-feu/awwwards/ (arrêté après la passe).

Build : `scripts/build-site.mjs sites/huile-sur-le-feu-awwwards` : exit 0, 5 pages construites, sitemap-index généré dans `sites/huile-sur-le-feu-awwwards/dist`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/huile-sur-le-feu/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-build/home/planche.png` |
| carte (`/huile-sur-le-feu/awwwards/carte/`, item de navigation) | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-build/huile-sur-le-feu-item/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-build/huile-sur-le-feu-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-build/404/planche.png` |

Le dossier `.shots-…/` ne contient que 3 sous-dossiers : `shoot.mjs --crawl` a capturé 3 pages, alors que l'audit annonce 4 pages crawlées. Les 3 captures : `summary.json` dans le dossier racine des captures.

Chaque dossier contient `report.json` (lu par jq, valeurs ci-dessous).

## Chiffres par page (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 : `document-title`, `html-has-lang` |
| Contraste à vérifier (axe) | 7 | 4 | 0 |
| LCP desktop / mobile (ms) | 220 / 2416 | 168 / 1136 | 52 / 224 |
| CLS desktop / mobile | 0.001 / 0 | 0 / 0.009 | 0 / 0 |
| FPS scroll desktop / mobile (pire trame ms) | 60 (17) / 60 (17) | 60 (17) / 48 (67) | 60 (17) / 61 (17) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles < 24 px (desktop / mobile) | 0 / 2 | 0 / 2 | 0 / 0 |
| Cibles mobiles concernées | « Ouvrir le plan » 98x23 ; « Réserver en ligne » 123x23 | idem | aucune |
| Éléments de texte masqués (reduced motion) | 0 | 0 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 (focus quitte la page) |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Survol : cibles testées / sans changement | 7 / 0 | 7 / 0 | 0 / 0 |
| Mouvement au repos (idleMotion) | non | non | non |

Note : la page 404 n'a pas de `<title>` ni d'attribut `lang` sur `<html>`. La navigation n'a trouvé aucun lien cliquable sur la 404 (`--nav`).

## Audit (`audit.mjs`, 4 pages crawlées)

- FAIL : 0
- WARN : 6
  - `/huile-sur-le-feu/awwwards/` : phrase répétée 2 fois, « Photos : L’Huile sur le Feu. »
  - `/huile-sur-le-feu/awwwards/histoire/` : phrase répétée 2 fois, « Rue de Marchovelette 19, 5000 Namur »
  - `/huile-sur-le-feu/awwwards/histoire/` : phrase répétée 2 fois, « Photos : L’Huile sur le Feu. »
  - site : la page 404 n'a pas de `<h1>`
  - site : pas de `robots.txt`
  - site : pas de `sitemap` (malgré le `sitemap-index.xml` produit par le build)

Journaux : `/home/user/KYW-test-restaurant/.logs/huile-sur-le-feu-awwwards-build-build.log`, `…-shoot.log`, `…-audit.log`.
