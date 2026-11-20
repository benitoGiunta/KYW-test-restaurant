# QA revue 2 — yayami / portfolio (faits)

Build : `pnpm build:site sites/yayami-portfolio` (exit 0, 7 pages). Serveur local : `dist/` sur 127.0.0.1:4501, arrêté après captures.
Journaux complets : `.logs/yayami-portfolio-revue2-*.log`.

## Captures et planches

| Page (URL) | Dossier de captures | Planche |
|---|---|---|
| `/yayami/portfolio/` (home) | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-revue2/home/planche.png` |
| `/yayami/portfolio/carte/` (dossier `yayami-item`) | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-revue2/yayami-item/` | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-revue2/yayami-item/planche.png` |
| page 404 | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-yayami-portfolio-revue2/404/planche.png` |

Chaque dossier contient `report.json`. Note : `scripts/planche.py` affiche « ignoré 4 / 480 » (il lit `--colonnes 4 --largeur 480` comme fichiers) ; les planches sont tout de même générées en 1920 px de large.

## Chiffres par page

| Mesure | home | carte (yayami-item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe « contrast needs review » | 13 | 4 | 0 |
| CLS bureau / mobile | 0,017 / 0,01 | 0,021 / 0 | 0 / 0 |
| LCP bureau / mobile (ms) | 76 / 1568 | 132 / 1908 | 44 / 216 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Clavier : stops / focus invisible / sans focus visible / lien d'évitement en premier / bloqué | 12 / 0 / 0 / non / non | 12 / 0 / 0 / non / non | 3 / 0 / 0 / non / non |
| Survol : cibles / réactions | 7 (couleur 1, déplacement 1, pixels 5) | 6 (déplacement 1, pixels 5) | 2 (aucune réaction mesurée) |
| Mouvement réduit : texte caché / animation | 0 / non | 0 / non | 0 / non |

Détails :
- 404, axe `color-contrast` : `.kyw-footer__note` et `span` (#6b787d sur #fbfaf8, 4,36:1, 4,5:1 requis).
- 404, cible trop petite : « la page d'accueil » 128×20.
- Home : navigation vers `/yayami/portfolio/carte/` vérifiée (titre « La carte | Yayami Sushi », défilement 0 après).
- Home, bureau : FPS défilement 60, pire trame 17 ms. Les mesures FPS bureau sont logicielles (GPU headless).

## Audit (`audit.mjs`, 6 pages crawlées)

- FAIL : 0
- WARN : 8
  - `/yayami/portfolio/` : phrase répétée 7×, « 12h à 14h, 18h à 22h »
  - `/yayami/portfolio/carte/` : idem, 7×
  - `/yayami/portfolio/boissons/` : idem, 7×
  - `/yayami/portfolio/maison/` : idem, 7×
  - `/yayami/portfolio/livraison/` : idem, 7×
  - `/yayami/portfolio/commander/` : idem, 14×
  - site : pas de robots.txt
  - site : pas de sitemap
- Poids de la page la plus lourde : ~1302 Ko (HTML 5, JS 62 gz, CSS 6 gz, polices 38, images 1191).

Aucun fichier source modifié, aucun commit.
