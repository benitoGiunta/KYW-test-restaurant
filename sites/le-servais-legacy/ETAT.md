# ETAT · Le Servais, variante legacy · fin de phase 2 (construction-2)

## Fait (phase 2)
- Nav slab (forme différente des 3 derniers logs), menu `popover` plein écran sous 60 rem, Réserver dans la barre ; testé à 390 (ouverture, Échap).
- Un reveal (`.js.reveal-on [data-reveal]`), signature « repérage » du carré orange, reduced motion et sans script vérifiés (opacité 1).
- Horaires : jour courant + statut ouvert/fermé (Europe/Brussels, après minuit géré) sur accueil, carte et contact.
- Boutons huit états (hauteur 48 px), `::selection`, `accent-color`, favicon SVG, `theme-color`.
- Hero : h1 5 vw (SERVAIS ne se coupe plus), hero en `svh`, photo 5/4, carré orange ramené sur la photo. sloplint `--render --stage hero` : 0 FAIL, 0 REFLEX. `sloplint src` : propre.
- Revue hero : sous-agent indisponible, auto-notation `self`, 2 findings résolus (stamp dans page.css).
- Aucun débordement horizontal mesuré à 1440, 1280, 1024, 390, 320 sur les 7 routes. Build OK (`dist/le-servais/legacy/`), KywFooter, noindex et mention sur les 7 pages.
- Formulaire et switcher : sans objet (réservation externe, carte à liens de saut).

## Reste (phase 3)
- sloplint `--render` des pages carte et contact : 3 REFLEX chacune (44c, 77 « pied 71 % de large », 79) issues de tests de hero sur en-têtes de page ; corriger ou `waive` avec raison. NOTE 58 : section Horaires à 96 mots.
- Sweep, waive 59 à revérifier au rendu, RAPPORT.md, entrée de journal finale, captures complètes (agent captures).

## Pièges et hypothèses
- Téléphone 081 73 65 52 vs +32 492 93 87 96 : à confirmer. « Margarita 25 € » à confirmer. Verrière : origine à confirmer. (inchangé)
- Le statut ouvert/fermé suppose 9 h 00 à 1 h 00 (2 h 00 vendredi et samedi) tous les jours, d'après donnees.json.
- Le menu popover exige un navigateur récent ; sans, les liens restent dans la barre (repli `@supports not selector(:popover-open)`).
- Une capture pleine page sans défilement montre les blocs `data-reveal` vides (attendu).
- Serveur de dev arrêté en fin de phase.
