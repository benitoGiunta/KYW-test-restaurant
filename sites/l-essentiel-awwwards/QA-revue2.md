# QA revue 2 : l-essentiel / awwwards

Build : `dist/l-essentiel/awwwards/` (exit 0, 5 pages). Serveur de test : port 4502 (voir note serveur ci-dessous). Aucune modification de source, aucun commit.

## Captures et planches

| Page | Dossier de captures | Planche | Fichiers (d-* et m-*) |
|---|---|---|---|
| Accueil `/l-essentiel/awwwards/` | `.shots-l-essentiel-awwwards-revue2/home/` | `.shots-l-essentiel-awwwards-revue2/home/planche.png` | 40 fichiers |
| Carte `/l-essentiel/awwwards/carte/` | `.shots-l-essentiel-awwwards-revue2/l-essentiel-item/` | `.shots-l-essentiel-awwwards-revue2/l-essentiel-item/planche.png` | 40 fichiers |
| 404 `/__shoot-missing-page-*` | `.shots-l-essentiel-awwwards-revue2/404/` | `.shots-l-essentiel-awwwards-revue2/404/planche.png` | 17 fichiers |

Note planche : `scripts/planche.py` ne lit pas `--colonnes` ni `--largeur` (ces valeurs sont prises pour des fichiers et ignorées). Les planches font 1920 px de large, sans réglage de colonnes.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| À vérifier contraste (axe) | 9 | 4 | 0 |
| LCP desktop / mobile (ms) | 132 / 1204 | 120 / 1092 | 64 / 232 |
| CLS desktop / mobile | 0 / 0,017 | 0,001 / 0,002 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 61 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de focus | 12 | 12 | 1 (sortie de page) |
| Clavier : focus invisible / bloqué / lien d'évitement en premier | 0 / non / non | 0 / non / non | 0 / non / non |
| Survol : cibles / sans changement / couleur seule | 7 / 0 / 1 | 7 / 0 / 2 | 0 / 0 / 0 |
| Mouvement réduit : texte caché / mouvement | 0 / non | 0 / non | 0 / non |
| Titre de page (desktop) | « L'Essentiel | Restaurant gastronomique, Temploux (Namur) » | « La carte | L'Essentiel » | vide |
| Titre H1 (desktop) | « L'Essentiel » | « La carte » | aucun |
| Mouvement au repos | oui | non | non |

Le rapport desktop du 404 a aussi relevé un titre vide.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 3
  - 404 : page sans `<h1>`
  - site : pas de `robots.txt`
  - site : pas de `sitemap`
- Pages crawlées : 4 ; poids de la page la plus lourde (accueil) : ~747 KB ; JS 61 KB gz ; CSS 6 KB gz ; polices 93 ; images 581.

## Journaux et incidents

- Build : `.logs/l-essentiel-awwwards-revue2-build.log`
- Captures : `.logs/l-essentiel-awwwards-revue2-shoot.log`
- Audit : `.logs/l-essentiel-awwwards-revue2-audit.log`

Note serveur : le lancement de `serve.mjs` sur le port 4502 a échoué (`EADDRINUSE`, journal `.logs/serve-awwwards.log`). Le PID noté (19273) s'est donc arrêté seul ; il n'y a rien à tuer de ma part. Les captures et l'audit ont été faits contre le processus déjà présent sur 4502 (PID 16282, cwd = ce dépôt, même dossier `dist`). Ce processus n'a pas été arrêté : il ne m'appartient pas.
