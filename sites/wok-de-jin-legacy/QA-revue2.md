# QA revue 2 — wok-de-jin-legacy (captures)

Build : `scripts/q.sh wok-de-jin-legacy-revue2-build` → exit 0 (3 pages, `dist/wok-de-jin/legacy/`).
Serveur local : `http://127.0.0.1:4503/wok-de-jin/legacy/` (arrêté après les mesures).
Journaux : `/home/user/KYW-test-restaurant/.logs/wok-de-jin-legacy-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/wok-de-jin/legacy/`) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/home/planche.png` |
| Réveillon (`/wok-de-jin/legacy/reveillon/`, dossier `wok-de-jin-item`) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/wok-de-jin-item/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/wok-de-jin-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/404/planche.png` |

Rapport par page : `<dossier>/report.json`. Synthèse : `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue2/summary.json`.

## Chiffres (report.json / summary.json)

| Indicateur | Accueil | Réveillon | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Violations axe (sérieuses) | 0 | 0 | 1 : `color-contrast` ×2 (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Cibles tactiles trop petites | 0 | 0 (desktop : 1, « 081 30 68 88 », 95×20) | 1 (« la page d'accueil », 128×20) |
| LCP mobile (ms) | 776 (élément h1) | 748 (élément h1) | 220 |
| LCP desktop (ms) | 368 (img) | 412 (img) | 32 |
| CLS mobile | 0,03 | 0,014 | 0 |
| CLS desktop | 0,046 | 0,005 | 0 |
| FPS scroll mobile / desktop | 61 / 61 | 61 / 61 | 61 / 60 |
| Texte caché (réduit) | 0 | 0 | 0 |
| Mouvement en mode réduit | non | non | non |
| Mouvement au repos | non | non | non |
| Éléments couverts au survol | 0 | 0 | 0 |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus clavier invisible | 1 : « Découvrir la soirée » | 1 : « Réserver ma table en ligne » | 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué | non | non | non |
| Arrêts clavier | 12 | 12 | 3 |
| Survol : changement de couleur seul | 3 (« Voir les tarifs », « Nos tarifs », « Réserver ») | 3 (« Nos tarifs », « Réserver », « 081 30 68 88 ») | 0 |
| Survol : aucun changement | 1 (« Réserver une table ») | 2 (« Réserver ma table en ligne », « Wok de Jin ») | 2 (« la page d'accueil », « Réalisé par ») |

Remarque : les FPS desktop tournent en headless sur GPU logiciel (plancher, pas une mesure matérielle). Les chiffres mobiles sont à 4× de ralentissement CPU, slow 4G.

Taille de la page d'accueil (audit) : ~1367 Ko ; HTML 5, JS 1 (gz), CSS 6 (gz), polices 234 Ko, images 1122 Ko.

## Audit (`audit.mjs`, URL d'accueil)

Pages crawlées par l'audit : 2 (accueil et `/reveillon/`).
Résultat : **0 FAIL, 11 WARN**.

WARN :
- `/wok-de-jin/legacy/` : phrase répétée 6× « 12 h 00 à 14 h 00 et 18 h 00 à 22 h 30 ».
- `site` : pas de robots.txt.
- `site` : pas de sitemap.
- `/wok-de-jin/legacy/` : 4 polices ttf/otf (Iurb6YFw84WUY4N5jw.ttf et trois fichiers pximypc9…) — utiliser woff2.
- `/wok-de-jin/legacy/reveillon/` : mêmes 4 polices ttf/otf.
