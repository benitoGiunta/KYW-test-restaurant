# DESIGN — gabarit « Encre »

## Concept Card
Idea:        Le site est un rouleau peint (emaki) : ivoire, encre, un seul rouge, le sceau. La carte se déroule à l'horizontale dans une section épinglée, les titres se lisent à la verticale, chaque section s'ouvre par un signe numéroté.
Metaphor:    Le makimono que l'on déroule lentement sur une table.
Signature:   Le Rouleau : bande horizontale épinglée (ScrollTrigger pin + scrub sur translateX, Lenis), 12 plats révélés par un trait de pinceau SVG (stroke-dashoffset ; masque SVG natif sur les photos), sceau vermillon qui se pose en fin de course (scale 1.3 → 1). Mobile : scroll-snap horizontal natif, 80 vw par plat.
Emotion:     La concentration, le geste juste.
Motion verb: glisse comme un rouleau (translations lentes sur un axe, jamais de rebond ; ease.out 1,2 s ; scrub 0,8).
Screenshot:  Le rouleau à mi-course : trois plats sous leurs traits de pinceau, le titre vertical à gauche, le sceau qui attend à droite.

## Ancrage et honnêteté des données
Le restaurant de référence (Les Potes au Feu, bistronomie) n'est pas asiatique. Le gabarit vise sushi, ramen, izakaya :
le Rouleau de l'accueil est un **exemple de carte asiatique**, chaque plat porte le drapeau `placeholder: true` et la
mention « exemple » est peinte sur le rouleau lui-même ; la page Carte déroule la **carte réelle** (menu unique 4 services
67 €, formules, options) et seulement ensuite le rouleau d'exemple. Aucune date écrite, aucun service promis hors dossier
(emporter = page d'exemple avec bandeau sans JS, pas de CTA de réservation ; temps de marche depuis la gare = estimation
marquée). Les phrases du dossier sont copiées sans date relative.

## Système
- Palette : ground ivoire #F6F1E6 · ink #19171A · accent sceau vermillon #C6341F (4,8:1 sur ivoire, texte ≥ 14 px 500) ·
  muted pierre #66605A (cahier #8A847A assombri pour 4,5:1) · lavis #DCD6CB (traits, pinceau) · curtain ivoire.
- Typo : Shippori Mincho B1 500/700 (Google, auto-hébergée) pour display, titres verticaux, chapeaux ; Spectral 300/400
  + italiques (Google) pour le texte et la carte, corps 17 px, interligne 1,7. Vertical : tracking +0.06em, line-height 1.6.
- Grille : colonne de texte 420 px centrée ; diptyques 2 × 400 px ; titres verticaux dans la marge (voie `--lane` 3,5 rem
  en desktop, repassent horizontaux ≤ 1023 px) ; 120 à 200 px entre sections (`--silence`).
