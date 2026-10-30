# Braise : plan de design

Gabarit KYW construit à partir du cahier `braise` (data/portfolio/directions.json), avec les données réelles des
Potes au Feu (Namur). Stack : Astro 5 + moteur de la skill awwwards (socle `gabarits/_socle`), parce que le site est
une vitrine statique dont le mouvement est le produit (scroll story, transitions de page), sans aucune fonction serveur.

## Concept Card

```
Idea:        Le site est un service du soir qui refroidit : une température descend de 900 °C à 20 °C au fil du
             défilement et règle le fond, l'encre, le halo et le thermomètre, du noir du passe à l'ivoire de la table.
Metaphor:    Le service du soir : la cuisson, le dressage, la table, la nuit.
Signature:   Le chapitre « cuisson » : le boeuf confit des Potes au Feu, découpé à la main en 4 couches (assiette,
             pièce, garniture, jus), se dépose couche par couche au scrub pendant que le thermomètre descend et que la
             liste 01-04 s'allume (scène sticky + timeline ScrollTrigger scrub 1, section limitée à 250 % de hauteur).
Emotion:     La chaleur d'une cuisine ouverte la nuit : on entre par le passe, on finit à table.
Motion verb: couve puis s'embrase. Tout couve (lent, bas, chaud) puis s'embrase d'un coup (le remplissage braise des
             boutons, la ligne de carte qui s'allume, le halo qui s'ouvre à l'arrivée).
Screenshot:  Le chapitre cuisson à mi-course : fond brun braise, la pièce posée, la garniture en l'air, « 420 °C » en
             bas à gauche, la liste 01-04 à moitié allumée.
```

Anchor (le fait propre au sujet) : les deux chefs cuisinent devant la salle et servent eux-mêmes ; le menu unique est
une soirée que l'on suit du passe à la table. Le plat en couches est leur plat signature photographié (boeuf confit,
assiette rouge), pas une image de banque.

## Système

**Palette** (du cahier, nommée par rôle ; les valeurs sont tweenées par le driver `--temp`)

| Rôle | 900 °C (passe) | 520 °C (braise) | 150 °C (table) | 20 °C (nuit, ivoire) |
|---|---|---|---|---|
| ground `--c-bg` | #141110 | #2A1510 | #7A4E36 | #F2E8D8 |
| ink `--c-fg` | #F4EDE2 | #F4EDE2 | #F4EDE2 | #1A1410 |
| muted `--c-muted` | #B9AEA2 | #C9B5A4 | #EBD9C8 | #6B5646 |
| line `--c-line` | #5E5650 | #6A5146 | #9C7A62 | #C9B8A4 |
| accent `--c-accent` (braise) | #E8632C | #E8632C | #E8632C | #A3431A (braise éteinte, AA sur ivoire) |
| curtain | #141110 avec lisière braise | | | |

Contrastes vérifiés : ivoire sur #7A4E36 = 6,0:1 ; muted #EBD9C8 sur #7A4E36 = 5,0:1 ; #E8632C sur #141110 = 5,6:1 ;
#A3431A sur ivoire = 5,1:1 ; encre #1A1410 sur braise #E8632C (bouton rempli) = 5,5:1. Le cuivre #B5703F n'est jamais
du texte : filets, repères du thermomètre, ornement de la pique.

**Typo** : Melodrama 400/700 (Fontshare, display : titres, nom, chiffres du thermomètre ; tracking -0.02em,
interlignage 0.9) ; Literata 400/400i/600 (Google, texte et UI, corps 17 px, interlignage 1.55). Échelle :
mega 14vw (20vw sur deux lignes à 390 px), xl clamp(2.6rem, 1.2rem + 5.2vw, 6.5rem), l clamp(1.5rem, 1.1rem + 1.6vw,
2.6rem), body 1.0625rem, s 0.875rem, xs 0.75rem. Chiffres tabulaires sur les prix et le thermomètre.

**Grille** : 12 colonnes, gouttière = marge (clamp 20-56 px). Les textes s'accrochent aux colonnes 1, 5 et 9.
Rythme : chapitres plein écran (hero, cuisson) alternés avec des respirations de 28u ; aucun bloc sous 60 vh avant
la section pratique. **Radius** : 0 partout, sauf la pastille d'état (999px) et les pilules de bouton (999px, le
cahier les nomme pilules).

