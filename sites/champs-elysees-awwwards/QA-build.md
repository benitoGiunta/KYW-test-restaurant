# QA build : champs-elysees / awwwards

Build : `dist/champs-elysees/awwwards/` (5 pages construites, exit 0). Serveur local : `http://127.0.0.1:4502/champs-elysees/awwwards/`.

Captures et planches (chemins absolus) :

## Page home

- URL : http://127.0.0.1:4502/champs-elysees/awwwards/
- Dossier captures : /home/user/KYW-test-restaurant/.shots-champs-elysees-awwwards-build/home
- Planche : /home/user/KYW-test-restaurant/.shots-champs-elysees-awwwards-build/home/planche.png

- Erreurs console : 0 ; requetes en echec : 0
- desktop : LCP 112 ms (img), CLS 0, chargement 234 ms, hauteur 8003 px, debordement horizontal false, elements debordants 0, h1 ["Champs\nÉlysées"], cibles tactiles petites 4, canvas WebGL masques 0, FPS scroll 60 (pire trame 17 ms)
- mobile : LCP 1656 ms (img), CLS 0, chargement 2579 ms, hauteur 7276 px, debordement horizontal false, elements debordants 0, h1 ["Champs\nÉlysées"], cibles tactiles petites 4, canvas WebGL masques 0, FPS scroll 60 (pire trame 17 ms), throttle true
- Clavier : arrets 12, lien d'evitement en premier false, focus non visible 0, focus invisible 0, bloque false
- Survol : cibles 7, sans changement 1, couleur seule 2, recouvertes 0, curseur suiveur false
- Mouvement reduit : texte cache 0, elements animes false
- axe : violations 0 (serieuses 0), contraste a verifier 28

## Page champs-elysees-item

- URL : http://127.0.0.1:4502/champs-elysees/awwwards/carte/
- Dossier captures : /home/user/KYW-test-restaurant/.shots-champs-elysees-awwwards-build/champs-elysees-item
- Planche : /home/user/KYW-test-restaurant/.shots-champs-elysees-awwwards-build/champs-elysees-item/planche.png

- Erreurs console : 0 ; requetes en echec : 0
- desktop : LCP 76 ms (h3#t-a-partager-ou-pas), CLS 0, chargement 106 ms, hauteur 17028 px, debordement horizontal false, elements debordants 0, h1 ["La carte"], cibles tactiles petites 3, canvas WebGL masques 0, FPS scroll 60 (pire trame 17 ms)
- mobile : LCP 1020 ms (p.lead), CLS 0, chargement 1843 ms, hauteur 12559 px, debordement horizontal false, elements debordants 0, h1 ["La carte"], cibles tactiles petites 3, canvas WebGL masques 0, FPS scroll 60 (pire trame 17 ms), throttle true
- Clavier : arrets 12, lien d'evitement en premier false, focus non visible 0, focus invisible 0, bloque false
- Survol : cibles 7, sans changement 2, couleur seule 0, recouvertes 0, curseur suiveur false
- Mouvement reduit : texte cache 0, elements animes false
- axe : violations 0 (serieuses 0), contraste a verifier 21

## Page 404

- URL : http://127.0.0.1:4502/__shoot-missing-page-1795208257382
- Dossier captures : /home/user/KYW-test-restaurant/.shots-champs-elysees-awwwards-build/404
- Planche : /home/user/KYW-test-restaurant/.shots-champs-elysees-awwwards-build/404/planche.png

- Erreurs console : 0 ; requetes en echec : 0
- desktop : LCP 48 ms (p), CLS 0, chargement 26 ms, hauteur 900 px, debordement horizontal false, elements debordants 0, h1 ["Page introuvable"], cibles tactiles petites 1, canvas WebGL masques 0, FPS scroll 61 (pire trame 17 ms)
- mobile : LCP 280 ms (p), CLS 0, chargement 441 ms, hauteur 844 px, debordement horizontal false, elements debordants 0, h1 ["Page introuvable"], cibles tactiles petites 1, canvas WebGL masques 0, FPS scroll 61 (pire trame 17 ms), throttle true
- Clavier : arrets 3, lien d'evitement en premier false, focus non visible 0, focus invisible 0, bloque false
- Survol : cibles 2, sans changement 2, couleur seule 0, recouvertes 0, curseur suiveur false
- Mouvement reduit : texte cache 0, elements animes false
- axe : violations 1 (serieuses 1), contraste a verifier 0

## Audit (scripts awwwards audit.mjs)

- Couverture : la capture (`shoot.mjs --crawl`) a visite 2 pages (`/champs-elysees/awwwards/`, `/champs-elysees/awwwards/carte/`) plus la sonde 404 ; l'audit en a crawle 4. La page `/champs-elysees/awwwards/histoire/` n'a pas de dossier de captures ni de planche.

Audit (`audit.mjs`, journal `.logs/champs-elysees-awwwards-build-audit.log`) :

- Resultat : 0 FAIL, 3 WARN.
- WARN `/champs-elysees/awwwards/histoire/` : phrase repetee 2 fois : « Source : La DH, 4 août 2024. »
- WARN site : pas de robots.txt.
- WARN site : pas de sitemap (le build a pourtant ecrit `sitemap-index.xml`).
