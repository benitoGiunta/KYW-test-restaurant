# DESIGN.md : Makimono, variante awwwards « Le déroulé »

## Brief

- **Sujet** : Makimono, fast-casual japonais créatif (uramaki, poké bowls, nigiri flambés), Rue Saint-Loup 14, 5000 Namur. Baseline du client : « Creative uramaki made with love ».
- **Publics** : le midi (actifs du centre de Namur, sur place ou à emporter), le soir (couples, amis, commande en ligne), touristes de passage, habitués qui composent leur roll.
- **Métier du site** : donner envie en 3 secondes, montrer la carte complète (21 rolls, bowls, boxes, boissons), faire joindre ou commander (téléphone, e-mail, commande en ligne du client).
- **Ressources** : 16 photos du client (7 professionnelles sombres, tons cuivre et rose, 9 de smartphone), logo mascotte (non repris : le site porte sa propre marque), carte 2026 transcrite dans `donnees.json`.
- **Contraintes** : statique, `base` `/makimono/awwwards/`, noindex, pied KYW, aucune histoire ni équipe connues.
- **Hypothèses** : téléphone du site client (0483 03 88 47) retenu, l'autre numéro de restaurants.json n'est pas repris ; aucun avis ni note affichés (non vérifiés à la source) ; aucune histoire inventée : la page « La maison » repose sur le nom, la salle et la promesse de la carte.

## Trois concepts

| | A. Le déroulé (nom) | B. La matrice (forme) | C. Le chalumeau (matière) |
|---|---|---|---|
| Territoire | Étymologie : makimono = rouleau, `maki` enroulé + `mono` chose | Système formel : 13 rolls × 8 protéines, le prix suit la protéine | Matière du métier : les nigiri flambés au chalumeau |
| Phrase | Le site est un rouleau : on le déroule en lisant, ses cylindres se vident et se remplissent | La carte est un tableau croisé que le visiteur lit en choisissant sa protéine | Le site noircit et s'allume sous un chalumeau qui suit le curseur |
| Règle de mise en page | Bandes papier de riz / nori, couture entre chapitres, chasse de la police = état du rouleau | Une grille 13 × 8 pour toute la carte | Fond noir, photos en lumière rasante, braises |
| Verbe | dérouler | croiser | flamber |
| Voix typo | Archivo : large 125 % (déroulé) et étroit 62 % (roulé) | mono tabulaire | grotesque lourde |
| Palette | nori, riz, rose du gingembre | blanc et une couleur de protéine | noir, cuivre, orange de flamme |
| Signature | Deux rouleaux haut et bas dont le diamètre suit la progression (`motion.md` « scroll progress » + pilote unique) | Sélecteur de protéine qui recalcule les prix | Torche WebGL (webgl.md) |
| Capture | MAKIMONO en chasse large au-dessus du nigiri flambé, rouleau en tête | La grille remplie | Un nigiri dans la flamme |
| Ancre | Le nom lui-même : 巻物, « chose enroulée », et la maison enroule des uramaki | 13 rolls au choix de la protéine (données de la carte) | Nigiri flambés (carte) |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 5 / 5 / 4 / 1 | 3 / 4 / 4 / 3 | 3 / 4 / 3 / 3 |

**Test de l'échange** : A ne tient pas avec un autre restaurant (le nom est l'idée). B tient avec n'importe quelle carte à variantes (portabilité 3). C tient avec tout restaurant au chalumeau. **Choix : A**, seul concept dont chaque règle découle du nom. Détails volés : de B, le choix de la protéine par roll (`<details>` dès la phase 1, sélecteur animé en phase 2) ; de C, la 404 sombre et le plein cadre flambé.
Interdits des exemples travaillés écartés : pas de page qui refroidit, pas de pavage, pas de cadre de viewport, pas de solde courant, pas de phrase unique.

## Concept Card

