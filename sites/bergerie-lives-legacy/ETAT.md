# ETAT · bergerie-lives · variante legacy · fin de phase 1 (construction-1)

## Fait
- Audit (`.hallmark/before.*`, `AUDIT.md`), approche conservée, deal/draw/scaffold/stamp (Hedgerow, tirage 2a9dc5), deux comps, `comp.md`, `DESIGN.md` (Picks, composants, sur-utilisation 1 à 7), entrée au journal `.hallmark/log.json`.
- Contenu dans `src/data/site.ts` ; pages `/`, `/mariage-et-location/`, `/reservations/`, `404` ; layout, Nav, Footer, Photo ; `page.css` complet en statique, tokens/base du scaffold.
- 16 photos client en WebP (1600 et 800) dans `public/photos/` (les 9 non utilisées ont été retirées).
- Build : `pnpm build:site sites/bergerie-lives-legacy` passe, écrit `dist/bergerie-lives/legacy/`. Contrôles par grep : noindex, pied KYW, mention sur les 4 pages ; aucun tiret cadratin.

## Reste (phases 2 et 3)
- Phase 2 : menu tactile (popover) à la place des liens en seconde ligne sous 60 rem, un reveal au plus, états de formulaire, hover/focus de toutes les commandes, reproduction des comps (trois questions de `comp.md`).
- Phase 3 : sloplint --render complet, captures desktop/375, jury des gates judgées, RAPPORT.md, ligne Sweep du Picks, case 8 de la checklist, `pnpm index`.
- À vérifier au rendu : polices Google chargées (hors ligne le rendu retombe sur Georgia), panneau du hero à 375 px, rail galerie au clavier, mise en page de `.index__row` quand le texte est long.

## Décisions et hypothèses
- Requalification : maison d'hôtes et mariage, pas de carte ni de Switcher, « Carte » remplacée par un Index de services (answered F6).
- Thème Hedgerow plutôt que Vellum (déjà utilisé, imprimerie) ou Ink (neutre) ; sombre malgré l'original clair, car la façade de pierre et le feuillage y gagnent.
- Swap du tirage : hero Stage sans « horaires de réservation » (aucun horaire) ; Grid et Figures évités, la galerie est un Rail.
- Brochure et calendrier mariage renvoient à la page Wix d'origine (PDF non récupéré) ; Réserver une chambre et une visite renvoient au Wix `/reservations`, la page interne `/reservations/` regroupe les trois cas.
- Aucune note, avis ni capacité de salle affichés (contradictoires ou à confirmer). Un seul slot `.fill` : horaires d'accueil (présent sur l'accueil et sur Réservations, un par page).
- `sloplint src` : FAIL 34 sur Base.astro est le faux positif de la leçon du 10/11 (la règle est dans `base.css`, importé par `page.css`).
- `data-slot` posé sans script `hallmarkSlots` (aucune image de remplacement à injecter).
