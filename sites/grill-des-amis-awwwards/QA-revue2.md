# QA revue 2 : grill-des-amis, variante awwwards (captures)

Serveur local `dist/` sur le port 4502, build `dist/grill-des-amis/awwwards/`, sans modification de source.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/grill-des-amis/awwwards/` | `.shots-grill-des-amis-awwwards-revue2/home/` | `.shots-grill-des-amis-awwwards-revue2/home/planche.png` |
| Carte `/grill-des-amis/awwwards/carte/` | `.shots-grill-des-amis-awwwards-revue2/grill-des-amis-item/` | `.shots-grill-des-amis-awwwards-revue2/grill-des-amis-item/planche.png` |
| 404 (page introuvable, générée par le serveur) | `.shots-grill-des-amis-awwwards-revue2/404/` | `.shots-grill-des-amis-awwwards-revue2/404/planche.png` |

Les planches ont été générées avec `scripts/planche.py` ; les options `--colonnes` et `--largeur` n'ont pas été reconnues par le script (elles ont été lues comme des fichiers et ignorées), la planche est donc en largeur par défaut (1920 px).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| LCP desktop | 184 ms | 172 ms | 36 ms |
| LCP mobile (throttled) | 1192 ms | 1088 ms | 248 ms |
| CLS desktop | 0,002 | 0 | 0 |
| CLS mobile | 0,005 | 0 | 0 |
| FPS scroll mobile | 60 | 60 | 61 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments cachés (WebGL) | 0 | 0 | 0 |
| Clavier : arrêts de focus | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Clavier : lien d'évitement en premier | non | non | non |
| Survol : cibles / sans changement / couleur seule / recouvertes | 7 / 0 / 1 / 0 | 7 / 0 / 2 / 0 | 0 / 0 / 0 / 0 |
| Mouvement réduit : texte caché / encore animé | 0 / non | 0 / non | 0 / non |
| Axe : violations (sérieuses) | 0 (0) | 0 (0) | 2 (2) |
| Axe : contraste à vérifier | 7 | 3 | 0 |

Violations axe sur la 404 : `document-title` (pas de `<title>`) et `html-has-lang` (pas d'attribut `lang` sur `<html>`), une occurrence chacune.

Le crawl a trouvé 4 pages ; la page la plus lourde (accueil) pèse environ 922 KB (html 5, JS 61 gz, CSS 6 gz, polices 138, images 711).

## Audit (`audit.mjs`)

Résumé : **0 FAIL, 4 WARN**.

- WARN `/grill-des-amis/awwwards/carte/` : phrase répétée 2 fois : « Les grillades au feu de bois ».
- WARN site : la page 404 n'a pas de `<h1>`.
- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap`.

Journaux : `.logs/grill-des-amis-awwwards-revue2-build.log`, `.logs/grill-des-amis-awwwards-revue2-shoot.log`, `.logs/grill-des-amis-awwwards-revue2-audit.log`.

Note : le build a produit `sitemap-index.xml` dans `dist/` ; l'audit signale pourtant « no sitemap ». Écart à vérifier, non tranché ici.
