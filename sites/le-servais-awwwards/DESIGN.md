# DESIGN.md : Le Servais, variante awwwards « La Ligne »

## Brief

- **Sujet** : Le Servais, bar brasserie ouvert début mai 2025 au 33 rue des Fossés Fleuris à Namur, au départ du téléphérique. Ouvert 7 jours sur 7 dès 9 h (fermeture 1 h, 2 h le vendredi et le samedi), cuisine non stop (11 h 30 à 22 h, minuit le vendredi et le samedi), petits-déjeuners le week-end, cocktails 3 + 1 de 18 h à 20 h.
- **Publics** : habitués du midi (boulets, burgers, pâtes), soirée entre amis (sharing food, cocktails), week-end petit-déjeuner et brunch, touristes qui descendent du téléphérique, groupes (Verrière 12 à 30 assis, bar entier dès 60).
- **Métier du site** : réserver (book.leservais.be, téléphone, e-mail), venir (adresse, horaires), lire la carte.
- **Ressources** : 4 photos réelles (comptoir, terrasse, spaghetti, petit-déjeuner), 1 photo de salle d'origine à confirmer (servie « illustrative »), logo LS 500 px (favicon). Aucune équipe, aucun chef, aucun avis Google : absents.
- **Contraintes** : statique Astro, `base` /le-servais/awwwards/, noindex, pied KYW, pas de backend.
- **Hypothèses** : voir `src/data/site.ts` (en-tête) et ETAT.md. Téléphone 081 73 65 52 retenu, l'autre numéro du dossier est à confirmer.

## Trois concepts

| | A. La Ligne (téléphérique) | B. Le Cadran (9 h à 2 h) | C. L'Assiette siglée |
|---|---|---|---|
| Phrase | Le site est une ligne de câble ; la journée du bar, ses stations. | Le fond de page suit l'heure : matin clair, soir sombre. | La couronne turquoise de l'assiette devient le cadre de tout. |
| Règle de mise en page | Un câble vertical dans la gouttière, chaque station y accroche une heure réelle. | Section = tranche horaire, fond qui vire. | Tout contenu dans un anneau. |
| Verbe | Embarquer | Tourner | Border |
| Voix typo | Condensée industrielle majuscule + grotesque | Mono + serif | Capitales espacées |
| Palette | Béton, cuivre, turquoise, vert nuit (photos) | Dégradé jour/nuit | Blanc et turquoise |
| Signature | Cabine qui monte le long du câble au scroll (motion.md : scrub de progression) | Palette interpolée | Masque circulaire |
| Ancre réelle | « au départ du téléphérique de Namur », heures 9 h, 11 h 30, 18 h, 1 h | Ouvert 7/7 de 9 h à 1 h | Assiette « LE SERVAIS » (photo 03) |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 4 / 1 | 3 / 4 / 4 / 4 | 3 / 3 / 3 / 2 |

**Test de l'échange** : A ne tient avec aucun autre restaurant (le téléphérique est à cette adresse), B tient avec tout bar ouvert tard (c'est un style), C se déplace sur n'importe quelle vaisselle siglée. **Choix : A.** B ne fournit que la couleur « nuit » du pied et des sections soir ; C ne fournit que le filet turquoise du câble.

## Concept Card

