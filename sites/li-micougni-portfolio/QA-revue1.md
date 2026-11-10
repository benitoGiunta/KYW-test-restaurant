# QA revue 1 : captures et audit (li-micougni, portfolio)

Passe : revue1 · Rôle : captures · Build : `sites/li-micougni-portfolio` → `dist/li-micougni/portfolio/` (6 pages, sans erreur)
Serveur local : `dist/` sur `http://127.0.0.1:4501/li-micougni/portfolio/` (arrêté après les captures).
Journaux complets : `.logs/li-micougni-portfolio-revue1-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/li-micougni/portfolio/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-revue1/home/` (38 fichiers) | `/home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-revue1/home/planche.png` |
| Carte `/carte/` (page type `li-micougni-item`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-revue1/li-micougni-item/` (38 fichiers) | `/home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-revue1/li-micougni-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-revue1/404/` (17 fichiers) | `/home/user/KYW-test-restaurant/.shots-li-micougni-portfolio-revue1/404/planche.png` |

Les planches sont sorties en 1920 px de large (19 et 14 vignettes). `scripts/planche.py` a ignoré les options `--colonnes 4 --largeur 480` (message « ignoré »), la mise en page par défaut a été utilisée.
Le crawl a trouvé 5 pages ; `--nav` n'a pas pu suivre de lien depuis la page 404.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, serious ; `html-has-lang`, serious) |
| LCP desktop / mobile (ms) | 208 / 1124 | 120 / 1120 | 36 / 236 |
| CLS desktop / mobile | 0,009 / 0,007 | 0,005 / 0,003 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments masqués WebGL (desktop) | 0 | 0 | — |
| Survol : cibles / sans changement / couleur seule / recouvertes | 6 / 0 / 0 / 2 | 6 / 0 / 1 / 1 | 0 / 0 / 0 / 0 |
| Mouvement réduit : texte masqué / animation en cours | 0 / non | 0 / non | 0 / non |
| Clavier : champ `skipLinkFirst` du rapport | false | false | false |
| Clavier : focus invisible / bloqué | 0 / non | 0 / non | 0 / non |

Clavier, ordre des arrêts :
- Accueil : Aller au contenu, Li Micougni, Accueil, Carte, La maison, Terrasse, Contact, RÉSERVER, RÉSERVER UNE TABLE, VOIR LA CARTE, puis deux boutons décoratifs (parasol, verre à pied).
- Carte : Aller au contenu, Li Micougni, Accueil, Carte, La maison, Terrasse, Contact, RÉSERVER, RÉSERVER UNE TABLE, téléphone, e-mail, Facebook.
- 404 : aucun arrêt utile, le focus quitte la page.

Notes des rapports : FPS desktop mesuré sur GPU logiciel (valeur plancher). Mobile : ralentissement CPU x4, slow 4G.
FPS de défilement (mobile) : accueil 60 ips (pire trame 33 ms), carte 60 ips, 404 61 ips.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 14 WARN**.
- WARN répétés sur les 5 pages :
  - « Horaires du jour Ouvert du mardi au dimanche (horaires à confirmer) » : 2 répétitions sur chaque page.
  - « 12:00 à 14:30, 18:00 à 22:00 » : 2 à 6 répétitions selon la page.
- WARN histoire : « Les grillades sont cuites au charbon de bois… » répétée 2 fois.
- WARN site :
  - 404 sans `<h1>`.
  - Pas de `robots.txt`.
  - Pas de sitemap (le build a pourtant créé `sitemap-index.xml` dans `dist/`).
- Poids : page la plus lourde `/li-micougni/portfolio/` ≈ 737 KB ; 633 images, 69 polices, 20 scripts (gz), 7 feuilles de style (gz).
