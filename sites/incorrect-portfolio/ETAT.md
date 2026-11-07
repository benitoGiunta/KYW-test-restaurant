# ETAT : incorrect-portfolio (phase 1 sur 3, construction)

## Fait
- Gabarit **affiche** copié et adapté (choix argumenté dans DESIGN.md). Build OK : `dist/incorrect/portfolio/` (6 pages : accueil, carte, histoire, reservation, a-emporter, 404).
- Contenu réel dans `src/data/site.ts` + `src/data/carte.json` (11 catégories tirées de donnees.json, prix « 14,50 € »). Pas d'e-mail, pas d'avis chiffré, pas de menus.
- Palette changée dans `tokens.css` (noms de jetons intacts) ; `Plat.astro` redessiné (Dwight Schrute) ; plan SVG de la visite refait ; R inversé `.rinv` ; favicon, OG.
- 8 photos : recadrages des 3 photos du client (`public/photos/`, WebP).
- noindex, mention « Maquette KYW… », KywFooter vérifiés dans les 6 HTML ; aucun tiret cadratin ; aucun reste des Potes au Feu.

## Reste (phases 2 et 3)
- Aucune QA navigateur faite : shoot, audit, clics réels de l'en-tête à 1440, capture du bas de page, mesures 320/360/390.
- Vérifier : titre du hero (« Incorrect » contour + « pizzeria » plein) à 1280x720 et 390 ; bento de 4 à 7 cartes (grille) ; galerie (cadres des vues 460x540 et 1560x395) ; carte `Suppléments` (7 petites cartes).
- Pastille « ouvert » calculée sur des horaires à confirmer (texte de repli : horairesResume) ; à tester par `page.clock`.
- Animations : drivers du gabarit inchangés (empile, galerie, marquee, claque) ; régler le plat 5 couches si le scrub est trop court.
- Contraste : jaune acide / rouge-orange à mesurer (axe) ; texte sur vert OK en théorie.
- `gabarits/UTILISATION.md` non mis à jour (gabarits/ protégé) : ajouter la ligne `affiche | incorrect`.

## Décisions et hypothèses
- Nom hero « Incorrect » (le Я absent d'Archivo) ; définition du nom marquée illustrative ; étapes « à emporter » marquées illustratives (modalités inconnues, Le Fooding mentionne la vente à emporter).
- Horaires : mar-ven 18h30-21h30, sam 12h-14h + 18h30-21h30 (« à confirmer ») ; absents du JSON-LD.
- Téléphone : 081 13 85 61 (site et sources majoritaires) ; celui de G&M écarté.
- Section « Avis » = titres de presse (ELLE, L'Avenir, G&M HIP), pas de témoignage client.
- Pas de photos libres : Picsum n'est pas de la cuisine.
