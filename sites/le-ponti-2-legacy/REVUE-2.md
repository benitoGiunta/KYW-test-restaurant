# Revue legacy · Le Ponti 2 · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 1 F2, 2 F3)
Lecture en une ligne de l'idée du site : trattoria en crème, bordeaux et or, accueil en sommaire typographique de la carte (neuf rubriques, deux photos), encart « Menu 3 services 40 € », puits d'horaires avec état ouvert/fermé, réservation Barestho partout.

Preuves : `QA-revue2.md` absent ; `.shots-le-ponti-2-legacy-revue2` (05:35, postérieur au dist de 05:32) réutilisé pour l'accueil (menu en échec « browser closed »). Reste mesuré par scripts maison via q.sh sur mon propre serveur (port 4621, tué) : axe (wcag2a/aa/21aa/best-practice), console, requêtes, débordement, cibles, landmarks, balises sur 4 pages x 1440/390/320 ; captures 1440 et 390 de l'accueil, de la carte et de /contact/ ; liens et ancres par curl ; LCP/CLS mobile sous CPU x4 + 4G lente, 3 passes en série.

Scores /10
- Design 8 : sommaire désormais en lignes typographiques à filet avec deux photos (home-d-cats, home-m-1/2) ; plus de cadres vides ; hiérarchie et palette intactes.
- Usabilité 8 : 0 cible < 24 px à 1440/390/320 (`small` vide sur 4 pages), nav « Principale » + « Rubriques de la carte », 0 lien mort, 9 ancres de rubrique présentes.
- Créativité 6 : propre et cohérent, mais convenu ; la signature tient au puits d'horaires et à l'encart 40 €.
- Contenu 8 : inchangé depuis la passe 1 (faits et carte conformes), « le midi comme le soir » remplace l'anglicisme ; aucune invention.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement, axe 0 violation sur 12 mesures ; mais LCP mobile 3,0 s (F2-A).

## Vérification de chaque correction annoncée par REVISION-1
- F1-1 corrigé : `.cat__n` = 0, 9 `.cat` dont 2 images, hauteur `.cats` 721 px à 1440 et 1833 px à 390 (contre environ 1 900 px de défilement mobile avant pour le seul sommaire ; ici 9 lignes lisibles, home-m-1/2/3). Aucune case vide.
- F2-1 corrigé : liste des cibles < 24 px vide sur accueil, carte, contact et 404 aux trois largeurs, inline compris.
- F2-2 corrigé : régions de /contact/ « Coordonnées du restaurant » (pied) ; axe 0 violation sur contact aux trois largeurs.
- F2-3 corrigé : héros `object-position: 50% 45%` (home-d-0 : verre entier, assiette lisible) ; façade de /contact/ `50% 14 %` (contact-m-0 : enseigne « Le Ponti 2 » visible à 390 px). Le recadrage mobile, non recapturé par le réviseur, est vérifié ici.
- F3-1 corrigé : `navs` = « Principale » (accueil, contact, 404) et « Principale | Rubriques de la carte » sur /menu/.
- F3-3 corrigé en partie, comme annoncé : « le midi comme le soir » en place ; descriptions 13 px et méta 14 px inchangées.
- F3-4 corrigé : `.cat:hover` passe la bordure haute à la couleur d'accent et souligne le titre (`page.css:64-67`) ; `noHoverChange: 0` sur l'accueil (report de 05:35).
- F3-2 refusé : favicon `data:,` et og:image acceptés pour une maquette, je confirme (F3).
- Aucune régression : mention KYW, un seul logo `kyw-footer`, `noindex`, `lang="fr"`, un seul h1, titres uniques sur les 4 pages ; 0 tiret cadratin dans `src/`.

## Findings
### F2 (mineur)
**F2-A · LCP mobile 3,0 s (> 2,5 s)** : 2 996, 2 988 et 3 004 ms sur trois passes (CPU x4, 4G lente), identique au `summary.json` de l'agent captures (2 976 ms) ; CLS 0,018 correct. L'élément LCP est l'image du héros, `pates-2000.webp` (196 Ko, 1448 x 1086) servie sans `srcset` à 390 px, alors que `pates-900.webp` (107 Ko) existe dans `dist/…/photos/`. La passe 1 annonçait 2 040 ms : écart de protocole (le fichier héros n'a pas changé entre les deux passes), à ne pas lire comme une régression de la révision. Correction attendue : `srcset="pates-900.webp 900w, pates-2000.webp 2000w"` avec `sizes="100vw"` sur l'image du héros (`index.astro`), garder `fetchpriority="high"`.

### F3 (finition)
- **F3-A** Accueil à 1440 px : la grille à trois colonnes aligne des lignes de texte (Salades, Viandes) à côté de photos hautes, d'où un vide sous elles (home-d-cats, colonne de droite sous « Salades »). Option : `align-self: start` sur les lignes typographiques ou une photo en pied de rangée.
- **F3-B** Tailles : descriptions de plats 13 px et sous-titres de rubrique 14 px, un cran sous le corps (inchangé, décision du réviseur). Passer à 14 px et 15 px suffirait.

## Ce qui est bien (à ne pas casser)
1. Le sommaire typographique : filets bordeaux, nom en serif, plage de prix, survol à bordure d'accent ; les deux photos (pizzas, escalopes) donnent le seul rythme visuel nécessaire.
2. La carte complète : encart 40 €, index collant étiqueté, prix alignés, 0 débordement à 320 px.
3. Le puits d'horaires avec état calculé et jour courant surligné, et la barre mobile à 64 px.

Limites : sloplint `--render` et jury non lancés (échec en root, noté dans RAPPORT.md) ; menu mobile et état d'ouverture non remesurés (non touchés par la révision).
