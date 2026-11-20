# Gabarit « Collage »

**Pour qui** : restaurant avec scène ou comedy club, lieu multi-activités (bar, brunch, événements), brasserie à agenda ;
tout lieu « à plusieurs vies » qui veut que chaque vie ait sa couleur.

**Concept** : le mur de flyers et de stickers à l'entrée d'une salle. Chaque activité est un aplat pleine largeur (vert
table, rose scène, bleu brunch, écru pour le commun) cerné d'un filet noir 2 px, avec titres Caslon sur étiquette et un
mot en italique, stickers, post-its, agenda sur lignes de cahier. Le logo en trois cases reste collé en haut à gauche et
absorbe une quatrième case, de la couleur de la section, avec le nom de l'activité où l'on est (ScrollTrigger). Tout se
colle : scale 1,15 → 1, rotation -4° → 0, `back.out`.

## Pages et sections
- **Accueil** : hero photo plein cadre + h1 en trois cases (se collent une à une) · manifeste (phrase Caslon, bulle « on
  en parle » avec la citation MICHELIN réelle) · Table (vert, damier bordé : menu 4 services, stickers réels, photo) ·
  Scène (rose, illustrative : post-it d'exemple, agenda ligné de 3 soirées sans date) · vague SVG · Brunch (bleu,
  illustratif : post-it, formule d'exemple, tasse détourée qui dérive) · Privatiser (réel : cartouche sur photo) · Avis en
  stickers inclinés (MICHELIN réel + 2 « Exemple d'avis ») · Infos (4 cartes : horaires, adresse, contact, bâtiment).
- **Carte** : damiers alternés par catégorie, formules en cellules bordées.
- **Agenda** : bandeau d'exemple peint sans JS, 6 événements illustratifs (jour de semaine + heure, jamais de date),
  jours de service réels en post-it, aucun CTA de réservation.
- **Privatisation** : service réel (samedi), cartouche sur photo avec formulaire de démonstration, trois formats.
- **Histoire et équipe** : récit (dates relatives neutralisées), fiches d'équipe (rôles de Sara et Jordan marqués
  illustratifs), galerie 6 photos.
- **Réservation et contact** : Zenchef + téléphone, formulaire de démonstration, horaires, adresse.
- **404** : « Décollé ».

## Composants
`Logo.astro` (3 cases + case de section `[data-logo-section]`), `Agenda.astro` (liste lignée, `max`), `Vague.astro`
(transition organique colorée avec filet), `Header.astro` (nav en cellules, overlay mobile avec piège de focus),
`Loader.astro` (cases qui se collent), étiquettes (`.etiquette`, `.etiquette--ink`), stickers (`.sticker`, survol
soulevé), post-it (`.postit`), damier (`.damier`, `--inv`), cartouche sur photo (`.surphoto`, `.cartouche`), infos
(`.infos`), formulaires de démo (`form[data-demo]`).

## Données exigées à l'adaptation
- `site.activites` : les activités réelles du lieu (id, nom, mot italique, couleur, `reelle: true`). Le gabarit en veut 2
  à 3 ; une activité non réelle reste marquée.
- `site.evenements` : vrais événements (titre, jour, heure, activité, affiche). Les dates réelles s'ajouteront alors au
  type ; le gabarit n'en écrit aucune en dur.
- `site.brunch` ou toute formule d'une activité secondaire ; `site.stickers` (mentions réelles : fait maison, terrasse…).
- Privatisation et quartier : une phrase prouvée par le dossier, sinon `placeholder: true`.
- Photos reportage saturées (hero, une par activité) ; une affiche par événement.

## Limites
- Pas d'objets détourés photographiques (la tasse est un SVG dessiné) ; pas de billetterie branchée.
- Les deux formulaires sont des démonstrations (réservation → outil réel, privatisation → message).
- Un seul idle (la tasse) ; le premier écran est immobile par décision.
