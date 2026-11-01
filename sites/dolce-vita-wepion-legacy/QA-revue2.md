# QA revue 2 : dolce-vita-wepion-legacy (captures)

Build : `scripts/q.sh dolce-vita-wepion-legacy-revue2-build` : exit 0, `dist/dolce-vita-wepion/legacy/`.
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4503`, arrêté après les captures.
Journaux : `.logs/dolce-vita-wepion-legacy-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/dolce-vita-wepion/legacy/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue2/home/planche.png` |
| Carte `/dolce-vita-wepion/legacy/carte/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue2/dolce-vita-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue2/dolce-vita-wepion-item/planche.png` |
| Page inexistante (sonde 404) | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-revue2/404/planche.png` |

Le crawl (audit) a trouvé 4 pages : accueil, carte, `la-dolce-vita/`, `infos/`. Le shoot n'en a capturé que 3 (accueil, carte, sonde 404) : `la-dolce-vita/` et `infos/` n'ont pas de dossier de captures.
Chaque dossier de page contient 35 captures desktop/mobile et les `report.json`.

## Chiffres (report.json)

| Mesure | Accueil | Carte | Sonde 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (graves) | 0 (0 graves, 23 contrast à vérifier) | 0 (0 graves, 6 contrast à vérifier) | 2 graves : `document-title`, `html-has-lang` |
| LCP desktop / mobile (ms) | 448 / 1024 | 428 / 896 | 56 / 256 |
| CLS desktop / mobile | 0.001 / 0.001 | 0.002 / 0.001 | 0 / 0 |
| Débordement horizontal | non | non | non |
| Éléments hors champ / cibles petites / éléments GL cachés (desktop) | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| Clavier : arrêts de focus / focus invisible / focus perdu | 12 / 0 / non | 12 / 0 / non | 1 / 0 / oui (« focus left the page ») |
| Lien d'évitement en premier | non | non | non |
| FPS scroll desktop / mobile (headless) | 61 / 61 | 60 / 61 |  61 / 60 |
| Chargement load desktop / mobile (ms) | 751 / 1746 | 659 / 1665 | 40 / 240 |
| Mouvement en mode réduit | non | non | non |

Notes : la sonde 404 n'a pas trouvé de lien de navigation (`--nav`). Les violations de la sonde 404 viennent de la réponse du serveur de prévisualisation pour une URL inconnue (pas de `<title>` ni de `lang`) ; elles ne concernent pas une page du site.
Les FPS desktop tournent en rendu logiciel : ce sont des planchers, pas une mesure matérielle.

## Audit (`audit.mjs` sur `http://127.0.0.1:4503/dolce-vita-wepion/legacy/`)

- Résultat : **0 FAIL, 29 WARN**.
- Les 29 WARN sont tous `ttf/otf font shipped` (accueil, carte, la-dolce-vita, infos) : polices livrées en TTF/OTF au lieu de WOFF2.
- Poids de la page la plus lourde : `la-dolce-vita/` (~1449 Ko ; images 1145 Ko, polices 291 Ko).