- **Idée** : le site est la ligne du téléphérique au départ de laquelle se trouve le bar ; on y monte d'heure en heure, du premier café au dernier verre.
- **Métaphore** : la journée du bar est une ligne à stations ; le temps est le trajet.
- **Signature (et recette)** : une cabine cuivre accrochée au câble turquoise de la gouttière ; elle suit la progression du défilement et marque l'arrêt à chaque station (recette `motion.md` : progression scrubbée sur une variable CSS `--rot`/`--y`, une seule horloge GSAP). Au repos, la cabine se balance de quelques degrés autour de son crochet (phase 2).
- **Émotion (3 premières secondes)** : on est au bon endroit, ça ouvre dès 9 h, la maison est claire et franche (béton, cuivre, nom en lettres hautes).
- **Verbe** : Embarquer (CTA « Réserver une table » qui se remplit par le bas comme une cabine qui arrive à quai ; transition de page = rideau turquoise qui monte).
- **Capture** : le hero (« LE SERVAIS » en condensée géante sur le comptoir) ou la ligne avec trois stations d'heures.
- **Ancre** : Rue des Fossés Fleuris 33, au départ du téléphérique de Namur ; horaires et cuisine réels du dossier.
- **Théâtre** : loader non (le bar est un lieu de passage, le LCP reste le titre en HTML) ; GL non (les photos du client portent l'image, la signature est du DOM et du CSS).

Le concept tient jusqu'au pied (« Embarquement dès 9 h. »), à la carte (rayons ordonnés par heure, avec leur station sur le câble), à la réservation (les heures de service) et à la 404 (« Terminus. Cette page n'est pas desservie »).

## Système

**Palette** (références : façade en béton et fauteuils cuivrés, photos 01 et 02 ; tasse turquoise, photo 04 ; logo du client)
| rôle | hex | usage |
|---|---|---|
| ground | `#dfe2df` | béton clair |
| ink | `#0e1d1e` | vert nuit des tuyaux |
| muted | `#3f4e4b` | 7,1:1 sur ground |
| line | `#a3aeab` | joints du béton |
| accent | `#d2692b` | cuivre, surfaces et CTA (encre dessus 4,8:1) |
| accent-texte | `#9a4417` | cuivre assombri pour le texte (5,6:1) |
| teal | `#17727a` | le câble |
| curtain | `#0c4a50` | rideau de transition |
| nuit | `#0b2326` + `#f08a4b` | sections soir et pied |
Défaut n° 1 (crème, serif contrasté, terracotta) écarté : fond gris béton, sans serif condensé. Aucun violet, acide sur noir, verre dépoli ou eyebrow systématique.

**Typo** : Big Shoulders Display 800 (titres, heures, noms de rayons, capitales, `letter-spacing: -0.005em`, interligne 0,82 à 0,9, `text-wrap: balance`) et Hanken Grotesk variable (corps 16 à 18 px, interligne 1,55, UI 13 à 14 px en capitales espacées). Deux fichiers, deux préchargements. Échelle fluide `--t-mega` (5 à 26 rem, plafonnée en `svh`), `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`. Prix alignés à droite, `tabular-nums`, insécables « 24 € », « 11 h 30 ».

