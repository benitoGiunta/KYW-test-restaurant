# DESIGN « Collage »

## Concept Card

- **Idée** : le site est un mur de flyers et de stickers à l'entrée d'une salle. Chaque activité du lieu a sa couleur et
  son aplat (table = vert, scène = rose, brunch = bleu), l'écru pour ce qui est commun (manifeste, privatisation, infos).
  Tout est cerné d'un filet noir 2 px, posé sur étiquette, collé.
- **Signature** : le logo-étiquette. Trois cases bordées « Les · Potes · au Feu » fixées en haut à gauche ; à chaque
  section d'activité, une quatrième case de la couleur de la section se colle au logo avec le nom de l'activité
  (scale 1.15 → 1, rotate -4° → 0, 0.3 s back.out). ScrollTrigger `onToggle` par section → timeline sur la case.
- **Verbe de motion** : se colle. **Émotion** : l'envie de sortir ce soir.
- **Restaurant de référence** : Les Potes au Feu n'a qu'une activité réelle (la table, plus la privatisation du samedi
  prouvée par le dossier). Scène et brunch sont des activités illustratives, marquées sur place (post-it « exemple »,
  bandeau sans JS en tête des pages dédiées), sans CTA de réservation ni billetterie réelle, sans date en dur.

## Système

- **Palette** (jetons `tokens.css`) : écru `#F2EEE6` (fond commun), ink `#0B0B0B` (filets, texte), rose scène `#F6A1C8`,
  vert table `#259B52` (éclairci depuis le cahier pour que l'ink tienne 5,8:1 dessus), bleu brunch `#8ED0EA`, post-it
  `#F7E25A`, texte doux `#4A4A46` (7:1 sur écru). Le texte est toujours ink ou écru sur ink : jamais de texte coloré.
- **Typo** : Libre Caslon Display 400 (titres, dates géantes), Libre Caslon Text 400 italique (le mot en italique de
  chaque titre), Space Mono 400/700 (texte 15 px, agenda, bulles, nav). Source Google, auto-hébergées dans
  `public/fonts/`. Tracking -0.01em sur le Caslon, 0 sur le mono.
- **Grille** : sections pleine largeur, `.wrap` 12 colonnes (max 84 rem), filets 2 px qui cernent les blocs en damier.
- **Radius** : 0 pour les blocs et post-its, 4 px pour les stickers.
- **Motion language** : tout se colle (scale 1.15 → 1 + rotate -4° → 0, `back.out(1.7)`, 0.3 à 0.5 s). Reveals du moteur
  en `up` court. Rideau de transition : panneau ink qui glisse de gauche à droite. Loader : les trois cases du logo se
  collent une à une, barre ink en bas, compteur en sr-only. Idle : la tasse du brunch dérive de 4 px (section brunch,
  motion seulement) ; le premier écran est volontairement immobile (décision : un mur de flyers ne bouge pas tout seul).
- **Reduced motion** : cases du logo affichées sans animation (texte de la case changé instantanément), stickers
  statiques, pas de stagger, pas de parallax, rideau en fondu.

## Wireframes

```
HEADER (fixe, ink sur écru, 2 px de filet bas)
[Les][Potes][au Feu][+ Table ]            [Accueil|Carte|Agenda|Privatiser|Histoire|Réserver]
HERO (photo salle plein cadre, filet)         mobile : [Les Potes][au Feu][Table]  [Menu|Réserver]
  ┌────────────────────────────────────────┐
  │ [LES][POTES][AU FEU]  (h1 en 3 cases)  │
  │ Bistronomie · Namur  [Réserver] [Carte]│
  └────────────────────────────────────────┘
MANIFESTE (écru) : phrase Caslon, mot italique ; bulle mono « on en parle » (citation MICHELIN, réelle)
TABLE (vert) damier 2 colonnes bordé : [étiquette titre + menu 4 services] | [photo] ; stickers « fait maison »…
SCÈNE (rose, illustrative) agenda ligné : [JEU] [carte événement : affiche, titre, heure, « billetterie, exemple »] × 3 ;
  post-it « horaires d'exemple »
BRUNCH (bleu, illustratif) split : [titre + formule + prix] | [photo] ; tasse SVG détourée en bord (dérive)
PRIVATISER (écru, réel) : photo pleine largeur + cartouche bordé (titre, texte dossier, formulaire court)
AVIS : 3 stickers inclinés (MICHELIN réel + 2 « Exemple d'avis »)
INFOS : 4 cartes colorées (horaires · adresse · contact · le bâtiment)
FOOTER finale : logo en cases, liens, KywFooter
```

Pages : accueil, carte, agenda (tous les événements, bandeau d'exemple sans JS), privatisation, histoire (histoire et
équipe), réservation (réservation et contact), 404.

## Test de généricité

Un modèle ferait trois cartes « Restaurant / Événements / Brunch » sur un fond blanc. Ici chaque activité est une
couleur-section pleine largeur, le logo dit où l'on est, l'agenda est un cahier ligné : seul un lieu à plusieurs vies
peut porter ça, et le gabarit rend visible ce qui, pour ce restaurant, n'est qu'une possibilité.

## Règles dures de la skill (preuves)

- [x] Concept nommé en une phrase, signature unique (logo-étiquette) : ci-dessus.
- [x] Polices auto-hébergées, `font-display: swap`, préchargées (Base.astro).
- [x] Hero peint au premier rendu : photo `fetchpriority="high"` 960 px, h1 sans `visibility: hidden`, intro par transform.
- [x] Une seule `<h1>` par page ; landmarks ; skip link ; noindex ; JSON-LD.
- [x] Contraste : texte ink sur rose 10:1, sur bleu 11:1, sur vert 5,8:1, sur post-it 15:1 ; doux 7:1 sur écru.
- [x] Reduced motion : `html:not(.motion)` neutralise stickers, dérive, et la case de section est statique.
- [x] Hover par rôle : cellules de nav inversées, stickers soulevés, cartes d'agenda levées de 3 px, boutons inversés.
- [x] Aucune date en dur : l'agenda affiche des jours de semaine et la marque « exemple ».
- [x] Idle : dérive de la tasse (brunch) ; premier écran immobile par décision.
- [x] Copy en français, vouvoiement, sans tiret cadratin.
