# QA build : oh-la-vache-legacy (rôle captures, passe build, phase test)

Faits seulement. Build : `scripts/q.sh oh-la-vache-legacy-build-build`, exit 0, sortie vers `dist/oh-la-vache/legacy/`. Serveur de test : port 4503 (arrêté après la passe).

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | http://127.0.0.1:4503/oh-la-vache/legacy/ | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-build/home/planche.png` (14 images, 1920x4224) |
| 404 | http://127.0.0.1:4503/__shoot-missing-page-1795773477849 | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-legacy-build/404/planche.png` (19 images, 1920x5280) |

Crawl : 1 page découverte (`/oh-la-vache/legacy/`). Les pages 404 et accueil ont été capturées ; une première passe lancée sans serveur a échoué (ERR_CONNECTION_REFUSED) et a été remplacée par la passe suivante.

## Chiffres (report.json)

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console (`errors`) | 0 | 0 |
| Requêtes en échec (`failed`) | 0 | 0 |
| Axe : violations | 0 (14 `contrastNeedsReview`) | 1 (`color-contrast`, impact serious, 2 nœuds) |
| LCP desktop | 784 ms (h1#titre) | 36 ms (p) |
| LCP mobile | 1456 ms (h1#titre) | 244 ms (p) |
| CLS desktop | 0.001 | 0 |
| CLS mobile | 0.072 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 1 / 1 |
| Éléments GL cachés desktop / mobile | 0 / 0 | 0 / 0 |
| Clavier : ordre de focus | 12 arrêts, premier arrêt « Aller au contenu » (`skipLinkFirst` false dans le rapport), focus visible absent : aucun, focus invisible : aucun, pas de piège | 3 arrêts (« la page d'accueil », « Réalisé par », sortie vers `body`), focus visible absent : aucun, focus invisible : aucun |
| Mouvement réduit (`moving`, `hiddenText`) | false / 0 | false / 0 |
| Défilement desktop (`scrollFps`) | 60 fps, pire frame 17 ms | non relevé |

Titre de l'accueil : « Oh la Vache !, grill à Erpent (Namur) ». H1 : « Grill d’Erpent, ouvert 7 jours sur 7 ». Hauteur desktop : 7468 px.

## Audit (`audit.mjs`)

Sortie : `0 FAIL, 8 WARN`. Journal : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-legacy-build-audit.log`.

WARN :
1. `/oh-la-vache/legacy/` : pas de lien canonique
2. `/oh-la-vache/legacy/` : `og:title` absent
3. `/oh-la-vache/legacy/` : `og:description` absent
4. `/oh-la-vache/legacy/` : `og:image` absent
5. `/oh-la-vache/legacy/` : `twitter:card` absent
6. site : pas de `robots.txt`
7. site : pas de `sitemap`
8. `/oh-la-vache/legacy/` : police TTF/OTF livrée (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`, woff2 attendu)

## Notes d'outillage

- `scripts/planche.py` a ignoré les options `--colonnes 4 --largeur 480` (traitées comme des fichiers : « ignoré 4 », « ignoré 480 »). Les planches ont été produites sans ces options (largeur 1920 px).
- Le hook de sobriété a refusé un `curl` et un `python3` hors enveloppe `scripts/q.sh`. Les appels ont été relancés via `q.sh`.
- Le journal `shoot` a dépassé 120 s et est passé en arrière-plan ; l'audit a été lancé en arrière-plan.
