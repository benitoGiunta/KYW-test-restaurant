# QA revue 2 : le-d-arville / portfolio (passe revue2, phase test)

Build : `scripts/q.sh le-d-arville-portfolio-revue2-build` : exit 0, 8 pages, sortie `dist/le-d-arville/portfolio/`.
Serveur de test : `http://127.0.0.1:4501/le-d-arville/portfolio/` (arrêté après les captures).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-d-arville/portfolio/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue2/home/planche.png` |
| Carte `/le-d-arville/portfolio/menu/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue2/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue2/le-d-arville-item/planche.png` |
| 404 (`__shoot-missing-page`) | pas de dossier : captures non enregistrées | aucune |

Limite constatée : `shoot.mjs --crawl` n'a produit que 2 dossiers de pages (accueil, carte) plus la 404 (affichée en sortie, sans dossier). L'audit en a crawlé 7. Les pages `/carte/`, `/menu/`, `/reservation/`, `/histoire/`, `/evenements/`, `/barabas/` ne sont pas capturées dans cette passe.
Planche : `planche.py` a traité les options `--colonnes 4 --largeur 480` comme des fichiers (lignes « ignoré »). Les planches sont produites à la largeur par défaut (1920 x 5280, 19 images chacune).

## Chiffres (report.json)

| Indicateur | Accueil | Carte |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 0 (22 « needs review » contraste) | 0 (3 « needs review » contraste) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 104 (img) | 68 (p) |
| LCP mobile, throttlé (ms) | 1368 (p.hero__accroche) | 1184 (p) |
| Débordement horizontal bureau / mobile | non / non | non / non |
| Éléments cachés, cibles < 44 px | 0 / 0 | 0 / 0 |
| Focus clavier sans indicateur visible / focus invisible / piégé | 0 / 0 / non | 0 / 0 / non |
| Survol sans réaction | 0 sur 7 cibles | 0 sur 7 cibles |
| Mouvement réduit | non | non |
| FPS défilement (bureau / mobile) | 60 / 60 | 60 / 60 |
| Réglage du hero (ms) | 4034 | 3674 |

Page 404 (sortie de capture seulement) : axe color-contrast x2 (1 violation sérieuse), 1 cible tactile < 44 px, 2 zones sans changement au survol, LCP mobile 216 ms, 0 erreur console.

Notes des rapports : le FPS bureau tourne sur GPU logiciel (plancher, pas une mesure réelle) ; les chiffres mobiles sont ceux qui comptent (4x CPU, 4G lente).

## Audit (audit.mjs)

- FAIL : 0.
- WARN : 5 (`/le-d-arville/portfolio/` : phrase répétée 2x « du jeudi au samedi, 19:00 à 21:30 » et « du vendredi au dimanche, 12:00 à 14:30 » ; `/le-d-arville/portfolio/reservation/` : phrase répétée 2x « 12:00 à 14:30, 19:00 à 21:30 » ; site : pas de robots.txt ; site : pas de sitemap).
- Page la plus lourde : `/le-d-arville/portfolio/`, environ 1384 Ko (images 1257 Ko, polices 109 Ko).

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Les dossiers `.shots-*` et `.logs/` sont locaux.
