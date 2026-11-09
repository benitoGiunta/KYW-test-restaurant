**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 5 routes (/, /menu, /reserve, /photos, /contact) + 404
- **Before** · Floor 13 FAIL · Reflex 7 · modèle Colorlib centré sur slider assombri ; la carte numérotée avec prix et les horaires clairs restent
- **Keeps** · les cinq routes, tous les liens (`tel:`, `mailto:`, Facebook, affiches de fêtes du site d’origine), la carte de 56 plats avec numéros et prix, les horaires, le jaune (en ocre)
- **Files** · créés : `sites/ferme-blanche-d-asie-legacy/` entier · modifiés : aucun fichier hors du dossier ; `dist/ferme-blanche-d-asie/legacy/` régénéré · supprimés : aucun
- **Shape** · Photographic, empreinte `Small plate|Photograph bands and Range|Image edge|Typographic link|Full-bleed|None` ; le draw 03eb15 proposait Letter, échangé : une colonne de document ne porte pas cinq routes
- **Theme** · Spore, dealt 1/3, seed restaurant-namur-chinese-asian-4b50·171af1b4·2026-11-09·r0, colourway `head-torch` (ocre au lieu du rose : reprend le jaune du site d’origine). Écartés : Bloom (clair, papier chaud : contredit un site sombre et un restaurant du soir), Squeeze (vert forêt, tuiles de fruits : matière de jus, pas de wok)
- **Chrome** · nav : pilule flottante (draw : barre à commande ; échangée, pas de recherche à offrir sur cinq routes) · footer : mast (nom en grand sur les liens)
- **Hero** · Poster : photo de la salle ronde plein cadre, plaque à droite sur la zone calme, un titre, une phrase, réserver et carte
- **Signature** · le menu découverte à 29 € posé en chiffre de Young Serif sur un puits grainé, avec ses cinq plats en lignes
- **Sections** · Hero (Poster) · Offre (chiffre) · Salle (Showcase sans titre) · Carte (Rows) · Salles privées (Split) · Avis (Statement) · Horaires et adresse (Band + Schedule) · Pied (mast)
- **Material** · réel : carte, prix, horaires, adresse, tél., salles de 26 et 300 personnes, photos du client, avis repris mot pour mot (Resto.be) · images : 9 photos de salles et de jardin, filigrane recadré · absent : photo de plat, histoire, équipe, avis Google, réservation en ligne
- **Comp** · c1 (Poster) contre c2 (Stage), voir `comp.md`
- **Sweep** · phase 3

# Design: La Ferme Blanche d’Asie (variante legacy)

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: atmospheric
- Shape of the first page: Photographic (kept, five routes)
- Theme: Spore, colourway head-torch
- Axes: dark/roman-serif/warm · posture: committed

## Approche
- **Macrostructure conservée** : Photographic (08) sur cinq routes, comme l’original (hero photo, texte de bienvenue, carte, contact). Les routes ne bougent pas : index, menu, reserve, photos, contact.
- **Posture** : hero Poster (photo plein cadre), calme, aucun slider ; un seul pattern de scroll : aucun (animations en phase 2, au plus un reveal).
- **Dérogations** : slider auto supprimé, une seule photo de hero (18) · trois « pastilles » devenues une ligne de faits (23) · `vh` en `dvh` (6a) · pas de formulaire, l’original n’en avait pas : réservation par téléphone ou sur place · gabarit « hero, bienvenue, menu, contact » : séquence gardée, composition neuve (`waive 8`) · logo blanc de 200 px passé en `mask-image`, coloré par l’accent.
- **Test miroir** : un voisin avec un restaurant asiatique de quartier obtiendrait un hero texte-à-côté-d’une-photo sur fond sombre. Ici : le menu à 29 € en chiffre et la plaque posée à côté de la table ronde, sans la masquer (décision changée après la comp : la plaque était à gauche).

