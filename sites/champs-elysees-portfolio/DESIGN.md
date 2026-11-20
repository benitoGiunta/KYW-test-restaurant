# DESIGN — Champs Elysées, variante portfolio (gabarit « Guinguette » adapté)

## Choix du gabarit
Notes sur 5 (positionnement / ambiance / contenu / carte / réservation / signature). Seuls les gabarits non encore attribués
à un restaurant (`gabarits/UTILISATION.md`) ont été notés en détail.

| Gabarit | Pos. | Amb. | Contenu | Carte | Rés. | Signature | Total /30 | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| guinguette | 5 | 4 | 4 | 5 | 4 | 4 | **26** | brasserie familiale avec terrasse, 12 photos, carte longue |
| journee | 4 | 3 | 3 | 4 | 4 | 3 | 21 | ouvert 7/7 mais cadran horaire sans matière (un seul créneau 11 h-22 h) |
| collage | 3 | 3 | 2 | 3 | 3 | 2 | 16 | exige des activités multiples (scène, brunch) : inconnues |
| cahier | 3 | 2 | 3 | 3 | 3 | 2 | 16 | menu du jour manuscrit : aucune donnée de menu du jour |
| velours | 1 | 1 | 2 | 1 | 3 | 2 | 10 | gastronomique, menu unique : contresens |
| déjà attribués (quatre-mains, verger, forno, comptoir, encre, ardoise, braise, affiche, nocturne, maree) | | | | | | | non retenus | répartition de la collection |

**Décision : Guinguette.** « Bistro convivial » familial, 120 couverts, terrasse sur l'avenue, menu enfants, carte de 94 lignes :
la table de terrasse (tirages à cadre blanc, objets au trait, carte blanche à pointillés) est la bonne métaphore.

