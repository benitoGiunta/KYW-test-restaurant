# QA revue 1 — makimono / legacy (captures)

Build : `pnpm build:site sites/makimono-legacy` (via scripts/build-site.mjs), sortie `dist/makimono/legacy/`, exit 0.
Serveur local : http://127.0.0.1:4503/makimono/legacy/ (arrêté après les captures).
Commandes : `shoot.mjs --crawl --nav` puis `audit.mjs`, journaux dans `.logs/makimono-legacy-revue1-*.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (/makimono/legacy/) | /home/user/KYW-test-restaurant/.shots-makimono-legacy-revue1/home/ | /home/user/KYW-test-restaurant/.shots-makimono-legacy-revue1/home/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-makimono-legacy-revue1/404/ | /home/user/KYW-test-restaurant/.shots-makimono-legacy-revue1/404/planche.png |

Planches : 14 vignettes chacune (d-*.png et m-*.png), 4 colonnes, 480 px de large (1920 x 4224 px).
Les fichiers h-*, k-*, r-* ne sont pas inclus dans la planche (hors consigne).

## Chiffres (report.json / summary.json)

| Indicateur | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 0 | 2 (document-title x1, html-has-lang x1) |
| CLS desktop | 0.034 | 0 |
| CLS mobile | 0 | 0 |
| LCP desktop | 448 ms (img.hero__img) | 52 ms (pre) |
| LCP mobile (throttled) | 984 ms (img.hero__img) | 236 ms (pre) |
| FPS scroll desktop / mobile | 61 / 60 | 61 / 60 |
| Débordement horizontal | non (desktop et mobile) | non |
| Cibles tactiles trop petites | 0 | 0 |
| Texte caché réduit (reduced motion) | 0 | 0 |
| Mouvement en reduced motion | non | non |
| Mouvement au repos | non | non |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non |
| Survol sans changement | 0 | 0 |
| Retour couleur seule (colorOnly) | 4 | 0 |
| Focus bloqué | non | non |
| Parcours clavier | 12 arrêts | 1 arrêt : « body: focus left the page » |
| Titre (<title>) | présent | absent |
| H1 | « Des uramaki créatifs, faits avec amour » | absent |

Notes de l'accueil : --nav n'a trouvé aucun lien vers une autre page à cliquer. FPS desktop mesuré sur GPU logiciel (plancher, non représentatif).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 9
  1. /makimono/legacy/ : phrase répétée 2x « Mayonnaise Japonaise Sauce Spicy Sauce Teriyaki Sauce Unagi Sauce Trop… »
  2. /makimono/legacy/ : phrase répétée 6x « 12 h 00 à 14 h 30 et 18 h 00 à 22 h 00 »
  3. site : la page 404 n'a pas de <h1>
  4. site : pas de robots.txt
  5. site : pas de sitemap
  6. /makimono/legacy/ : police ttf/otf livrée : va9b4kzIxd1KFppkaRKvDRPJVDf_vB_ulw.ttf (woff2 attendu)
  7. /makimono/legacy/ : police ttf/otf livrée : va9b4kzIxd1KFppkaRKvDRPJVDf_jh_ulw.ttf
  8. /makimono/legacy/ : police ttf/otf livrée : va9b4kzIxd1KFppkaRKvDRPJVDf_Wxjulw.ttf
  9. /makimono/legacy/ : police ttf/otf livrée : zOLy4prXmrtY-tT6.ttf

Poids de la page la plus lourde : ~1419 KB (fonts 281, images 1125). Une page crawlée.

## Non fait

Aucun fichier source modifié, aucun commit.
