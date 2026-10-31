# DESIGN — gabarit « Guinguette »

## Concept Card
- **Idée** : le site est une table de terrasse un dimanche. On y pose, on y attrape, on y déplace des choses : objets au
  trait (cornet de frites, fourchette, verre, parasol, bouteille, citron), tirages à cadre blanc, cartes d'avis.
- **Métaphore** : la nappe de la guinguette. **Émotion** : le dimanche en famille, les coudes sur la table.
- **Verbe de motion** : rebondit (entrée du hero et des boutons seulement ; le reste se pose).
- **Signature** : « La table », mur de 12 tirages + objets saisissables (GSAP Draggable, inertie maison par quickTo),
  badge rotatif « attrapez-moi » ; rail scroll-snap en mobile.
- **Capture attendue** : tirages et objets en désordre autour du titre Zodiak corail, un tirage en cours de déplacement.

## Système
- **Palette** : lin `#EFE8DA` (fond), corail `#EF5E47` (surfaces, traits, prix cerclés), corail encre `#C9432D` (texte
  corail ≥ 1,75 rem seulement, 3,7:1 sur lin), bleu canard `#1F6D74` (bande, texte doux 5,0:1 sur lin), paille `#F1CF6B`
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
