# DESIGN.md · Le Ponti 2 · variante awwwards

## Brief
- Sujet : Le Ponti 2, restaurant italien et pizzeria familial de Jambes (Namur), avenue du Bourgmestre Jean Materne 87. Fermé le lundi, ouvert mardi à dimanche 11 h 30 à 14 h 30 et 18 h à 21 h 30.
- Publics : midi (actifs, menu 40 €), soir (familles, pizzas), habitués du quartier, de passage. Métier : réserver (Barestho, tél. 081 30 40 75), venir, lire la carte.
- Ressources : 4 photos exploitables (façade de nuit, pâtes, pizza, escalopes), logo bordeaux et or (pont à trois arches), carte complète de 99 lignes. Contraintes : statique, `base` /le-ponti-2/awwwards/, noindex, pas de backend.
- Hypothèses : histoire, équipe, avis, parking, vins inconnus donc absents ; aucun contenu fictif ; le « 2 » du nom n'est pas expliqué.

## Concepts (trois territoires)
| | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A | **Le pont à trois arches** : la carte se traverse, trois arches = trois spécialités | nom et logo, lieu (Jambes, Meuse) | 4 | 5 | 5 | 1 |
| B | **L'échelle des prix** : vingt pizzas rangées de 14 à 23 € | système formel | 4 | 4 | 4 | 2 |
| C | **Deux services** : la page bascule midi clair / soir sombre | rythme horaire | 3 | 4 | 4 | 3 |
Ancres : A le logo (pont à trois arches) et les trois familles photographiées ; B 20 pizzas de 14 à 23 € ; C horaires 11:30-14:30 / 18:00-21:30, lundi fermé.
Test de l'échange : A échoue chez un autre restaurant (le pont est le logo de celui-ci). **Choix : A**, car le nom, le logo et la carte disent la même chose. Détails gardés : « le lundi, le pont est levé » (de C) pour les horaires et la 404.

### Concept Card
- Idée : on traverse la carte d'une rive à l'autre, par trois arches.
- Métaphore : le pont (ponti) : tablier, arches, deux rives (avant, après), pont levé le lundi.
- Signature (recette) : la traversée, une arche s'ouvre (clip-path en arche, motion.md « mask reveal ») sur chaque spécialité ; phase 2.
- Émotion (3 premières secondes) : entrer de nuit sous une enseigne dorée, puis voir l'assiette.
- Verbe : franchir (un mouvement continu, d'un bord à l'autre, sans rebond).
- Capture : le hero, « Le Ponti 2 » en or et crème à gauche, assiette de pâtes dans une arche à droite.
- Ancre : logo à trois arches, vingt pizzas, lundi fermé.
- Théâtre : loader non (restaurant : l'action est réserver ou lire la carte) ; GL non (les photos du client suffisent, le concept tient dans la géométrie de l'arche et le mouvement CSS/GSAP).

## Système
- Palette (références : façade de nuit de la photo 01, logo bordeaux et or du site actuel, assiettes bleu-vert des photos 02 et 05) : ground `#1a0b0e`, ink `#f4e9d4`, muted `#c2ad92`, accent `#e0a73f` (or), curtain `#6e1626` (bordeaux du logo, pied et rideau), plate `#5fb6b0` (section menu). Ligne : ink à 20 %. Défaut n° 1 (crème + serif + terracotta) écarté : fond nuit, crème en encre.
- Typo : Boska (display, Fontshare, 400, 400 italique, 700), Hanken Grotesk (corps et UI, variable 400 à 700). Échelle `--t-mega` 12,5 rem max à `--t-xs` 0,75 rem ; display interligne 0,88 à 1,02, interlettrage -0,02 à -0,045 em ; corps 16 à 18 px, interligne 1,55 ; prix `tabular-nums` ; espaces insécables dans « 21 € » et « 11 h 30 ».
- Grille : 12 colonnes, gutter fluide, lignes fortes à gauche (col. 1) et à la colonne 8 ; humeurs d'espacement : hero serré, énoncé très aéré, menu plein cadre coloré, carte dense. Rayon : l'arche (`--arche`) en haut des médias, angles droits partout ailleurs.
- Mouvement (phase 2) : famille `ease.inOut` expo pour les arches, durées 0,8 à 1,2 s ; hover : CTA (remplissage or vers contour), nav (soulignement qui se trace), lignes de carte (prix en or) ; repos : le pont du pied glisse très lentement (déplacement du motif).
- Compositions : accueil = poster (hero) / énoncé / filmstrip de trois arches (scroll-snap au mobile) / données (menu 40 €) / paire asymétrique (façade + horaires) / pied final (pont + mot). Carte = sommaire en arches, groupes alternés, listes à points de prix, photos collantes en paire décalée. Mobile 390 px : hero empilé, arches en bande à défilement, listes en une colonne.
- Test de généricité : un modèle atterrirait sur nappe crème + terracotta et grille de pizzas ; changé : fond nuit, arche comme seul gabarit de média, bande turquoise pour le menu, pont en pied.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : § Concepts.
2. Aucun exemple travaillé de concepts.md repris (pas de braise, pavage, gril, cadre, solde, phrase unique).
3. Concept Card au format exact : § Concept Card, verbe « franchir ».
4. Concept au pied (`Footer.astro`, `Pont.astro`), à la carte (`carte.astro` : groupes « Avant le pont », « La traversée »), à la réservation (`.resa__porte` en arche), à la 404 (« Pont coupé. »).
5. Moment signature : arches qui s'ouvrent, recette mask reveal (à coder en phase 2).
6. Palette 6 rôles et références réelles : § Système, `src/styles/tokens.css`.
7. Défauts évités : pas de crème/terracotta, pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, pas d'eyebrow systématique (une seule : `.arches__tete`), pas de 01/02/03, pas d'Inter/Fraunces/Instrument/Playfair.
8. Test de généricité : § Système.
9. Détails 7 vers 8 : `::selection` et focus en or (engine.css + tokens), favicon d'arches (`public/favicon.svg`), OG composée (`public/og.png`, rendue par script depuis HTML, pas une capture de page), pied composé, 404 dans le concept.
10. Polices : `public/fonts/` 4 fichiers, 2 préchargés (`Base.astro`).
11. Échelle fluide unique : `tokens.css` (`--t-*`).
12. Display réglé : `.hero__titre`, `.display`, `h2` dans `site.css`.
13. Corps et UI : `--t-body`, `--t-s`, `--t-xs`.
14. Typographie française : insécables via `prix()` et `creneaux`, « » à vérifier en phase 3.
15. Grille et lignes fortes : `.grille`, `.wrap` (pas de `padding: X 0`). Cadre quatre coins : non, justifié par l'arche comme seul cadre.
16. Une famille de section au plus par page : accueil (poster, énoncé, filmstrip, données, paire, pied).
17. Hero en 3 s : nom, cuisine, CTA Réserver et Appeler dans le premier écran (rect : CTA à 710 px à 1440 x 900, 378 px à 390 x 844).
18. Mobile 390 recomposé : `@media (max-width: 48rem)` de `site.css` ; strip `overflow-x` + `scroll-snap` pour les arches.
