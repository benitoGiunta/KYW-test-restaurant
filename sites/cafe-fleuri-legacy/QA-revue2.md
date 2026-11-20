# QA revue 2 — cafe-fleuri, variante legacy

Faits uniquement, extraits des `report.json` et de l'audit. Build : `dist/cafe-fleuri/legacy/` (rc 0, 4 pages générées : `/`, `/carte/`, `/venir/`, `/404.html`).
Serveur local : port 4503 (arrêté après les captures). Captures : Chromium headless, desktop et mobile ralenti.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/cafe-fleuri/legacy/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue2/home/planche.png` |
| Carte `/cafe-fleuri/legacy/carte/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue2/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue2/cafe-fleuri-item/planche.png` |
| 404 (page inexistante) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-legacy-revue2/404/planche.png` |

Le crawl a trouvé 3 pages (accueil, carte, 404). `/venir/` n'a pas été capturée par le crawl.

## Chiffres par page

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 0 | 1 |
| Violations axe sérieuses | 0 | 0 | 1 (`color-contrast`, 2 nœuds) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 396 (`h1#h-hero`) | 440 (`h1#h-carte`) | 44 (`p`) |
| LCP mobile (ms) | 688 (`p.figure`) | 708 (`p.lead`) | 216 (`p`) |
| FPS scroll desktop / mobile | 60 / 60 | 61 / 60 | 60 / 60 |
| Débordement horizontal | non | non | non |
| Cibles tactiles petites (desktop) | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Focus bloqué | non | non | non |
| Survol sans changement | 1 | 2 | 2 |
| Survol changement couleur seule | 6 | 3 | 0 |
| Mouvement en réduction de mouvement | non | non | non |
| Texte caché en réduction de mouvement | 0 | 0 | 0 |
| Contraste à vérifier (axe) | 0 | 0 | 0 |
| Chargement (ms) desktop | 694 | 594 | 22 |

Ordre clavier, accueil : lien d'évitement, Café Fleuri, La carte, Venir, Appeler (x2), La carte, Voir la carte, Voir sur la carte, Appeler, téléphone, Réalisé par. Pas de lien d'évitement en premier (`skipLinkFirst` = false) sur les trois pages.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 14 WARN**.
- Aucune ligne FAIL.
- Pages crawlées : 3. Page la plus lourde : `/cafe-fleuri/legacy/`, environ 305 KB ; HTML 3, JS 1 (gz), CSS 4 (gz), polices 286, images 11.

Journal complet : `/home/user/KYW-test-restaurant/.logs/cafe-fleuri-legacy-revue2-audit.log`.
Note : les FPS desktop tournent en headless sur GPU logiciel (plancher, pas une mesure réelle) ; les chiffres mobiles sont à 4x de ralentissement CPU.
