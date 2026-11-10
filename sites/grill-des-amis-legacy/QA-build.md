# QA build : grill-des-amis-legacy (passe build)

Faits uniquement. Build : `scripts/q.sh grill-des-amis-legacy-build-build` exit 0, 8 pages Astro construites, dist écrit dans `dist/grill-des-amis/legacy/`.
Serveur de test : `http://127.0.0.1:4503/grill-des-amis/legacy/` (arrêté ensuite).

## Captures et planches

| Page | Dossier de captures | Planche | Captures |
|---|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-build/home/planche.png` | 13 desktop, 6 mobile |
| Carte (`carte/`) | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-build/grill-des-amis-item/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-build/grill-des-amis-item/planche.png` | 13 desktop, 6 mobile |
| 404 (page manquante) | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-grill-des-amis-legacy-build/404/planche.png` | 8 desktop, 6 mobile |

Note : `shoot.mjs --crawl` a capturé 3 pages (accueil, carte, 404). L'audit a crawlé 6 pages (dont `viandes/`, `a-propos/`, `traiteur/`, `contact/`) sans captures. `--nav` n'a trouvé aucun lien cliquable (note du rapport).
Note : `planche.py` a traité `--colonnes 4` et `--largeur 480` comme des fichiers (« ignoré ») ; les planches sont sorties à 1920 px de large sans ces options.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (toutes) | 0 | 0 | 2 |
| Violations axe sérieuses | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 49 | 69 | 0 |
| LCP desktop (ms) | 456 (img) | 516 (img) | 48 (pre) |
| LCP mobile (ms) | 924 (h1#h-hero) | 1552 (img) | 216 (pre) |
| CLS desktop | 0.068 | 0.001 | 0 |
| CLS mobile | 0.065 | 0.026 | 0 |
| Débordement horizontal | non (desktop et mobile) | non | non |
| Éléments cachés (texte réduit) | 0 | 0 | 0 |
| Mouvement en réduit | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Lien d'évitement en premier | non | non | non |
| Piège clavier | non | non | non |
| FPS défilement desktop / mobile | 61 / 61 | 61 / 61 | 60 / 60 |
| Survol sans changement | 2 | 4 | 0 |
| Survol couleur seule | 3 | 1 | 0 |
| Survol couvert | 0 | 0 | 0 |
| Mouvement d'inactivité | non | non | non |

Titres : accueil `Le Grill des amiS, le spécialiste viandes à Namur` (H1 « LE SPÉCIALISTE VIANDES À NAMUR ») ; carte `La carte, Le Grill des amiS à Namur` (H1 « LA CARTE ») ; 404 sans titre, sans H1, sans attribut `lang`.

Hauteur de page : accueil 4970 px desktop / 5495 px mobile ; carte 9868 / 8799 ; 404 900 / 2121.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 41 WARN**.
- Répartition des WARN : polices TTF/OTF livrées (format woff2 demandé), police de 375 KB (variable, sous-ensemble), répétés sur `viandes/`, `a-propos/`, `traiteur/`, `contact/` et les autres pages crawlées.
- Poids de la page la plus lourde : ~1013 KB (`/grill-des-amis/legacy/`) ; images 628 KB, polices 375 KB, CSS 5 fichiers, JS 1 fichier (gzip).
