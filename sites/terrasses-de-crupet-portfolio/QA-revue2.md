# QA revue 2 — terrasses-de-crupet, portfolio (faits)

Build : `dist/terrasses-de-crupet/portfolio/` (7 pages, exit 0).
Serveur local : `http://127.0.0.1:4501/terrasses-de-crupet/portfolio/` (arrêté après les captures).

## Captures par page

Note : `shoot.mjs --crawl --nav` a produit 3 dossiers (home, terrasses-de-crupet-item, 404). L'audit a crawlé 6 pages (voir plus bas).

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (home) | /home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue2/home/ | /home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue2/home/planche.png |
| Fiche type (carte, terrasses-de-crupet-item) | /home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue2/terrasses-de-crupet-item/ | /home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue2/terrasses-de-crupet-item/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue2/404/ | /home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-portfolio-revue2/404/planche.png |

Les planches font 1920 x 5280 px (4 colonnes de 480 px, 19 vignettes chacune). Le script `planche.py` a affiché des lignes « ignoré 4 / ignoré 480 » : ce sont les valeurs de `--colonnes` et `--largeur` prises pour des fichiers, sans effet sur le résultat.

## Chiffres (report.json)

| Mesure | Accueil | Fiche (carte) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (color-contrast, sérieux, 2 nœuds) |
| Axe : à vérifier (contraste) | 34 | 24 | 0 |
| CLS bureau / mobile | 0.003 / 0.003 | 0.003 / 0 | 0 / 0 |
| LCP bureau (ms, élément) | 68 (span) | 56 (p.lead) | 32 (p) |
| LCP mobile (ms, élément) | 2212 (img) | 1076 (p.lead) | 224 (p) |
| Chargement load bureau / mobile (ms) | 112 / 3166 | 72 / 2147 | 19 / 406 |
| Fin de loader bureau / mobile (ms) | 2255 / 5320 | null / null | null / null |
| Première image stable mobile (ms) | null (encore en mouvement) | 4179 | 2336 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Fps défilement bureau / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Texte caché (mouvement réduit) | 0 | 0 | 0 |
| Mouvement en mouvement réduit | non | non | non |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non (focus sort de la page) |
| Survol : cibles avec réaction | 5 captures (mouvement, couleur) | 5 captures (mouvement, couleur) | 0 (aucune réaction) |

Détail clavier, accueil : 12 arrêts, dont « Aller au contenu » en premier.

Violation axe, 404 : `color-contrast`, impact sérieux. Nœuds : `.kyw-footer__note` et un `span`, couleur #6b787d sur #fbfaf8, ratio 4,36:1 (seuil 4,5:1).

## Audit (audit.mjs)

- Pages crawlées : 6 (accueil, carte, histoire, terrasse, emporter, reservation).
- Résultat : **0 FAIL, 14 WARN**.
- WARN répétitions de phrases, sur les 6 pages : « Horaires du jour Midi et soir, du lundi au dimanche Rue Basse 13, 5330 » (2 fois par page) et « 12:00 à 14:00, 18:00 à 22:00 » (7 à 14 fois par page).
- WARN site : pas de `robots.txt`, pas de `sitemap` (le dist contient `sitemap-index.xml`, généré par Astro).
- Poids de la page la plus lourde : accueil, environ 812 Ko (HTML 7, JS 20 gz, CSS 6 gz, polices 69, images 710).

## Avertissements de capture

- Premier essai de `shoot.mjs` : échec `ERR_CONNECTION_REFUSED`, car le serveur en arrière-plan s'était arrêté. Relancé avec un serveur détaché (`setsid nohup`) ; les résultats ci-dessus viennent du second essai.
- Le second essai a dépassé 120 s et a tourné en arrière-plan (environ 4 min au total).
- Logs : `/home/user/KYW-test-restaurant/.logs/terrasses-de-crupet-portfolio-revue2-*.log`.
