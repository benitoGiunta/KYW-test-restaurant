# Gabarit « Marée »

**Pour qui** : brasserie de fruits de mer, terrasse au bord de l'eau, table méditerranéenne lumineuse. Cibles
indicatives : brasserie-du-quai, huile-sur-le-feu. Ambiance lumineuse, saline, ample ; aucune section sombre.

**Concept** : tout est posé sur une ligne d'horizon. Une houle SVG sépare chaque paire de sections, ondule avec la
vitesse de scroll et découpe le bas de la photo du hero ; le nom s'étire d'un bord à l'autre comme un quai.

## Pages
`/` accueil (hero horizon, marée des services, écailler, carte, terrasse, règles maison, plan, réserver, footer finale),
`/carte/`, `/ecailler/` (arrivages), `/terrasse/`, `/histoire/` (deux chefs, chronologie, équipe, avis), `/reservation/`
(Zenchef, téléphone, formulaire de démonstration, ligne de temps, plan), `/404`.

## Sections et composants
- **Hero horizon** : photo d'eau et de ciel, nom bord à bord (`[data-fit]`, 1 ligne desktop, 2 lignes mobile), 3 mots-univers,
  pile de CTA bordés en haut à droite (barre basse fixe Réserver / Appeler en mobile), houle qui découpe le bas.
- **Houle** (`components/Houle.astro`, `motion/houle.ts`) : un path partagé recalculé au ticker ; amplitude 6 px au repos
  (respiration), 28 px à vitesse max ; mobile /2 à 30 fps ; pause hors écran ; statique en reduced motion.
- **Marée des services** (`Maree.astro`) : ligne de temps 08h-23h par jour, segments bleus, curseur « maintenant » et badge
  ouvert / prochain service calculés à l'heure de Bruxelles ; défilable en mobile ; tooltip au survol et au focus.
- **Plan au trait** (`Plan.astro`) : Meuse, Avenue de la Plante, pont de Jambes (tracé simplifié d'après OpenStreetMap),
  dessiné au scroll ; 4 pastilles-boutons (`aria-expanded`) qui activent la légende.
- **Listes index** (arrivages, carte) : numéro mono, nom Gambetta, origine ou description, prix ; badge « arrivage » bouée.
- **Terrasse** : photo plein cadre teintée bleu Meuse (multiply 20 %), citation mono lettre à lettre.
- **Règles maison** : badges bordés (les illustratifs en pointillé).
- **Footer finale** : nom bord à bord sur écume, adresse, horaires, réseaux, crédits photo, puis `KywFooter`.
- Loader « marée montante » 0,00 m → 2,40 m ; rideau de transition écume à crêtes de houle.

## Système
Palette ground #FBFBF8, ink #17395B, écume #D8E3EA, sable #D5C4A1, bouée #D73C2C. Gambetta 500/700 (display),
General Sans 400/500 (texte), Martian Mono 400 (meta). Grille 12 colonnes, texte sur 2-7, photos au bord. Radius 0.

## Données exigées pour adapter
Nom, adresse, géo, téléphone, horaires par service, carte avec prix, menus, histoire, équipe (photos verticales),
8 photos lumineuses dont 2 d'eau et des plats vus du dessus, liste d'arrivages avec origine, règles maison, 3 ou 4
points du plan (parking, ponton, arrêt), une citation. Tout ce qui manque reste `placeholder: true` dans `site.ts`
et s'affiche « illustratif ».

## Limites
- Le plan est un tracé simplifié : à retracer sur OpenStreetMap pour chaque restaurant.
- Les photos d'eau sont des images libres (Unsplash via Picsum) créditées au footer : à remplacer.
- Le statut « ouvert / prochain service » dépend de l'heure du visiteur (calcul client, fuseau Bruxelles).
- Pas de WebGL : la houle est un SVG, `canvas: true` du cahier est rendu sans canvas.

Aperçu : `apercu.png`.