## Thème
Spore, `dealt 1/3, seed restaurant-namur-chinese-asian-4b50·171af1b4·2026-11-09·r0`. Matière : noir café chaud, encre parchemin, Young Serif sur Instrument Sans, pilules, puits grainés. Le jaune `#ffc312` du site d’origine vient du modèle Colorlib et non d’une charte ; il est repris comme ocre du colourway `head-torch`. Écartés : Bloom (papier clair), Squeeze (vert, tuiles de fruits).

## Tokens
`src/styles/tokens.css` est la source. Rôles :
```css
:root {
  --color-paper: oklch(12% 0.008 60);  --color-paper-2: oklch(19% 0.014 58);  --color-paper-3: oklch(24% 0.02 50);
  --color-ink: oklch(93% 0.03 85);  --color-ink-2: oklch(84% 0.022 78);  --color-muted: oklch(67% 0.02 70);  --color-rule: oklch(31% 0.016 60);
  --color-accent: oklch(80% 0.15 85);  --color-accent-ink: oklch(12% 0.008 60);  --color-focus: oklch(88% 0.12 88);
  --font-display: "Young Serif", Georgia, serif;  --font-body: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 14px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: 0 16px 40px (ombre sombre, 0.4);
}
```
Échelle d’espacement, échelle typographique, courbes et durées : celles du scaffold.

## Controls
- Primary : pilule pleine ocre, texte `--color-accent-ink` · rayon pilule · 48 px (44 dans la nav)
- Secondary : pilule à filet de 1,5 px en `--color-ink-2`, même rayon et même hauteur

## Motion
- Character : still. **Reveal : `waive 62`, aucun reveal ajouté** (thème still, tout le contenu est visible au repos, rien ne dépend du script). Seuls mouvements : transitions de couleur de 120 ms sur les contrôles, ouverture du menu mobile (220 ms, opacité et `translate`) ; sous `prefers-reduced-motion` tout est ramené à 0,01 ms. Aucune boucle, aucun rebond, aucun toast.

