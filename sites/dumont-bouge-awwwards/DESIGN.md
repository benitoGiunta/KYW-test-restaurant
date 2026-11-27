# DESIGN.md · Dumont Bouge, variante awwwards « Sept à dix-huit »

## Brief
- **Sujet** : Dumont Bouge, boulangerie, pâtisserie, sandwicherie (Dagobert) et tea-room, chaussée de Louvain 343 à Bouge (Namur). Second point de vente : rue de Marchovelette 9, Namur.
- **Publics** : habitués du matin (pain, petit-déjeuner dès 7 h), midi (brunch 11 h 30 à 15 h, sandwichs à emporter), après-midi (gâteaux, gaufres, tea-room), commandes de gâteaux et plateaux par téléphone.
- **Métier du site** : réserver (téléphone, formulaire de la maison), venir (adresse, horaires, parking), lire la carte (211 lignes, 23 rubriques).
- **Ressources** : 4 photos exploitables (vitrine, salade de chèvre, mini-sandwichs, façade), logo PNG rose, texture de coup de pinceau rose ; aucune photo du tea-room, du pain ni du brunch.
- **Contraintes** : statique, `base` /dumont-bouge/awwwards/, noindex, pied KYW. Aucune donnée fictive en phase 1 (fondateurs, avis, équipe, prix de gâteaux : absents, non inventés).
- **Hypothèses** : voir `src/data/site.ts` (en-tête) et RAPPORT.md.

## Trois concepts (test de l'échange appliqué)
| | A. Sept à dix-huit | B. L'étiquette de vitrine | C. Quatre portes |
|---|---|---|---|
| Territoire | rythme horaire du métier | matière du comptoir (étiquettes roses de la vitrine) | lieu (quatre enseignes sous un toit) |
| Phrase | La maison est une journée : le site se lit de 7 h à 18 h comme un comptoir qui change d'heure en heure. | Chaque chose à vendre porte une petite étiquette rose, le site est un comptoir d'étiquettes. | Quatre métiers, une seule porte : on entre par l'un, on sort par l'autre. |
| Règle | l'heure est la structure : chaque section commence par son heure | chaque plat est une carte étiquette | quatre colonnes fixes de métiers |
| Ancre | ouvert tous les jours 7 h à 18 h, petit-déjeuner 7 h à 11 h, brunch 11 h 30 à 15 h | les petites étiquettes roses visibles sur la photo de la vitrine | les quatre enseignes du site actuel (pâtisserie, boulangerie, restauration, tea-room) |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 4 / 2 | 3 / 3 / 4 / 3 | 3 / 4 / 5 / 3 |
| Test de l'échange | échoue pour un autre restaurant : les horaires 7 h à 18 h, brunch 11 h 30, sont les siens | tient pour toute pâtisserie | tient pour toute maison multi-activités |

**Choix : A**, parce que la journée de 7 h à 18 h, sept jours sur sept, est le fait le plus spécifique et il traverse hero, carte (rubriques par heure), réservation, pied et 404. Détails repris : de B, la petite étiquette (prix de la carte) ; de C, les « quatre métiers » de la page La maison.

