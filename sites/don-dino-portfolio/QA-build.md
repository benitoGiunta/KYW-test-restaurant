# QA build : don-dino / portfolio

Passe build, phase test. Faits seulement, extraits des report.json et de l'audit. Aucun fichier source modifié.

## Build

- `scripts/q.sh don-dino-portfolio-build-build` : exit 0, 6 pages, sortie `dist/don-dino/portfolio/`.

## Captures et planches

Serveur local : `dist/` sur http://127.0.0.1:4501/ (arrêté après usage).
Captures : `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/` (résumé : `summary.json`, tous les `shootFailed` à null).

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /don-dino/portfolio/ | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/home/planche.png` |
| Carte (dossier `don-dino-item`) | /don-dino/portfolio/carte/ | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/don-dino-item/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/don-dino-item/planche.png` |
| 404 | URL inexistante | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-build/404/planche.png` |

Note : `planche.py` a reçu `--colonnes 4 --largeur 480` comme fichiers (ignorés, avertissements dans le journal) ; les planches ont été produites en 1920 x 5280 px, 19 images chacune.
Note : `--crawl` n'a capturé que 3 pages (accueil, carte, 404), et non les pages histoire, terrasse, réservation. L'audit a parcouru 5 pages.

## Chiffres par page

Source : `report.json` de chaque dossier. Les FPS desktop tournent en headless sur GPU logiciel.

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 (color-contrast, serious, 22 nœuds) | 1 (color-contrast, serious, 22 nœuds) | 1 (color-contrast, serious, 2 nœuds) |
| CLS desktop / mobile | 0,007 / 0,006 | 0,011 / 0,003 | 0 / 0 |
| LCP desktop (ms) / élément | 80 / p.hero__slogan | 84 / p.lead | 68 / p |
| LCP mobile (ms) / élément | 2848 / img | 1180 / p.lead | 248 / p |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Texte caché (WebGL/motion) desktop | 0 | 0 | 0 |
| Hauteur de page desktop / mobile (px) | 8033 / 7820 | 8627 / 13824 | 900 / 844 |
| FPS scroll desktop (pire trame ms) | 58 (33) | 60 (17) | 60 (17) |
| FPS scroll mobile (pire trame ms) | 60 (17) | 60 (17) | 60 (17) |
| Chargement desktop / mobile (ms) | 153 / 3301 | 98 / 2326 | 44 / 414 |
| Clavier : sans focus visible / focus invisible / piège | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier | non | non | non |
| Mouvement en réduit (texte caché / en mouvement) | 0 / non | 0 / non | 0 / non |

Détail color-contrast (accueil et carte) : `address`, `a[href="tel:…"]`, `.muted`, `.footer__titre` (#efe8da ou #d9e3e2 sur #1d7a3f, 4,1 à 4,4:1 pour 4,5:1 requis). 404 : `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1).

Titre desktop : accueil « Don Dino | Bistronomie à Naninne (Namur) » ; carte « La carte | Don Dino » ; 404 « Page introuvable · KYW ».

## Audit (audit.mjs sur http://127.0.0.1:4501/don-dino/portfolio/)

- Résultat : **0 FAIL, 17 WARN**. 5 pages parcourues.
- Pages : accueil, carte, histoire, terrasse, réservation.
- WARN « sentence repeated » : 15 lignes, sur les 5 pages, pour les phrases « 12:00 à 14:30, 18:00 à 22:30 » (répétée 4 à 10 fois) et « 12:00 à 14:30, 18:00 à 23:30 » (2 à 4 fois), plus « Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc » (2 fois).
- WARN site : pas de `robots.txt`, pas de `sitemap`.
- Poids de la page la plus lourde : accueil, environ 656 Ko (HTML 7, JS 21 gz, CSS 7 gz, polices 69, images 552).