**Motion language** : ease `expo.out` pour les révélations, `expo.inOut` pour le rideau, `power3.out` pour l'UI,
`back.out(1.4)` pour la dépose des couches (léger overshoot). Un seul driver (`src/motion/braise.ts`) : la température
calculée depuis la position des sections `data-temp` dans le viewport pilote les six variables de couleur, le halo
(opacité et position, influence du pointeur ±6 %), le grain (0,06 → 0) et le thermomètre. Idle : le halo respire ±4 %
sur 6 s (ticker GSAP) ; la sauce frémit ±2 px tant que la scène est active. Hover par rôle : CTA = remplissage braise
depuis le point d'entrée du pointeur ; nav = soulignement qui se trace ; ligne de carte = s'embrase (fond braise,
vignette qui suit le pointeur, vignette inline au toucher) ; images = le voile se lève et l'image s'approche (scale
dans un cadre clipé) ; liens utilitaires = couleur.

**Un seul artefact** : grain feTurbulence (tuile SVG en data URI) à 0,06 sur les fonds sombres, 0 sur l'ivoire. Un
seul halo. Pas d'autre dégradé.

## Wireframes (une famille de layout par section)

```
HERO (full-bleed media, 100svh)                 MANIFESTE (statement)
┌──────────────────────────────────────────┐    ┌──────────────────────────────────────────┐
│ Les Potes au Feu            Carte Hist. Rés│    │                                          │
│                                          │    │          manifeste                       │
│ [photo passe, voile brun 30 %]           │    │          Deux potes, un feu, un menu     │
│                                          │    │          unique ... le plaisir (braise)  │
│ LES POTES                                │    │          (mots cendre → ivoire au scrub) │
│ AU FEU                                   │    └──────────────────────────────────────────┘
│ Bistronomie à quatre mains. Menu unique. │
│ 900 °C ▮ cuisson         ● Ouvert ce soir│
└──────────────────────────────────────────┘

CUISSON (sticky stage, 250 vh)                  CARTE (liste index)
┌──────────────────────────────────────────┐    ┌──────────────────────────────────────────┐
│ cuisson                 ┌──────────────┐ │    │ La carte             [ Midi | Soir ]     │
│ 01 L'assiette      ●    │  assiette    │ │    │ 01 Légumes racines ........... 4 services│
│ 02 Le boeuf confit      │  (couches    │ │    │ 02 Saint-Jacques / Butternut ............│
│ 03 Carottes, cromesquis │   se posent) │ │    │ ... (ligne qui s'embrase au survol,      │
│ 04 Le jus         420 °C│              │ │    │  vignette suit le pointeur)              │
│ ▬▬▬▬▬▬▬▬░░░░░░ progression└──────────────┘ │    │ Toute la carte →                         │
└──────────────────────────────────────────┘    └──────────────────────────────────────────┘

LES MAINS (asymmetric pair)                     SALLE (gallery wall)
┌──────────────────────────────────────────┐    ┌──────────────────────────────────────────┐
│ ┌──────────────┐                         │    │ ┌────────┐      ┌─────┐                  │
│ │ Damien       │     Damien et François  │    │ │        │      │     │   ┌──────────┐   │
│ │ (bichromie   │     texte 4 colonnes    │    │ └────────┘      └─────┘   │          │   │
│ │  braise)     │     décalé vers le bas  │    │      ┌──────────────┐     └──────────┘   │
│ └──────────────┘        ┌───────┐        │    │      │              │  ┌────┐            │
│                         │François│       │    │      └──────────────┘  └────┘ légendes it│
└──────────────────────────────────────────┘    └──────────────────────────────────────────┘

AVIS (bande marquee)                            PRATIQUE (split, ivoire)
┌──────────────────────────────────────────┐    ┌──────────────────────────────────────────┐
│ « Le plaisir déborde de l'assiette ! » Guide│   │ Horaires           │ Avenue de la Plante 4│
│  MICHELIN · « ... » avis illustratif · ...│    │ lundi 19:00-21:00  │ [plan schématique]   │
└──────────────────────────────────────────┘    │ ...                │ (Réserver) (Bon cadeau)│
                                                └──────────────────────────────────────────┘
FOOTER (finale)
┌──────────────────────────────────────────┐
│ LES POTES AU FEU (géant, ivoire sur brun, monte en parallaxe)      │
│ adresse · tél · réseaux · colophon · KywFooter                     │
└──────────────────────────────────────────┘
```

Pages : accueil (ci-dessus), carte (900 → 150 : filtre midi/soir, trois catégories, formules), histoire (420 → 60 :
récit, les mains, l'équipe de quatre), reservation (90 → 20 : Zenchef, téléphone, formulaire sans backend, horaires,
plan), privatisation (20 partout : le feu éteint, page claire), 404 (20 : « le feu est éteint ici »).

## Test de généricité