## Concept Card
- **Idée** : la maison est une journée de comptoir, de 7 h à 18 h ; chaque section du site s'ouvre sur son heure.
- **Métaphore** : le coup de pinceau du logo est l'aiguille : il peint la journée écoulée, du matin au soir.
- **Signature (et recette)** : le pinceau rose se déroule derrière « Bouge » puis une règle de temps fixe en marge (7 h à 18 h) se peint au scroll ; recette `motion.md` scrub ScrollTrigger sur `scaleX` d'un masque (phase 2). En phase 1 : état statique complet (pinceau fixe derrière « Bouge »).
- **Émotion (3 premières secondes)** : appétit et évidence : un nom énorme sur un trait de pinceau rose, une vitrine pleine de tartes, « 7 h à 18 h tous les jours ».
- **Verbe** : dérouler.
- **Capture** : la page d'accueil à 1440 : « Dumont Bouge » sur son trait rose, la vitrine dessous ; ou le pied « 7 h à 18 h » en rose sur brun.
- **Ancre** : ouvert tous les jours de 7 h à 18 h à Bouge ; petit-déjeuner 7 h à 11 h ; brunch 11 h 30 à 15 h (donnees.json, horaires).
- **Théâtre** : loader non (une boulangerie vend, elle ne fait pas attendre ; le pinceau fait office d'entrée) ; GL non (4 photos plates, aucune matière 3D ; le pinceau est un masque CSS).

## Système
**Palette** (rôles) : ground `#fff3f6` blanc rosé des boîtes à gâteaux ; ink `#2a171c` brun du comptoir noir de la vitrine ; muted `#6b4a55` ; line `#ebc6d2` ; accent `#d3135e` rose du logo (texte : `#b80f4f`) ; curtain `#d3135e` ; nuit `#2a171c` avec texte `#ffe6ee` et accent clair `#ff7fab`. Références : papier de boîte de pâtisserie rose et brun chocolat, enseignes de pâtissiers belges. Pas de crème ni terracotta ; rose saturé sur blanc rosé et brun, pas d'acide sur noir.

**Typographie** : une seule famille variable, Bricolage Grotesque 200 à 800 (Google Fonts, un fichier de 40 Ko, préchargé). Display 800, interlettrage -0.045em (mega -0.06em dans le pied), interligne 0,9 ; corps 400 à 17-19 px, interligne 1,5, mesure ≤ 60 car. ; UI 13 à 15 px ; prix `tabular-nums`, « 2,50 € » avec espace insécable, « 7 h à 18 h » avec insécables ; apostrophes et guillemets français. Échelle fluide `--t-mega` 4,5 à 17 rem, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs` (tokens.css).

**Grille** : 12 colonnes, gouttière fluide, trois lignes verticales fortes (colonnes 1, 5-6, 9), 4 humeurs d'espacement (`--serre`, `--normal`, `--aere`, `--entracte`), rayon 0 (angles droits, filets de 1 à 2 px).

**Mouvement (à planifier, phase 2)** : easing `ease.out` pour les apparitions, `ease.inOut` pour le rideau ; verbe « dérouler » = tout ce qui entre se déroule de gauche à droite (clip-path/scaleX), durées 0,6 à 0,9 s. Hover : CTA (fond rose vers brun), nav (soulignement qui se déroule), plats (le prix passe en rose). Repos : le pinceau respire de quelques pixels en X (idleMotion), décision motivée : seul objet vivant de la page.

## Plan de composition
```
ACCUEIL  hero (poster)   [Dumont/Bouge sur pinceau 8 col | infos+CTA 4 col] / vitrine pleine largeur
         jour (index)    4 lignes : heure | titre+texte | lien
         paire asymétrique  salade portrait (5 col) | titre+texte (6 col) + mini-sandwichs décalés
         statement (nuit) citation de la maison, 24 caractères de mesure
         données          4 chiffres comptés sur la carte (pains, gâteaux, Dagobert, lignes)
         média plein cadre façade ; pied final « 7 h à 18 h » rose sur brun
CARTE    en-tête + puces (strip défilant, scroll-snap) ; 4 chapitres en index : titre collant (4 col) | rubriques (8 col), plat | prix
LA MAISON  en-tête ; quatre métiers (4 colonnes) ; paire (vitrine | texte) ; deux adresses
RÉSERVATION  en-tête ; trois voies (téléphone, formulaire, e-mail) ; accès + horaires | façade
404      « 18 h 01 » énorme, titre, deux retours
MOBILE 390 : titres re-réglés (clamp), lignes en 1 colonne, puces en strip défilant, pinceau conservé, photos recadrées 4/3.
```

**Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur le hero (nom énorme, photo dessous) : changé par le pinceau du logo en masque derrière le nom et l'heure en rose dans la colonne d'infos. Oui sur la carte (liste prix à droite) : changé par le titre collant et les heures en tête de rubrique. Non sur le pied et la 404 (horaires comme matière).

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md : ni braise, ni pavage, ni cadre, ni solde courant, ni phrase unique (relu contre la liste du prompt).
3. [x] Concept Card au format exact, verbe « dérouler » : section Concept Card.
4. [x] Concept au pied (`Footer.astro:11` « 7 h à 18 h »), à la carte (heures en tête de rubrique, `carte.astro`), réservation (`reservation.astro` horaires), 404 (`404.astro` « 18 h 01 »).
5. [x] Moment signature : pinceau déroulé et règle 7 h à 18 h, recette scrub ScrollTrigger (phase 2) ; état statique `hero__pinceau` dans `site.css`.
6. [x] Palette de 6 rôles + nuit, références nommées (papier de boîte, comptoir noir) : `tokens.css:11-21`.
7. [x] Aucun des 8 « defaults to avoid » : pas de crème + serif + terracotta (rose sur blanc rosé, sans empattement), pas d'acide sur noir, pas de dégradé violet ni verre dépoli, pas d'eyebrow systématique, pas de 01/02/03, pas d'Inter/Fraunces/Playfair.
8. [x] Test de généricité : section Plan de composition.
9. [~] Détails 7 à 8 : sélection rose (`site.css`, `::selection`), focus dans l'accent (`engine.css` `--c-accent`), favicon de l'identité (`public/favicon.svg`), OG composée (`public/og.png`), pied en composition finale, 404 dans le concept : fait ; vérification en navigateur en phase 3.
10. [x] Polices : 1 fichier (`public/fonts/bricolage-grotesque-200_800-normal.woff2`), 1 préchargement (`Base.astro`).
11. [x] Échelle fluide unique, sauts de 17 rem à 0,81 rem : `tokens.css`.
12. [x] Display réglé : interlettrage négatif, interligne 0,9, `text-wrap: balance` (`site.css` `.display`).
13. [x] Corps 17-19 px, interligne 1,5, UI 13-15 px.
14. [x] Typographie française : insécables dans `site.ts` et `carte.json`, apostrophes courbes, aucun tiret long (contrôle Python : 0).
15. [x] Grille 12 colonnes, trois lignes fortes ; cadre quatre coins non retenu (justifié : filets horizontaux en index, plus proche du métier de la carte).
16. [x] Chaque famille de section au plus une fois par page (accueil : poster, index, paire, statement, données, plein cadre).
17. [x] Hero en 3 s : nom, métiers, « 7 h à 18 h tous les jours », deux actions (mesures 1440 : h1 [33,130,938,557], CTA [971,485,1407,537], photo [33,592,1407,1209]).
18. [x] Mobile 390 composé : mesures sans débordement horizontal à 360 et 390 sur les 5 pages (`db-mesure`, FIN problemes=0) ; strip des puces en `overflow-x` + `scroll-snap`.
