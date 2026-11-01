# DESIGN — La Brasserie du Quai, variante portfolio (gabarit « Marée »)

## Choix du gabarit

Notes sur 5 : positionnement (brasserie de fruits de mer, carte longue) · ambiance (Meuse, baies vitrées, terrasse) ·
richesse du contenu (24 photos réelles dont terrasse et eau, carte complète, peu d'histoire) · type de carte (carte longue
+ écailler, pas de menu) · réservation (page Réservation du site, Zenchef à confirmer) · signature (le moment mémorable a-t-il un sens ici ?).

| Gabarit | Posit. | Ambiance | Contenu | Carte | Résa | Signature | Total /30 | Remarque |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **maree** | 5 | 5 | 5 | 4 | 4 | 5 | **28** | Fiche : « cible indicative brasserie-du-quai » ; houle et horizon = la Meuse vue de la terrasse ; liste écailler native |
| ardoise | 5 | 3 | 4 | 5 | 4 | 3 | 24 | Carte d'abord, cite la Brasserie du Quai, mais déjà pris par Partage et l'eau n'y joue aucun rôle |
| journee | 4 | 3 | 4 | 3 | 4 | 3 | 21 | Brasserie 7 jours ; les moments café/brunch/bar n'existent pas ici |
| guinguette | 3 | 4 | 4 | 3 | 3 | 2 | 19 | Terrasse familiale, ton trop joueur pour un écailler Michelin |
| collage | 3 | 2 | 3 | 3 | 3 | 2 | 16 | Lieu à plusieurs vies : une seule ici |
| affiche | 3 | 2 | 3 | 3 | 3 | 2 | 16 | Brasserie populaire criarde : décalé |
| velours | 2 | 3 | 2 | 1 | 4 | 2 | 14 | Fine dining à menu unique, chiffres vrais exigés |
| comptoir | 1 | 2 | 3 | 1 | 4 | 2 | 13 | Assiette seule, menu unique |
| quatre-mains | 2 | 2 | 3 | 2 | 3 | 2 | 14 | Duo Martin et Rémy possible, mais le sujet est le lieu, pas le duo |
| cahier, verger | 2 | 2 | 2 | 2 | 3 | 1 | 12 | Produits et producteurs non publiés |
| braise, forno | 1 | 1 | 3 | 2 | 3 | 1 | 11 | Feu, four : hors sujet |
| encre, nocturne | 1 | 1 | 2 | 1 | 3 | 1 | 9 | Table asiatique ; bar de nuit sombre |

**Décision : Marée.** Écart net (28 contre 24) et non utilisé jusqu’ici. `gabarits/UTILISATION.md` à compléter par l’orchestrateur (ligne « maree | brasserie-du-quai ») : consigne de passe « ne pas toucher à gabarits/ ».

## Adaptation (construction 1)

- **Conservé** : hero horizon (nom bord à bord sur la photo réelle de la terrasse face à la Meuse), marée des services,
  écailler en liste index, carte, bande « terrasse » (devenue la salle et ses baies), règles maison, plan, réserver,
  footer finale ; pages `/carte/`, `/ecailler/`, `/terrasse/`, `/histoire/` (titre de nav « La maison »), `/reservation/`, `/404`.
- **Retiré** : tout le contenu des Potes au Feu, les photos libres (le restaurant fournit l'eau et la terrasse : plus
  aucun crédit Unsplash), la privatisation du samedi, le menu unique, les arrivages inventés.