- Radius : 0 ; le sceau est le seul cercle.
- Motion : ease.out 1,2 s pour les entrées (y 24 px + opacité), scrub 0,8 pour le rouleau, tracés `stroke-dashoffset`
  pilotés par le défilement, idle = voile de vapeur du hero (opacité ±3 %, 6 s yoyo). Rideau de transition : panneau
  ivoire qui glisse horizontalement (rouleau qui se referme puis s'ouvre).
- Texture : fibre de papier (feTurbulence 0.02) en tuile SVG de fond à 0,1 sur l'ivoire (pas de filtre plein écran).

## Wireframes
Hero (full-bleed)          Concept (colonne)           Rouleau (épinglé)             Histoire (diptyque)
┌────────────────────┐     ┌────────────────────┐      ┌────────────────────┐        ┌───┬────────┬────────┐
│ header difference  │     │        01          │      │L │▞▞▞│ │▞▞▞│ │  ●  │        │ T │ photo  │ photo  │
│  photo sombre      │     │   Titre centré     │      │e │nom│ │nom│ │ ... │        │ i │  4:5   │  4:5   │
│     名 vertical     │     │  texte 420 px      │      │  │mot│ │mot│ │     │        │ t │        │        │
│  phrase 2 lignes   │     │                    │      │  │prix│ │prix│ │    │        │ r │ texte 420 px    │
└────────────────────┘     └────────────────────┘      │ ───────────── barre │        └───┴─────────────────┘
Équipe (portrait centré)   Galerie (quinconce)         Venir (plan)                  Footer (diptyque décalé)
┌────────────────────┐     ┌────────────────────┐      ┌──────────┬─────────┐        ┌───────┬─────┬────────┐
│   photo 4:5        │     │ ▣      ▣           │      │ plan au  │ horaires│        │ photo │     │ liens  │
│   05 · nom · rôle  │     │     ▣      ▣       │      │ trait    │ réserver│        │ haute │photo│ sceau  │
│   bio              │     │ légendes           │      │ (tracé)  │ marche* │        │       │     │ KYW    │
└────────────────────┘     └────────────────────┘      └──────────┴─────────┘        └───────┴─────┴────────┘

## Test de généricité
Un modèle ferait un site noir, une photo de sushi, un titre serif. Ici : la carte est une bande horizontale épinglée
révélée au pinceau (structure), la lecture verticale et les chapeaux numérotés sont un système, le sceau est le seul
cercle et le seul rouge, le plan au trait est une information locale (Meuse, Citadelle, Casino). Aucun kanji
décoratif : les signes sont des numéros et des initiales.

## Règles dures (preuves dans RAPPORT.md après QA)
- [ ] 0 FAIL audit, 0 erreur console, pas de débordement 1440/390
- [ ] Reduced motion : rouleau en défilement natif, masques ouverts, tracés affichés, titres sans allumage
- [ ] Hero : nom et photo peints au premier rendu (pas de data-reveal, preload fetchpriority high, 960 px)
- [ ] Hover par rôle (nav : trait qui glisse ; plat : prix vermillon ; sceau : rotation 8° ; bouton : remplissage encre)
- [ ] Idle : vapeur du hero (idleMotion)
- [ ] LCP mobile < 2,5 s, CLS < 0,05, axe sans violation sérieuse

## Révision 1 (30/10/2026, REVUE-1)
- **Emporter** sort de la navigation principale (service inconnu au dossier) : la page reste dans le gabarit, atteinte
  par un lien « À emporter · page d'exemple » du pied de page. Son bandeau « Page d'exemple » vit dans le hero, sous
  l'en-tête (ivoire, filet vermillon, colonne de la phrase en desktop), plus jamais en tête de page : l'en-tête est
  absolu et le percutait. Les lignes n'ont plus de prix : « Prix à définir ».
- **Rouleau** : chaque nom de plat porte la pastille « EXEMPLE » (vermillon, cerclée, ≥ 12 px) ; le lien du hero devient
  « Dérouler un exemple de carte » ; la fin du rouleau et la ligne qui le suit renvoient à la vraie carte (constante
  `servicesMenu`, prix du menu 1).
- **Marques `.illu`** : `max(12px, var(--t-xs))`, graisse 400 ; astérisque ≥ 12 px.
- **Mobile** : h1 de l'accueil à 46 px (2,25 rem pour les pages intérieures), le titre « Le rouleau » reste vertical à
  gauche de la note (signe du rouleau conservé), plats alignés en haut de la bande (plus de vide sous l'en-tête).
- **Loader** : plancher 0,9 s, convergence du compteur 0,2/frame, sortie 0,3 + 0,6 s (mesuré 2,0 à 2,3 s, goto compris).
- **CTA du hero** : au survol le trait se raccourcit (scaleX 0,3) et la flèche descend de 0,3 em (vérifié par
  mini-script, le détecteur de shoot.mjs ne lit pas les pseudo-éléments) ; le sceau tourne de 8° (vérifié).
- **E-mail** inconnu au dossier : plus affiché nulle part (donnée gardée en `placeholder` dans `site.ts`).
- **Horaires** : jours consécutifs identiques regroupés (`horairesGroupes()`), champ heure borné par `plageHoraire()`.
