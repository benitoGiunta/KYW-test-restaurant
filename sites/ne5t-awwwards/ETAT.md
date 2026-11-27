# ETAT : ne5t · awwwards · construction-2 (phases 1 et 2 faites)

## Fait
- DESIGN.md : brief, 3 concepts (choix : « Première impression »), Concept Card, palette, typo, grille, plan de composition, checklist 1 à 18.
- Scaffold Astro 5 (engine verbatim copié d'un site frère, sans GL ni loader), tokens, Base (head, JSON-LD sans heures), Header, Footer (« Dernière impression » + KywFooter), Photo.
- Contenu `src/data/site.ts`, `src/lib/photos.ts` (15 photos du client, alt d'après photos/index.json).
- 5 pages statiques : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404. Build OK (`pnpm build:site sites/ne5t-awwwards`), mesure du hero à 4 tailles et débordement horizontal à 0 sur 5 pages.

## Fait en phase 2 (27/11/2026)
- Signature « impression typographique » : `src/motion/impression.ts` (tous les `.display` de `<main>`, pâle et décalé puis encre calée ; intro pour hero, tête de page, 404).
- Pilote `src/motion/impressions.ts` + `idle.ts` : repère vertical « Première / Deuxième / Dernière impression » (marge droite, ≥ 1100 px) et lueur ambrée des fenêtres sur la façade du hero (pointeur + repos).
- Reveals déclaratifs (`data-reveal` clip sur les figures, up sur `.seconde` et formules, intro du hero), rideau du concept (`setup.ts`, mot « Intuition » pressenti, 0,85 s par sens).
- Menu mobile plein écran (≤ 700 px) : `Header.astro` + `src/motion/menu.ts`, vérifié (aria-expanded, focus piégé, Échap, retour du focus, fermeture à la navigation).
- Hovers sous `(hover: hover)`, `:focus-visible` et `:active` ; téléphones en filet ambre ; lien KYW souligné au survol. Boska 700 retirée (4 polices).
- Build OK ; contrôles : 0 débordement horizontal (5 pages, 1440 et 390, après défilement), 0 erreur console, 0 titre pâle restant après défilement, mouvement réduit sans texte caché ni Lenis (`.logs/ne5t-aw2-test.log`, `.logs/ne5t-aw2-faint.log`).

## Reste (phase 3)
- Shoot complet (agent captures) puis lecture de `report.json` : `settledMs`, `idleMotion`/`idleAt` (lueur), `hover.noHoverChange`, `reduced.*`, cibles, contraste, `keyboard.stops[0]`.
- OG à composer ; RAPPORT.md (aucun fichier encore) ; contraste du texte d'index sur nappe ; `ailes.jpg` 520 Ko à recompresser.
- DESIGN.md § Sur-utilisation : points 27, 35, 36, 39, 44, 45, 47 à confirmer par `report.json`.

## Décisions et pièges
- Adresse : Avenue Vauban 46 (site client) ; restaurants.json dit Allée de Menton 26 : à confirmer par le client.
- Heures de service inconnues : jours seulement, pas d'openingHoursSpecification, mention « à confirmer par téléphone ».
- Aucun prix de plat (formules seulement), aucun avis, presse ni distinction. Couple de la cour et chef du service non nommés.
- Placeholders : jours « Lundi, mardi : fermé » (à confirmer), phrase « le lundi et le mardi, la maison se repose » (fait 'jours', `placeholder: true`), « Parking et accès : à confirmer », attribution des intérieurs à « Christine Gersdorff » (nom de famille déduit de l'époux, `placeholder: true`).
- Pas de page par plat ; le menu est celui du mois, sans date en dur.
- Piège : hook de lecture (cat > 80 lignes refusé) ; engine copié depuis `sites/atelier-de-bossime-awwwards/src/engine/` (identique à engine.md).
- Phase 2 : le repère fixe en bas à gauche chevauchait le texte (nappe, histoire) : déplacé en vertical dans la marge droite (`writing-mode: vertical-rl`, roulement en `xPercent`), masqué sous 1100 px (gouttière trop étroite).
- Phase 2 : `.motion main .display { visibility: hidden }` : si le module JS échoue, les grands titres restent cachés (même risque que `data-split` de l'engine).
