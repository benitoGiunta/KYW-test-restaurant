# DESIGN : Le Brunchist (variante awwwards)

## Brief
- Sujet : Le Brunchist, café-brunch et cafés de spécialité, place d'Armes 8, 5000 Namur (donnees.json, dossier.md du 20/11/2026).
- Publics : habitués du centre de Namur, couples et groupes du week-end, touristes à la recherche d'un brunch, travailleurs du midi (mercredi à vendredi).
- Métier du site : venir (adresse, horaires), voir la carte, appeler. Pas de réservation en ligne connue.
- Ressources : aucune photo du client, aucune carte, aucun e-mail. Site actuel bloqué par un anti-robot (non contourné). Tout complément est `placeholder: true` dans `src/data/site.ts`.
- Contraintes : statique, `base` /le-brunchist/awwwards/, français, vouvoiement, aucun tiret cadratin.
- Hypothèses : voir l'en-tête de `site.ts` (adresse et téléphone récents, horaires mer.-dim. 9 h 30 à 15 h 30, prix et descriptions illustratifs).

## Trois concepts
| | Idée | Territoire | Orig. | Adéq. | Faisab. | Port. (bas = mieux) |
|---|---|---|---|---|---|---|
| A. Le mot-valise | Brunch = breakfast + lunch : le site se lit de 9 h 30 à 15 h 30, les heures d'ouverture ; le sol passe du jaune d'œuf au matcha puis au café | Nom et rythme horaire | 4 | 5 | 5 | 2 |
| B. L'extraction | La page s'écoule comme un espresso (25 s, crema, anneau de tasse) | Matière du métier | 3 | 4 | 4 | 4 |
| C. Le service dépareillé | Chaque catégorie sur une assiette de forme différente (vaisselle vintage, à confirmer), rassemblement place d'Armes | Lieu et objet | 3 | 3 | 5 | 3 |
Choix : A, seul concept qui ne tient que pour ce restaurant (test de l'échange : « un brunch du mercredi au dimanche, 9 h 30 à 15 h 30, mot-valise » ne s'applique à aucun autre). B fournit la 404 (la dernière tasse), C est écarté (fait non confirmé).

## Concept Card
- Idée : un brunch est un créneau, pas un plat ; le site est ce créneau, de 9 h 30 à 15 h 30.
- Métaphore : l'horloge du service ; le sol de la page suit l'heure (jaune d'œuf, matcha, lait vert, café).
- Signature (et recette) : le cadran du service, phase 2 : un seul pilote (progression de scroll, `onScroll`) commande l'heure affichée, le disque jaune qui s'étale en `clip-path: circle()` d'une bande à l'autre et une règle d'heures. Recettes motion.md « scroll-driven clip reveal » et patterns.md « driver module ».
- Émotion (3 premières secondes) : chaleur franche, appétit, une matinée sans hâte.
- Verbe : s'étaler (comme un jaune, comme une tartine) : ease.soft, longues durées, jamais de rebond.
- Capture : le hero, « Brunchist » en 800 serré sur jaune d'œuf, disque « 9 h 30 » ; ou le pied « 15 h 30 » jaune sur café.
- Ancre : horaires 9 h 30 à 15 h 30, mercredi à dimanche ; nom mot-valise.
- Théâtre : loader non (un café ne fait pas attendre, LCP prime) ; GL non (aucune photo, formes CSS suffisent, aucun gain justifié).

## Système
- Palette : ground jaune d'œuf #F2B52C (matin), matcha #C3D38F (midi), lait vert #E1E8C4 (après-midi), café #24160F (fermeture, curtain) ; ink #21140D ; muted #4D3A1A ; line encre à 28 % ; accent confiture de griotte #A5200E (jaune sur café). Références : œuf poché, matcha de cérémonie, espresso. Défaut crème + serif + terracotta écarté.
- Typo : Cabinet Grotesk (Fontshare, 800 display, 500 texte), DM Mono 400 (disque horaire). Échelle `--t-mega` 15,5 rem à `--t-xs` 0,8125 rem. Display : interlettrage -0,045 em, interligne 0,9 à 1, `text-wrap: balance`, marge -0,04 em d'alignement optique. Prix `tabular-nums`, insécables « 24 € », « 9 h 30 ».
- Grille : 12 colonnes (une colonne au téléphone), lignes fortes à gauche (gouttière) et à la colonne 5 (carte) ; humeurs d'espacement : serré, large, hero. Rayon : pilules et disques seulement.
- Mouvement (à faire en phase 2) : ease.soft pour le disque et le sol, ease.out pour les révélations ; hovers : CTA = remplissage bas-haut (accent), nav = soulignement qui se trace, lignes d'index et plats = décalage à droite, liens texte = soulignement épaissi (4 traitements, déjà en CSS). Repos : le disque « respire » (échelle 1 à 1,03, 6 s), phase 2.
- Plan de composition (familles uniques par page) : accueil = affiche (hero), statement (mot-valise), index (trois moments), données (semaine en barres), paire asymétrique (histoire), pied composé. Carte = affiche courte puis trois chapitres à tête collante (index). Histoire = affiche, narration (étapes + récit), paire (équipe), liste (presse). Venir = affiche + appel, trois colonnes. 404 = « 15 h 31 ».
- Mobile 390 : titres recomposés (mega 3,2 à 4 rem), lignes d'index empilées, semaine en deux lignes, pied en une colonne.
- Test de généricité : un modèle atterrirait sur crème, serif, photo d'assiette. Changé : sol jaune d'œuf plein, grotesque 800 serré, mot-valise typographique, aucune photo d'inconnus.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : concept A absent de la liste.
3. Concept Card exacte, verbe « s'étaler » défini.
4. Concept au pied (« 15 h 30 », src/components/Pied.astro), carte (chapitres par heure, carte.astro), réservation (page « Venir »), 404 (« 15 h 31 », 404.astro).
5. Moment signature : cadran du service, recette nommée (phase 2).
6. Palette 4 à 6 rôles, références réelles : § Système.
7. Défauts écartés : pas de crème, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow systématique, pas de 01/02/03 (les heures sont fonctionnelles), pas d'Inter/Fraunces/Instrument/Playfair.
8. Test de généricité : § Système.
9. 7 à 8 : sélection (`::selection` du moteur), focus accent (`:focus-visible` dans l'accent, jaune sur café), favicon du disque (public/favicon.svg), OG à composer (phase 3), pied composé, 404 dans le concept.
10. Polices : Cabinet 500/800 + Mono 400, 3 fichiers, 2 préchargés (public/fonts, Base.astro).
11. Échelle fluide unique : tokens.css.
12. Display réglé : `.display` dans site.css.
13. Corps 17 à 19 px, interligne 1,55, mesure 38 em ; UI 13 à 15 px.
14. Typographie française : insécables, apostrophes courbes, « » absents (aucune citation).
15. Grille 12 colonnes et lignes fortes : site.css `.grid`, `.chap`, `.index__ligne` ; pas de cadre quatre coins (bandes pleines à la place, justifié par le sol qui change).
16. Une famille de section au plus une fois par page : plan ci-dessus.
17. Hero en 3 s : nom, cuisine, adresse, jours, deux actions à 1440×900 (CTA à y 838 à 890, mesuré).
18. Mobile 390 recomposé : `@media (max-width: 47.99rem)`, pas de débordement (scrollWidth 390 sur 5 pages, mesuré).
