# QA build : brasserie-edgard / legacy (passe build, phase test)

Build : `dist/brasserie-edgard/legacy/` (exit 0, 7 pages Astro). Serveur de test : port 4503 (arrêté après usage).
Captures : `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-legacy-build/<page>/` (report.json, d-*, m-*, h-*, k-*, r-*).
Planches : `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-legacy-build/<page>/planche.png` (4 colonnes, 480 px).

Pages capturées (3 dossiers, la crawl de shoot.mjs n'en a retenu que 3) :

| Page | Dossier | Planche |
|---|---|---|
| Accueil `/` | `.../home/` | `.../home/planche.png` |
| Carte `/la-carte/` (item) | `.../brasserie-edgard-item/` | `.../brasserie-edgard-item/planche.png` |
| 404 (page absente) | `.../404/` | `.../404/planche.png` |

Note : audit.mjs annonce 6 pages crawlées (accueil, la-carte, lunch-et-suggestions, menu-groupe, galerie, contact) ; ces 3 dernières et contact n'ont pas de dossier de captures.

## Chiffres (report.json)

| Indicateur | Accueil | La-carte | 404 |
|---|---|---|---|
| Erreurs console | 1 (404 de ressource, desktop) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| axe : violations | 0 | 0 | 1 serious : color-contrast (2 nœuds, `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, 4,5:1 requis) |
| axe : contrastNeedsReview | 9 | 5 | 0 |
| LCP desktop (ms) | 516 | 472 | 44 |
| LCP mobile (ms) | 1900 | 816 | 260 |
| CLS desktop | 0,001 | 0,001 | 0 |
| CLS mobile | 0,018 | 0,018 | 0 |
| Débordement horizontal | aucun (desktop et mobile) | aucun | aucun |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : lien d'évitement en premier | non | non | non |
| Survol : cibles / sans changement / couleur seule | 7 / 2 / 3 | 7 / 3 / 4 | 2 / 2 / 0 |
| Mouvement réduit : texte caché / animation active | 0 / non | 0 / non | 0 / non |
| Poids (audit) | page la plus lourde : galerie ~1658 Ko | | |

Éléments cachés : 0 sur les trois pages (champ `reduced.hiddenText`). Pas d'élément couvert au survol.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 48, répartis ainsi :
  - Métadonnées SEO absentes, sur les 6 pages : canonical, og:title, og:description, og:image, twitter:card, favicon (6 × 6 = 36 lignes).
  - Phrase répétée : « 10 h 00 à 22 h 30 Cuisine fermée de 15 h à 18 h » (5 fois) et « 10 h 00 à 22 h 30 Cuisine ouverte en continu » (2 fois), sur accueil et contact.
  - Site : pas de robots.txt, pas de sitemap (le build a pourtant généré `sitemap-index.xml` dans `sites/brasserie-edgard-legacy/dist`).
  - Police TTF/OTF livrée (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`) sur 6 pages (à passer en woff2).

## Pièges rencontrés pendant la passe

- Un appel `curl` a été bloqué par le hook de sobriété : le serveur n'a donc pas démarré à la première tentative et la première capture a échoué (ERR_CONNECTION_REFUSED). Dossiers refaits après redémarrage du serveur.
- `planche.py` traite `--colonnes 4 --largeur 480` comme des fichiers et affiche « ignoré 4 » et « ignoré 480 » ; les options sont bien appliquées (planche de 1920 px de large = 4 × 480).
