# QA build : oh-la-vache / portfolio

Build : `dist/oh-la-vache/portfolio/`, 6 pages générées (404, accueil, carte, histoire, réservation, terrasse). Serveur local port 4501, arrêté après usage.

## Captures et planches

Les captures ont été faites sur 3 types de page (accueil, 404, carte). L'audit a crawlé 5 pages.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/oh-la-vache/portfolio/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-build/home/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-build/404/planche.png` |
| Carte `/oh-la-vache/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-build/oh-la-vache-item/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-portfolio-build/oh-la-vache-item/planche.png` |

Note : `planche.py` a été lancé avec `--colonnes 4 --largeur 480`, mais le script a traité `4` et `480` comme des fichiers (« ignoré », sans effet). Les planches font 1920 x 5280 px, 19 images chacune.

## Chiffres par page (report.json)

**Accueil**
- Desktop : chargement 160 ms, LCP 96 ms (`p.hero__slogan`), CLS 0,02, hauteur 8220 px, FPS scroll 57 (pire frame 50 ms).
- Mobile (throttled) : LCP 1136 ms (`p.hero__slogan`), CLS 0,006, FPS scroll 60 (pire frame 17 ms).
- Erreurs console (`errors`) : aucune. Requêtes en échec (`failed`) : aucune.
- Axe : 0 violation.
- Clavier : 12 arrêts relevés, dont « Aller au contenu », logo, navigation, boutons de réservation.
- Survol : cibles avec réaction (`react: moves`).
- Mouvement réduit : 0 texte caché, pas de mouvement.
- Débordement horizontal mobile : non extrait (clé absente du report).

**404**
- Desktop : LCP 52 ms, CLS 0, hauteur 900 px.
- Mobile (throttled) : LCP 252 ms, CLS 0.
- Erreurs console : aucune. Requêtes en échec : aucune.
- Axe : 1 règle, `color-contrast` (serious), 2 nœuds : `.kyw-footer__note` et un `span`, texte `#6b787d` sur `#fbfaf8` à 4,36:1 (seuil 4,5:1).
- Petites cibles : « la page d'accueil » 128 x 20 px (desktop et mobile).
- Clavier : 2 arrêts, puis le focus sort de la page.
- Mouvement réduit : 0 texte caché.

**Carte**
- Desktop : chargement 157 ms, LCP 128 ms (`p.lead`), CLS 0,003, fin de mouvement à 8506 ms, hauteur 12 860 px, FPS scroll 60.
- Mobile (throttled) : chargement 2428 ms, LCP 1208 ms (`p.lead`), CLS 0,003, fin de mouvement à 4626 ms, hauteur 22 009 px, FPS scroll 60.
- Erreurs console : aucune. Requêtes en échec : aucune.
- Axe : 0 violation.
- Clavier : arrêts sur navigation, téléphone, réseaux sociaux.
- Mouvement réduit : 0 texte caché.

## Audit (`audit.mjs`) : 0 FAIL, 7 WARN

- 5 pages crawlées. Poids le plus lourd : `/oh-la-vache/portfolio/`, environ 1218 Ko (images 1061 Ko, JS 74 Ko gz, CSS 7 Ko gz, polices 69 Ko).
- WARN « phrase répétée 2 fois » : « Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc », sur les 5 pages (accueil, carte, histoire, terrasse, réservation).
- WARN « no robots.txt ».
- WARN « no sitemap » (le build écrit pourtant `sitemap-index.xml`, cf. journal de build).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-portfolio-build-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-portfolio-build-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/oh-la-vache-portfolio-build-audit.log`

Note : les FPS desktop tournent en headless sur GPU logiciel (plancher, pas une mesure réelle). Les chiffres mobile sont ceux à utiliser (CPU ralenti 4x, 4G lente).
