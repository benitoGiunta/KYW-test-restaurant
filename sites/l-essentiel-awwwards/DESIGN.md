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
