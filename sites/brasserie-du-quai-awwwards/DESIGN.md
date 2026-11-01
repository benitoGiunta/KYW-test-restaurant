# La Brasserie du Quai : variante awwwards, DESIGN.md

Phase 1 sur 3 (construction-1) : brief, concept, système, contenu, pages statiques. Les animations
avancées (reflet ondulant, montée de l'eau, reveals) et la QA en navigateur viennent aux phases 2 et 3.

## Brief

- **Sujet** : La Brasserie du Quai, 9 rue du Quai, 5000 Namur. Brasserie classique et banc d'écailler,
  au pied du pont du Luxembourg, sur les berges de la Meuse. Sélection Michelin Belgique 2026 (€€).
  Depuis juillet 2026, Martin et Rémy mènent la cuisine ; Pierre-Alexandre et son équipe tiennent la salle.
- **Public** : habitués namurois du midi, couples et familles du soir, touristes de la Meuse en été,
  amateurs d'huîtres du jeudi au lundi.
- **Métier du site** : réserver (téléphone, lien de réservation du client), consulter la carte et ses prix,
  savoir où c'est et quand c'est ouvert.
- **Ressources** : `donnees.json` (carte de 49 lignes, horaires saisonniers, contacts), `dossier.md`,
  24 photos du client (salle, baies vitrées, terrasse sur la Meuse, bar, cave, plats, écailler, équipe) et
  le logo SVG blanc et or. Crédit : « photos : La Brasserie du Quai ».
- **Langue** : français, vouvoiement. **Contraintes** : site statique Astro 5, aucun backend,
  `base` = `/brasserie-du-quai/awwwards/`.

### Hypothèses (faits manquants)

1. Jours de fermeture : inconnus. Le site affiche les deux grilles saisonnières et « jours de fermeture à
   confirmer » ; le JSON-LD ne déclare que lundi, jeudi, vendredi, samedi (cités « à confirmer » dans donnees.json).
2. Desserts : non publiés. Trois desserts de brasserie marqués `placeholder: true`, **sans prix**, avec la
   mention « exemple » visible. Aucun vin, aucune formule inventés.
3. Lien de réservation : la page Réservation du site actuel (`brasserieduquai.be/reservation/`, module
   Zenchef probable). Le CTA principal reste le téléphone.
4. Année d'ouverture : inconnue, donc jamais écrite. Nom de famille de Pierre-Alexandre non affiché (à confirmer).
5. Gault&Millau (13/20 non confirmé) et notes Google/Tripadvisor : non affichés. Seule la sélection
   Michelin 2026 (source guide.michelin.com) est citée.

## Concepts (trois territoires)

| | A. La ligne d'eau | B. L'étiquette de bourriche | C. L'échelle de crue |
|---|---|---|---|
| Territoire | nom (« du Quai ») et lieu | matière du métier (écailler) | lieu (Meuse, pont du Luxembourg) |
| Phrase | Chaque page est un quai : la brasserie au-dessus de la ligne, son reflet dans la Meuse en dessous. | Chaque page est l'étiquette sanitaire d'une bourriche d'huîtres : origine, calibre, date. | Le site est une échelle de crue : on lit la page comme on lit la hauteur de la Meuse sur le mur du quai. |
| Règle de mise en page | une ligne horizontale forte (le bord du quai) d'où tout pend ; dessus clair, dessous eau | grille d'étiquette, champs encadrés, calibres n°3 n°4 | graduation verticale à gauche, sections = niveaux en mètres |
| Verbe | accoster (glisser à l'horizontale, se poser contre la ligne, léger tangage) | tamponner | monter, descendre |
| Voix typo | capitales condensées de signalétique fluviale (Big Shoulders) | mono technique | chiffres de graduation |
| Palette | eau de Meuse de nuit, pierre bleue, laiton du logo | kraft, encre bleue sanitaire | béton, rouge des repères de crue |
| Signature | le nom posé sur la ligne d'eau, son reflet inversé qui ondule ; la ligne monte au défilement | la carte comme bordereau | la graduation qui suit le défilement |
| Ancre | « La Brasserie du Quai », au pied du pont du Luxembourg, baies vitrées sur la Meuse | banc d'écailler jeudi au lundi, huîtres n°3 et n°4 | berges de la Meuse |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 4 / 2 | 4 / 3 / 4 / 2 | 3 / 3 / 4 / 3 |

**Test de l'échange** : A remplacé par « Le Bistrot de la Place » ne tient plus (pas de quai, pas de
reflet) ; B tient pour tout bar à huîtres et oublie la brasserie (deux tiers de la carte) ; C tient pour
tout restaurant au bord d'un fleuve. **Choix : A**, parce que le nom, le lieu et la meilleure photo du client
(salle et baies vitrées sur l'eau) disent la même chose. Idée volée à C pour un détail : la graduation de
l'échelle de crue dans le pied de page et la 404 (« vous êtes tombé à l'eau »).

## Concept Card

```
Idée :         La Brasserie du Quai posée au ras de la Meuse : sur chaque page, la brasserie au-dessus de la ligne, son reflet dans l'eau en dessous.
Métaphore :    un quai de Meuse : bordure de pierre bleue, ligne d'eau, reflet, échelle de crue.
Signature :    le titre de chaque page posé exactement sur la ligne d'eau, son double inversé dans l'eau (phase 2 : ondulation par filtre SVG feTurbulence piloté par le ticker GSAP, motion.md « Idle state ») ; au défilement, la ligne d'eau monte et l'eau gagne la page (module pilote src/motion/quai.ts).
Émotion :      le calme d'une table en terrasse face à l'eau, un soir d'automne.
Verbe :        accoster : les éléments glissent à l'horizontale et se posent contre la ligne, avec un léger tangage.
Capture :      « BRASSERIE / DU QUAI » en capitales condensées sur la ligne de laiton, la salle aux baies vitrées au-dessus, leur reflet dans l'eau sombre.
Ancre :        le nom (« du Quai ») et le lieu : au pied du pont du Luxembourg, sur les berges de la Meuse, grandes baies vitrées sur l'eau.
Théâtre :      loader non (une brasserie, on pousse la porte ; le premier frame est le quai lui-même) ; GL non (un filtre SVG suffit au reflet, la photo reste nette).
```

## Système

### Palette (rôles)

| Rôle | Hex | Référence réelle |
|---|---|---|
| `ground` (quai) | `#E8EBE7` | ciel de Meuse pâle sur la pierre lavée ; gris vert froid, pas une crème |
| `ink` | `#111A1B` | ardoise de la pierre bleue mouillée |
| `muted` | `#4E5A5B` | pierre bleue sèche (7,1:1 sur ground) |
| `line` | `#B6BEBB` | joint de quai |
| `accent` | `#B3813B` | laiton du logo (or relevé sur le site actuel) ; traits et filets seulement |
| `accent-ink` | `#7A5418` | laiton sombre, pour un texte d'accent sur ground (≥ 4,5:1) |
| `eau` / `curtain` | `#16282B` | la Meuse de nuit sous le pont |
| `eau-ink` | `#DCE4E1` | reflet clair sur l'eau |
| `eau-muted` | `#93A6A3` | reflet atténué |

Justification du défaut n° 1 : aucune crème, aucun serif à fort contraste, aucun terracotta. Le laiton vient du logo.

### Typographie

- **Display** : Big Shoulders Display 800 (Google, `font.mjs`), capitales, interlettrage `-0.01em` au mega,
  `0` au-dessous. Signalétique fluviale condensée : le titre tient sur la ligne en deux lignes courtes.
- **Texte** : Schibsted Grotesk 400 et 600 (Google), grotesque de journal, la gazette posée sur la table.
- Échelle fluide `--t-mega` à `--t-xs` dans `tokens.css` ; corps 17 px, interligne 1,55 ; prix en
  `tabular-nums` ; espaces insécables entre nombre et unité (« 15 € », « 12 h 30 ») ; guillemets « ».
- Préchargés : Big Shoulders 800 et Schibsted 400 (au-dessus de la ligne de flottaison).

### Grille et rythme

12 colonnes desktop, 4 sur téléphone, gouttière fluide. Trois verticales fortes : colonne 1 (texte),
colonne 8 (photos et prix), et **la ligne d'eau horizontale**, la seule vraie structure du site.
Quatre humeurs d'espacement : `--serre`, `--normal`, `--aere`, `--large` affectées section par section.

### Forme

Rayon 0 partout (pierre taillée). Un seul cercle : la pastille des portions d'huîtres.

### Langage de mouvement (planifié pour la phase 2)

`ease.out` pour les arrivées (accoster), `ease.inOut` pour la transition d'eau ; durées motion.md
(reveal 0,9 à 1,1 s, hover 0,35 s, transition ≤ 0,8 s par sens). Traduction du verbe : `x: -24 → 0`
puis un retour de 2 px (tangage), jamais de montée verticale générique.
Transition de page (en place dès la phase 1) : l'eau monte du bas et couvre la page, puis se retire vers le haut.

### Rôles de hover (trois traitements)

1. **CTA** (« Réserver », « Appeler ») : fond laiton qui monte de la ligne de base comme l'eau (clip-path).
2. **Navigation et liens de plats** : un filet de laiton glisse sous le libellé de gauche à droite (accoster).
3. **Liens dans le texte et utilitaires** : soulignement épaissi de 1 à 2 px.

### État de repos

Le reflet du titre ondule lentement (feTurbulence, `baseFrequency` piloté par le ticker, en pause hors écran,
à zéro en mouvement réduit). Phase 2.

### Mobile 390 px

Le quai reste la structure : photo au-dessus, titre sur la ligne, reflet et texte dans l'eau. La carte passe
en une colonne, photos inline par catégorie ; l'écailler reste sur l'eau.

## Plan de composition

```
ACCUEIL
[quai/poster]   | BRASSERIE          [photo salle  ] |  ← fond ground
                | DU QUAI            [baies vitrées] |
                ===== ligne de laiton (ligne d'eau) =====
                | ƎIAƎSSAЯB (reflet) [reflet photo ] |  ← fond eau
                | chapô + Réserver / Voir la carte   |
[statement]     | Au pied du pont du Luxembourg… (grand texte, 3 faits en ligne) |  eau
[données/paire] | [photo huîtres] | Banc d'écailler, jeudi au lundi : 3 huîtres, calibres, prix |  ground
[index]         | Six classiques de la maison, liste index avec prix, lien vers la carte |  ground
[média large]   | Terrasse sur la Meuse, pleine largeur, légende |  ground → eau
[pied]          | échelle de crue, adresse, horaires, contacts, colophon |  eau

CARTE
[quai]          titre « LA CARTE » sur la ligne, sommaire des rives sous la ligne
[rive quai]     catégories cuisine : liste à prix alignés, une photo par catégorie (colonne 8)
[rive eau]      banc d'écailler sur fond eau : huîtres (portions 6 / 12), mer, plateaux
[note]          frites à la graisse de bœuf, suggestions de la semaine, allergènes

HISTOIRE
[quai]          « LE QUAI » sur la ligne, photo façade sur la Meuse
[paire]         texte 100 mots | photo panorama de la salle
[portrait]      Martin et Rémy (photo réelle), Pierre-Alexandre (salle)
[mur]           détails : hibou, machine à écrire, cave, bar

RÉSERVATION
[quai]          « RÉSERVER » sur la ligne ; sous l'eau, le téléphone en grand
[données]       horaires (deux saisons), écailler, adresse, accès, e-mail

404             « À L'EAU » sur la ligne ; reflet « 404 » ; retour au quai
```

## Test de généricité

- Un modèle générique aurait mis une photo de plat plein écran avec un serif crème : remplacé par la
  structure de quai et des capitales condensées.
- Il aurait écrit « Une expérience culinaire unique » : chaque phrase du site vient d'un fait du dossier.
- Il aurait mis des étoiles d'avis : aucune note affichée.

## Liste de sur-utilisation (à cocher aux phases 2 et 3)

- [x] Concept Card, trois concepts, test de l'échange (ci-dessus)
- [x] Palette dérivée du monde, défaut n° 1 évité
- [x] Polices téléchargées par `font.mjs`, 3 fichiers, 2 préchargés
- [ ] Reveals déclaratifs (`data-split`, `data-reveal`), jamais sur un bloc qui porte un lien
- [ ] Module pilote `src/motion/quai.ts` (ligne d'eau, reflet ondulant, `startIdle`)
- [ ] Micro-interactions par rôle (trois traitements)
- [ ] QA : shoot, audit, jury (deux passes)
