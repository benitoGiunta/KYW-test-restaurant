# Gabarit « Journée »

**Pour qui** : brasseries ouvertes 7 jours, lieux qui vivent du matin au soir (café, brunch, lunch, apéro, dîner, bar),
établissements à plusieurs services ou plusieurs ambiances. Référence construite : Les Potes au Feu (Namur), qui
n'ouvre que le soir et deux midis : les autres moments sont marqués « illustratif » partout où ils apparaissent.

**Concept** : la page d'accueil est un cadran. Six moments (7h café, 9h brunch, 12h déjeuner, 17h apéro, 19h dîner,
23h dernier verre) se suivent au scroll ; le ciel (dégradé à deux arrêts, aube → blanc → ocre → corail → nuit) tourne
avec eux, un disque soleil / lune descend sur la frise fixée à droite, et le site s'ouvre à l'heure réelle du visiteur
(loader qui compte de 00:00 jusqu'à l'heure, badge « ouvert jusqu'à… » calculé sur les horaires réels, ciel du hero
réglé à l'heure, arrivée douce au moment en cours au premier chargement).

## Pages et sections

| Page | Ciel | Sections |
|---|---|---|
| Accueil | à l'heure réelle, puis 6 moments | Hero cadran (badge, horloge à anneau, nom, accroche, 6 chips), 7h Café (split texte / photo), 9h Brunch (3 médaillons à titre courbé), 12h Déjeuner (formules réelles + plat de la semaine en liste index), 17h Apéro (bande de cartes, happy hour), 19h Dîner (photo / menu dégustation 67 €, texte inversé), 23h Dernier verre (statement, horaires à flèches), pied de page finale (nom géant sur nuit profonde) |
| Carte | les 6 moments | Carte heure par heure (une section par moment), formules réelles, options et boissons, 2 photos |
| Brunch | midi → ocre → aube | Hero + bandeau « illustratif », 4 médaillons, formule du brunch, photo |
| Histoire | ocre → aube → corail → nuit | Hero photo, récit en 4 paragraphes, équipe de 4, coulisses, avis |
| Réserver | aube → midi | Badge ouvert, boutons Zenchef / téléphone / e-mail, horaires à flèches, formulaire sans backend |
| 404 | nuit profonde | « Cette page a fermé », trois retours |

## Composants

- `Frise.astro` : frise 7h → 23h fixée à droite (voie réservée `--frise` dans `.wrap`), disque positionné par `--heure`, crans cliquables (ancres) avec libellé au survol ; rangée de 6 points dans l'en-tête en mobile.
- `Badge.astro` : point vert / orange / rouge + « ouvert jusqu'à 21:00 », « ouvre à 19:00 », « fermé, ouvre demain à 19:00 », calculé en JS sur `site.horaires` ; bulle des horaires de la semaine au survol et au focus. Version `compact` dans l'en-tête.
- Chips de moments (`.chip`) : 6 pilules avec petit objet (`Icone.astro`), `aria-current` sur la chip du moment affiché, fond soleil au survol, clic = ancre Lenis.
- `Horaires.astro` : un jour à la fois (le jour courant d'abord), flèches ‹ › (4 px de déplacement au survol), lignes cuisine (réelles) / bar (illustratives).
- Horloge du hero : HH:MM en Bricolage, secondes et anneau SVG qui avance d'un cran par seconde (idle).
- Médaillons (`.medaillon`) : photo ronde + titre courbé en `textPath`, roulent en place à l'entrée ; scroll-snap en mobile.
- Bande d'apéro (`.bande`) : cartes défilables qui se lèvent au survol ; liste index des plats du jour (`.jours`) ; menu du soir numéroté (`.menu-soir`).
- Driver `src/motion/journee.ts` : ciel par sections `[data-ciel]` (ScrollTrigger onToggle + tween de variables CSS sur `<html>`), `data-ciel="auto"` = moment de l'heure réelle ; horloge, badges, médaillons, horaires, arrivée.

## Adapter à un autre restaurant

1. `src/data/site.ts` : tout le contenu. Les six `moments` (heure, titre, accroche, thème de ciel, lignes, photo), `platsDuJour`, `happyHour`, `horairesBar`, puis `site` (nom, adresse, horaires réels, carte, menus, histoire, équipe, avis, photos). Retirer les `placeholder: true` au fur et à mesure.
2. `public/photos/` : WebP ≤ 1800 px, une photo par moment à la lumière de l'heure (matin clair, soir chaud).
3. Les heures des moments peuvent changer (8h, 10h, 12h30…) : la frise et le disque se replacent seuls (`--heure` 7 → 23 ; ajuster la plage dans `base.css` et `Frise.astro` si le lieu ouvre avant 7h ou après 23h).
4. Palette du ciel : `tokens.css` (thèmes `data-theme`) et `CIELS` dans `src/motion/journee.ts` (mêmes valeurs, en hex).

## Données exigées

Horaires réels par jour (cuisine et bar), carte par moment (3 à 6 lignes × moments), formules et prix, photos (salle de jour, assiettes vues du dessus, bar, cuisine le soir), histoire et équipe, outil de réservation, e-mail.

## Limites

- Le badge et l'horloge lisent l'heure du navigateur (pas de fuseau ni de jours fériés).
- L'arrivée automatique au moment courant ne joue qu'au premier chargement de l'accueil (sessionStorage), jamais sous reduced-motion ni avec une ancre dans l'URL.
- Les médaillons supposent des photos d'assiettes cadrées serré (vues du dessus idéalement).
- Pas de loader en mobile (l'accroche est peinte au premier rendu).
