# DESIGN : Escale en Vue ! (variante awwwards)

## Brief
Sujet : terrasse et restaurant saisonniers à Dave (Namur), rue de la Rêche-Terre 21, au-dessus de la vallée de la Meuse ; petites assiettes fraîches et locales, apéro planchette, bières trappistes et régionales, toutes les tables dehors. Publics : habitués du week-end, promeneurs et touristes de la vallée, amateurs de bière, familles. Métier : venir (jeudi au dimanche), réserver le plat maison par téléphone, lire la carte. Ressources : 7 photos exploitables (paysage de terrasse, planchette, bol, panorama, trappistes, transats), logo vert (non repris). Contraintes : statique, `base` `/escale-en-vue/awwwards/`. Hypothèses : aucune carte ni prix (prix `null`, rien d'inventé), histoire et équipe inconnues (titulaire BCE seulement), saison 2026 terminée, GPS et parking à confirmer, aucun avis rendu.

## Trois concepts (trois territoires)
| | A. L'horizon (lieu) | B. Les 80 jours (saison) | C. Huit bouteilles (cave) |
|---|---|---|---|
| Phrase | Une ligne d'horizon traverse chaque page : au-dessus le titre, au-dessous la table | La page est le calendrier de la saison 19 juin au 6 septembre | La carte est une étagère de bouteilles alignées |
| Règle | Titres posés sur la ligne, 2 px | Colonnes = semaines | Colonnes verticales étroites |
| Verbe | Se poser | Compter | Aligner |
| Voix / palette | Grotesque large, ciel pâle + vert-ardoise + rouge parasol | Mono, papier | Étiquettes, brun bouteille |
| Ancre | Toutes les tables sont en extérieur, face à la vallée | Saison 2026 du 19 juin au 6 septembre | Photo des huit trappistes |
| Notes (originalité, adéquation, faisabilité, portabilité) | 4, 5, 5, 2 | 3, 4, 4, 3 | 3, 3, 4, 4 |
Test de l'échange : A échoue chez un restaurant sans vue (la ligne vient du lieu) ; B et C se transposent. **Choix : A**. Détail repris de C : alignement des bières en liste. De B : la mention de saison dans la section du soir.

## Concept Card
- **Idée** : le restaurant est un point de vue ; la page est ce qu'on voit depuis la table.
- **Métaphore** : l'escale, le temps de poser son verre et de regarder la ligne de la colline d'en face.
- **Signature (et recette)** : l'horizon, trait de 2 px plein cadre qui porte chaque titre ; phase 2 : le trait se trace au chargement et les sections « soir » passent du ciel au vert (motion.md, trait SVG/scaleX lié au scroll).
- **Émotion (3 premières secondes)** : un grand titre posé sur une ligne, l'air et le ciel d'un après-midi dehors.
- **Verbe** : se poser (entrées en descente lente, easing `ease.soft`, jamais de rebond).
- **Capture** : « Escale en vue ! » en lettres larges sur le trait, photo de la terrasse au-dessous à droite.
- **Ancre** : toutes les tables sont en extérieur, face à la vallée ; ouvert du jeudi soir au dimanche après-midi.
- **Théâtre** : loader non (site de quelques pages, la photo suffit) ; GL non (le trait et la typographie portent l'idée, photos de faible résolution).

## Système
- **Palette** : ground `#e4eef1` (ciel d'après-midi), ink `#11262b` (vert-ardoise du logo), muted `#475e63`, line `#9cb4ba`, accent `#b8341d` (parasol rouge de la photo 01), curtain `#1d3a33` ; soir `#1d3a33` / `#f3e6cf` / accent `#f0a24b`. Références : photos du client (ciel, parasol, transats) et ardoise de la planchette. Ni crème, ni terracotta, ni acide sur noir.
- **Typo** : Anybody variable (display, `font-stretch` 118 %, graisse 780, interlettrage -0,025 em, interligne 0,92) ; Albert Sans (corps 16 à 18 px, interligne 1,55). Échelle `--t-mega` à `--t-xs`. Prix `tabular-nums` (aucun prix publié). Insécables « 5100 », « 17 h 30 », « ! ».
- **Grille** : 12 colonnes, lignes fortes : trait d'horizon (haut du contenu) et rupture verticale à la colonne 5 (index) ; humeurs d'espacement serre / normal / aéré / entracte. Rayon 0.
- **Mouvement (à planifier, phase 2)** : easing `ease.soft` pour les entrées, `ease.inOut` pour le rideau ; hover : CTA fond ink vers accent, nav soulignement qui se trace, index nom vers accent ; repos : le parasol du logo tourne très lentement ou le trait respire (à décider, motivé en phase 2).
- **Plan de composition** : accueil = affiche (titre + trait + photo), énoncé + paire asymétrique, index « Sur la table », média plein cadre (panorama), données du soir (horaires), pied final. Carte = en-tête, deux listes index (À poser sur la table, À boire). Lieu = prose, paire, données « sur place », média. Réservation = numéro géant, côté pratique, horaires du soir. 404 = phrase sur le trait.
- **Mobile 390** : titre en deux lignes, média sous le texte, paires empilées, index à vignette 4,5 rem, navigation sur une ligne sous la marque.
- **Test de généricité** : « un modèle atterrirait-il ici ? » Oui sur le centrage du héros (changé : titre sur trait, texte et photo sous le trait), oui sur trois colonnes de cartes (changé : index à lignes), oui sur les horaires en bloc (changé : section sombre du soir).

## Sur-utilisation de la skill
### Phase 1
1. Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. Aucun exemple travaillé de concepts.md repris (ni braise, ni pavage, ni cadre, ni solde, ni phrase unique) : tableau.
3. Concept Card au format exact : ci-dessus, verbe « se poser ».
4. Concept au pied (`pied__mot`), à la carte (index à lignes sous trait), à la réservation (numéro sur la ligne, section du soir), à la 404 (`.horizon` + « Pas d'escale à cette adresse ») : `src/styles/site.css`, `src/pages/404.astro`.
5. Moment signature : le trait d'horizon, recette en phase 2 (non fait).
6. Palette 6 rôles, références nommées : § Système, `src/styles/tokens.css:11-21`.
7. Défauts évités : pas de crème + serif + terracotta, pas de verre dépoli ni de dégradé violet ; pas d'eyebrow sur chaque titre ; Anybody et Albert Sans (pas Inter/Fraunces/Instrument/Playfair).
8. Test de généricité : § Système.
9. Détails 7 vers 8 : sélection en accent (`::selection`), focus en accent (`:focus-visible`), favicon parasol (`public/favicon.svg`), OG composée (`public/og.png`), pied en composition finale (« À table, là-haut. »), 404 dans le concept. Coché partiellement : OG à relire en phase 3.
10. Polices : Anybody 56 Ko + Albert Sans 31 Ko, 2 fichiers préchargés (`Base.astro`).
11. Échelle fluide unique : `tokens.css` (`--t-mega` 2,6 à 15 rem, `--t-xl` 2,4 à 7,6 rem).
12. Display réglé : `.display` (interlettrage négatif, interligne 0,92, `text-wrap: balance`) ; titre du héros mesuré par Range : 40 à 1388 px à 1440.
13. Corps 16 à 18 px, UI 13 à 14 px : `tokens.css`.
14. Typographie française : insécables, « ! » liée, apostrophes courbes, guillemets : `src/data/site.ts`.
15. Grille 12 colonnes, trait d'horizon plein cadre en lieu du cadre quatre coins (justifié : le trait est la règle du concept).
16. Famille de section au plus une fois par page : accueil (affiche, énoncé, paire, index, plein cadre, données).
17. Hero en 3 s : nom, cuisine, appel, carte (CTA à y = 576 à 1440×900, 549 à 1280×720).
18. Mobile 390 recomposé : titre en deux lignes, strips non nécessaires (listes courtes), aucun débordement horizontal sur les 5 pages (mesuré).
