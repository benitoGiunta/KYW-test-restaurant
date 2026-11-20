# La Maison des Desserts : variante awwwards
**Concept** : « la journée de la maison », un cadran 8 h à 18 h dont l'aiguille et les couleurs suivent les tranches de la page. **Stack** : Astro 5 + GSAP + Lenis (OGL non : aucun besoin de WebGL, pas de loader). Base `/maison-des-desserts/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/maison-des-desserts-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent en session d'agent, et la phase test limite à 40 réponses. Aucun score jury, ni indépendant ni auto-notation. Le critique neuf reste à lancer (`/jury`). Preuves mesurées ci-dessous.

## Mesures (passe finale, serveur de production local)
- LCP mobile bridé : accueil 1712 ms (img), carte 1908 ms, réservation 1016 ms. CLS mobile : accueil 0,062 (cible 0,05, voir points non résolus), carte 0,004, réservation 0,006. loaderMs : sans loader.
- settledMs accueil : null (la lumière du hero bouge en continu, voulu). idleMotion : true (était false avant correction). FPS desktop 60, mobile 60 (plancher headless).
- Console 0 erreur, requêtes en échec 0, overflowX non (bureau et mobile), cibles petites : vides (étaient 3 à 4 par page). Reduced : hiddenText 0, moving false. Clavier : pas de focus invisible, pas de piège.
- Audit : 0 FAIL, 1 WARN (« no sitemap » : faux positif sous `base`, `sitemap-index.xml` présent). Titre d'accueil ramené sous 70 caractères, phrases répétées de la réservation supprimées.
- Poids : page la plus lourde ~750 Ko, JS 62 Ko gz, aucune police ttf/otf.

## Corrections de la passe
Titre d'accueil raccourci ; horaires regroupés (« Du mardi au samedi ») et variante « de 8 h à 18 h » au pied ; crédit photo non répété sur la réservation ; cibles tactiles des liens et du logo agrandies (padding vertical) ; lumière du hero : dérive de repos amplifiée (idleMotion true) ; survol du logo (soulignement + approche des lettres).

## Points non résolus
- [Performance] CLS mobile accueil 0,062 : un décalage de 4 px de tout le hero en fin d'intro, uniquement sous CPU 4x et 4G lente (0 sans bridage). Piste : `.hero__titre span { display: block }` touche aussi les spans créés par SplitText ; restreindre au sélecteur direct, ou réserver la hauteur du titre.
- [Accessibilité] 404 brute du serveur de QA : contraste de `.kyw-footer__note` (#6b787d sur #fbfaf8, 4,36:1) dans le paquet `packages/kyw-footer`, hors périmètre de ce site.
- [Survol] noHoverChange vide après correction du logo. `colorOnly` sur « Voir la carte » (x2) et « Ouvrir le plan » : le traitement est un soulignement qui s'épaissit et change de couleur, jugé suffisant, non lu à l'œil sur capture.
- [Jury] Pas de score ni de passe « retirer un accessoire » chiffrée ; accessoire le plus faible à couper : le rai de lumière du hero si le jury le trouve décoratif.

## Placeholders et hypothèses (à remplacer par le client)
Prix « à confirmer » : chocolat chaud viennois, mignardises 3,50 €. Fermeture « 20/12 et 31/12 à 17 h » incohérente : seul le 20/12 repris. Libellés « Après-midi », « Toute la journée » éditoriaux ; légendes = champ `sujet` des photos ; « baguette » d'après la photo 15. Aucun placeholder lorem, TODO ou example.com.

## Décisions de théâtre
Pas de loader (la page est servie en 1,7 s), pas de GL (concept horaire, pas matière). Repos : rai de lumière et aiguille en dérive lente.

## Leçons structurelles
Proposée dans data/usage/test-1/lecons-proposees/maison-des-desserts.md (idleMotion).
