# QA build : epices-et-nous-legacy (passe build, phase test)

Serveur local : `dist/` servi sur `http://127.0.0.1:4503/epices-et-nous/legacy/` (arrêté après les mesures).
Build : exit 0, 7 pages Astro (404, a-propos, actualites, carte, index, menu, reservation), 612 ms.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/epices-et-nous/legacy/`) | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-build/home/planche.png` |
| Fiche carte (`/carte/`, dossier `epices-et-nous-item`) | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-build/epices-et-nous-item/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-build/epices-et-nous-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-legacy-build/404/planche.png` |

Note : `shoot.mjs --crawl --nav` a capturé 3 dossiers (home, epices-et-nous-item, 404) ; l'audit a crawlé 6 pages (accueil, carte, menu, reservation, a-propos, actualites).
Note : les planches ont 19 images chacune (1920 x 5280 px). `scripts/planche.py` a traité `--colonnes 4` et `--largeur 480` comme des fichiers (« ignoré ») : les options ne sont pas reconnues, la mise en page par défaut a été utilisée.

## Mesures (report.json)

| Dossier | Vitals desktop (LCP / CLS) | Vitals mobile (LCP / CLS) | Débordement X desktop / mobile | Erreurs console | Requêtes en échec | Violations axe | Cibles tactiles < 24 px desktop / mobile | Éléments cachés (mobile glHidden / reduced hiddenText) |
|---|---|---|---|---|---|---|---|---|
| home | 536 ms / 0.001 | 760 ms / 0.001 | non / non | 0 | 0 | 0 | 8 / 0 | 0 / 0 |
| epices-et-nous-item (carte) | 492 ms / 0.002 | 884 ms / 0.001 | non / non | 0 | 0 | 0 | 7 / 0 | 0 / 0 |
| 404 | 36 ms / 0 | 224 ms / 0 | non / non | 0 | 0 | 1 (color-contrast, serious : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4.36:1, requis 4.5:1) | 1 / 1 | 0 / 0 |

Autres mesures :
- Chargement (load) : home 827 ms desktop, 1722 ms mobile ; carte 774 ms / 2042 ms ; 404 29 ms / 412 ms.
- Hauteur de page : home 5796 px desktop, 6552 px mobile ; carte 4756 / 6172 ; 404 900 / 844.
- FPS au défilement mobile : 61 sur les trois pages (CPU ralenti 4x, valeur indicative).
- Clavier (home) : 12 arrêts de tabulation, lien d'évitement (« Aller au contenu ») présent mais pas en premier (`skipLinkFirst` = false) ; 0 focus non visible ; 0 focus invisible ; pas de blocage. Carte : 12 arrêts, mêmes constats. 404 : 3 arrêts.
- Animation réduite (reduced) : mouvement = false sur les trois pages.
- Survol (hover) : cibles mesurées sur home (h-01 à h-07) ; résultats détaillés dans `report.json`, clé `hover`.

## Audit (audit.mjs)

- Résultat : 0 FAIL, 33 WARN.
- Pages crawlées : 6 ; poids le plus lourd : `/epices-et-nous/legacy/` (~431 KB).
- Nature des WARN (faits) : `twitter:card` absent sur actualites ; saut de niveau de titre h1 vers h3 sur actualites ; pas de `robots.txt` ; pas de `sitemap` au niveau site ; fontes `.ttf` embarquées sur les six pages (2 fichiers par page, non woff2).
