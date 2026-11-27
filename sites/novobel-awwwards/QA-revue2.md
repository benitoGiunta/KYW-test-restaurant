# QA revue 2 — novobel / awwwards (captures, faits)

Build : `pnpm build:site` via `scripts/build-site.mjs sites/novobel-awwwards` (exit 0, 5 pages, `dist/novobel/awwwards/`).
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4502`, arrêté après la passe.
Base URL : `http://127.0.0.1:4502/novobel/awwwards/`.

## Captures et planches

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/home/planche.png` | 39 |
| Projets (`/projets/`) | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/novobel-item/planche.png` | 39 |
| 404 | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/404/planche.png` | 27 |

Index des captures : `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue2/summary.json`.
Planches générées en 4 colonnes × 480 px (1920 px de large).

## Chiffres par page (report.json)

| Mesure | Accueil | Projets | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieux) | 0 | 0 | 1 (`color-contrast` x2) |
| CLS desktop | 0 | 0.001 | 0 |
| CLS mobile | 0 | 0.003 | 0 |
| LCP desktop (ms) | 72 (`img`) | 64 (`p.entete__chapo`) | 44 (`p`) |
| LCP mobile (ms) | 1128 (`img`) | 1988 (`img`) | 240 (`p`) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (GL) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 | 0 | 1 : « la page d'accueil » 128x20 (desktop et mobile) |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Chargement (load) desktop / mobile (ms) | 121 / 1948 | — | — |
| Stabilisation écran desktop / mobile (ms) | 2538 / 4162 | — | — |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : blocage du focus | non | non | non |
| Survol sans changement | 0 | 0 | 2 (h-01 « la page d'accueil », h-02 « Réalisé par ») |

Contraste 404 : `.kyw-footer__note` et `span` en `#6b787d` sur `#fbfaf8`, 4.36:1 (seuil 4.5:1).

Page Projets, parcours clavier (12 arrêts relevés) : « Aller au contenu », « NOVOBEL », « Projets », « À propos », « Nous contacter », « Parlez-nous de votre projet », « Ouvrir le plan », téléphone, e-mail, Facebook, « Projets », « À propos ».

Notes du rapport : le FPS desktop tourne en rendu logiciel headless (plancher, pas une mesure matérielle) ; le mobile est à 4x de ralentissement CPU et slow 4G ; les chiffres mobile font référence.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 2 (`site` : pas de `robots.txt`, pas de `sitemap`)
- Pages explorées : 4 (`/`, `/projets/`, `/a-propos/`, page 404). Poids le plus lourd : `/a-propos/`, ~442 KB (HTML 4, JS 60 gz, CSS 6 gz, polices 48, images 324).

## Écarts entre passes de capture et audit

- Le shoot a capturé 3 pages (accueil, projets, 404). La page `/a-propos/`, explorée par l'audit, n'a pas de dossier de captures.
- `planche.py` lit `--colonnes 4 --largeur 480` correctement, mais traite les valeurs `4` et `480` comme images ignorées (messages « ignoré » dans le journal). Sans effet sur la planche.
- Première tentative de serveur arrêtée à la fin du shell : relancé en `setsid nohup`.
