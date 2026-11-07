# Revue awwwards · L'Essentiel · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : « le retrait », une table étoilée de Temploux dont la signature est un texte où des mots sont biffés jusqu'à « Il reste la table, le produit et la saison », encre, or et brique, Boska en titres. Idée intacte après la révision.

Méthode et hypothèses : dist (04:06) postérieur à `src/` (04:05) : build non relancé. `QA-revue2.md` ne couvre que accueil, carte et 404 brute (0 erreur, 0 axe sérieux, LCP mobile 1,1 à 1,2 s) ; je l'ai complété par deux scripts maison sur mon serveur (port 4627, PID 21890, tué) : 5 pages × 390, 768, 1024, 1440 px, axe-core complet, débordement des enfants, console/requêtes, h1, logo, noindex, mention, puis cas ciblés (réservation 390, rails, reduced-motion, LCP/CLS CPU x4 + 4G en 2 passes). 25 liens du `dist` : 0 interne mort. Scores = auto-notation (pas d'outil Agent).

Scores /10 :
- Design 8 : `res390-full.png` : réservation mobile redevenue une colonne propre, rythme clair/nuit conservé.
- Usabilité 8 : rails focusables (`tabIndex` 0, outline 3 px), 0 violation axe sur 20 cas, CTA et menu inchangés.
- Créativité 8 : signature « mots biffés » intacte (accueil, pied, 404) ; reduced-motion : 0 texte caché sur 3 pages.
- Contenu 7 : faits exacts (prix, chambres, fermetures, G&M, horaires, téléphone) et coulisses retirées ; reste le discours « nous retirons » et le chef sans réserve (F2).
- Technique 9 : 0 erreur console/requête, 0 axe (tous niveaux), 0 débordement, LCP mobile 1,25 s (accueil) / 1,07 à 1,10 s (réservation), CLS 0,017 / 0,003, deux passes concordantes.

## Vérification des corrections de REVISION-1
- F1-1 corrigé : grep « à confirmer », « n'en dit pas davantage » = 0 sur 5 pages ; la page La maison dit « Bénédicte et son équipe reçoivent dans ces salles. » (vrai). Voir cependant F2-A (chef).
- F1-2 corrigé : `.infos__col` = 1 colonne de 358 px à 390, 226,8 px à 768, 306,7 px à 1024, 436,5 px à 1440 ; `res390-full.png` : adresse, plan, horaires lisibles.
- F1-3 corrigé : `tabindex="0"` sur les deux `ul.bandes`, outline solide 3 px au focus ; axe `scrollable-region-focusable` absent à 390 sur accueil et histoire.
- F2-1 corrigé : `.gros__val` et `.pied__tel` en Hanken Grotesk (computed) ; `res390-tel.png` : « +32 81 56 86 16 » net, le « + » se lit.
- F2-2 corrigé : 1 `mailto`, placé dans « Adresse » ; « par e-mail » = 0 ; description « par téléphone ou sur le calendrier en ligne ».
- F2-3 partiel : « la mode » et « Comme chez nous » = 0, 404 « Il reste l'essentiel : » ; mais le bloc « Nous retirons le décor, l'effet, le détour, le bruit » reste énoncé comme parole de la maison (voir F2-B).
- F2-4 corrigé : `carte` ne rend plus qu'une vignette (petits gris, `09-plat-petit-gris`) ; 0 photo sur sole, Saint-Jacques, biche.
- F2-5 corrigé : « Moyens de réserver » ; plus de `landmark-unique` (0 violation axe sur reservation).
- F3 : non traités, voir ci-dessous (inchangés).

Aucun F0 : build servi, 0 erreur, 0 lien mort, 0 fait faux, mention « Maquette KYW, certaines données sont illustratives » + `.kyw-footer__logo` = 1 + `noindex, nofollow` (conforme au prompt § 3.3) sur les 5 pages, h1 unique partout, lang fr, JSON-LD présent.

## Findings
**F2-A · Chef nommé sans réserve** · `src/data/site.ts:125` (`chef: { nom: 'Raphaël Adam', role: 'chef', confirme: false }`), rendu sur `histoire` (« Raphaël Adam chef », capture `hist390-full-2col.png`). `donnees.json` : « chef (à confirmer) », source Rankeat signalée comme texte généré par IA ; le site client ne nomme personne. La révision a retiré le « à confirmer » du texte (F1-1) sans lever le doute ; la mention de pied de page est générique. Correction : retirer la ligne chef (la liste garde « Bénédicte et son équipe »), ou marquer la donnée comme illustrative sur la ligne même.

**F2-B · Positionnement « Nous retirons le décor, l'effet, le détour, le bruit » toujours présenté comme parole du restaurant** · `site.ts:137` (`biffes`), `index.astro:22,33,34` (défilé, section Retrait, texte `sr-only`). Le dossier n'en dit rien ; seule la baseline est `placeholder: true`. Correction : soit ancrer la phrase dans le dossier (« Nous retirons … » → formulation sur le produit et la saison), soit déclarer le bloc `placeholder` dans RAPPORT.md et le tenir comme parti pris d'agence ; la signature visuelle reste.

**F3-1** « Carte relevée à l'automne 2026 » en dur (`carte.astro:10`, `site.ts:67`), « selon Rankeat, le nombre varie selon les sources » sur l'accueil (cite la recherche) : neutraliser (« sources variables »). « fin non précisée » est fidèle à `donnees.json`, à garder.
**F3-2** « XVIIe » sans exposant dans les textes (accueil, carte, histoire, 404, `site.ts:14,16,129`) : `<sup>e</sup>` ou `font-variant-position`.
**F3-3** `og.png` pèse 515 Ko (> 300 Ko) : JPEG/WebP ≤ 150 Ko.
**F3-4** `05-salle-arche` : non remesuré, source inchangée (`photos.ts:7`) ; ajouter une largeur 800 aux `widths`.
**F3-5** Page courante « Réserver » : `.cta[aria-current='page']` (`site.css:53`) = carré + double liseré, encore visible sur `res390-tel.png` ; aligner sur l'état courant des liens.

## Ce qui est bien (à ne pas casser)
1. Signature « retrait » (mots biffés, « Reste : la table. », 404 « Cette page a été retirée. ») et reduced-motion lisible.
2. Exactitude : carte, menus, chambres (4, 120/150/20/30 €), 7 fermetures, horaires, téléphone, adresse, Michelin, G&M conformes à `donnees.json` ; section « Groupes et menus » conforme à `carte_notes`.
3. Technique : 0 axe sur 20 cas, LCP mobile ≈ 1,2 s, CLS ≤ 0,017, polices préchargées, focus visible, menu `dialog` accessible.
