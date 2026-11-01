# QA revue 1 : chez-guillaume-legacy (rôle captures)

Passe : revue1 · Variante : legacy · Date : 2026-11-01 · Serveur de test : `dist/` servi sur `http://127.0.0.1:4503/chez-guillaume/legacy/` (arrêté après les captures).

## Étapes exécutées

| Étape | Commande | Résultat |
|---|---|---|
| Build | `node scripts/build-site.mjs sites/chez-guillaume-legacy` | exit 0, 7 pages construites, sortie dans `dist/chez-guillaume/legacy/` · journal `/home/user/KYW-test-restaurant/.logs/chez-guillaume-legacy-revue1-build.log` |
| Serveur | `serve.mjs dist --port 4503` | répond 200 ; arrêté après usage |
| Captures | `shoot.mjs … --crawl --nav` | exit 0 ; 3 dossiers de pages · journal `/home/user/KYW-test-restaurant/.logs/chez-guillaume-legacy-revue1-shoot.log` |
| Audit | `audit.mjs` | exit 0 ; 6 pages explorées · journal `/home/user/KYW-test-restaurant/.logs/chez-guillaume-legacy-revue1-audit.log` |
| Planches | `planche.py` (4 colonnes, 480 px) | 3 planches, voir ci-dessous |

Racine des captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/` (avec `summary.json`).

## Pages capturées

| Page (dossier) | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| home | `/chez-guillaume/legacy/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/home/planche.png` (19 vignettes) |
| chez-guillaume-item | `/chez-guillaume/legacy/agenda/` (le libellé du dossier ne correspond pas à l'URL) | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/chez-guillaume-item/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/chez-guillaume-item/planche.png` (19 vignettes) |
| 404 | URL inexistante `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-legacy-revue1/404/planche.png` (14 vignettes) |

Les planches ont été faites avec une copie corrigée de `planche.py` (voir « Anomalies ») ; elles font 1920 px de large, soit 4 colonnes de 480 px.

## Chiffres par page (`report.json`)

| Mesure | home | chez-guillaume-item (/agenda/) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (bureau / mobile) | non / non | non / non | non / non |
| Éléments hors écran ou cachés (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`, sur `html`) |
| Axe « contrast needs review » | 94 | 114 | 0 |
| LCP bureau (ms, élément) | 436 (img) | 404 (p.lead) | 32 (pre) |
| LCP mobile (ms, élément) | 1056 (img) | 760 (p.lead) | 236 (pre) |
| CLS bureau / mobile | 0.001 / 0 | 0 / 0 | 0 / 0 |
| Hauteur de page bureau / mobile (px) | 6617 / 7201 | 4019 / 5252 | 900 / 2121 |
| FPS défilement bureau / mobile | 61 / 60 | 61 / 61 | 61 / 60 |
| Mouvement au repos (idle) | non | non | non |
| Mouvement réduit (reduced) | non, 2 textes cachés | non, 2 textes cachés | non, 0 texte caché |
| Lien d'évitement en premier | non | non | non |
| Focus clavier : arrêts / focus invisible / focus absent | 12 / 0 / 0 | 11 / 0 / 0 | 1 / 0 / 0 |
| Clavier bloqué (stuck) | non | **oui** | non |
| Survol : cibles / sans changement / changement de couleur seul / recouvertes | 7 / 1 / 2 / 0 | 7 / 2 / 1 / 0 | 0 / 0 / 0 / 0 |
| Curseur suiveur | non | non | non |
| Notes propres à la page | aucune | aucune | « --nav : aucun lien vers une autre page cliqué (aucun trouvé) » |

Notes :
- Clavier, page chez-guillaume-item : la séquence de tabulation reste bloquée (stuck) ; les 3 derniers arrêts sont des liens « Réserver » répétés.
- Clavier, page 404 : le focus quitte la page dès le premier arrêt (« body: focus left the page »).
- Page 404 : le rapport mesure une URL inexistante servie par `serve.mjs`. Le fichier `dist/chez-guillaume/legacy/404.html` contient bien `<title>` (« Page introuvable | Chez Guillaume ») et `lang="fr"`, et un seul `<h1>`. Les violations axe et le « 404 page has no <h1> » de l'audit décrivent donc le corps renvoyé par le serveur de test pour une URL inconnue, pas forcément `404.html`. Cause non vérifiée.
- FPS bureau : rendu headless sur GPU logiciel, à traiter comme un plancher (voir `notes` du rapport).

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 12 WARN**. Pages explorées : 6. Poids de la page la plus lourde : `/chez-guillaume/legacy/`, environ 407 KB.

Lignes WARN :
1. `/chez-guillaume/legacy/` : `twitter:card` absent
2. `/chez-guillaume/legacy/agenda/` : `twitter:card` absent
3. `/chez-guillaume/legacy/restaurant/` : `twitter:card` absent
4. `/chez-guillaume/legacy/restaurant/` : phrase répétée 2 fois « 2 services 29 €, 3 services 39 € »
5. `/chez-guillaume/legacy/restaurant/` : phrase répétée 2 fois « Dessert Riz au lait, compotée de coing, prune en pickles »
6. `/chez-guillaume/legacy/privatisation/` : `twitter:card` absent
7. `/chez-guillaume/legacy/bon-cadeau/` : `twitter:card` absent
8. `/chez-guillaume/legacy/bon-cadeau/` : niveaux de titres sautés, h1 vers h3
9. `/chez-guillaume/legacy/faq/` : `twitter:card` absent
10. site : la page 404 n'a pas de `<h1>`
11. site : pas de `robots.txt`
12. site : pas de `sitemap`

## Anomalies d'outils (à consigner dans les leçons)

- `scripts/planche.py` lit `--colonnes 4` et `--largeur 480` comme des images : il affiche « ignoré 4 » et « ignoré 480 » et ignore les options. Contournement sans modifier le script : copie corrigée dans `/home/user/KYW-test-restaurant/.logs/planche_fixed.py` (options sautées dans la liste des images).
- Le serveur de test arrêté était celui du port 4503 (PID 29067 et processus fils). Le serveur du port 4502 (PID 30915, autre agent) n'a pas été touché.
- Pas de modification de fichier source, pas de commit.
