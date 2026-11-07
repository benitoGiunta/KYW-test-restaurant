# DESIGN.md : L’Essentiel, variante awwwards « Le retrait »

## Brief
Restaurant gastronomique de Temploux (Namur), une étoile Michelin, installé dans une tannerie du XVIIe siècle. Publics : habitués et gastronomes du soir, convives du menu Affaire à midi (semaine), voyageurs et hôtes des chambres. Métier : réserver (calendrier du client, téléphone), lire la carte, venir. Contraintes : site statique, `base` /l-essentiel/awwwards/, pas de backend. Hypothèses : baseline inexistante chez le client (placeholder), chef à confirmer, pas d'avis ni de prix à la carte hors formule, année de l'étoile non affichée.

## Trois concepts
| | Phrase | Règle / verbe | Ancre | Orig. | Adéq. | Faisab. | Portab. |
|---|---|---|---|---|---|---|---|
| A. Le retrait (retenu) | Dépouiller pour garder l'essentiel : la tannerie retire le poil, la cuisine retire le superflu | titres en marge, mots biffés ; verbe RETIRER | nom « L'Essentiel » + tannerie du XVIIe | 4 | 5 | 5 | 2 |
| B. Deux assiettes | La carte est un diptyque : première et deuxième assiette | page en deux demi-colonnes ; verbe RÉPONDRE | formule « deux assiettes » à 90 € | 4 | 4 | 5 | 3 |
| C. Saison de gibier | La carte et le calendrier suivent la chasse, les fermetures sont publiées un an à l'avance | frise annuelle ; verbe SUIVRE | fermetures annuelles 2026-2027, gibier du Pays | 3 | 4 | 4 | 3 |
Test de l'échange : A échoue avec un autre restaurant (le nom et la tannerie portent la phrase). Choix : A, nom et lieu coïncident. B fournit le diptyque de la carte (accueil), C le détail du pied (fermetures annuelles).

