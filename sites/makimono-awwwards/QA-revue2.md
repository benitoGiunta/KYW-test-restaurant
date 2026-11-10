# QA revue 2 — makimono / awwwards

Build : `node scripts/build-site.mjs sites/makimono-awwwards` (exit 0, 5 pages, `dist/makimono/awwwards/`).
Serveur : `http://127.0.0.1:4502/makimono/awwwards/` (processus déjà présent, PID 3245, même dépôt ; non arrêté).
Captures : 3 pages crawlées (accueil, carte, 404), 4 URL auditées par `audit.mjs`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/makimono/awwwards/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-revue2/home/planche.png` |
| Carte `/makimono/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-revue2/makimono-item/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-revue2/makimono-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-revue2/404/planche.png` |

## Chiffres (report.json / summary.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations serious | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Axe, contrast à vérifier | 23 | 10 | 0 |
| LCP desktop (ms) | 156 (img) | 124 (h1) | 60 (pre) |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile (ms, throttlé) | 1552 (img) | 1060 (p) | 220 (pre) |
| CLS mobile | 0.003 | 0 | 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché (mode réduit) | 0 | 0 | 0 |
| Mouvement en mode réduit | non | non | non |
| Tabulation : arrêts | 12 | 12 | 1 (sortie de page) |
| Tabulation : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Tabulation : piégé | non | non | non |
| Lien d'évitement en premier (`skipLinkFirst`) | false | false | false |
| H1 | MAKIMONO | LA CARTE | aucun |
| Titre `<title>` | présent | présent | vide |

Notes : le 404 n'a aucun lien testable (`--nav` : aucun lien trouvé). Sur l'accueil et la carte, le premier arrêt clavier est « Aller au contenu », mais `skipLinkFirst` reste à false dans le rapport.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 6
  - `/makimono/awwwards/carte/` : phrase répétée 2 fois, « dès 8,20 € Choisir la protéine Saumon 8,50 € »
  - `/makimono/awwwards/carte/` : phrase répétée 2 fois, « dès 8,10 € Choisir la protéine Saumon 8,40 € »
  - `/makimono/awwwards/carte/` : phrase répétée 2 fois, « dès 11 € Choisir la protéine Saumon 12 € »
  - site : la page 404 n'a pas de `<h1>`
  - site : pas de `robots.txt`
  - site : pas de `sitemap`
- Poids le plus lourd : `/makimono/awwwards/` ~971 KB (HTML 7, JS 60 gz, CSS 7 gz, polices 88, images 809)

## Divers

- `git status` montre `data/suivi.html` modifié. Ce fichier n'a pas été touché par cette passe ; à vérifier avant tout commit.
- Le port 4502 était déjà occupé au lancement : le serveur lancé par cette passe a quitté (erreur d'adresse). Les captures ont été prises sur le serveur existant.
- Planches : les options `--colonnes 4 --largeur 480` ont été appliquées (largeur 1920 px) ; le script affiche des lignes « ignoré » pour les valeurs des options, sans effet sur le résultat.
