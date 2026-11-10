# QA revue 2 — pepite / portfolio (captures)

Build : `scripts/build-site.mjs sites/pepite-portfolio` → `dist/pepite/portfolio/` (exit 0, 7 pages, sitemap-index.xml créé).
Serveur : `serve.mjs dist --port 4501`, arrêté après usage.
Captures : `shoot.mjs http://127.0.0.1:4501/pepite/portfolio/ --crawl --nav` (résumé : 3 types de page partagés, voir ci-dessous).
Audit : `audit.mjs` sur la même URL (6 pages explorées).

## Dossiers de captures et planches

| Type de page | Exemple | Dossier de captures | Planche |
|---|---|---|---|
| home | /pepite/portfolio/ | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue2/home/planche.png` |
| pepite-item | /pepite/portfolio/carte/ | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue2/pepite-item/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue2/pepite-item/planche.png` |
| 404 | /__shoot-missing-page-… | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-pepite-portfolio-revue2/404/planche.png` |

Rapports détaillés : `report.json` dans chaque dossier. Journaux : `.logs/pepite-portfolio-revue2-*.log`.
Les autres pages du site (carte, histoire, réservation, soirées, vins) n'ont pas de dossier de captures propre : le crawl les regroupe par type de page. Elles sont couvertes par l'audit.

## Chiffres (shoot, report.json)

| Mesure | home | pepite-item (carte) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contrastes à vérifier (axe) | 17 | 9 | 0 |
| LCP desktop (ms) | 176 | 112 | 36 |
| LCP mobile (ms, throttled) | 1240 | 1828 (élément `p.lead`) | 252 |
| CLS desktop | 0 | 0 | 0 |
| CLS mobile | 0.001 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (texte, reduced-motion) | 0 | 0 | 0 |
| Mouvement en reduced-motion | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| FPS scroll desktop (headless) | 59 | 59 | 60 |
| FPS scroll mobile | 60 | 60 | 60 |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Focus bloqué | non | non | (focus quitte la page) |
| Survol sans changement | 0 | 0 | 0 |
| Survol changement de couleur seul | 0 | 0 | 0 |
| Survol couvert | 0 | 0 | 0 |
| Curseur personnalisé | oui | oui | non |
| Animation au repos | non | non | non |

Notes :
- Le 404 n'a ni `<title>` ni `lang`, et aucun `<h1>` (cf. audit).
- Le 404 n'a aucun lien de navigation testable (`--nav` : « no link to another page could be clicked »).
- Les FPS desktop sont ceux d'un rendu logiciel headless : plancher, pas mesure matérielle.

## Audit (audit.mjs) : 0 FAIL, 8 WARN

- WARN `/pepite/portfolio/` : phrase répétée 2× « Le menu se déguste tel quel ou à l'assiette. »
- WARN `/pepite/portfolio/` : phrase répétée 3× « Boutique dès 16h, cave à manger dès 19h »
- WARN `/pepite/portfolio/` : phrase répétée 2× « Boutique dès 10h30, cave à manger dès 19h ; samedi midi sur demande »
- WARN `/pepite/portfolio/reservation/` : phrase répétée 3× « Boutique dès 16h, cave à manger dès 19h »
- WARN `/pepite/portfolio/reservation/` : phrase répétée 2× « Boutique dès 10h30, cave à manger dès 19h ; samedi midi sur demande »
- WARN site : page 404 sans `<h1>`
- WARN site : pas de `robots.txt`
- WARN site : pas de sitemap (l'audit ne voit pas le `sitemap-index.xml` produit au build)

Poids : page la plus lourde `/pepite/portfolio/` ≈ 697 KB ; 640 images, 38 polices, 8 scripts JS (gz), 6 CSS (gz).

## Problèmes observés (faits)

- Page 404 : `<title>` absent, `lang` absent sur `<html>` (2 violations axe serious), pas de `<h1>`.
- Page carte : LCP mobile 1828 ms, élément `p.lead` ; home : LCP mobile 1240 ms, élément `img`.
- Home : 17 contrastes à vérifier (axe « needs review »).

## Non effectué

- Aucun fichier source modifié, aucun commit.
- Pas d'analyse de design.
