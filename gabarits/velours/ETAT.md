
## Étape 2 (en cours) : sources
Faits : DESIGN.md, site.ts (chiffres, distinctions, citation, privatisation, drapeaux par donnée), tokens.css, Base.astro
(font-face, preloadImage), Header/Loader/Footer, motion/setup.ts, patch reveal.ts (lines,words,chars). Reste : base.css, pages.

## Étape 3 (en cours) : build + QA
- Sources complètes : base.css, pages index/menu/carte/histoire/privatisation/reservation/404, Chapitre.astro, HeroPage.astro.
- Build OK. Pré-contrôle Playwright (scratchpad) : 0 erreur console sur 14 vues, aucun élément resté caché, compteurs à leur
  valeur ; débordement desktop du « 67 » corrigé (chiffre inverse sur le coin intérieur).
- Serveur 4412 lancé (PID dans `.shots-velours/serve.pid`, arrêt par ce PID seulement). Shoot des 7 pages + audit en arrière-plan
  (`.shots-velours/journal.log`, ligne DONE à la fin ; planches `.shots-velours/planche-<page>.png`).
- Passe 1 index lue (report + planche) : LCP 212 ms desktop / 1 228 ms mobile throttlé, CLS 0, 0 console, 0 débordement,
  reduced hiddenText 0, 1 axe serious (nom accessible de la marque, corrigé : aria-label commence par « LPF »), chiffre des
  chapitres non inversés coupé au bord gauche (corrigé : coin intérieur), vide de 400 px après la citation (corrigé).
  Les corrections sont dans src/ ; rebuild et re-shoot de l'index après la ligne DONE (ne pas vider dist/ pendant le shoot).
- Passe 1 menu/carte/histoire lue : 0 console, 0 débordement, CLS 0, LCP mobile 1,1 à 2,2 s ; axe « list » sur le menu
  (h2 dans l'ol, corrigé dans src) ; portraits mesurés 3:4 (OK, la planche trompait).
- Passe 1 privatisation/reservation/404 lue : 0 console, 0 débordement, CLS ≤ 0,026, LCP mobile ≤ 1,4 s. `keyboard.stuck`
  sur la réservation = le champ date natif qui consomme Tab dans ses segments en headless (faux positif, inchangé).
  Audit : 0 FAIL, WARN normaux sous base (robots, sitemap, 404 de l'origine) + horaires identiques mercredi/vendredi.
- Rebuild avec les corrections (chiffre coin intérieur, vide après citation, aria-label marque, ol du menu). Passe 2 en arrière-plan
  (`.shots-velours/journal2.log`, DONE2) : shoot index2 + menu2, audit-velours-2.txt, apercu.png, puis arrêt du serveur par son PID.

## Étape 4 (faite) : passe 2 et livraison
- Passe 2 (index2, menu2) : 0 console, 0 axe, 0 débordement, CLS 0, LCP desktop 196 à 412 ms, mobile 1,2 à 1,4 s ;
  audit-velours-2.txt 0 FAIL (9 WARN normaux). apercu.png posé, serveur 4412 arrêté par son PID (journal2.log).
- Livrables : DESIGN.md, FICHE.md, RAPPORT.md, apercu.png, dist/gabarits/velours/. README du socle retiré du gabarit.
- Reste pour les agents suivants : jury / revue (agent distinct), puis corrections ; ne pas commiter ici (orchestrateur).
