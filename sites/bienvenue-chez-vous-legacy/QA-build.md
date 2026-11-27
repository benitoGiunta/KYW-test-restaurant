# QA build : bienvenue-chez-vous / legacy

Serveur local : `dist/` servi sur http://127.0.0.1:4503/bienvenue-chez-vous/legacy/ (arrêté après les captures).
Build : `scripts/build-site.mjs`, exit 0, 7 pages Astro (404, boutique, contact, index, presentation, resto, traiteur).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/`) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-legacy-build/home/planche.png` |
| Présentation (`/presentation/`) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-legacy-build/bienvenue-chez-vous-item/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-legacy-build/bienvenue-chez-vous-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-legacy-build/404/planche.png` |

Note : `planche.py` a ignoré les options `--colonnes 4 --largeur 480` (lues comme fichiers) ; les planches ont été produites en 1920 px de large, 19 vignettes chacune.

## Chiffres par page (report.json)

| Mesure | Accueil | Présentation | 404 |
|---|---|---|---|
| Titre | Bienvenue chez vous, restaurant de Cédric Delsaut à Namur | Présentation, Bienvenue chez vous, Namur | Page introuvable · KYW |
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contrast à vérifier : 5) | 0 (serious 0, contrast à vérifier : 0) | 1 violation serious : `color-contrast`, 2 nœuds (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4.36:1 pour 4.5:1 requis) |
| CLS desktop | 0 | 0 | 0 |
| LCP desktop | 480 ms (img) | 472 ms (img) | 48 ms (p) |
| LCP mobile | 1500 ms (p.lead), CLS mobile 0.036 | 1160 ms (img), CLS mobile 0.017 | 240 ms (p), CLS mobile 0 |
| FPS scroll desktop / mobile | 60 / 61 | 60 / 60 | 61 / 60 |
| Débordement horizontal | non (desktop et mobile) | non (desktop et mobile) | non (desktop et mobile) |
| Éléments cachés (reduced motion, texte masqué) | 0 | 0 | 0 |
| Cibles tactiles petites desktop / mobile | 8 / 1 | 8 / 0 | 1 / 1 |
| Clavier : focus sans indicateur visible | aucun | aucun | aucun |
| Clavier : focus bloqué / hors page | non | non | « focus left the page » sur le body après le lien de retour |
| Hover : couleur seule / sans changement | 5 / 2 | 4 / 2 | 0 / 2 |

Ordre de tabulation accueil : lien « Aller au contenu » en premier, puis navigation, puis CTA. Présentation : idem, avec « La DH », « Gault&Millau Belgium » et le lien téléphone.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 74 (dont fonts ttf/otf à convertir en woff2 sur boutique, traiteur et contact, et poids des fonts 485 KB)
- Page la plus lourde : `/bienvenue-chez-vous/legacy/`, ~1336 KB ; 6 pages crawlées.

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/bienvenue-chez-vous-legacy-build-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/bienvenue-chez-vous-legacy-build-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/bienvenue-chez-vous-legacy-build-audit.log`
