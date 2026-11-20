# DESIGN : Épices & Nous (variante awwwards, « Deux voix »)

## Brief
- **Sujet** : restaurant de couple à Erpent (Namur), Denis et Sophie Delvigne, depuis 1999. Cuisine française de saison relevée d'épices, carte et menu trois services à 52 €.
- **Publics** : midi (actifs, habitués), soir (couples, tables), voisins d'Erpent et Namurois en sortie, visiteurs de la Citadelle. **Métier** : réserver (téléphone d'abord), venir (adresse, horaires), lire la carte.
- **Ressources** : 18 photos du client utilisées (plats, cuisine, salle avant, verrière, façade), pas de portrait de l'équipe, pas de e-mail, pas de GPS (donnees.json). **Contraintes** : statique Astro, `base` /epices-et-nous/awwwards/, réservation par `tel:` et lien Wix du client.
- **Hypothèses** : voir en-tête de `src/data/site.ts` (e-mail et GPS absents, aucun plat inventé, Michelin et Gault&Millau en texte à confirmer, aucun avis).

## Trois concepts
| | A. Deux voix | B. La pincée | C. Les remparts |
|---|---|---|---|
| Territoire | Le couple et le service : cuisine et salle | La matière : l'épice, la dose | Le lieu : Citadelle, école hôtelière |
| Phrase | Une maison à deux voix : lui cuisine, elle reçoit, et la page se lit en duo autour d'un passe. | Chaque plat se dose en pincées d'épices. | La carte bâtie comme un bastion. |
| Règle | Axe vertical central, cuisine à gauche, salle à droite | Dosages en marge | Murs, meurtrières |
| Verbe | Passer | Doser | Monter |
| Palette | brun de la verrière, nappe grise, safran du logo | jarres d'épices | pierre bleue |
| Ancre | Denis et Sophie Delvigne, 1999, « Épices & Nous » | passion de Denis pour les épices | école hôtelière de la Citadelle |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 5 / 5 / 4 / 1 | 3 / 4 / 3 / 4 (tout restaurant à épices) | 3 / 2 / 3 / 3 |

Test de l'échange : A ne tient pas avec un autre restaurant (le nom contient « Nous », le couple est le sujet). B tient pour n'importe quel indien ou marocain : style. C est une anecdote d'école, pas un système. **Choix : A.** B fournit un détail (le curry rouge et le miso de la carte restent des mots, pas un décor), C fournit la 404 (fermeture du lundi) en phase 2 si besoin.

