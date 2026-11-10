# QA revue 1 — le-54 / legacy

Faits uniquement (captures, audit). Build : `scripts/q.sh le-54-legacy-revue1-build` exit 0, 7 pages.
Serveur local `dist/` port 4503, arrêté après usage.

## Captures par page

Dossiers de captures et planches (`planche.png`, générées par `scripts/planche.py`) :

| Page | Dossier | Planche |
|---|---|---|
| Accueil (`/le-54/legacy/`) | `/home/user/KYW-test-restaurant/.shots-le-54-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-54-legacy-revue1/home/planche.png` |
| Menus (`/le-54/legacy/lacarte`) | `/home/user/KYW-test-restaurant/.shots-le-54-legacy-revue1/le-54-item/` | `/home/user/KYW-test-restaurant/.shots-le-54-legacy-revue1/le-54-item/planche.png` |
| 404 (page absente, sonde) | `/home/user/KYW-test-restaurant/.shots-le-54-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-54-legacy-revue1/404/planche.png` |

Couverture : le `shoot.mjs --crawl --nav` a capturé 3 pages (accueil, menus, 404). L'audit a crawlé 6 pages
(`lacarte`, `a-propos`, `galerie`, `contact`, `reservations`, accueil) : `a-propos`, `galerie`, `contact`, `reservations`
n'ont pas de dossier de captures.

Planches : `planche.py` a traité `--colonnes 4` et `--largeur 480` comme des fichiers (message « ignoré 4 / ignoré 480 »),
donc les planches sont en largeur 1920 px, avec les images dans l'ordre glob. Les planches ont bien été écrites (14, 19 et 19 images).

## Chiffres des report.json

| Mesure | Accueil | Menus (lacarte) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 1 : `label-content-name-mismatch` (1 nœud) | 1 : `label-content-name-mismatch` (1 nœud) | 2 : `document-title`, `html-has-lang` (1 nœud chacune) |
| Contraste à vérifier (axe) | 0 | 0 | 0 |
| LCP desktop / mobile (ms) | 532 / 828 (élément : img) | 864 / 1276 (élément mobile : p.row__ou) | 36 / 244 |
| CLS desktop / mobile | 0.001 / 0.124 | 0.001 / 0.001 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < 24 px (desktop / mobile) | 8 / 8 | 8 / 8 | 0 / 0 |
| Éléments GL cachés (desktop) | 0 | 0 | 0 |
| Texte caché en mouvement réduit (reduced) | 0, pas de mouvement | 0, pas de mouvement | 0, pas de mouvement |
| FPS défilement desktop / mobile | 61 / 60 | 61 / 60 | 60 / 61 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 (sortie de la page) |
| Clavier : focus non visible / invisible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier | non | non | non |
| Survol : cibles / sans changement / couleur seule / couvertes | 7 / 1 / 6 / 0 | 7 / 2 / 5 / 0 | 0 / 0 / 0 / 0 |

Note du rapport : FPS desktop mesuré sur GPU logiciel headless (plancher, pas une mesure réelle).

Cibles tactiles < 24 px relevées (accueil, mobile) : liens « Voir sur la carte », téléphones, adresse e-mail, « Tous les horaires »,
Facebook, Instagram, Photos.

## Audit (`audit.mjs`, 6 pages crawlées)

Résultat : **0 FAIL, 18 WARN**. Journal : `/home/user/KYW-test-restaurant/.logs/le-54-legacy-revue1-audit.log`.

Répartition des WARN :
- `missing twitter:card` : 5 pages (lacarte, a-propos, galerie, contact, reservations)
- Phrase répétée 2 fois : `contact` (téléphones et e-mail), `reservations` (adresse)
- Page 404 sans `<h1>`
- Pas de `robots.txt`, pas de `sitemap`
- Police `.ttf` livrée (`ieVq2YZ…Ncs2Za4Q.ttf`) : 6 pages (utiliser woff2)

Taille : page la plus lourde `/le-54/legacy/galerie`, ~679 KB (images 566 KB, polices 103 KB).
