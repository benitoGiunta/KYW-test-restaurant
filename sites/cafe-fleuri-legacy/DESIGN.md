**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, site d'origine inaccessible, composition entièrement neuve.
- Before : aucun (403), voir AUDIT.md.
- Keeps : nom, adresse, trois brunchs, plats cités, mardi étudiants ; wiring : `tel:` seul.
- Files : `src/styles/{tokens,base,page}.css`, `src/data/site.ts`, `src/layouts/Base.astro`, `src/components/`, `src/pages/` (accueil, carte, venir, 404).
- Shape : Marquee Hero (draw fe3f07), hero Ledge, nav pilule flottante, pied bloc colophon, barre d'appel fixe (en place de la réservation en ligne, inexistante).
- Theme : Squeeze (deal 2/3, seed restaurant-namur-brunch-cafe-aab6·f106bf78·2026-11-20·r0). Écartés : Vellum (gothique, ton trop d'imprimerie pour un brunch), Solstice (déjà tiré trois fois dans le journal).
- Chrome : pilule `--color-paper-2`, deux liens + bouton Appeler. Hero : figure 21,95 € (illustratif), titre, une phrase, deux actions.
- Signature : le prix du brunch en un seul chiffre géant sur le vert.
- Sections : Hero, Trois brunchs (tuiles), salle (bande photo), Maison (bande profonde), Mardi (figure), Venir (horaires), Fin (carte blanche + photo).
- Material : vert forêt plat, encre blanc chaud, pêche sur les contrôles seulement. Comp : c1 de 2. Sweep : phase 3.
- Échanges avec le draw : « the room full-bleed » gardé (placeholder) ; « next free times as buttons » refusé (aucune réservation) ; Switcher midi/soir refusé (aucune donnée).

## Tokens
Générés par `theme.mjs scaffold squeeze` dans `src/styles/tokens.css` (papier `--color-paper` vert 41 % 154°, encre, accent pêche, carte `--color-card`, Gabarito 800 + Manrope 500/700).

## Composants
- Carte : Rows (titre col. 1 à 5, prix à droite `tabular-nums`) ; formules en rangs `data-placeholder`, brunchs et boissons sans prix (inconnus, rien rendu). Pas de Switcher.
- Horaires : Schedule en `<dl>`, sept jours identiques dits en un bloc « Tous les jours » ; illustratif et signalé. Jour courant et fermé : sans objet.
- Pied : colophon block (adresse, horaires, téléphone), puis KywFooter ; barre d'appel fixe.
- Photo : `<figure data-slot data-alt data-placeholder>`, aucune photo, `hallmarkSlots` prêt.

## Sur-utilisation
- [x] 1. Tokens seuls pour couleurs et polices · preuve : sloplint src, 0 FAIL
- [x] 9. Aucun eyebrow ni capitales espacées · preuve : page.css
- [x] 15. Stamp en première ligne de page.css · preuve : page.css:1
- [ ] 16. sloplint `--render` : phase 2/3, waive 8 écrit
