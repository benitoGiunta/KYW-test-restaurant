# DESIGN : La Ferme Blanche d'Asie, variante awwwards « Le plateau tournant »

## Brief
- Sujet : restaurant asiatique et chinois, Allée de la Maison Blanche 20, 5020 Malonne (Namur). Ouvert 7 jours sur 7, midi et soir. Source : `data/restaurants/ferme-blanche-d-asie/` (donnees.json, dossier.md, photos/).
- Publics : midi (menus abordables), soir et week-end (familles, tables rondes), groupes et fêtes (salle V.I.P. 26, salle privée environ 300), habitués qui commandent sur tablette.
- Métier du site : réserver (téléphone d'abord), consulter la carte numérotée de 56 plats, venir (parking privé).
- Ressources : 10 photos de salles et d'extérieur (filigrane photographe recadré sous 855 px), 2 images de cuisine sombres, logo 200 px (non utilisé, trop petit), carte complète avec prix, menus de fêtes transcrits.
- Contraintes : statique Astro, `base` /ferme-blanche-d-asie/awwwards/, pas de backend de réservation (tel:, mailto:), français, vouvoiement.
- Hypothèses : aucune donnée inventée. Histoire, équipe, chef, année : inconnus donc absents. Aucun `placeholder`.

## Trois concepts
| | A. Le plateau tournant | B. La cour de ferme | C. Le bon numéro |
|---|---|---|---|
| Territoire | matière du métier (service à la chinoise) | lieu (ferme blanche, Malonne) | système formel (carte numérotée 1 à 200) |
| Phrase | La page est une table ronde : tout se pose au centre et tourne vers vous. | Le site est le plan d'une cour blanche, chaque salle un bâtiment. | La carte est la seule structure : chaque plat a son numéro, la page se lit en numéros. |
| Règle de mise en page | le cercle est l'unité (disques, anneaux, ronds de catégorie) ; le reste est orthogonal | plan au sol, cartouches | colonne de numéros fixes |
| Verbe | tourner d'un cran | traverser | cocher |
| Palette | laque brune, ivoire, or des chaises | blanc chaux, ardoise, vert bambou | encre sur papier de carte |
| Signature | anneau de texte et disques qui tournent avec le défilement (motion.md, pilote unique `--rot`) | plan interactif des salles | tablette fictive (interdit : faux écran) |
| Ancre | table ronde à plateau tournant (photos 09 et 10) | bâtiment blanc et kiosque (photos 04, 05) | numérotation de la carte |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 5 / 2 | 3 / 4 / 3 / 3 | 3 / 3 / 5 / 3 |

Test de l'échange : A ne tient qu'avec un restaurant à table ronde et plateau tournant (la phrase ne se déplace pas sur une pizzeria). B tient avec n'importe quelle ferme, C avec n'importe quelle carte numérotée. **Choix : A**, raison : seul concept ancré sur une photo réelle du client, tenable de la carte au pied et à la 404. Détails repris des écartés : les numéros de plats de C (colonne `plat__num`), la « ferme blanche » de B (sections ivoire = murs blancs).

## Concept Card
- **Idée** : le site est une table ronde, les plats se posent au centre et on les fait tourner pour se servir.
- **Métaphore** : le plateau tournant de la salle à table ronde ; on passe, on se sert, on repasse.
- **Signature (et recette)** : anneau de texte qui tourne autour du disque photo du hero et des ronds de catégorie, piloté par une seule variable `--rot` liée au défilement (motion.md, driver unique, repos : rotation lente). Phase 2.
- **Émotion (3 premières secondes)** : chaleur de salle laquée, un disque doré qui tourne doucement : on est déjà à table.
- **Verbe** : tourner d'un cran (rotation par paliers qui ralentit en fin de course, `ease.inOut`).
- **Capture** : le hero, titre ivoire sur laque et disque de la salle ronde cerclé d'or sous son anneau de texte.
- **Ancre** : la salle à table ronde et plateau tournant (photos du client 09 et 10) et les 56 plats numérotés.
- **Théâtre** : loader non (restaurant de quartier, la réservation prime, 3 secondes pour agir) ; GL non (le disque photo et l'anneau SVG portent le concept sans canvas).

## Système
- **Palette** (rôle, hex, contraste) : ground `#1c1410` laque des poutres et nappes ; ink `#f2e8d2` carrelage ivoire (14,6:1) ; muted `#c2b296` (9,3:1) ; line `#4d3a2d` ; accent `#e3a924` or des chaises (9:1 sur ground) ; accent texte sur ivoire `#a8281d` rouge du médaillon de sol (6,3:1) ; curtain `#a8281d`. Sections « ferme blanche » : fond ivoire, encre laque. Références réelles : photos 01, 08, 09 (chaises, nappes, médaillon rouge au sol).
- **Défauts évités** : pas de crème+serif+terracotta (l'ivoire n'est que le second ton d'une alternance laque/ivoire, accent or et rouge laque, serif Zodiak), pas d'acide sur noir, pas de dégradé violet ni de verre dépoli, pas d'eyebrow sur chaque titre (seulement hero et en-têtes de page), pas de 01/02/03 décoratifs (les numéros de la carte sont les vrais).
- **Typo** : Zodiak 700 (Indian Type Foundry, Fontshare) display, Hanken Grotesk 400 à 700 (Google Fonts) texte et UI. Échelle fluide `--t-mega` 3,4 à 11,5 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 15 px, `--t-xs` 13 px. Display : interlettrage -0,03 em, interligne 0,95, `text-wrap: balance`. Prix en `tabular-nums` seulement pour les numéros ; prix « 4,90 € » avec U+00A0. 2 fichiers de police, 2 préchargés.
- **Grille** : 12 colonnes (une colonne au téléphone), gouttière fluide, deux lignes verticales fortes (col. 7 et col. 9). Humeurs d'espacement : `--serre`, `--normal`, `--aere`, `--entracte`. Rayon : 0 partout, 50 % pour les disques (règle unique : le cercle appartient au plateau).
- **Mouvement (planifié, phase 2)** : easing `ease.inOut` pour les rotations, `ease.out` pour les révélations ; durées 0,35 s hover, 0,7 s transition, rotation scroll 1 tour par page. Hover : CTA (le fond or tourne d'un quart), nav (filet or), plats et ronds (le rond se remplit d'or), liens (soulignement or). Repos : l'anneau tourne à 6 degrés par seconde, immobile en reduced motion.
- **Plan de composition** : hero poster (titre + disque), bande horaires (données), énoncé asymétrique sur ivoire (statement), quatre plateaux (index de ronds, strip au téléphone), mur de salles (3 vignettes inégales, strip au téléphone), ferme (média + texte), avis (citations), pied final ivoire.
```
HERO   [titre La Ferme / Blanche / d'Asie ......][ anneau + disque ]
BANDE  [Tous les jours][lun-ven][sam][dim]
ÉNONCÉ (ivoire) [phrase géante .....]  [texte][photo table ronde]
PLATEAUX [(4)][(20)][(31)][(5)]
MUR (ivoire) [photo large][portrait][portrait]
FERME  [photo large ..........][titre + adresse]
AVIS   [citation][citation]
PIED (ivoire) [Servez-vous.] [Venir][Horaires][Contact] [CTA]
```
- **Mobile 390** : titre `--t-mega` 3 lignes, CTA empilés, disque centré 30 rem max, strips `overflow-x` + `scroll-snap` (plateaux, mur), header réduit à marque, La carte, Réserver.
- **Test de généricité** : un modèle générique ferait « sushi noir et rouge, lanternes, kanji géants ». Changé : pas de rouge dominant ni de kanji décoratif, alternance laque/ivoire tirée des photos, cercle comme seule forme, numéros de carte réels.

## Pages et 404
`/` accueil, `/carte/` (index numéroté, menus), `/a-propos/` (la maison : salles, pratique), `/reservation/` (tel, mailto, horaires, adresse, groupes), 404 « Plateau vide. » avec un rond 404.

## Sur-utilisation de la skill (phase 1)
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : concept A hors liste. [x]
3. Concept Card au format exact, verbe « tourner d'un cran » compris. [x]
4. Concept au pied (mot « Servez-vous. »), carte (ronds de catégorie, numéros), réservation (blocs en rondeur de service), 404 (rond 404, « Plateau vide. ») : `src/styles/site.css` `.rayon__rond`, `.erreur__rond`, `.pied__mot`. [x]
5. Un moment signature et sa recette : anneau `--rot` (phase 2). [x] planifié
6. Palette 4 à 6 rôles, références réelles : `src/styles/tokens.css:13-24`. [x]
7. Aucun des 8 « defaults to avoid » : voir Système § Défauts évités. [x]
8. Test de généricité : ci-dessus. [x]
9. Détails 7 vers 8 : sélection `::selection` (engine.css), focus en accent (`:focus-visible` or), favicon de l'identité (`public/favicon.svg` anneau et point rouge), OG composée (`public/og.png`, capture du hero), pied composition finale, 404 dans le concept. [x]
10. Polices : Zodiak 700 et Hanken Grotesk, `public/fonts/` (2 fichiers), préchargées dans `Base.astro`. [x]
11. Échelle fluide unique, grands sauts : `tokens.css` `--t-*`. [x]
12. Display réglé : `.display` dans `site.css` (-0,03 em, 0,95, balance). [x]
13. Corps 16 à 18 px, UI 13 à 15 px, interligne 1,5. [x]
14. Typographie française : U+00A0 dans les prix (`eur()`), apostrophes ’, « » dans les avis. [x]
15. Grille 12 colonnes, lignes fortes, cadre quatre coins : non retenu (justifié : le cercle tient lieu de cadre). [x]
16. Une famille de section au plus une fois par page : accueil (poster, données, statement, index de ronds, mur, média+texte, citations, pied). [x]
17. Hero en 3 secondes : mesures à 1440×900 et 1280×720, CTA dans la fenêtre (y 767 et 665). Tablette 1024×768 : CTA sous la ligne de flottaison (y 818), accepté. [x]
18. Mobile 390 recomposé : `site.css` blocs `max-width: 56rem` et `48rem`, strips snap. [x]
