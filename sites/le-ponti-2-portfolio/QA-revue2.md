# QA revue 2 : le-ponti-2 / portfolio

Build : `sites/le-ponti-2-portfolio` → `dist/le-ponti-2/portfolio/` (exit 0). Serveur local 127.0.0.1:4501 (arrêté après usage).
Journaux complets : `.logs/le-ponti-2-portfolio-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-ponti-2/portfolio/` | `.shots-le-ponti-2-portfolio-revue2/home/` (13 d-*.png, 6 m-*.png) | `.shots-le-ponti-2-portfolio-revue2/home/planche.png` |
| Carte `/le-ponti-2/portfolio/carte/` (dossier nommé `le-ponti-2-item`) | `.shots-le-ponti-2-portfolio-revue2/le-ponti-2-item/` (13 d, 6 m) | `.shots-le-ponti-2-portfolio-revue2/le-ponti-2-item/planche.png` |
| 404 (URL de test absente) | `.shots-le-ponti-2-portfolio-revue2/404/` (8 d, 6 m) | `.shots-le-ponti-2-portfolio-revue2/404/planche.png` |

Note : `planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (avertissements « ignoré 4 », « ignoré 480 ») ; les planches ont été produites malgré tout (1920 px de large, 14 à 19 vignettes).
Le crawl de l'audit compte 5 pages ; la capture n'a produit que 3 dossiers (voir ci-dessous).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (26 contrastes à vérifier) | 0 (16 contrastes à vérifier) | 2 (`document-title`, `html-has-lang`, sérieuses) |
| LCP desktop | 132 ms (`p.hero__slogan`) | 132 ms (`h1`) | 40 ms |
| LCP mobile | 1980 ms (`img`) | 1168 ms (`p.lead`) | 228 ms |
| CLS desktop | 0.007 | 0.004 | 0 |
| CLS mobile | 0.006 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué (stuck) | non | non | non |
| Arrêts clavier | 12 | 12 | 1 |
| H1 desktop / mobile | « À table, en famille » | « La carte » | aucun |

Le lien d'évitement (skip link) n'est pas le premier arrêt clavier sur les trois pages.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 13 WARN**.
- WARN répétés sur `/carte/`, `/histoire/`, `/terrasse/`, `/reservation/` : phrases répétées (« Horaires du jour Midi et soir… » 2 fois ; « 11:30 à 14:30, 18:00 à 21:30 » 2 à 12 fois selon la page).
- WARN site : la page 404 n'a pas de `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.
- Poids de la page la plus lourde : ~667 KB (images 564 KB, polices 69 KB, JS 20 KB gz, CSS 7 KB gz).

## Points non couverts

- Hover, mouvement réduit et capture en `reduced motion` : présents dans le report, non extraits ici.
- Les 2 pages de l'audit sans dossier de capture ne sont pas capturées ; seules 3 pages ont été shootées.