## Composants
- **Carte** : Rows (`layout.md` § 5.5), numéro en muted (colonne 1), nom en Young Serif, description sous le nom, prix à droite en ocre `tabular-nums` ; filets, ni bordure ni ombre (F24) ; sur la page menu, Switcher en quatre onglets `role="tablist"` (potages, entrées, plats, menu découverte), tous les panneaux visibles sans script ; nom et prix visibles à 375 px (F25). Aperçu en accueil : les quatre potages, comme l’original.
- **Horaires** : Schedule (§ 5.16), un `<dl>` de sept jours avec `<time>`, hors tout icône d’horloge, dits dans un bloc de l’accueil, de la page réservation et de la page contact (le contenu de l’original) ; jour courant levé d’un cran de surface avec une pastille « Aujourd’hui » ajoutée par un script de quelques lignes. Aucun jour fermé.
- **Pied** : mast (le nom en très grand sur le logo, puis quatre colonnes : liens, adresse, horaires en une phrase, tél., e-mail, Facebook), puis crédits `data-credits`, puis `<KywFooter />` ; jamais « Tous droits réservés ».
- **Photo** : `<figure data-slot data-alt>` avec `width`/`height`, `srcset` 800 et 1400, hero `fetchpriority="high"`, autres `loading="lazy"` ; légende = un fait (nom de la pièce, d’après `photos/index.json`). Filigrane « Find Your Place » recadré (9 % du bas).
- **Nav** : forme **slab** (bande pleine de 64 px, `sticky` à `--z-sticky-nav`, filet dessous) ; le tirage de phase 1 (pilule flottante) est remplacé, car chez-guillaume l'a utilisée juste avant (42). Un seul `<nav popover>` : liste de liens au bureau, panneau plein largeur sous 60rem (bouton « Menu » / « Fermer », `popovertarget`, Échap et clic extérieur natifs, fonctionne sans script). « Réserver » (secondaire) mène à `/reserve` ; le `tel:` reste en hero, bande horaires, contact et pied. Lien d'évitement `.skip`, `scroll-padding-top` = 64 px + 16 px.
- **Boutons** : huit états (repos, survol sous `(hover: hover)`, `:focus-visible` outline 2 px 3 px de décalage, `:active`, `:disabled` à trois canaux, sélectionné pour les onglets) ; un seul primaire rempli par écran (le secondaire de la nav est à filet) ; 44 px (48 px au pointeur grossier) ; `nowrap`.
- **Onglets de la carte** : flèches, Début, Fin ; hash `#potages` ouvre l'onglet ; panneau focusable ; tous les panneaux visibles sans script.
- **Horaires** : jour courant lu en Europe/Brussels (`Intl`), chip « Aujourd'hui » sous le jour en mobile.
- **Formulaire** : aucun (réservation par téléphone ou sur place, comme l'original) ; le contrôle 70 est sans objet.

## Sur-utilisation
- [x] 1. Hallmark audit lancé avant tout (`sloplint --before`) · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Références lues : SKILL.md, redesign.md, macrostructures/08, layout.md § 5 à 7, themes/spore.md et son image, design-md.md · preuve : ce fichier
- [x] 3. Deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1`, `.hallmark/log.json`
- [x] 4. Deux comps avant le build, choix écrit · preuve : `comp.md`, `.hallmark/comps/`
- [x] 5. Floor 1, tokens uniquement · preuve : `sloplint src/styles/page.css` 0 FAIL
- [ ] 6. Rendu sloplint et jugées § 5 · hero rendu fait en phase 2 (0 FAIL) ; jugées § 5 en phase 3
- [x] 2/10a. Pas de `transition: all` ni d'animation de géométrie · preuve : `grep -c "transition: all" src/styles/page.css` = 0 ; transitions de couleur, opacité, `translate`
- [x] 6/26a/15. `:focus-visible` partout, instantané, 3:1 · preuve : `src/styles/base.css` (`:focus-visible`), `.btn`, `.tab`, panneau
- [x] 7/27/62. Reduced motion sur chaque animation ; contenu visible sans script · preuve : `base.css` (media reduce), `page.css` fin de fichier ; `.js` ne masque que les onglets, panneaux tous visibles sans script
- [x] 17/6a. Hero en `dvh` · preuve : `page.css` `.hero { min-height: calc(100dvh - var(--nav-h)) }`
- [x] 19/56. Sticky non superposés · preuve : une seule barre sticky (`.nav`), `scroll-padding-top` ajusté
- [x] 20/53. Radios-onglets gardés · preuve : onglets en boutons `role="tab"`, aucun radio CSS
- [x] 21/28. Vidéo de fond · sans objet (aucune vidéo)
- [x] 22/62. Reveal sous `.js` seulement · `waive 62` : aucun reveal (thème still)
- [x] 23/39a. États d'input · sans objet (aucun champ) ; `:disabled` du bouton à trois canaux
- [x] 24/17/18. Tooltip, auto-rotation · sans objet (aucun)
- [x] 29/70. Aucun faux envoi · aucun formulaire
- [x] 30/33. SVG décoratifs · logo en `mask-image` sur `span aria-hidden="true"`, aucun `<svg>`
- [x] 48. Hover un signal, conteneur, pas de rebond, pas de toast · preuve : `page.css` bloc « survol », `@media (hover: hover)`
- [x] 49/26b/39b. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : mesure Playwright `small=[]` sur 5 pages à 1440, 1024, 375, 320
- [x] 58. Un primaire rempli, pilule limitée aux contrôles ; un seul pattern de scroll (aucun) · preuve : `page.css`
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : `base.css:3-5`
- [x] 72. Responsive : breakpoints 60rem et 40rem, `(hover: hover)` et `(pointer: coarse)`, `dvh`, `overflow-x: clip` sur html et body, gouttière 16 px · preuve : `scrollWidth` = fenêtre sur 5 pages à 320, 375, 1024, 1440
