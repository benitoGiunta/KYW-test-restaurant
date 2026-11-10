# QA build : le-felicien-legacy

Passe : build · Rôle : captures · Serveur : `dist/` sur http://127.0.0.1:4503/le-felicien/legacy/ (arrêté après usage)

Build : `scripts/build-site.mjs sites/le-felicien-legacy` exit 0, 5 pages construites (404, contact, index, la-carte, suggestions-de-la-semaine).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-felicien/legacy/`) | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-build/home/planche.png` |
| La carte (`/la-carte/`) | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-build/le-felicien-item/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-build/le-felicien-item/planche.png` |
| 404 (page inexistante) | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-build/404/planche.png` |

Le crawl a visité 4 pages (l'audit compte `contact/` en plus) ; `shoot.mjs --crawl` n'a capturé que les 3 pages ci-dessus. Pages `contact/` et `suggestions-de-la-semaine/` non capturées.

## Chiffres par page

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 2 / 2 (`document-title`, `html-has-lang`) |
| Contrast à vérifier (axe) | 4 | 0 | 0 |
| LCP desktop / mobile (ms) | 508 / 884 | 536 / 716 | 40 / 232 |
| CLS desktop / mobile | 0.001 / 0.036 | 0.001 / 0.011 | 0 / 0 |
| FPS scroll mobile (pire trame ms) | 61 | 60 | 60 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Clavier : focus invisible | 4 (« La carte », « Suggestions de la semaine », « Contact et réservation », « Réserver une table ») | 0 | 0 |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus bloqué | non | non | non |
| Lien d'évitement en premier | non | non | non |

Notes : le FPS desktop est mesuré en headless sur GPU logiciel (plancher, non significatif). Le LCP mobile de l'accueil est sur `h1#h-hero`, celui de la carte sur `p.lead`.

## Audit (`audit.mjs`, 4 pages crawlées)

- FAIL : 0
- WARN : 29
- Exemples de WARN : fontes lourdes non sous-ensemblées (`contact/`, 376 KB) ; le détail complet se lit avec `grep "^WARN" /home/user/KYW-test-restaurant/.logs/le-felicien-legacy-build-audit.log`.
- Log complet : `/home/user/KYW-test-restaurant/.logs/le-felicien-legacy-build-audit.log`

## Anomalies de l'outillage (faits)

- `scripts/planche.py` n'accepte pas `--colonnes` ni `--largeur` : ces options sont lues comme des fichiers (« ignoré 4 », « ignoré 480 »). Les planches ont été produites avec les largeurs par défaut, 1920 px de large (accueil et carte : 19 images, 1920×5280 ; 404 : 14 images, 1920×4224).
- Le log de capture `.logs/le-felicien-legacy-build-shoot.log` affiche la progression au fil de l'eau ; la passe complète a pris plus de 2 minutes.

Aucun fichier source modifié. Aucun commit.