## Concept Card
- **Idée** : Épices & Nous est une maison à deux voix ; chaque page se lit en duo.
- **Métaphore** : le passe, cette tablette où la cuisine tend l'assiette à la salle. L'axe central de chaque page est ce passe : à gauche ce que Denis dit, à droite ce que Sophie dit.
- **Signature (et recette)** : le nom en deux moitiés, « Épices » à gauche, « Nous » à droite, avec le & en safran posé exactement sur l'axe. Recette `motion.md` scrub : les deux moitiés viennent de part et d'autre vers l'axe et le & s'allume au contact (phase 2).
- **Émotion (3 premières secondes)** : la chaleur sérieuse d'une adresse à deux, brun profond, safran, un nom net.
- **Verbe** : passer (un plat, la parole, la page d'un côté à l'autre du passe).
- **Capture** : le titre « Épices & Nous » sur fond brun, le & safran au milieu, deux boutons.
- **Ancre** : Denis et Sophie Delvigne, depuis 1999 (donnees.json, histoire).
- **Théâtre** : loader non (une adresse de quartier doit répondre en 3 s, l'info est le téléphone) ; GL non (les photos de plats sont la matière, le budget va au scrub du nom et au passe).

## Système
- **Palette** (`:root`) : ground `#1f1613` (brun de la verrière, photo 12), ink `#f1e6d3` (lin chaud), muted `#bba78f`, line `#5a4338` (le passe), accent `#e69a28` (safran de la pastille du logo), curtain `#120b09`. Second terrain « nappe » : `#d9d5cc` (lin gris des tables, photos 04 et 05), encre `#1f1613`, accent cuit `#8a4a0b`. Références : la salle du restaurant, la pastille orange de son enseigne.
- **Typo** : Boska (Fontshare, serif de drame, romain et italique 400) pour les titres, prix et voix ; Switzer (Fontshare, 400 et 500) pour le corps et l'interface. 4 fichiers, 2 préchargés. Échelle fluide `--t-mega` (11,2 vw, plafond 11,5 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`. Display : interlettrage -0,025 à -0,04 em, interligne 0,88 à 0,95, `text-wrap: balance`. Corps 16 à 18 px, interligne 1,55, mesure 38 à 62 ch. Prix `tabular-nums`, « 52 € » insécable, vraies apostrophes et guillemets.
- **Grille** : 12 colonnes (2 colonnes égales autour de l'axe pour les sections « deux voix », 12 pour le mur), 1 ligne forte verticale (l'axe, 1 px), humeurs d'espacement `--serre`, `--normal`, `--aere`, `--entracte`. Rayon 0 partout (angles vifs), une seule exception, le & qui est une lettre.
- **Mouvement (phase 2)** : easing `ease.out` pour les entrées, `ease.inOut` pour le rideau ; durées 0,35 s (interactions), 0,6 s (rideau), 0,9 s (révélations). Traduction du verbe : deux flux symétriques de part et d'autre de l'axe qui se rejoignent. Rôles de hover : CTA = aplat safran qui s'inverse en lin ; nav = filet safran qui entre par la gauche ; liens texte = soulignement qui passe au safran ; images = aucun traitement. État de repos : immobilité décidée (la maison est calme), seul le & respire en phase 2 si le temps le permet.
- **Plan de composition** : accueil = poster (nom coupé en deux) / paire asymétrique Denis et Sophie / statement signature / données (52 €) / mur d'images / bande des espaces / pied. Carte = poster court / données menu / index (nom d'un côté du passe, description et prix de l'autre) / média plein cadre / paire / statement court. Histoire = poster / texte et façade / paire de voix / repères / paire. Réservation = poster / paire (téléphone, horaires) / accès. Mobile 390 : une colonne, l'axe passe sur la marge gauche, le nom reste en une ligne (type re-réglé à 11,2 vw), mur à 2 colonnes, bande des espaces en `overflow-x` + `scroll-snap`.
- **Test de généricité** : un modèle atterrirait-il ici sur un serif crème et terracotta, sur une grille de cartes, sur un hero photo plein cadre avec titre centré ? Oui, donc changé : fond brun et nappe grise, nom coupé en deux sur l'axe, carte en index de part et d'autre du passe, hero sans photo.

## Sur-utilisation de la skill
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau « Trois concepts » ci-dessus. [x]
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique) : le concept est le passe cuisine/salle. [x]
3. Concept Card au format exact, verbe « passer » : § Concept Card. [x]
4. Concept jusqu'au pied, à la carte, à la réservation, à la 404 : `Footer.astro:8-26` (& sur l'axe, « À table, à deux. »), `carte.astro` (index de part et d'autre du passe), `reservation.astro` (`.deux`), `404.astro` (voix cuisine et salle). [x]
5. Moment signature et recette : nom en deux moitiés et & sur l'axe (`index.astro:12`, `site.css` `.poster__nom`), scrub en phase 2. [x statique]
6. Palette 4 à 6 rôles, références réelles : § Système. [x]
7. Défauts à éviter : pas de crème + terracotta (fond brun, safran du logo), pas d'acide sur noir, pas de dégradé violet, pas de verre, pas d'eyebrow systématique (`.voix` seulement pour cuisine/salle et pied), pas de 01/02/03, pas d'Inter/Fraunces/Instrument/Playfair. [x]
8. Test de généricité : § Système. [x]
9. Détails 7 vers 8 : sélection `::selection` (engine.css), focus dans l'accent (`engine.css:33`), favicon de l'identité (& safran sur brun, `public/favicon.svg`), OG composée (`public/og.png`), pied comme composition finale, 404 dans le concept. [x]
10. Polices : Boska et Switzer, 4 fichiers, 2 préchargés (`Base.astro`). [x]
11. Échelle fluide unique, grands sauts : `tokens.css` (`--t-mega` 11,5 rem contre `--t-body` 1,125 rem). [x]
12. Display réglé : `.display`, `.poster__nom` (`site.css`). [x]
13. Corps et UI : 16 à 18 px, UI 12 à 14 px en AA (muted 7,6:1 sur ground, 6,4:1 sur nappe). [x]
14. Typographie française : insécables dans `format.ts` et `.nw`, apostrophes typographiques. [x]
15. Grille, lignes fortes : l'axe central (`.deux::before`, `.plats::before`) ; cadre quatre coins non retenu (le passe en tient lieu). [x]
16. Famille de section au plus une fois par page : accueil sans doublon (paire, statement, données, mur, bande, pied). [x]
17. Hero en 3 s : nom, cuisine, ville, « Réserver » et « Appeler » visibles à 1440×900 et 390×844 (mesure ci-dessous). [x]
18. Mobile 390 recomposé : `@media (max-width: 760px)` de `site.css`, `scrollWidth` = 390 sur les 4 pages. [x]

Mesures (Playwright, build local) : h1 à 1440×900 `[40,142,1400,313]`, CTA du hero `[834,427,1051,479]` et `[1065,427,1318,479]` ; 1280×720 h1 `[37,133,1243,285]` ; 1024×768 h1 `[32,117,992,239]`, CTA empilés `[606,333,…]` ; 390×844 h1 `[20,80,370,126]`, CTA `[44,286,244,338]`. Aucun `.display` à moins de 20 px du bord, `scrollWidth` égal à la largeur de fenêtre partout.
