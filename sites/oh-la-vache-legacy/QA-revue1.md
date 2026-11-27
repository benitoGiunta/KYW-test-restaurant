# QA revue1 — oh-la-vache-legacy (captures)

Build : `scripts/q.sh oh-la-vache-legacy-revue1-build` — exit 0, sortie `dist/oh-la-vache/legacy/`.
Serveur statique : `dist/` sur 127.0.0.1:4503 (arrêté après usage).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/oh-la-vache/legacy/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-revue1/home/planche.png` |
| 404 `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-revue1/404/planche.png` |

Note : `planche.py` a été lancé avec `--colonnes 4 --largeur 480` ; le script n'a pas reconnu ces options (traitées comme fichiers, « ignoré »). Les planches ont été produites avec les réglages par défaut (1920 px de large, 14 et 19 images).

## Chiffres (report.json)

| Indicateur | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Axe : violations | 0 | 1 règle `color-contrast` (serious), 2 nœuds (`.kyw-footer__note`) |
| Axe : contrast needs review | 14 | 0 |
| LCP desktop | 780 ms (h1#titre) | 32 ms |
| CLS desktop | 0,001 | 0 |
| LCP mobile (throttled) | 2304 ms (img) | 236 ms |
| CLS mobile | 0,051 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 1 / 1 (`la page d'accueil` 128x20) |
| Éléments cachés WebGL | 0 | 0 |
| FPS défilement desktop | 60 | 61 |
| Hover : cibles sans réaction | `button "Menus"`, `a "0494 29 44 72"`, `a "Oh la Vache!"` (sur 7 cibles) | `a "la page d'accueil"`, `a "Réalisé par"` (sur 2 cibles) |
| Clavier : arrêts de tabulation | 12 | 3 |

Titre accueil : « Oh la Vache !, grill à Erpent (Namur) ». H1 : « Grill d’Erpent, ouvert 7 jours sur 7 ».

## Audit (audit.mjs)

- 0 FAIL, 5 WARN (1 page explorée sur l'accueil) :
  - accueil : pas de lien canonical
  - accueil : pas de og:image
  - site : pas de robots.txt
  - site : pas de sitemap (au moment de l'audit ; `sitemap-index.xml` est pourtant généré par le build)
  - accueil : police TTF/OTF livrée (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`, préférer woff2)
- Page la plus lourde : accueil, ~1592 Ko (html 9, JS 1 gz, CSS 5 gz, polices 103, images 1473).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-legacy-revue1-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-legacy-revue1-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-legacy-revue1-audit.log`
