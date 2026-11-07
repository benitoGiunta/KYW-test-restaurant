# DESIGN, Le Royal Namur, variante portfolio (gabarit « Ardoise »)

## Choix du gabarit

Matrice (sur 5) : adéquation positionnement / ambiance / contenu disponible / type de carte / réservation / signature.

| Gabarit | Pos. | Amb. | Contenu | Carte | Rés. | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **ardoise** | 5 | 4 | 5 | 5 | 5 | 5 | **29** |
| guinguette | 4 | 4 | 3 | 3 | 4 | 3 | 21 |
| journee | 4 | 3 | 2 | 3 | 4 | 3 | 19 |
| affiche | 3 | 2 | 3 | 3 | 4 | 3 | 18 |
| maree | 3 | 3 | 3 | 3 | 4 | 2 | 18 |
| collage | 3 | 2 | 2 | 3 | 4 | 3 | 17 |
| quatre-mains, verger, forno | déjà attribués | | | | | | exclus |
| velours, comptoir, encre, nocturne, braise, cahier | 1 à 2 | | | | | | < 15 |

Décision : **Ardoise**. Le Royal est cité dans la FICHE du gabarit (« brasseries classiques à carte longue, restaurants de
place »). Le contenu réel est une carte longue (13 catégories, 63 lignes, PDF d'août 2026) et peu de photos de salle : le
gabarit montre la carte d'abord et ne demande que des aperçus 4:5 au survol. La signature (une ardoise) a un sens fort : la
photo de la terrasse montre une vraie ardoise « moules jumbo à 20 € mardi et jeudi ». Gabarit non encore utilisé (UTILISATION.md).

## Sections

- **Conservées** : barre d'état (marquee calculé), ardoise (nom en deux lignes, ligne « à l'ardoise » avec flèches, onglets, lignes
  plat / prix, aperçu flottant), bloc des menus, section claire photo + mots géants, « la maison », horaires et accès, barre
  basse fixe, pages carte, menus, terrasse, maison, réservation, 404.
- **Adaptées** : onglets MIDI | SOIR remplacés par **TABLE | BAR** (la carte est la même midi et soir, 7 jours sur 7) ;
  `service` des catégories devient `groupe` ; « suggestion du jour » devient une ligne « à l'ardoise » alimentée par des faits
  (mardi et jeudi : moules jumbo à 20 €, conditions à confirmer ; autres jours : une spécialité de la carte, prix réel) ;
  « La salle » devient « La terrasse » (aucune photo de salle) ; « Formules » devient « Menus » (fêtes patronales 50 / 65 €,
  moules jumbo 20 €) ; `servicesTexte()` gère des horaires identiques tous les jours ; `telHref()` convertit 0xx en +32.
- **Retirées** (sans matière dans le dossier) : bon cadeau, privatisation, équipe, portraits, histoire des fondateurs, avis cités
  (l'unique extrait daté est négatif : non repris ; remplacé par la note Google 4,0 / 577 avis, source Rankeat).
- **Ajoutées** : aucun composant ; une règle CSS `.terrasse__photo` (portrait recadré en bandeau 16:9, 4:5 en mobile) ;
  jeton `--c-brique`.

## Art direction

- Palette : ardoise `#2a2e2d`, craie `#f3f1ea`, accent craie jaune `#e9d064` (les chaises jaunes de la terrasse, la craie de
  l'ardoise), fond clair crème `#f1e9da` (muted `#5b5851`, 5,6:1), **brique `#9e3b2b`** (façade, couronne du logo) en barre basse,
  crème dessus (6,6:1). Le jaune ne porte jamais de texte sur fond clair.
- Typo inchangée (Cabinet Grotesk 800 capitales, Schibsted Grotesk) : elle est sobre et sert les prix tabulaires ; le serif
  condensé du site actuel n'est pas repris (hors gabarit, pas de police libre équivalente embarquée en phase 1).
- Photos : 10 fichiers WebP (terrasse en couverture de la page terrasse, façade pour « la maison » ; 5 aperçus 4:5 sur les lignes
  dont la photo montre le sujet). Logo crème en OG image sur façade assombrie, favicon couronne jaune sur ardoise.
- Aucun contenu inventé : desserts, histoire, équipe, avis détaillés, stationnement absents.

## Taux d'adéquation estimé : 82 %

1. La carte longue et lisible est ce que le client a de plus solide (63 lignes réelles, prix réels) et l'ardoise la sert telle quelle.
2. Midi et soir 7 jours sur 7, terrasse face au Théâtre, réservation Zenchef : tout rentre dans la barre d'état, les mots géants et la barre basse.
3. L'ardoise est un objet réel du lieu (photo 04).

Limites : peu de photos de plats (aperçus sur 5 lignes seulement), aucune photo de salle, pas d'histoire ni d'équipe, typo
de titrage différente du logo (serif condensé), carte des boissons partielle (extraits).

## Phase 2 : motion et signature

- Signature « ardoise » : les lignes s'écrivent à la craie (clip-path gauche à droite), la suggestion du jour s'efface puis se réécrit, un trait de craie jaune se trace sous le nom et sous chaque titre de catégorie, un filet se trace sous la ligne survolée ; l'aperçu photo suit le pointeur (desktop). Aucune animation ne cache le texte sans JS ; reduced motion : tout est statique et visible.
- Barre d'état : texte calculé à l'heure du visiteur, défilement lent (40 s) rempli par clonage, pause au survol.
- Mobile : loader masqué, nom en deux lignes (309 px max à 390), mots géants à 16 vw, galerie en 2 colonnes sans trou, barre basse fixe de 56 px.