- **Idée** : Makimono veut dire « chose enroulée » : le site est un rouleau qu'on déroule en descendant, comme les rolls sont enroulés.
- **Métaphore** : le rouleau peint (makimono) et le maki lui-même : tout est enroulé ou déroulé, le papier de riz et le nori alternent en bandes.
- **Signature (et recette)** : « le déroulé » : le rouleau du haut (l'en-tête, cylindre nori) grossit et celui du bas rétrécit avec la progression de lecture ; un pilote unique `--p` (scroll) gouverne les deux, plus la chasse de la police des titres. Recette `motion.md` scroll-linked progress. Phase 2.
- **Émotion (3 premières secondes)** : appétit net et nocturne : un nom énorme sur papier de riz, un nigiri qui prend la flamme, un rouleau noir au-dessus.
- **Verbe** : dérouler (glisser en ligne droite, ralentir, se poser à plat ; le survol élargit la chasse, `font-stretch` 100 % vers 125 %, et les boutons se déroulent de gauche à droite).
- **Capture** : le hero : MAKIMONO pleine largeur, nigiri flambé à droite, rouleau en tête de page.
- **Ancre** : le nom : maki (enroulé) + mono (chose) ; la maison sert des uramaki, 13 rolls au choix de la protéine.
- **Théâtre** : loader non (restaurant fast-casual, l'action passe avant : appeler, commander) ; GL non (photos déjà très fortes, un shader n'ajoute rien à la carte).

## Système

### Palette (références réelles : feuille de nori grillée, riz vinaigré, gingembre mariné rose, cuivre des assiettes des photos du client)
| Rôle | Hex | Usage |
|---|---|---|
| ground | `#eef0e8` | le riz, fond papier (ink 15,9:1) |
| ink | `#111a17` | le nori, texte et bandes sombres |
| muted | `#4f5d57` | méta (6,3:1 sur riz) |
| line | `#c5cbc0` | filets, fibre du papier |
| accent | `#b02a52` sur riz, `#f4a6b4` sur nori | rose de gingembre (5,9:1 / 9,2:1) |
| curtain | `#111a17` | rideau de transition |
Complémentaires : `--c-nori-2 #1b2824`, `--c-nori-muted #a9b5ae` (8,4:1), `--c-nori-line #33433d`, `--c-cuivre #c9794a` (décor seulement).

### Typographie
Une seule famille variable : **Archivo** (Google, `font.mjs`, un fichier woff2 de 90 Ko, wght 100 à 900, wdth 62 à 125, préchargé). Règle de l'axe de chasse : **étroit = roulé** (prix 75 %, méta 70 à 85 %), **large = déroulé** (titres 112 à 125 %, hover des noms et du téléphone). Échelle fluide : `--t-mega` 2,4 rem à 14,2 rem (12,4 vw, calée pour que « MAKIMONO » tienne dans le gutter), `--t-xl` 2,6 à 8,5 rem, `--t-l` 1,9 à 4,25 rem, `--t-m` 1,2 à 1,75 rem, corps 16 à 18 px, `--t-s` 14 px, `--t-xs` 13 px. Display : interligne 0,9, interlettrage -0,035 em (large) et -0,02 em (étroit), `text-wrap: balance`. Prix en `tabular-nums`, insécables « 11,40 € » et « 12 h 30 » (fonctions `eur`, `hm`), apostrophes courbes et « » dans les textes.

### Grille et rythme
12 colonnes (gutter fluide 16 à 40 px), 4 colonnes logiques au téléphone (tout passe en 1 / -1). Lignes fortes : colonne 1 (tout aligné sur le gutter) et colonne 7 / 8 (seconde ligne de texte). Humeurs d'espacement : `--serre` (24 à 48 px), `--normal`, `--aere`, `--entracte`. Rayon : 2 px partout. Cadre : pas de cadre quatre coins, justifié par le concept (le cadre est interdit parmi les exemples travaillés, la structure est celle des bandes riz / nori).

### Mouvement (planifié, phase 2)
Easing de l'engine : `ease.out` pour les révélations, `ease.inOut` pour le rideau (panneau nori qui monte), durées 0,5 à 0,9 s. **Rôles de hover** (3 traitements) : (1) CTA et boutons : le fond se déroule de gauche à droite ; (2) noms de plats, téléphone : la chasse passe de 100 % à 125 % et la couleur à l'accent ; (3) liens texte et nav : le soulignement se déroule. **Repos** : l'icône maki de la marque tourne au survol ; au repos, reflet qui glisse sur les rouleaux (phase 2), page immobile sinon.

### Plan de composition
```
ACCUEIL                                   CARTE
[rouleau fixe]                            [rouleau fixe]
POSTER   MAKIMONO (pleine largeur)        TITRE LA CARTE + sommaire collant (strip scroll-snap)
         texte+CTA | photo flambée        INDEX 21 rolls (nom | compo | prix, <details> protéines)
STATEMENT « une chose enroulée » + paire  PAIRE nigiri photo | liste
INDEX    6 rolls, fond nori               NARRATION Create.Your.Roll (étapes)
PLEIN CADRE  nigiri flambé, prix          PAIRES poké bowls, boxes, accompagnements, desserts
NARRATION  Create.Your.Roll (collante)    MUR boissons (3 colonnes)
PAIRE ASYM.  boxes 16 et 18 €             PIED
MUR     4 photos décalées
DONNÉES  horaires | adresse, téléphone
PIED     rouleau-bas, « À table. », téléphone
```
Mobile 390 px : titres re-réglés par `--t-mega`, tout en une colonne, `.sommaire` en strip `overflow-x` + `scroll-snap`, en-tête réduit (nom masqué sous 420 px, « Appeler » masqué), mur 2 colonnes décalées.

### Test de généricité
« Un modèle générique atterrirait-il ici ? » Oui sur : crème + terracotta (changé pour riz froid + nori + rose de gingembre), photo plein écran sombre en hero (changé : le nom en capitales larges est le hero, la photo en second), 01/02/03 (aucun), eyebrow sur chaque titre (aucun, une seule baseline). Conservé : bandes alternées claires et sombres, justifiées par le riz et le nori.

## Sur-utilisation de la skill (phase 1, preuves)

1. [x] Trois concepts, trois territoires (étymologie, forme, matière), notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé : § Interdits ci-dessus ; aucune braise, aucun cadre.
3. [x] Concept Card exacte, verbe « dérouler » compris : implémenté en CSS dans `.ligne__nom` (`font-stretch`) et `.bouton` (`background-size`), `site.css`.
4. [x] Concept au pied, carte, réservation, 404 : pied `.rouleau-bas` (Footer.astro), carte `.ligne`, titres en chasse large, 404 « Rien à dérouler » avec `.perdu__rouleau`.
5. [x] Un moment signature et sa recette : « le déroulé » (rouleaux haut et bas liés à la progression), recette scroll-linked de `motion.md`, à construire en phase 2 (planifié, non coché comme livré).
6. [x] Palette 4 à 6 rôles, références réelles : tokens.css lignes 13 à 24.
7. [x] Aucun des 8 « defaults to avoid » : pas de crème + terracotta, acide sur noir, dégradé violet, verre, Inter, Fraunces, Instrument Serif ni Playfair (Archivo).
8. [x] Test de généricité : ci-dessus.
9. [~] « Details that separate 7 from 8 » : sélection en accent (`::selection` site.css), focus dans l'accent (engine.css `:focus-visible`, nav en rose), favicon de l'identité (`public/favicon.svg` : maki en spirale), OG composée (`public/og.png`, 1200 x 630, rendue depuis le hero), pied comme composition finale (« À table. » + téléphone), 404 dans le concept. Survol à vérifier en navigateur (phase 3).
10. [x] Polices : Archivo variable, `public/fonts/archivo-100_900-normal.woff2`, un fichier, préchargé (Base.astro).
11. [x] Échelle fluide unique : `--t-mega` à `--t-xs` (tokens.css), grands sauts (mega 14 rem vs corps 1 rem).
12. [x] Display réglé : `.display` (interligne 0,9, -0,035 em, balance).
13. [x] Corps et UI : corps 16 à 18 px, UI 13 à 14 px, mesure 62 ch (`.texte`).
14. [x] Typographie française : `eur()`, `hm()`, `fr()` dans site.ts (U+00A0), « » et apostrophes courbes dans les pages.
15. [x] Grille, lignes fortes : colonnes 1 et 7 / 8 ; cadre quatre coins non utilisé, justifié (voir Grille).
16. [x] Famille de section au plus une fois par page : accueil = poster, statement, index, plein cadre, narration, paire, mur, données (index.astro).
17. [x] Hero en 3 s : nom, cuisine, adresse, CTA « Appeler » et « Voir la carte » (mesure 1440 x 900 : h1 y 103 à 263, CTA y 687, photo 306 à 799).
18. [x] Mobile 390 recomposé : `@media (max-width: 820px)` (site.css), mesure 390 x 844 : scrollWidth 390, h1 x 16 à 368.
