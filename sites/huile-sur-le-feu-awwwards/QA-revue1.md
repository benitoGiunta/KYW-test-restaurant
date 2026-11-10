# QA revue 1 : huile-sur-le-feu (awwwards)

Build : `node scripts/build-site.mjs sites/huile-sur-le-feu-awwwards` : exit 0, 5 pages, `dist/huile-sur-le-feu/awwwards/`.
Serveur de test : `serve.mjs dist --port 4502` (arrêté après la passe).
Captures : `shoot.mjs --crawl --nav`, 3 dossiers de page ; audit : `audit.mjs`, 4 pages explorées.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/huile-sur-le-feu/awwwards/` | `.shots-huile-sur-le-feu-awwwards-revue1/home/` | `.shots-huile-sur-le-feu-awwwards-revue1/home/planche.png` |
| Fiche `/huile-sur-le-feu/awwwards/carte/` | `.shots-huile-sur-le-feu-awwwards-revue1/huile-sur-le-feu-item/` | `.shots-huile-sur-le-feu-awwwards-revue1/huile-sur-le-feu-item/planche.png` |
| 404 (URL inexistante, sonde) | `.shots-huile-sur-le-feu-awwwards-revue1/404/` | `.shots-huile-sur-le-feu-awwwards-revue1/404/planche.png` |

Chemins relatifs à la racine du dépôt. Les captures ne sont pas dans le dossier du site.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 (7 contrastes à vérifier) | 0 (4 contrastes à vérifier) | 2 : `document-title`, `html-has-lang` |
| LCP desktop / mobile (ms) | 248 / 2332 | 172 / 2496 | 44 / 220 |
| CLS desktop / mobile | 0.001 / 0 | 0 / 0.009 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments hors écran (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus sans contour visible / invisible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier | non | non | non |
| Survols testés / sans réaction / recouverts | 7 / 0 / 0 | 7 / 0 / 0 | 0 |
| Mouvement réduit : texte caché / animé | 0 / non | 0 / non | 0 / non |
| FPS de défilement (desktop, worst frame) | 60 (17 ms) | 59 (50 ms) | 60 (17 ms) |
| FPS de défilement (mobile) | 60 | 47 (worst 50 ms) | 61 |

Notes : les FPS desktop tournent en headless sur GPU logiciel (plancher, pas une mesure matérielle). Le mobile est à 4x de ralentissement CPU, slow 4G.

Le 404 n'a pas de `<title>`, pas de `lang` sur `<html>`, pas de `<h1>`, et l'audit le signale.
Le `--nav` de la page 404 n'a trouvé aucun lien cliquable (pas de navigation sortante).

## Audit (audit.mjs)

- Résumé : 0 FAIL, 3 WARN.
- WARN 1 : 404 sans `<h1>`.
- WARN 2 : pas de `robots.txt`.
- WARN 3 : pas de sitemap (le build a pourtant produit `sitemap-index.xml` dans `sites/huile-sur-le-feu-awwwards/dist`, à vérifier vis-à-vis du dossier servi).

Poids de la page la plus lourde : ~1027 KB (HTML 5, JS 61 gz, CSS 6 gz, polices 132, images 823).

## Divers

- `shoot.mjs` a lancé la page 404 comme sonde (URL inexistante volontaire).
- `planche.py` : les options `--colonnes` et `--largeur` sont lues par un `zip` décalé du script. La planche a bien été produite en 4 colonnes de 480 px (1920 px de large), mais la sortie est à vérifier si la largeur change.
