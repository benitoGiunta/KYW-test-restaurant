# DESIGN.md · Li Micougni · variante awwwards « Les demi-fous »

## Brief
- **Sujet** : Li Micougni, restaurant ouvert en 2026, Rue des Brasseurs 110, 5000 Namur. Produits locaux et de saison, ardoises à partager, grillades au charbon de bois, terrasse de 30 couverts en cour privée (donnees.json, dossier.md du 10/11/2026).
- **Publics** : le midi (mercredi à vendredi, à confirmer), le soir, les touristes du centre historique, les habitués, les groupes (privatisation). **Métier du site** : réserver (téléphone d'abord), consulter la carte, venir.
- **Ressources** : 17 photos du client (salle, terrasse, grill, ardoises, plats, polaroïds, logo), carte complète de 50 lignes, logo (coq, clocher, pont). Ni façade, ni équipe, ni avis, ni GPS.
- **Contraintes** : site statique Astro sous `base` /li-micougni/awwwards/, réservation sans backend, noindex.
- **Hypothèses** : adresse d'exploitation (pas le siège BCE) ; horaires non publiés donc tous marqués « à confirmer », aucun `OpeningHoursSpecification` ; aucun plat, avis ni prénom inventé ; histoire reformulée depuis le site du client sans nommer de personne.

## Trois concepts
| | Territoire | Phrase | Règle de mise en page | Verbe | Ancre | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|---|---|---|
| A. **Les demi-fous** | nom, étymologie | Chaque titre est coupé en deux moitiés décalées ; elles se recollent quand on s'attable. | Toute grande ligne est coupée à 55 % de sa hauteur, moitié basse décalée de 0,07 em ; le pied recolle le nom. | recoller | Le nom wallon : « vous êtes tous les bienvenus, même les demi-fous » (site du client) | 4 | 5 | 5 | 1 |
| B. **La girouette** | lieu, culture | Le coq du logo tourne vers le vent : la page se tourne vers l'heure du service. | Boussole d'orientation fixe en marge. | pivoter | Coq, clocher et pont du logo | 3 | 3 | 4 | 4 (tout coq wallon l'utiliserait) |
| C. **L'ardoise à partager** | matière, service | Le site est une ardoise posée entre deux convives. | Blocs en paires, craie sur ardoise. | glisser | Ardoises « pour deux », ardoise gravée au logo | 3 | 5 | 4 | 2 |

**Choix : A.** Test de l'échange : la phrase ne tient avec aucun autre restaurant (elle repose sur le nom). B est écarté (portable, et un coq est un décor), il ne fournit que le logo du pied. C est écarté comme structure, il fournit un détail : la section « Les ardoises, pour deux » et la palette ardoise et craie. Aucun exemple travaillé de concepts.md n'est repris (ni braise qui refroidit, ni pavage, ni cadre, ni solde courant, ni phrase unique).

## Concept Card
```
Idée:        Chaque titre de Li Micougni est coupé en deux moitiés décalées, comme les « demi-fous » que le nom wallon accueille ; elles ne se recollent qu'à table.
Métaphore:   Le demi et l'entier : la demi-portion, la demi-folie, l'ardoise qui se partage à deux. Personne n'est entier tout seul.
Signature:   Le recollement : la moitié haute et la moitié basse d'un titre glissent jusqu'à s'aligner (--ecart de 0,07 em vers 0), recette scrub de motion.md ; au pied, le nom est déjà recollé et passe en orange.
Émotion:     Espièglerie chaleureuse : on pousse une porte où personne ne se prend au sérieux, mais la cuisine est sérieuse.
Verbe:       RECOLLER : deux moitiés se rejoignent sec (ease.out), avec un léger jeu à l'arrivée, jamais d'élastique.
Capture:     « Li Micougni » géant en craie sur ardoise, moitié basse décalée, au-dessus du grill au charbon allumé.
Ancre:       Le nom wallon et sa phrase d'accueil, « même les demi-fous » (site du restaurant).
Théâtre:     Loader non : un restaurant se juge en 3 secondes, la page doit servir tout de suite ; le rideau brun rouge de transition suffit. GL non : la signature est typographique et les photos du client portent l'image.
```

## Système
- **Palette** (rôles) : `ground` #1d1916 ardoise chaude de la carte · `ink` #f1e8d8 craie du lettrage (14,4:1) · `muted` #bcae9b (8,0:1) · `line` #4d433a trait de craie · `accent` #e57f35 orange du logo éclairci (6,2:1 sur ground) · `curtain` #7a2416 brun rouge du lettrage du logo et des banquettes · surface `orange` #d97631 avec encre #2a0e07 (5,7:1) et encre douce #4a1a0d (4,6:1). Références réelles : logo du client (orange et brun rouge), ardoise gravée (photo 08), banquettes rouges et fauteuils bruns (photos 03, 04). Défaut n° 1 (crème, serif, terracotta) écarté : le fond est ardoise et non crème, l'orange est celui du logo, et il ne sert que de seconde moitié.
- **Typo** : Young Serif 400 (titres, noms de plats, prix en grand ; Google Fonts, ronde et chaude comme le lettrage du logo) et Schibsted Grotesk 400 à 900 (corps, UI). Deux fichiers, deux préchargés. Échelle fluide `--t-mega` 4,5 à 24 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 15 px, `--t-xs` 13 px. Display : interlettrage -0,035 em (mega), -0,03 (xl), -0,025 (l) ; interligne 0,95 à 1,02 ; `text-wrap: balance` sur les titres. Corps 1,5 de ligne, mesure 34 à 40 rem. Prix `tabular-nums`, insécables « 24,50 € », « +2 € », apostrophes courbes, « œ ».
- **Grille** : 12 colonnes au bureau (4 au téléphone), gouttière fluide 20 à 48 px, deux lignes verticales fortes : colonne 6/7 (la « faille » de la carte, rubrique à gauche, plats à droite) et colonne 8/9 (photos). Humeurs d'espacement : serre (3 u), normal (7 u), aere (12 u), entracte (18 u). Rayon : 0 partout.
- **Mouvement (à réaliser en phase 2)** : famille `ease` de l'engine ; recoller = `ease.out` 0,9 s, jeu de 0,012 em ; rideau de transition 0,7 s puis 0,8 s ; **hover** (3 traitements) : CTA = remplissage inversé orange vers craie, nav et liens de carte = soulignement orange qui monte, plats et photos = moitiés qui se décalent de 0,03 em au survol ; **repos** : la faille respire (--ecart oscille de ±0,01 em) sur l'horloge GSAP, en pause hors écran et sous reduced motion.

## Plan de composition
```
ACCUEIL  affiche  : [Li Micougni (demi)            ]   énoncé : [Vous êtes tous les bienvenus, même les demi-fous] (orange)
                    [texte+CTA | photo grill 16/10 ]   ardoises : paire asymétrique + liste de 3 ; grill : index + photo haute ;
                    lieux : mur (salle large, terrasse haute, fenêtres) ; réservation (orange) : téléphone + horaires ; pied : nom recollé
CARTE    tête, index de rubriques (strip scroll-snap), puis 10 rubriques : titre collant et vignette à gauche | plats à droite ; menus (orange)
HISTOIRE texte serif + polaroïds ; photo large ; valeurs (orange) en liste
RÉSERVATION  4 canaux (téléphone, e-mail, e-mail préparé, formulaire du client) ; horaires, venir, sur place (orange)
404      « 404 » en deux moitiés, phrase dans la voix, deux sorties
Mobile 390 : titre en deux lignes (Li / Micougni, 4,75 diviseur), photo avant le texte, en-tête resserré (3 liens), rubriques empilées, strip d'index à défilement horizontal.
```
**Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur : hero titre géant + photo (changé : titre coupé en deux, CTA et adresse sous le titre), liste de plats avec prix (changé : rubrique collante et deux demi-pages), pied de contacts (changé : le nom recollé en orange). Non sur le reste : la coupe est le système.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Trois concepts. ✔
2. Aucun exemple travaillé repris : § Trois concepts (dernier paragraphe). ✔
3. Concept Card au format exact, verbe « recoller » défini : § Concept Card. ✔
4. Concept au pied (`Footer.astro:14` nom recollé), à la carte (`carte.astro` titres Demi, deux demi-pages `.rubrique`), à la réservation (`reservation.astro` h1 Demi), à la 404 (`404.astro` « 404 » coupé). ✔
5. Moment signature et recette : le recollement, scrub `--ecart` ; statique livré (`site.css` `.demi`), tween en phase 2. ◐ (phase 2)
6. Palette 4 à 6 rôles, références nommées : § Système, `tokens.css:17-26`. ✔
7. Aucun des 8 « defaults to avoid » (crème + serif + terracotta écarté et justifié ; pas d'acide sur noir, ni dégradé violet, ni verre dépoli, pas d'eyebrow sur chaque titre, pas de 01/02/03 décoratifs, ni Inter, Fraunces, Instrument Serif, Playfair). ✔ (`grep -ri "01\b" src/pages` vide)
8. Test de généricité : § Plan de composition. ✔
9. « 7 vers 8 » : sélection `::selection` (`engine.css`, `.orange ::selection` dans `site.css`) ; focus dans l'accent (`engine.css`, surchargé en encre sur orange) ; favicon de l'identité, un M coupé en deux moitiés (`public/favicon.svg`) ; OG provisoire logo et grill (`public/og.png`, à composer en phase 3) ; pied en composition finale ; 404 dans le concept. ◐ (OG en phase 3)
10. Polices : Young Serif et Schibsted Grotesk, 2 fichiers, 2 préchargés (`Base.astro`). ✔
11. Échelle fluide unique, grands sauts : `tokens.css:28-34`. ✔
12. Display réglé : `.mega`, `.titre-page`, `.titre-section` (`site.css`). ✔
13. Corps et UI : 16 à 18 px, UI 13 à 15 px en AA (contrastes calculés ci-dessus). ✔
14. Typographie française : insécables dans `eur()` et `site.ts`, apostrophes courbes, aucun tiret long (`grep` vide). ✔
15. Grille 12 colonnes, lignes fortes 6/7 et 8/9 ; pas de cadre quatre coins, remplacé par la faille centrale de la carte (justifié : le concept est la coupe). ✔
16. Famille de section au plus une fois par page : accueil = affiche, énoncé, paire, index+média, mur, données ; chacune une fois. ✔
17. Hero en 3 s : nom, cuisine, ville, CTA Réserver et Appeler dans le premier écran à 1440×900 (CTA à y 729 à 789, mesuré). ✔
18. Mobile 390 recomposé : titre recalculé, en-tête resserré, strip d'index `overflow-x` + `scroll-snap`, `scrollWidth` 390 sur les 5 pages. ✔
