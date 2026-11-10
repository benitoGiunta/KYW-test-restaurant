# QA build : pepite / awwwards

Passe : build (rôle captures). Build `sites/pepite-awwwards` → `dist/pepite/awwwards/` : exit 0, 5 pages construites en 1,90 s.
Serveur local : `dist` sur port 4502, arrêté après les captures. Journaux dans `.logs/pepite-awwwards-build-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| `/pepite/awwwards/` (accueil) | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-build/home/planche.png` (1920×5280, 19 images) | desktop, mobile, hover, clavier, reduced-motion, transition, `report.json` |
| `/pepite/awwwards/carte/` (fiche `pepite-item`) | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-build/pepite-item/` | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-build/pepite-item/planche.png` (1920×5280, 19 images) | idem |
| Page 404 (URL inexistante, générée par le crawl) | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-build/404/planche.png` (1920×4224, 14 images) | idem, sans hover ni clavier |

Remarques sur le périmètre : `shoot.mjs --crawl --nav` a capturé 3 pages (accueil, carte, 404). L'audit a crawlé 4 pages, dont `/pepite/awwwards/reservation/`, qui n'a pas été capturée.
Remarque outil : `scripts/planche.py` lit `--colonnes` et `--largeur` mais garde leurs valeurs (`4`, `480`) comme fichiers ; cela produit des lignes « ignoré » sans effet sur les planches.

## Chiffres des report.json

| Mesure | Accueil | Carte (`pepite-item`) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`, sévérité serious) |
| axe contrastNeedsReview | 15 | 11 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop | 704 ms (`p.lead`) | 504 ms (`p.lead`) | 48 ms (`pre`) |
| LCP mobile | 2792 ms (`p.lead`) | 2248 ms (`p.lead`) | 244 ms (`pre`) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Hover : sans changement / couleur seule / recouvert | 0 / 0 / 0 | 0 / 0 / 0 | sans objet |
| Reduced motion : éléments en mouvement / texte caché | non / 0 | non / 0 | non / 0 |

## Audit (`audit.mjs`)

Résultat : 0 FAIL, 6 WARN. Poids de la page la plus lourde : `/pepite/awwwards/`, environ 629 KB (HTML 5, JS 60 gz, CSS 6 gz, polices 91, images 466).

WARN :
- `/pepite/awwwards/` : meta description de 178 caractères (cible 50 à 160).
- `/pepite/awwwards/` : phrase répétée 2 fois, « Samedi midi et privatisation sur demande. »
- `/pepite/awwwards/reservation/` : même phrase répétée 2 fois.
- Site : la page 404 n'a pas de `<h1>`.
- Site : pas de `robots.txt`.
- Site : pas de sitemap (l'audit ne le trouve pas, alors que le build a écrit `sitemap-index.xml` dans `sites/pepite-awwwards/dist`).

Journal de l'audit : `/home/user/KYW-test-restaurant/.logs/pepite-awwwards-build-audit.log`.
