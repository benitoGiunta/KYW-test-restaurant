# QA build : le-servais-legacy

Passe : build · Rôle : captures · Serveur local : `dist/` sur http://127.0.0.1:4503/le-servais/legacy/ (arrêté après usage).
Build : `scripts/build-site.mjs sites/le-servais-legacy` exit 0, 7 pages construites (journal `.logs/le-servais-legacy-build-build.log`).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-servais/legacy/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-build/home/planche.png` |
| Carte `/le-servais/legacy/carte/` (dossier `le-servais-item`) | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-build/le-servais-item/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-build/le-servais-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-servais-legacy-build/404/planche.png` |

Le crawl a produit 3 dossiers de captures. L'audit a parcouru 6 pages (dont `/carte/` et `/contact/`) ; les pages `/contact/`, `/evenements/`, `/groupes-privatisation/` et `/carte-cadeau/` n'ont pas de dossier de captures.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (serious : `document-title`, `html-has-lang`) |
| Axe contrast à vérifier | 0 | 0 | 0 |
| LCP desktop / mobile (ms) | 176 / 1620 | 128 / 1248 | 32 / 228 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Petites cibles desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés (desktop) | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier / focus bloqué | oui / non | oui / non | non / non |
| Mouvement en réduit (texte caché / animations) | 0 / non | 0 / non | - |
| Survol : cibles testées / sans changement / couleur seule | 7 / 1 / 6 | 7 / 1 / 6 | 0 / 0 / 0 |

Le mode réduit ne change pas la page. Les mesures `scrollFps` desktop sont à 61 et 60 fps, `worstFrameMs` 17.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 10 WARN**.
- Alourdissement de la page la plus lourde (`/le-servais/legacy/`) : environ 651 KB ; HTML 5, JS 1 (gz), CSS 5 (gz), polices 90, images 550.
- WARN (10) :
  - 6 WARN « phrase répétée » sur les horaires (`9 h 00 à 1 h 00` ×5 sur accueil, carte, contact ; `9 h 00 à 2 h 00` ×2 ; `11 h 30 à 22 h 00, vendredi et samedi jusqu’à minuit` ×2 sur la carte). Le détail par page est dans `.logs/le-servais-legacy-build-audit.log`.
  - 404 : pas de `<h1>`.
  - Site : pas de `robots.txt`, pas de `sitemap`.

Journal complet de l'audit : `/home/user/KYW-test-restaurant/.logs/le-servais-legacy-build-audit.log` (14 lignes).
Journal du crawl : `/home/user/KYW-test-restaurant/.logs/le-servais-legacy-build-shoot.log`.

## Notes

- Les captures n'ont pas été lues une à une (règle de sobriété) ; les planches sont prêtes pour la revue de design.
- Aucun fichier source modifié, aucun commit.
