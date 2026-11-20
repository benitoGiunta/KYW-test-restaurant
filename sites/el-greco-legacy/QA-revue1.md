# QA revue 1 : el-greco-legacy (captures, faits)

Phase : test · Passe : revue1 · Rôle : captures · Serveur local : `dist/` servi sur 127.0.0.1:4503 (arrêté après usage).
Build : `scripts/build-site.mjs sites/el-greco-legacy` exit 0, 6 pages (404, about-us, carte-des-boissons, contact, index, our-menu), journal `.logs/el-greco-legacy-revue1-build.log`.
Captures : `.shots-el-greco-legacy-revue1/` (journal `.logs/el-greco-legacy-revue1-shoot.log`). Audit : `.logs/el-greco-legacy-revue1-audit.log`.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| / (home) | /home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue1/home/ | /home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue1/home/planche.png |
| /our-menu/ (el-greco-item) | /home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue1/el-greco-item/ | /home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue1/el-greco-item/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue1/404/ | /home/user/KYW-test-restaurant/.shots-el-greco-legacy-revue1/404/planche.png |

Les planches font 1920 x 5280 px et contiennent 19 images chacune. La commande `planche.py` a ignoré les options `--colonnes 4 --largeur 480` (lues comme des fichiers, message « ignoré »), la mise en page par défaut a donc été utilisée.
Le crawl a trouvé 5 pages (about-us, carte-des-boissons, contact, our-menu, accueil) ; seules home, our-menu et 404 ont été capturées par `shoot.mjs`.

## Chiffres par page (report.json)

| Mesure | home | our-menu | 404 |
|---|---|---|---|
| Erreurs console | 1 (« Failed to load resource: 404 », desktop) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 serious : `color-contrast`, 2 nœuds (`.kyw-footer__note` et un span, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| CLS desktop / mobile | 0,008 / 0,007 | 0,02 / 0,002 | 0 / 0 |
| LCP desktop / mobile | 384 ms (span) / 688 ms (p.lead) | 400 ms (p.lead) / 748 ms (p.lead) | 40 ms (p) / 232 ms (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites (desktop) | 6 (liens de 21 px de haut : téléphone, e-mail, « Lire notre histoire », « Itinéraire ») | 3 (téléphone, e-mail) | 1 (« la page d'accueil », 20 px) |
| Cibles tactiles trop petites (mobile) | 0 | 1 (téléphone, 21 px) | 1 (« la page d'accueil », 20 px) |
| Éléments hors écran (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : flag skipLinkFirst | false (premier arrêt : « Aller au contenu ») | false (idem) | false |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : arrêts de tabulation | 12 (dont « Aller au contenu » en premier) | 12 | 3 (dont « focus left the page » après le 2e arrêt) |
| Survol (premières entrées de hover) | h-01 « Réserver une table » : couleur (backgroundColor) ; h-02 « Voir le menu » : couleur (backgroundColor) | h-01 « Entrées froides » : couleur (borderColor) ; h-02 « 081 20 07 47 » : pixels, aucune propriété changée | h-01 « la page d'accueil » et h-02 « Réalisé par » : aucun changement (noHoverChange) |
| Mouvement réduit : texte caché / animations | 0 / non | 0 / non | 0 / non |

Notes : les cibles « trop petites » sont celles de moins de 24 px de haut relevées par report.json. Les valeurs de hover et de focus sont les premières entrées des tableaux (sorties tronquées à l'extraction) : seuls les comptes indiqués sont exhaustifs.

## Audit (audit.mjs)

- FAIL : **0**
- WARN : **90** au total (site 2 ; accueil 19 ; about-us 17 ; carte-des-boissons 17 ; contact 18 ; our-menu 17).
- WARN site : « no robots.txt », « no sitemap » (le build a pourtant produit `sitemap-index.xml`).
- WARN par page (hors polices) : absence de canonical, og:title, og:description, og:image, twitter:card, favicon ; phrases répétées 2x sur l'accueil (horaires « 12 h 00 à 15 h 00 et 18 h 00 à 22 h 00 », adresse « Rue de Sardanson 22 5004 Bouge (Namur) »).
- WARN polices : 13 fichiers .ttf/.otf livrés (conseil woff2) sur about-us et contact ; poids des polices 521 KB sur ces deux pages.
- Poids : page la plus lourde about-us ~700 KB (html 2, JS 1 gz, CSS 5 gz, polices 521 KB, images 170).

## Erreurs relevées

- Home : une erreur 404 de ressource côté desktop (URL non précisée dans report.json).
- 404 : une violation axe serious, contraste #6b787d sur #fbfaf8 (4,36:1).