**Grille** : 12 colonnes (une seule en dessous de 48 rem), gouttière 20 à 48 px. Lignes verticales fortes : le câble dans la gouttière (2 px turquoise) et le bord gauche de la colonne de texte (colonne 9 de l'accueil, colonne 6 de la carte). Humeurs d'espacement : serré, normal, aéré, entracte. Rayon 0 partout (béton, angles droits).

**Mouvement (planifié, phase 2)** : easing `ease.out` pour les entrées, `ease.inOut` pour la transition de page ; durées 0,35 s (petits), 0,7 s (rideau). Hover : (1) CTA = remplissage par le bas (réalisé), (2) navigation = filet cuivre qui s'étend (réalisé), (3) liens texte = soulignement qui s'épaissit (réalisé) ; plats et images : léger décalage de vignette suivant le curseur sur la carte (phase 2). Repos : la cabine du câble se balance de 1,5 degré autour de son crochet (une horloge, pause hors écran, coupée en reduced motion).

**Plan de composition**

```
ACCUEIL
[poster ] LE SERVAIS (condensée géante) / photo comptoir 8 col + accroche et CTA 4 col
[index  ] Une journée : 4 stations sur le câble (9 h, 11 h 30, 18 h, 1 h), paires décalées photo/texte
[données] Les produits d'ici : tableau sur fond nuit (produit, maison, lieu, prix)
[paire  ] La Verrière : photo 5 col / texte 6 col
[pied   ] Embarquement dès 9 h. + venir, ouvert, contact, CTA
CARTE : [poster LA CARTE + sommaire] puis 8 rayons (heure + titre + note + vignette à gauche 4 col, liste de plats à droite 7 col)
HISTOIRE : [poster] [paire photo/texte] [données produits]
RÉSERVATION : [poster + CTA en ligne, appel] [3 colonnes horaires, cuisine, venir] [groupes + formules]
404 : Terminus
```
**Mobile 390** : une colonne, le câble reste dans la gouttière de 20 px, titres recalculés sur la largeur (« LE / SERVAIS » sur deux lignes), photos en 4:3, tableau des produits en deux lignes, sommaire en liste qui se replie.

**Patron de la carte** : liste index (un rayon par station, plats en lignes nom + prix), vignettes de rayon ; aperçu au curseur et vignettes au toucher en phase 2.

**Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur un hero en grille avec photo : changé en nom géant sur toute la largeur et câble vertical qui traverse toutes les pages ; oui sur trois cartes de présentation : remplacé par des stations alternées d'heures réelles ; oui sur un pied avec adresse : remplacé par un mot d'embarquement géant.

## Sur-utilisation de la skill (phase 1)

1. [x] Trois concepts, trois territoires (lieu : téléphérique ; temps : cadran ; matière : assiette), notés, ancre, test de l'échange (tableau ci-dessus).
2. [x] Aucun exemple travaillé de concepts.md (pas de braise, pavage, mise en place sur le gril, cadre, solde, phrase unique).
3. [x] Concept Card au format exact, verbe « Embarquer ».
4. [x] Concept au pied (`Footer.astro:9`), carte (`carte.astro`, heures de rayon), réservation (`reservation.astro`, horaires), 404 (`404.astro`, « Terminus »).
5. [x] Moment signature : cabine sur le câble, recette scrub de progression (réalisation en phase 2 ; le câble et ses points sont déjà dans `site.css`, `.ligne::before`).
6. [x] Palette de 9 rôles nommés avec références réelles (photos du client, logo), `tokens.css:15-26`.
7. [x] Aucun des 8 « defaults to avoid » (ni gradient violet, ni crème et terracotta, ni acide sur noir, ni verre dépoli, ni eyebrow systématique ; `hero__lieu` est la seule étiquette, elle porte un fait).
8. [x] Test de généricité noté ci-dessus.
9. [~] « Details 7 vs 8 » : sélection en cuivre (`site.css:9`), focus en cuivre assombri (`site.css:10`), favicon LS aux couleurs de l'identité (`public/favicon.svg`), pied en composition finale (`Footer.astro`), 404 dans le concept ; OG composée à faire en phase 3.
10. [x] Polices : Big Shoulders Display et Hanken Grotesk, 2 fichiers, `public/fonts/`, 2 préchargements (`Base.astro`).
11. [x] Échelle fluide unique `--t-*` (`tokens.css`), grands sauts (mega 26 rem contre corps 1 rem).
12. [x] Display réglé : interlettrage −0,005 em, interligne 0,82 à 0,9, balance ; accents des capitales protégés par `.split-line`.
13. [x] Corps 16 à 18 px, interligne 1,55, mesure bornée (34 à 40 rem), UI 13 à 14 px en AA.
14. [x] Typographie française : insécables dans les prix et heures, apostrophes courbes, « » absents des données.
15. [x] Grille 12 colonnes, deux lignes verticales fortes ; pas de cadre quatre coins : le câble le remplace (justifié : la ligne est la structure).
16. [x] Une famille de section au plus une fois par page (poster, index, données, paire, pied).
17. [x] Hero en 3 s : nom, adresse, ouverture dès 9 h, deux CTA visibles à 1280 x 720 (CTA `bottom` 632).
18. [x] Mobile 390 recomposé : titres sur largeur, une colonne, `scrollWidth` 390 sur les cinq pages (mesure Playwright à 320, 360, 390).