## Adaptation
- **Palette** reprise du site actuel : crème, orange abricot, vert forêt (à la place de lin, corail, canard).
- **Hero** : « Plaisir et partage » (formule du site actuel), slogan = baseline réelle « bistro convivial ».
- **Conservées** : hero, la maison (1984), la table (12 photos réelles, légendes tirées de `sujet`), le menu (extrait de 3 catégories à l'accueil), manifeste, horaires.
- **Retirées** : À emporter (service inconnu), avis d'exemple (aucun avis accessible), carte d'exemple, menu unique, équipe illustrative, privatisation du samedi (inconnue).
- **Ajoutées ou transformées** : carte complète en deux blocs (À manger / À boire, 15 catégories, 94 lignes) avec pictogrammes ; page « Terrasse et fêtes patronales » (menu 50 / 65 €, groupes de plus de 10 personnes par téléphone, mascotte) ; section presse à la place des avis (La DH, 04/08/2024 : citation de Teresa, article, plats cités).
- **Composants créés** : aucun ; `.carte-avis` réutilisé pour la presse, `.formule` pour les fêtes.
- **Adéquation estimée (phase 1) : 78 %.** Raisons : (1) métaphore de table et de terrasse juste pour une brasserie familiale ; (2) carte complète et vraies photos de salle ; (3) palette du site actuel conservée. Limites : pas de photo de terrasse en plein jour ni d'équipe, pas d'avis clients, logo vectoriel absent (mascotte PNG), animations et QA à faire.

---

## Concept Card
- **Idée** : le site est une table de terrasse un dimanche. On y pose, on y attrape, on y déplace des choses : objets au
  trait (cornet de frites, fourchette, verre, parasol, bouteille, citron), tirages à cadre blanc, cartes d'avis.
- **Métaphore** : la nappe de la guinguette. **Émotion** : le dimanche en famille, les coudes sur la table.
- **Verbe de motion** : rebondit (entrée du hero et des boutons seulement ; le reste se pose).
- **Signature** : « La table », mur de 12 tirages + objets saisissables (GSAP Draggable, inertie maison par quickTo),
  badge rotatif « attrapez-moi » ; rail scroll-snap en mobile.
- **Capture attendue** : tirages et objets en désordre autour du titre Zodiak corail, un tirage en cours de déplacement.

## Système
- **Palette** : crème `#F4ECDC` (fond), orange abricot `#F08A3C` (surfaces, traits, prix cerclés), orange encre `#A8481A` (texte
  orange grands corps seulement, contraste à mesurer en phase 2), vert forêt `#1F4A3A` (bandes), paille `#F3D9A0`
  (badges, pastilles), encre `#1F1A17`. Sur bande corail : texte encre (5,1:1). Sur bande canard : texte lin (5,0:1).
- **Typo** : Zodiak (Fontshare) 400/400i/700 pour titres, mots géants, citations, tracking -0.02em, italique pour le
  slogan décalé ; Satoshi (Fontshare) 500/700 pour texte, nav, carte (capitales +0.04em). Fichiers dans `public/fonts/`.
- **Grille** : one-page centré, `.wrap` 72 rem, gouttières 72 px desktop / 16 px mobile ; blocs alternés lin / canard /
  corail ; cartes et photos radius 24 px, boutons ovales 999 px.
- **Rythme** : sections pleines, « la table » pleine hauteur, le reste en 16u.
- **Motion language** : entrée hero = chute + `bounce.out` des objets ; tirages posés en stagger avec rotation ; carte du
  menu qui se pose (scale 0,96 → 1) ; « Avis » blur 14px → 0 au scrub, cartes qui glissent et se redressent ; boutons
  ovales flood corail avec rebond ; idle = objets qui flottent de 3 px (hero + manifeste), marquee d'état.
- **Reduced motion** : objets posés sans rebond, toujours saisissables ; tirages droits en grille ; avis sans flou ;
  marquee statique.

## Wireframes (desktop)
```
[marquee état ▸ OUVERT · prochain service · adresse · réserver en ligne ▸]
[ brand ·      (nav pilule)      · Réserver ]
HERO poster        ⌒ parasol                 ⌒ verre
     À table, entre potes  (Zodiak 2 lignes ; titre neutre depuis REVISION-1 : le restaurant de référence ferme le dimanche)
          — « à quatre mains, les coudes sur la table » (italique corail décalé)
     Avenue de la Plante 4, Namur        ( Réserver ) ( La carte )
  frites ⌒           fourchette ⌒        bouteille ⌒     citron ⌒
LA MAISON  [photo trio cadre blanc] | ⌜ texte vouvoyé ⌟ (ornements de coins)
LA TABLE (100vh, bande canard)  [tirages en désordre + objets] badge « attrapez-moi »  titre centré
LE MENU  carte blanche 24px : catégorie + picto · ligne nom ····· (prix) · badge végé
AVIS     « Avis » géant flou→net en filigrane ; 4 cartes inclinées par-dessus (Exemple d'avis) + citation Michelin
MANIFESTE corail : titre avec un mot italique · 2 boutons ovales contour · objets flottants
HORAIRES carte : jours ····· heures · FERMÉ corail · terrasse : à confirmer*
FOOTER   « À table ! » coupé par le bas · colonnes · KywFooter
```
Mobile 390 : 3 objets dans le hero ; table = rail scroll-snap (rotation conservée) ; avis empilés ; boutons pleine largeur.

## Test de généricité
Un modèle ferait un site chaleureux avec des photos arrondies et un bouton corail. Ici on attrape les objets, les tirages
et les avis sont posés comme sur une table, les objets dessinés sont ceux de la maison (frites, parasol, verre), et le
mot « Avis » sort du flou pendant que les cartes glissent.

## Règles dures (preuves dans RAPPORT.md après QA)
- [x] Hero peint au premier rendu (titre, slogan, adresse sans data-intro ; objets animés par transform/opacity).
- [x] Aucune date en dur ; l'état « ouvert » se calcule côté client depuis `site.horaires`.
- [x] Une donnée, un drapeau : chaque donnée fictive porte `placeholder: true` et une marque visible.
- [x] KywFooter unique, noindex, lang fr, u()/asset() partout.
- [x] Texte caché décoratif par clip-path, jamais opacity: 0 ; reduced-motion complet.
- [x] Contraste ≥ 4,5:1 pour le texte courant (corail réservé aux surfaces et aux grands titres).

## Décisions de la révision 1 (31/10/2026)

- Titre du hero « À table, entre potes » et table « La table des potes » : « dimanche » contredisait les horaires réels
  (fermé le dimanche). L'idée « dimanche en famille » reste l'émotion, pas un fait affiché.
- En-tête : le flou est porté par `.header::before` ; jamais de `backdrop-filter`/`filter`/`transform` sur `.header`,
  sinon la pilule mobile `position: fixed` se cale sur l'en-tête au lieu du bas de l'écran.
- Mobile : les objets du hero se posent en rangée sous les boutons (`--mx` dans `site.ts`, `bottom` fixe), jamais sur
  le titre ni sur un bouton. Badge « attrapez-moi » 6,5 rem en mobile, main de 2,2 rem au centre.
- Pied de page canard : « fermé » en pastille paille, texte encre (le corail sur canard tenait 1,81:1).
- Loader « nappe » sur l'accueil seulement (sortie 0,6 s) ; les sous-pages s'affichent sans loader.
- Survol : marque d'en-tête en canard + soulignement corail ; onglets de la pilule montent de 2 px, onglet courant passe
  en corail au survol.
