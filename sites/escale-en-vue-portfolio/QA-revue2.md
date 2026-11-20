# QA revue 2 — escale-en-vue-portfolio (faits)

Build : `scripts/q.sh escale-en-vue-portfolio-revue2-build` exit 0 (6 pages, `dist/escale-en-vue/portfolio/`).
Serveur : `http://127.0.0.1:4501/escale-en-vue/portfolio/` (arrêté après les mesures).
Journaux : `/home/user/KYW-test-restaurant/.logs/escale-en-vue-portfolio-revue2-*.log`.

## Captures et planches

Le crawl annonce 5 pages (accueil, carte, histoire, terrasse, réservation). Le dossier de captures ne contient que 3 pages : accueil, `escale-en-vue-item` (carte), 404. Histoire, terrasse et réservation ne sont pas capturées dans cette passe.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/escale-en-vue/portfolio/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue2/home/planche.png` |
| Carte `/escale-en-vue/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue2/escale-en-vue-item/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue2/escale-en-vue-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue2/404/planche.png` |

Les planches ont été produites avec `scripts/planche.py` (4 colonnes, 480 px, 1920 x 5280 px). Le script signale des avertissements « ignoré » pour les valeurs de `--colonnes` et `--largeur`, sans effet sur les images produites.

## Chiffres par page (report.json)

| Donnée | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (serious 0, contrast à vérifier 27) | 0 (serious 0, contrast à vérifier 18) | 1 `color-contrast`, impact serious, 2 nœuds |
| CLS desktop / mobile | 0.059 / 0.004 | 0 / 0 | 0 / 0 |
| LCP desktop / mobile (ms) | 128 / 1132 | 100 / 1052 | 32 / 244 |
| LCP element desktop / mobile | `p.hero__slogan` / `p.hero__adresse` | `h1` / `p.lead` | `p` / `p` |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Hauteur page desktop / mobile (px) | 7642 / 6631 | 3504 / 5222 | 900 / 844 |
| Éléments cachés (texte masqué, reduced motion) | 0 | 0 | 0 |
| Cibles tactiles petites (mobile) | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Clavier : focus non visible / invisible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : premier arrêt | « Aller au contenu » | « Aller au contenu » | « la page d'accueil » |
| Hover : éléments sans changement | voir report.json (`hover`) | voir report.json (`hover`) | 2 liens sans changement au survol (`react: none`) |

Détail axe 404 : `color-contrast` sur `.kyw-footer__note` (#6b787d sur #fbfaf8, 4.36:1, seuil 4.5:1) et sur un `span` de même couleur.

Notes du rapport : le FPS desktop est mesuré sur GPU logiciel (plancher, pas une mesure matérielle). Les chiffres mobiles sont ceux de référence (4x ralentissement CPU, 4G lente).

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 7
  - « Saison terminée Habituellement ouvert du jeudi soir au dimanche après- » répété 2 fois, sur accueil, carte, histoire, terrasse, réservation (5 WARN)
  - site : pas de robots.txt
  - site : pas de sitemap
- Synthèse : 5 pages crawlées ; page la plus lourde `/escale-en-vue/portfolio/` ~737 KB (HTML 6, JS 74 gz, CSS 6 gz, polices 69, images 581).

Aucun fichier source modifié, aucun commit.
