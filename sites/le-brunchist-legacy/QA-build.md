# QA build : le-brunchist / legacy (passe build, phase test)

Build : `scripts/q.sh le-brunchist-legacy-build-build` → exit 0, sortie `dist/le-brunchist/legacy/`.
Serveur local : `dist` sur http://127.0.0.1:4503/le-brunchist/legacy/ (arrêté après les captures).
Captures : `shoot.mjs --crawl --nav` → 2 pages (l'accueil et une page 404 de contrôle). Journal : `.logs/le-brunchist-legacy-build-shoot.log`.
Audit : `audit.mjs` → 1 page crawlée, **0 FAIL, 8 WARN**.

## Pages

### Accueil (`/le-brunchist/legacy/`)
- Dossier de captures : `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-build/home/planche.png` (14 vignettes)
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 0 violation, 0 serious · contrast à vérifier manuellement : 11
- CLS : desktop 0.004 · mobile 0.002
- LCP : desktop 480 ms (élément `img`) · mobile 1560 ms (élément `img`)
- Chargement : desktop 764 ms · mobile 2171 ms
- Débordement horizontal : non (desktop et mobile)
- Cibles tactiles trop petites : desktop 8 · mobile 7
- Clavier : 12 arrêts de tabulation, focus invisible 0, focus non visible 0, lien d'évitement en premier : non, focus bloqué : non
- Survol : 2 liens en couleur seule (`Voir la carte`, `Itinéraire`), 2 liens sans changement au survol (`Appeler le café`, `Le Brunchist`), 0 élément recouvert, 4 cibles
- Mouvement réduit : 0 texte caché, animations actives : non
- WebGL : non détecté (glOn false) · FPS défilement desktop : 60 (pire trame 33 ms)
- H1 : « Brunch fait maison, au centre de Namur. » · titre : « Le Brunchist, brunch et café de spécialité à Namur »

### Page 404 (contrôle, `__shoot-missing-page-…`)
- Dossier de captures : `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-build/404/planche.png` (19 vignettes)
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 1 violation `color-contrast` (impact serious, 2 nœuds)
- CLS : desktop 0 · mobile 0
- LCP : desktop 44 ms (élément `p`) · mobile 216 ms
- Débordement horizontal : non
- Cibles tactiles trop petites : desktop 1 · mobile 1
- Clavier : 3 arrêts de tabulation, aucun focus invisible, lien d'évitement en premier : non
- Survol : 2 liens sans changement au survol (`la page d'accueil`, `Réalisé par`)
- H1 : « Page introuvable » · titre : « Page introuvable · KYW »

## Audit (`audit.mjs`) : lignes FAIL et WARN

FAIL : aucune.

WARN (8) :
1. `/le-brunchist/legacy/` : phrase répétée 5 fois : « 9 h 30 à 15 h 30 »
2. `site` : pas de robots.txt
3. `site` : pas de sitemap
4. `/le-brunchist/legacy/` : police TTF/OTF livrée : `O4ZOFGb7hR12Bxqt9ErXQpCpkHScyovU2HA.ttf` (woff2 attendu)
5. idem : `Fh4hPjjqNDz1osh_jX9YfjudpBJBNV5y5wf_k1i58ThUcA.ttf`
6. idem : `ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`
7. idem : `ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_NcgWZa4Q.ttf`
8. idem : `ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_NcbWFa4Q.ttf`

Poids : page la plus lourde ~818 KB (HTML 5, JS 1 gz, CSS 5 gz, polices 298 KB, images 508 KB).

## Remarques d'outil (faits)
- `scripts/planche.py` : les options `--colonnes` et `--largeur` sont lues comme des fichiers si elles précèdent les images ; les planches ont été produites (1920 px de large, 4 colonnes) avec `--colonnes 4 --largeur 480` placés en fin de commande, mais le script ne les traite pas de façon fiable dans cet ordre. Journaux : `.logs/le-brunchist-legacy-build-planche-home.log`, `.logs/le-brunchist-legacy-build-planche-404.log`.
- Le crawl n'a trouvé qu'une page : la couverture des pages internes n'est pas mesurée par cette passe.
- Le hook de sobriété a refusé un `curl` nu et un `python3 scripts/planche.py` nu : relancés via `scripts/q.sh`.
