**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, contenu et wiring gardés, système et composition changés.
- **Before** · Wix, 97 FAIL, 22 REFLEX, 7 WARN (`AUDIT.md`).
- **Keeps** · six routes (/, presentation, resto, boutique, traiteur, contact), nav, hero plein cadre sur le dessert smiley, voix du chef, liens réseaux et `tel:`.
- **Files** · `src/styles/{tokens,base,page}.css`, `src/components/`, `src/pages/`, `src/data/site.ts`.
- **Shape** · Photographic (08), kept. Empreinte : Serif|Sans|Hairline rule|Pill button|Square print|No reveal. Draw abf07f proposait Conversational FAQ, Ledge, nav search-led, footer index columns : refusé pour la forme et le hero (une macrostructure à garder), gardé pour le footer en colonnes (six vraies routes), le Switcher midi/soir et les horaires en section propre. Mirror test : un voisin n'aurait pas ce rouge enseigne sur crème avec un switcher midi/soir ; changé : plaque papier basse à gauche, pas de réservation en Counter.
- **Theme** · Solstice, dealt 1/3 (seed restaurant-namur-creative-french-1745·2c3713b5·2026-11-27·r0). Écartés : Vellum (gothique, trop médiéval pour une table moderne), Hum (jaune et jouet, la maison est raffinée).
- **Chrome** · nav : barre bord à bord, nom en Yeseva vermillon, six liens, une pilule « Réserver » · footer : colonnes d'index.
- **Hero** · Poster : le dessert plein cadre, plaque papier basse à gauche, légende en bas à droite.
- **Signature** · le dessert smiley du client, seul à occuper le premier écran.
- **Sections** · Hero · Faits (quatre tables) · Bande photo · Repas (Switcher) · Citation du chef (bande brune) · Autres portes (liste) · Horaires et lieu · Réservation · Pied.
- **Material** · real : photos, prix des formules, voix du chef · pictures : 18 photos du client, aucune de bibliothèque · absent : avis, note, métriques.
- **Comp** · 2 built, no key · c1 chosen.
- **Sweep** · phase 3.

## Tokens (extrait de `src/styles/tokens.css`)
Papier `--color-paper` crème chaud, encre brune `--color-ink`, signal `--color-accent` vermillon (hue 24, proche du rouge de l'enseigne, lu sur la photo de l'enseigne), or `--color-gold` pour les filets seulement. Display : Yeseva One (poids 400, une couleur). Corps : Archivo. Petits textes : Archivo Narrow 600, casse de phrase. Rayon 0 sauf pilules. Ombre dure `--shadow-card`.

## Approche
Macrostructure 08 Photographic, multi-pages gardé, calme (aucune animation, pas de reveal). Dérogations : diaporamas « press to zoom » supprimés (photos fixes, ≤ un tiers du poids sous le hero) ; `vh` en `dvh` ; pas de faux envoi (aucun formulaire) ; plus de pied « © 2013 ».

## Composants
- **Carte** : Rows (titre col. 1 à 5, détail, prix à droite en `tabular-nums`) ; Switcher midi/soir `role="tablist"`, les deux panneaux visibles sans script (`Carte.astro`).
- **Horaires** : Schedule en `<dl>` et `<time>`, jours fermés en `--color-muted`, sans icône (`Horaires.astro`).
- **Pied** : colonnes d'index (adresse, site, réseaux), `data-credits`, puis `KywFooter`.
- **Photo** : `<figure>` + `data-slot`, `width`/`height`, hero `fetchpriority="high"`, légende = sujet du fichier `photos/index.json`.

## Sur-utilisation
- [x] 1. Hallmark audit lancé : sloplint --before · preuve : `.hallmark/before.txt`
- [x] 2. Macrostructure du site d'origine lue (08 Photographic) · preuve : section Approche
- [x] 3. Deal / draw / scaffold / stamp · preuve : `src/styles/page.css:1-5`, `.hallmark/log.json`
- [x] 4. Comp avant build (deux comps) · preuve : `comp.md`
- [x] 5. Build statique, six routes + 404 · preuve : `dist/bienvenue-chez-vous/legacy/`
- [x] 6. noindex, mention et KywFooter sur chaque page · preuve : grep des 7 routes, 1 occurrence chacune
- [ ] 7. sloplint --render sur le build · reporté à la phase 2 (ni QA ni animations en phase 1)
