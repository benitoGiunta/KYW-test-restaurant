# QA build : wok-de-jin, portfolio (passe build, phase test)

Source : `dist/wok-de-jin/portfolio/` (build `scripts/build-site.mjs`, exit 0, 7 pages).
Serveur local : `http://127.0.0.1:4501/wok-de-jin/portfolio/` (arrêté après les captures).
Journaux : `.logs/wok-de-jin-portfolio-build-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/wok-de-jin/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-build/home/planche.png` |
| Page 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-build/404/planche.png` |
| Buffet et tarifs (`/tarifs/`) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-build/wok-de-jin-item/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-build/wok-de-jin-item/planche.png` |

Chaque planche : 19 images (d-* et m-*), 1920 px de large, 5280 px de haut. La commande a affiché
`ignoré 4` et `ignoré 480` : les options `--colonnes` et `--largeur` n'ont pas été lues comme options.
La largeur obtenue (4 × 480 = 1920) correspond toutefois au réglage demandé.

Note : `shoot.mjs --crawl --nav` a fait 3 dossiers de captures ; `audit.mjs` a crawlé 6 pages (accueil, tarifs,
maison, réveillon, emporter, réservation). Les pages `maison`, `réveillon`, `emporter` et `réservation` n'ont pas
de dossier de captures.

## Chiffres (report.json)

| Indicateur | Accueil | 404 | Tarifs |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 1 (color-contrast) | 0 |
| Violations axe graves | 0 | 1 | 0 |
| Contraste à vérifier (needs review) | 25 | 0 | 17 |
| LCP desktop (ms) | 104 | 44 | 76 |
| CLS desktop | 0.036 | 0 | 0.009 |
| LCP mobile (ms, throttle) | 1116 | 220 | 1116 |
| CLS mobile | 0.008 | 0 | 0 |
| FPS scroll desktop (pire image, ms) | 59 (50) | 60 (17) | 60 (17) |
| FPS scroll mobile (pire image, ms) | 60 (17) | 60 (17) | 60 (17) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 1 / 1 | 0 / 0 |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Focus bloqué | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 / 7 cibles | 2 / 2 cibles | 0 / 7 cibles |
| Texte caché sous mouvement réduit | 0 | 0 | 0 |
| Mouvement persistant (réduit) | non | non | non |

Détail des points relevés :
- 404 : violation axe `color-contrast` sur `.kyw-footer__note` et sur un `span` (`#6b787d` sur `#fbfaf8`, 4,36:1,
  seuil 4,5:1). Cible petite : lien « la page d'accueil » (128 × 20 px). Survol : aucun changement sur les 2 cibles.
- Accueil : 7 cibles de survol, toutes réagissent. Mobile : LCP 1116 ms, élément `span`.
- Tarifs : LCP mobile 1116 ms, élément `p.lead`.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 14
  - 12 WARN « phrase répétée » : bloc horaires (« Horaires du jour Midi et soir, fermé le mardi Avenue du Bourgmestre … ») répété 2 fois, et « 12:00 à 14:00, 18:00 à 22:30 » répété 6 à 12 fois, sur accueil, tarifs, maison, réveillon, emporter, réservation.
  - 2 WARN site : pas de `robots.txt`, pas de `sitemap`.
- Poids de la page la plus lourde (accueil) : ~894 Ko ; HTML 7, JS 20 (gz), CSS 7 (gz), polices 69, images 791.