Un modèle générique donnerait : hero sombre avec photo de braise, bouton orange, cartes de menus, grille de photos.
Ici : (1) la couleur est une donnée qui traverse tout le site et finit claire, l'orange n'est jamais un aplat isolé
(il est remplissage au survol, lisière du rideau, mot-clé) ; (2) la scène de couches est faite du vrai plat, découpé à
la main (`scripts/couches.mjs`) ; (3) le thermomètre remplace la barre de progression et porte un vrai libellé de
chapitre ; (4) le loader compte en °C et devient le thermomètre ; (5) la carte est un index (lignes tabulaires, pas de
cartes) ; (6) le pied de page est brun et non ivoire : la braise qui s'éteint. Changé après le test : la section
« valeurs en trois piliers » du site actuel (trois cartes égales) devient le manifeste en une phrase ; le chapeau de
section n'est posé que sur trois sections (manifeste, cuisson, pratique).

## Règles dures (preuves dans RAPPORT.md après QA)

- [x] Grille et alignement : colonnes 1/5/9, marge = gouttière, titres optiquement décalés (-0.04em).
- [x] Tracking négatif par taille, corps 17 px / 1.55.
- [x] Un traitement de hover par rôle (CTA fill, nav underline draw, ligne carte s'embrase, image s'approche).
- [x] Idle : halo qui respire + sauce qui frémit ; écrit ici, mesuré par `desktop.idleMotion`.
- [x] Une famille d'ease ; grands éléments plus lents.
- [x] transform / opacity / clip-path seulement ; une horloge (ticker GSAP via le moteur) ; onPage partout.
- [x] Scrub : start 'top top', end 'bottom bottom', invalidateOnRefresh, scène sticky (patterns.md §2).
- [x] Reduced motion : pas de Lenis, de scrub ni de pin ; couches affichées déposées ; --temp par section sans
      transition ; halo statique ; thermomètre = valeur de la section visible.
- [x] Premier cadre = 900 °C, le plus contrasté ; une seule variable d'encre sur <html> ; fin de page vérifiée.
- [x] UI fixe : thermomètre en bas à gauche (zone réservée), en-tête qui s'efface au défilement descendant.
- [x] Nav visible partout, page courante marquée ; curseur natif ; loader ≤ 2,6 s ; LCP = <img> du hero.
- [x] 390 px composé : nom 20vw sur deux lignes, scène 70vw, barre basse Réserver / Appeler, vignettes inline.
- [x] Un h1, titres ordonnés, landmarks, lang=fr, alt descriptifs, AA, focus visible (anneau braise), skip link,
      titre et description uniques, OG, canonical, sitemap, robots, JSON-LD Restaurant, 404.
- [x] Copie en français, vouvoiement, sans tiret cadratin, sans filler, aucune phrase répétée.

## Révision 1 (30/10/2026, après REVUE-1)

- **Thermomètre** : il ne flotte plus sur le texte. En desktop, `.wrap` réserve une voie `--lane` (2,25 rem) de chaque
  côté et le thermomètre devient une colonne étroite dans la voie gauche (réglette en haut, valeur 1 rem, chapitre en
  vertical) ; les libellés des repères se déplient au survol ou au focus. En mobile (≤ 767 px), il disparaît de l'écran
  et sa valeur passe dans la barre basse, qui n'apparaît qu'une fois le hero dépassé (elle doublait le CTA du hero).
  Il s'efface quand le pied de page KYW entre à l'écran.
- **Accent** : la braise #E8632C ne passait pas AA en texte sur les bruns moyens. L'accent suit maintenant la
  température : #EE7A45 (900) → #F0875A (520) → #FFC6A6 (150, braise pâle) puis, côté ivoire, #5E230A → #7A300F →
  #8F3A14 (20). Une nouvelle variable `--c-on-accent` (encre #1A1410 sur les fonds sombres, ivoire #F7EFE4 sur l'ivoire)
  colore le texte des boutons remplis. Contraste ≥ 4,5:1 vérifié par script à tout degré hors de la bascule 125 → 115 °C.
- **Portraits « duo »** : la bichromie passe d'un `multiply` sur fond braise (aplat orange tant que l'image n'est pas
  peinte) à un filtre sépia chaud sur fond brun : même rendu cuivré, plus d'aplat orange.
- **Loader** : plancher 0,7 s, plafond 1,6 s (0,3 / 0,9 s en mobile), progression en temps réel (indépendante des
  FPS), sortie ≈ 0,8 s ; l'accroche du hero n'a plus de `data-reveal` ni `data-intro`.
- **Driver** : les six couleurs sur `<html>` ne sont réécrites que si la température bouge de 0,5 °C ; respiration et
  pointeur du halo écrits sur `#halo` seulement.