## Système
- Palette (références réelles : panneau noir et tracé doré de l'enseigne, rideaux blancs de la salle, brique de la façade) : ground #eef0ee, ink #16130f, muted #5a544b, line #c9c9c2, accent texte #7b4b22 (brun de tannerie), or #d6b25e (sur noir seulement), curtain #16130f. Pas de crème + terracotta, pas d'acide sur noir, pas de dégradé.
- Typo : Boska 500/700 (display, prix) + Hanken Grotesk variable (texte, UI). Échelle fluide `--t-mega` à `--t-xs`, display interligne 0,95 et interlettrage -0,03em, corps 16-17 px, insécables (« 90 € », « 12 h »).
- Grille : 12 colonnes, marge de titres colonnes 1 à 3 et contenu dès la colonne 4 (ligne forte), filet 1,5 px au-dessus de chaque titre ; rayon 0.
- Hovers : CTA = l'or monte depuis le bas ; nav = trait qui biffe le lien ; lignes de carte = décalage de 0,75 rem ; liens texte = soulignement qui épaissit.
- Mouvement (phase 2) : easing `ease.out`/`inOut`, rideau noir en transition, signature : la phrase « Nous retirons … » dont les mots se biffent un à un au défilement jusqu'à ne laisser que « il reste la table, le produit et la saison ». Repos : trait biffé qui respire à peine (à décider en phase 2).
- Plan : accueil = poster (nom plein cadre + façade), statement noir, données (3 faits), diptyque + bandes, paire asymétrique, plein cadre, pied. Carte = index à vignettes, menus noirs. Histoire = mur, texte, chambres. Réservation = trois gros liens, infos, fermetures. Mobile 390 : une colonne, bandes en rail `scroll-snap`.
- Généricité : « un modèle atterrirait-il ici ? » Oui sur le hero (nom + photo) : corrigé par le nom en pleine largeur et la marge de titres ; pas d'eyebrow décoratif ni de 01/02/03.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts notés, ancre, test : tableau ci-dessus. 2. Aucun exemple de la skill repris tel quel. 3. Concept Card : phrase, règle, verbe, ancre. 4. Concept au pied (« Reste : la table. »), carte (marge, filets), réservation, 404 (« Cette page a été retirée », mot biffé) : src/components/Footer.astro, src/pages/404.astro. 5. Moment signature et recette : le retrait (phase 2). 6. Palette 6 rôles : src/styles/tokens.css:13-23. 7. Aucun des défauts listés (palette, polices, eyebrow, verre dépoli). 8. Test de généricité : ci-dessus. 9. Sélection (`::selection` or sur noir), focus dans l'accent, favicon (barre dorée biffée), OG composée (public/og.png), pied final, 404 : faits sauf OG vérifiée visuellement (phase 3).
10. Polices : Boska, Hanken (public/fonts, 3 fichiers). 11. Échelle fluide unique (tokens.css). 12. Display réglé (.display). 13. Corps/UI ≥ 13 px. 14. Typographie française : apostrophes courbes, insécables dans site.ts. 15. Grille et marge de titres (site.css `.marge`). 16. Une famille de section au plus une fois par page : respecté. 17. Hero en 3 s : nom, cuisine, CTA visibles à 1440×900, 1280×720, 1024×768, 390×844 (mesuré, aucun `.display` sous la gouttière après retrait de la marge négative). 18. Mobile 390 recomposé : une colonne, bandes en rail snap.

## Mouvement (phase 2, décidé)
- Pilote `src/motion/retrait.ts`, appelé une fois par `src/motion/setup.ts`. Variable : ce que la maison retire. Elle porte la signature (biffage scrubbé), le repos (écoulement des mots retirés) et la transition (trait d'or qui biffe l'écran).
- Signature : la section noire « Le retrait » s'épingle (`start: 'top top'`, `pin: true`, `scrub: 0.6`, 1,5 écran) ; chaque mot reçoit un filet d'or (`::after`, `scale: var(--b) 1`) et passe du blanc au gris ; « Il reste la table, le produit et la saison » se lève en dernier, puis tenue. Repli statique (réduit, sans JS) : tout est biffé d'office, « Il reste » visible.
- Repos : bande « Retirés : le décor · l'effet … » sous les CTA du hero, écoulement constant 32 px/s par `gsap.ticker` + `gsap.utils.wrap`, accéléré par la vitesse de défilement (`onScroll`), incliné par le pointeur (±45 %), en pause hors écran (IntersectionObserver), immobile en mouvement réduit. Copie décorative `aria-hidden`.
- Transition : trait d'or tiré de gauche à droite (0,35 s), le noir s'ouvre depuis ce trait (0,5 s), puis se retire vers la droite (0,75 s). Réduit : fondu de l'engine.
- Loader : aucun (le retrait refuse le théâtre d'attente ; décision écrite). GL : aucun, sans objet (concept typographique). Curseur suiveur : aucun (curseur natif seul).
- Intro : titre peint d'emblée (LCP), lieu en `data-split="lines" data-intro`, photo du hero qui se pose (échelle 1,08 vers 1, transform seul) ; pages intérieures : chapeau en `data-split` intro.
- Hovers (2 traitements + soulignés) : biffage (nav, bouton Menu, liens du volet) ; or qui monte (CTA) ; liens texte soulignés au repos (épaississement, décalage du soulignement pour les utilitaires) ; lignes de carte décalées.
- Mobile : bouton « Menu » (`<dialog>` plein écran noir, liens Boska, appel en pied). Statut du jour calculé depuis les horaires (heure de Bruxelles, fermetures annuelles incluses), `src/motion/statut.ts`.

## Sur-utilisation de la skill (phase 2)
19. [x] Menu mobile : src/components/Header.astro (`aria-expanded`, `aria-controls="volet"`), src/motion/volet.ts (piège Tab, Échap natif du dialog, focus rendu au bouton) ; test Playwright 390 px : ouvert true, focus « Accueil », 6 Tab restent dans le volet, Échap ferme, focus « Menu ».
20. [x] Engine verbatim (src/engine/), `astro.ts`, `transition:persist` sur `#curtain` (src/layouts/Base.astro:73), `transition:animate="none"` (Base.astro:36). Pas de `#gl` ni `#cursor` (sans objet).
21. [x] Une horloge : grep `addEventListener('scroll'|requestAnimationFrame` dans src/motion, src/pages, src/components = 0 (seuls l'engine verbatim et son repli natif réduit).
22. [x] Code de page dans `onPage()` avec nettoyage (retrait.ts:103, volet.ts, statut.ts).
23. [x] Aucune CSS `transform` sur élément GSAP : le filet du biffage passe par `scale: var(--b)` (GSAP n'anime que `--b` et `color`), `.defile__piste`, `.curtain__panel`, `.hero__media img`, `.plein img` sans transform CSS.
24. [x] Module pilote avec `startIdle` (retrait.ts:56) et pointeur (retrait.ts:100).
25. [x] Loader : aucun, décision écrite ci-dessus.
26. [x] Transition du concept : sortie 0,85 s, entrée 0,75 s (retrait.ts:14-33).
27. [x] Intro `data-intro` (hero__lieu, chapeaux), titre peint au premier frame.
28. [x] Épinglage conforme (retrait.ts:48), section plafonnée en `svh` (`min(var(--t-xl), 8svh)`).
29. [x] Repli statique dessiné : `html:not(.motion)` garde la phrase biffée et « Il reste » visible ; test réduit : `hidden` = 0, pas de `is-scene`.
30. [x] Copies décoratives `aria-hidden` (bande du hero, phrase biffée doublée d'un `sr-only` ; l'`aria-label` sur `<p>` de la phase 1 est retiré).
31. [x] Une famille d'easing (`ease.*` de l'engine), stagger de l'engine (35 à 80 ms).
32. [x] Un traitement par rôle, trois au total (biffage, or qui monte, soulignement).
33. [x] Hovers sous `(hover: hover)`, mêmes états sur `:focus-visible` et `:active` (site.css).
34. [x] Liens texte soulignés au repos (`.lien`, `.lien-util`), pied KYW souligné au survol.
36. [ ] `idleMotion` à prouver par report.json (phase 3) ; mesuré : 48 px de translation en 1,5 s sur 437 × 40 px à 1440×900.
37. [x] Curseur natif seul, rien ne dépend du survol au toucher (le pointeur ne fait qu'incliner la vitesse).
38. [x] Pas de blur animé, pas de `box-shadow` au scroll, pas de `will-change`.
39. [x] Réduit : ni Lenis (engine), ni scrub, ni loader ; bande immobile ; à confirmer par report.json.
40. [x] GL sans objet, décision écrite.
44. [x] Skip link en premier (Base.astro), focus dans l'accent, or sur noir (volet, pied, nuit).
47. [x] Bouton Menu 66 × 44 px, « Réserver » 44 px de haut (mesuré).
