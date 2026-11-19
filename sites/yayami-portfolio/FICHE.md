# Gabarit « Nocturne »

**Pour qui** : bar à cocktails, cave à manger ou bar à vins le soir, restaurant-club. Cibles indicatives : chez-guillaume,
incorrect, le-servais, pepite. Ambiance sombre, ambrée, tendue ; aucune photo de jour.

**Concept** : le site est éclairé à la lampe. Tout est noir ; un halo ambré (un seul canvas 2D) suit le pointeur et révèle
les photos de la mosaïque à sa portée ; les titres sont des tubes en contour qui s'allument au survol.

## Pages
`/` accueil (hero volets, règles de la maison, mosaïque 12 photos bord à bord, menu, bar, origin story, soirées, venir),
`/carte/`, `/cocktails/` (carte de bar par famille), `/histoire/` (origin story, récit, équipe, avis), `/soirees/`
(privatisation, chef à domicile, bar), `/reservation/` (Zenchef, téléphone, formulaire de démonstration, horaires, à
savoir), `/404`.

## Sections et composants
- **Lampe** (`motion/lampe.ts`, `#lampe` dans `Base.astro`) : canvas fixe `mix-blend-mode: screen`, halo 260 px ambre à
  55 % avec grain 0,05, inertie 0,12 dans le `gsap.ticker`, respiration ± 6 px ; écrit `--lx/--ly` sur `:root` et
  `--mx/--my` sur chaque `[data-lampe-item]` visible (calque `.mos__lum` masqué par `radial-gradient`). Pas de lampe sous
  reduced-motion, sur tactile ou `hover: none` : photos à 100 %. Pause quand le pointeur sort ou que l'onglet est caché.
- **Tube** (`.tube`, `[data-tube]`) : Panchang capitales en contour ambré quand la lampe est allumée (`html.lampe-on`),
  plein sinon (mobile, reduced motion, sans JS) ; au survol et au focus le remplissage s'allume en trois crans.
- **Hero volets** (`[data-hero]`, `[data-volet]`) : deux photos fermées sur le titre qui s'écartent en `xPercent` ; en
  mobile, volets empilés sans animation, titre peint au premier rendu ; badge `[data-statut]` « Ouvert ce soir … »
  calculé côté client à l'heure de Bruxelles depuis `site.horaires` (texte serveur : jours et heures de service).
- **Règles de la maison** (`.regles`) : liste numérotée, lignes qui s'allument.
- **Mosaïque** (`.mos`) : 3 colonnes, gouttière 20 px, sans marge ; motif 2/3 + 1/3 inversé un rang sur deux ; bande de
  texte tous les 3 rangs ; 2 colonnes en mobile.
- **Index** (`.index`) et **ligne de cocktail** (`.ckt__item[data-fam]`) : listes nues, barre de famille qui s'élargit.
- **Origin story** (`[data-origin]`) : scène collante de 300 svh, 4 phrases en crossfade pilotées par ScrollTrigger,
  photo N&B dont le filet ambré progresse ; empilée sous reduced motion.
- **Boutons de coin** (`Coins.astro`, `[data-coins]`) : réseau à gauche, Réserver ambre à droite, fixes ; barre basse
  sous 1200 px (le body reçoit un padding) ; se retirent quand le pied de page est visible.
- **Loader** « horloge de service » : compteur de l'ouverture du soir au dernier service (lu dans `site.horaires`) ;
  masqué en mobile. **Rideau** noir à filet ambré.
- **Footer finale** : nom incliné en tube, contact / horaires / suivre, puis `KywFooter`.

## Système
Palette ground #0A0A0C, ink #EDE8DF, ambre #F0A63B, rouge profond #9E1B28 (bandes seulement), fumée #3A383B, muted
#A9A39A. Panchang 700 (display), Supreme 400/500 (texte, UI, petites capitales). Mosaïque 3 colonnes bord à bord,
textes sur 640 px (`.col`), listes sur 880 px (`.col-l`). Radius 0.

## Données exigées pour adapter
Nom, adresse, géo, téléphone, horaires par jour (le statut, le loader et les textes « service du … » en dépendent),
réservation, un réseau (bouton de coin gauche), carte avec prix, menus, 4 phrases d'histoire courtes, 5 règles maison,
10 cocktails avec famille (sour, highball, spiritueux, sans alcool), 3 formats de soirées sans date, équipe avec photos
verticales, 12 photos sombres (3 : 2 et portraits), 1 photo N&B contrastée, 3 avis. Tout ce qui manque reste
`placeholder: true` (ou `rolePlaceholder`) dans `site.ts` et s'affiche « * illustratif » à l'endroit même.

## Limites
- La carte de cocktails est entièrement illustrative pour le restaurant de référence (aucune carte de bar publiée).
- Le halo n'existe pas sur tactile (choix : pas de canvas sur mobile) ; le contour des titres non plus.
- Le statut « ouvert » ignore les fermetures exceptionnelles et les jours fériés.
- Un seul réseau en bouton de coin (le premier de `site.reseaux`).

Aperçu : `apercu.png`.
