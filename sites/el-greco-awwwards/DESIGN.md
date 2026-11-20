# DESIGN.md : El Greco, variante awwwards

## Brief
- **Sujet** : El Greco, restaurant grec familial, rue de Sardanson 22, 5004 Bouge (Namur). Cuisine grecque : crèmes grecques, mezze, grillades, vins grecs. « Depuis 1986 » d'après le site actuel (non vérifié ailleurs).
- **Publics** : le soir (couples, familles), le midi vendredi et samedi (horaires à confirmer), habitués de Bouge et de Namur, curieux de cuisine grecque.
- **Métier du site** : appeler pour réserver (téléphone, pas d'outil en ligne), lire la carte (12 rubriques avec prix), venir (adresse, plan, horaires).
- **Ressources** : aucune photo du restaurant ni des plats ; trois photos de stock Pexels de Grèce (placeholder, légendées « pas le restaurant ») ; un logo manuscrit bleu marine de 489 px (fond clair seulement) ; carte et boissons complètes avec prix.
- **Contraintes** : site statique Astro sous `base` /el-greco/awwwards/, noindex, pied KYW, aucune donnée inventée.
- **Hypothèses** : voir RAPPORT.md (horaires lundi à mercredi inconnus ; pas d'équipe, de chef ni d'avis cités ; réservation par téléphone ou e-mail seulement).

## Trois concepts (trois territoires)
| | A. Allonger (nom, étymologie) | B. La table au milieu (service, partage) | C. La brochette (matière du feu) |
|---|---|---|---|
| Phrase | « El Greco » = « le Grec », surnom d'un peintre né en Crète aux figures étirées : tout le site s'allonge. | Tout se pose au centre, chaque rubrique est un plat qu'on passe. | Le gril : chaque plat est enfilé sur une broche qui traverse la page. |
| Règle de mise en page | Colonnes hautes, display étroit, cadres de rapport 1 pour 2 et plus. | Disques et centre de page. | Axe vertical unique, rubriques enfilées. |
| Verbe | allonger | poser | embrocher |
| Voix typo | Grotesque à axe de largeur, 62 % en display. | Rond et chaleureux. | Slab lourd. |
| Palette | Peinture de Tolède : bleu nuit, blanc de plomb, rouge de cardinal. | Nappe et faïence. | Braise et fumée. |
| Ancre | Le nom, `Le Grec`, et la carte de trois crèmes grecques de longueurs croissantes. | Le mezze signature à 31,90 €. | Brochettes de poulet et d'agneau du mezze. |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 4 / 5 / 1 | 3 / 5 / 4 / 4 | 3 / 4 / 4 / 3 |
- **Test de l'échange** : la phrase A ne tient avec aucun autre restaurant (elle vient du nom). B et C tiennent pour n'importe quelle grillade ou tapas : ce sont des styles.
- **Choix : A**, raison : seul concept tiré du nom du client, tenable du hero à la 404, faisable en CSS et GSAP sans GL. De B, on garde un détail : la mention « à partager » (hero, crèmes). De C : rien d'utilisé.
- Interdits de concepts.md : aucun des exemples travaillés n'est repris.

## Concept Card
- **Idée** : le restaurant porte le nom d'un peintre qu'on appelait « le Grec » et qui étirait ses figures ; le site tire tout vers le haut.
- **Métaphore** : une figure du Greco, longue et debout ; ici, une colonne qui monte.
- **Signature (et recette)** : l'allongement. Chaque bloc entre en poussant vers le haut depuis sa base (clip-path `inset(100% 0 0 0)` vers 0, recette `reveal clip` de motion.md, transform-origin bas) ; titres display en SplitText par lignes. Phase 2.
- **Émotion (3 premières secondes)** : verticalité, assurance, « un lieu grec qui a du caractère » ; EL GRECO en colonne haute, un clocher blanc en cadre étroit.
- **Verbe** : allonger.
- **Capture** : l'accueil à 1440 : « EL GRECO » en deux lignes étroites et lourdes, cadre vertical du clocher à droite, boutons Appeler et Voir la carte.
- **Ancre** : El Greco = « le Grec » (nom du restaurant) ; trois crèmes grecques à 9,90 € ou 12,90 € les trois ; mezze signature 31,90 €.
- **Théâtre** : loader non (restaurant : l'action est d'appeler, 2,6 s de loader n'aident pas) ; WebGL non (pas de photo de plat à déformer, le concept est typographique) ; rideau de page oui (bande qui monte).

## Système
- **Palette** (références : « Vue de Tolède » du Greco, ciel d'orage bleu nuit ; blanc de plomb des rehauts ; rouge des cardinaux ; murs chaulés et bleu de lessive grecs) :
  `ground #0e1a2b`, `ink #eef1ea`, `muted #a3b3c6`, `line #2a3f5e`, `accent #f0604d` (rouge de cardinal, 5,6:1 sur ground), `curtain #1d3fa0` ; sections « mur chaulé » : papier `#e9ece4`, encre `#0e1a2b`, accent `#b3261a`. Pas de crème + terracotta ni d'acide sur noir.
- **Typo** : une seule famille, Archivo (variable, axe de largeur 62 à 125, graisse 100 à 900), un seul fichier de 88 Ko préchargé. Display : 800, largeur 62 %, capitales, interligne 0,88, interlettrage -0,012 em ; corps : largeur 100 %, 16 à 18 px, interligne 1,5 ; UI 13 à 14 px ; prix en `tabular-nums`, « 24,90 € » avec espace insécable. Échelle fluide unique `--t-mega` (5 à 24 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs`.
- **Grille** : 12 colonnes (4 au téléphone), gutter fluide 1,25 à 3 rem, max 100 rem. Lignes fortes : le bord gauche du display (aligné sur le gutter) et la colonne de droite 10 à 12 (cadre haut). Humeurs d'espacement : serre 3u, normal 8u, aéré 14u, entracte 22u. Règle de forme : angles vifs, cadres hauts.
- **Mouvement (planifié, phase 2)** : easing `ease.out` (entrées), `ease.inOut` (rideau) ; durées : texte 0,9 s, cadre 1,1 s, rideau 0,65 s. Traduction du verbe : tout pousse vers le haut depuis sa base. **Rôles de hover** : CTA = la couleur monte du bas (scaleY, déjà en CSS) ; nav = filet qui s'allonge (scaleY) ; plats et index = nom qui prend l'accent et filet qui s'étire ; liens texte = soulignement qui s'épaissit ; utilitaires = couleur seule. **État de repos** : le cadre haut du hero se déplace de quelques pixels vers le haut et le bas (respiration d'1 % d'amplitude, 8 s), sur l'horloge GSAP, off en mouvement réduit.
- **Plan de composition** (accueil, une famille par section) : poster (hero) ; colonnes de hauteurs croissantes (crèmes, séquence réelle) ; paire asymétrique sur mur chaulé (mezze) ; index (six plats) ; données (venir, horaires) ; pied final (« À table » géant). Carte : sommaire collant + liste index par rubrique. Histoire : paire texte et cadre haut, statement papier, trois repères décalés. Réservation : deux colonnes (appeler, horaires). 404 : « Trop long ».
```
HERO  [EL / GRECO ......... |clocher|]   CRÈMES [tzatziki][tarama ][tirokafteri]
      [phrase, CTA ....... |  haut |]            (hauteurs 13, 19, 25 rem)
MEZZE |cadre 1:2,2| 31,90 € + liste        INDEX  NOM ........ 28,90 €
```
- **Mobile 390 px** : display recalé (hero 36 vw), crèmes en piste `overflow-x` avec `scroll-snap`, sommaire de la carte en piste horizontale, cadre haut sous le texte, en-tête sur une rangée (3 liens), signature : les colonnes gardent leur hauteur croissante.
- **Test de généricité** : un modèle générique mettrait « Saveurs grecques » centré sur Santorin bleu et blanc, trois cartes égales, un dégradé : changé (hero typographique étroit à gauche, cadre vertical décalé, hauteurs inégales, palette de peintre).

## Sur-utilisation de la skill
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (page qui refroidit, carte en pavage, mise en place sur le gril, cadre, solde courant, phrase unique).
3. [x] Concept Card au format exact ; verbe : allonger.
4. [x] Concept au pied (`À TABLE` en colonne haute, `Footer.astro`), carte (display étroit, filets), réservation (`resa__tel` géant), 404 (« Trop long », `404.astro`).
5. [x] Moment signature et recette : allongement par clip-path depuis la base (phase 2), CTA en scaleY déjà codé (`site.css` `.cta::before`).
6. [x] Palette de 6 rôles avec références nommées (`tokens.css:9-21`).
7. [x] Aucun des 8 « defaults to avoid » : pas de héros centré sur dégradé, pas de trois cartes égales (crèmes à hauteurs 13/19/25 rem), pas de violet, pas de crème + terracotta, pas d'acide sur noir, pas de verre, pas d'eyebrow sur chaque titre, pas de 01/02/03.
8. [x] Test de généricité noté ci-dessus.
9. [x] Détails 7 à 8 : sélection (`::selection` du socle), focus visible dans l'accent (`engine.css`), favicon de l'identité (colonne blanche à base rouge, `public/favicon.svg`), OG composée depuis le hero (`public/og.png`, à recomposer en phase 3), pied en composition finale, 404 dans le concept. Plusieurs cochés en phase 3.
10. [x] Polices : un fichier Archivo variable, préchargé (`Base.astro`).
11. [x] Échelle fluide unique, grand saut mega/body ≈ 5 à 24 rem contre 1 rem (`tokens.css:23-29`).
12. [x] Display réglé : interlettrage -0,012 em, interligne 0,88, `text-wrap: balance`, bord gauche aligné (mesure `minLeft` = gutter à quatre largeurs).
13. [x] Corps 16 à 18 px, interligne 1,5, UI 13 à 14 px.
14. [x] Typographie française : insécables (« 12,90 € »), apostrophes courbes, « » dans l'histoire, œ.
15. [x] Grille 12 colonnes, lignes fortes (gutter gauche, colonne haute à droite), pas de cadre quatre coins (équivalent justifié : le cadre est la colonne haute).
16. [x] Une famille de section au plus une fois par page (voir plan).
17. [x] Hero en 3 s : nom, cuisine, ville, Appeler (mesure : CTA bas à 837 px sur 900, 696 sur 720).
18. [x] Mobile 390 recomposé : `scrollWidth` 390 sur 5 pages, strips `scroll-snap`.