- **Ajouté / modifié** :
  - écailler réel en trois blocs (huîtres par 6 ou 12, produits de la mer, 6 plateaux en grille `.plateaux`) ;
  - carte complète de la brasserie (49 lignes réelles + 3 desserts d'exemple marqués « illustratif ») et bloc « incontournables » ;
  - `notes` (Google 4,3/5, Resto.be 9,3/10, Tripadvisor 3,9/5) et la sélection MICHELIN 2026 ; avis affichés comme
    résumés (le dossier n'a que des paraphrases), jamais comme citations ;
  - horaires saisonniers (novembre-avril / mai-octobre) ; jours non publiés (mardi, mercredi, dimanche) en segments
    pointillés « à confirmer », jamais comptés « ouvert » ni « fermé » par le badge (`motion/setup.ts`) ;
  - plan schématique réécrit : Meuse en diagonale, Rue du Quai, pont du Luxembourg ; 3 pastilles réelles, « pas à l'échelle » ;
  - bon cadeau : lien vers la page en ligne de la maison, sans procédure inventée.
- **Art direction** : sable du gabarit tiré vers l'or du logo BQ (`--c-sable: #d6bf94`) ; accent bouée inchangé (contraste) ;
  favicon = logo BQ ; OG = terrasse face à la Meuse (1200×630). Typo du gabarit conservée (le logo est en capitales
  espacées sans empattement, Gambetta garde le registre « quai »).
- **Adéquation estimée : 85 %.** (1) Le gabarit a été dessiné pour ce lieu : l'horizon et la houle sont la vue réelle
  de la terrasse ; (2) l'écailler et la carte longue entrent sans composant forcé ; (3) toutes les photos sont celles de
  la maison. Limites : jours de fermeture et desserts/vins inconnus, plan schématique à retracer sur OpenStreetMap,
  aucune citation d'avis mot à mot.

## Système
- **Palette** (rôles) : `--c-bg` ground #FBFBF8 ; `--c-fg` ink bleu Meuse #17395B ; `--c-ecume` #D8E3EA (sections
  « eau », fond des photos) ; `--c-sable` #D5C4A1 (filets, badges neutres) ; `--c-accent` bouée #D73C2C (badge
  « arrivage », focus, curseur « maintenant » ; rare) ; `--c-muted` #4A6480 (5,6:1 sur ground). Aucune section sombre.
- **Typo** : display Gambetta 500/700 (Fontshare, self-host), -0.02em, line-height 0.95 ; texte et UI General Sans
  400/500 (Fontshare) ; meta Martian Mono 400 (Google), 12 px, +0.04em, capitales. 5 woff2, 2 préchargés (Gambetta 700,
  General Sans 400).
- **Grille** : 12 colonnes, gouttière 40 px desktop (16 px mobile) ; photos au bord (full-bleed), texte sur colonnes 2-7
  (`.col-texte`), listes sur 2-11.
- **Rythme** : respirations longues (`--u` × 14 à 28) ; une houle entre chaque paire de sections ; alternance
  ground (texte, « ciel ») / écume (photos, « eau »).
- **Radius** : 0. Les photos sont découpées par la houle, jamais arrondies. Pas de texture.
- **Motion language** : `ease.out` (expo) pour les entrées, 1,2 s ; la houle respire en sinus lent (période 6 s) ;
  loader « marée montante » 0,00 m → 2,40 m (desktop seulement, plancher 0,6 s, plafond 1,3 s, sortie 0,9 s : < 2,6 s ;
  aucun loader en mobile), panneau écume qui remonte avec une crête de houle ; transition : rideau
  écume à deux crêtes qui monte puis s'enlève ; hero (desktop) : la photo, peinte dès le premier rendu
  sous le loader (LCP), se pose par un léger dézoom 1,08 → 1 ; le nom se pose par transform + opacité ; mots-univers en
  fondu décalé. Mobile : aucune intro, photo, nom et mots-univers peints sans attendre le JS.
- **Hover par rôle** : nav = soulignement qui se dessine ; CTA bordé = fond ink + texte crème ; segment de la ligne de
  temps = épaississement + tooltip ; pastille du plan = grossit + légende ; photo = curseur « Voir » + léger zoom.


Le reste du système (wireframes, test de généricité, règles dures) : `gabarits/maree/DESIGN.md`.
