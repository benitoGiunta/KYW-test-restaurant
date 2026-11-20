# QA revue 2 : philfa / portfolio (captures, faits seulement)

Build : `pnpm build:site` via `scripts/build-site.mjs sites/philfa-portfolio`, exit 0, 6 pages, dist/philfa/portfolio/.
Serveur de contrôle : `dist` sur 127.0.0.1:4501, arrêté après usage.

## Captures et planches

| Page capturée | Dossier de captures | Planche |
|---|---|---|
| Accueil `/philfa/portfolio/` | `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/home/planche.png` |
| Carte `/philfa/portfolio/carte/` (dossier `philfa-item`) | `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/philfa-item/` | `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/philfa-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/404/planche.png` |

Remarques :
- `shoot.mjs --crawl` a découvert 5 pages (`audit` les liste), mais seules 3 pages ont été photographiées (accueil, carte, 404). Histoire, terrasse et réservation ne sont pas capturées dans ce passage.
- Le résumé global est dans `/home/user/KYW-test-restaurant/.shots-philfa-portfolio-revue2/summary.json`.
- `planche.py` a affiché 2 lignes « ignoré » (`4`, `480`) : ses options `--colonnes`/`--largeur` sont lues comme des fichiers. Les planches sortent quand même en 1920 px de large (4 colonnes à 480 px), 19 images chacune.

## Chiffres par page (report.json)

| Mesure | Accueil (desktop / mobile) | Carte (desktop / mobile) | 404 (desktop / mobile) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious ; 27 contrastNeedsReview) | 0 (0 serious ; 17 contrastNeedsReview) | 1 serious : `color-contrast` sur `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 (seuil 4,5:1) |
| LCP | 88 ms / 4084 ms (élément `img` sur mobile) | 60 ms / 1076 ms | 44 ms / 220 ms |
| CLS | 0,008 / 0,007 | 0,006 / 0 | 0 / 0 |
| Débordement horizontal | non / non | non / non | non / non |
| Cibles tactiles < seuil | 0 / 0 | 0 / 0 | 1 (« la page d'accueil », 128x20) / 1 |
| Éléments cachés (texte masqué en reduced motion) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| FPS de défilement | 58 / 60 | 60 / 60 | 60 / 60 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non (sortie du document après le dernier lien) |
| Survol : cibles sans changement | 0 (cibles couleur seule : 0) | cibles couleur seule : 2 (« PhilFa », « +32 81 22 61 11 ») | 2 cibles, aucun changement au survol |

Notes :
- Accueil : `settledMs` null (écran encore en mouvement à la limite, animation d'entrée ou mouvement continu ; voir `d-01-hero.png`). Idle motion détecté en haut de page.
- Accueil : 1 élément `covered` au survol (« Cornet de frites dessiné au trait »). Curseur suiveur actif.
- Carte, mobile : `settledMs` 4212 ms. Desktop : `settledMs` 2278 ms.
- Les FPS desktop tournent sur GPU logiciel (plancher, non mesure réelle). Les FPS mobile sont à 4x de ralentissement CPU.

## Audit (`audit.mjs`)

- 0 FAIL, 13 WARN (`.logs/philfa-portfolio-revue2-audit.log`).
- WARN répétés de phrases (5 pages crawlées) : « Horaires du jour Service midi et soir du mardi au samedi Rue de Marcho » (2 occurrences sur 5 pages), « 12:00 à 14:30, 18:15 à 21:00 » (5 à 10 occurrences par page), « La salle et sa baie vitrée » (2 occurrences, accueil).
- WARN site : pas de `robots.txt`, pas de `sitemap`.
- Poids : page la plus lourde `/philfa/portfolio/` ~1032 Ko ; HTML 8, JS 20 (gz), CSS 7 (gz), polices 69, images 929.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Seul ce fichier QA a été écrit.
