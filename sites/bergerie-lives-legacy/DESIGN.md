**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, contenu et wiring gardés, système et composition neufs.
- **Before** · Wix 3 pages, fond blanc, serif italique, logo bélier, bandeau cookies, mobile coupé ; `.hallmark/before.txt` (592 FAIL, 207 REFLEX, 12 WARN).
- **Keeps** · routes `/`, `/mariage-et-location/`, `/reservations/` ; ancres chambres, services, galerie, contact ; liens externes (caves à vins, citadelle, Rops, Tréma, marché), `tel:`, `mailto:`.
- **Files** · `src/data/site.ts`, `src/layouts/Base.astro`, `src/components/{Nav,Footer,Photo}.astro`, `src/pages/{index,mariage-et-location,reservations,404}.astro`, `src/styles/{tokens,base,page}.css`.
- **Shape** · Narrative Workflow (tirage 2a9dc5), macrostructure d'origine : one-page calme + page Mariage, empreinte `Heading|Body|Divider|Button|Image|Reveal`.
- **Theme** · Hedgerow, dealt 1/3, seed `guesthouse-namur-wedding-venue-2aa3·ef1ed15d·2026-11-27·r0`. Écartés : Vellum (imprimerie à lettre gothique, déjà tirée pour Atelier de Bossimé, aucun rapport avec un domaine de pierre), Ink (catalogue blanc et teal, neutre, ne porte ni la pierre ni le feuillage).
- **Chrome** · nav : masthead (barre papier, nom en Prata, liens, bouton Réserver) · footer : index columns.
- **Hero** · Stage : façade plein cadre, panneau papier en bas à droite. Swap du tirage nommé : « les gens au travail » et « les horaires de réservation dans le hero » n'existent pas (pas de service, pas d'horaires) ; l'action est Réserver et le téléphone.
- **Signature** · la façade de pierre avec ses moutons, plein cadre, sur le premier écran.
- **Sections** · Hero · Statement (à propos) · Split (chambres, journée piscine) · Index (services) · Statement sur bande (mariage) · Table (activités) · Rail (galerie) · Faits (contact) · Pied.
- **Material** · real : nom, adresse, téléphone, courriel, depuis 2017, services, activités, 20 €/pp, photos du client · pictures : 16 photos du client (7 contextes) · absent : avis, note Booking (à confirmer), tarifs chambres, horaires, brochure PDF, capacité de salle (150 ou 250), réseaux.
- **Comp** · 2 built, no key · c1 (texte sur la photo) et c2 (panneau papier) ; c2 retenu, voir `comp.md`.
- **Sweep** · phase 3.

# Design : La Bergerie de Lives (variante legacy)

Le système verrouillé. Les trois pages le partagent ; le modifier se fait ici, à dessein.

## System
- Genre : editorial
- Shape of the first page : Narrative Workflow
- Theme : Hedgerow, colourway `hedge`
- Axes : dark/high-contrast-serif/chromatic-green · posture : drenched

## Approche
Le site d'origine est un Wix calme de trois pages (accueil en une page, Mariage et location, Réservations quasi vide). On garde : routes, ordre (à propos, chambres, services, mariage, activités, galerie, contact), posture calme, textes. On change : fond blanc vers vert feuille profond, Prata au lieu du serif italique, bandeau cookies supprimé, mobile refait. Dérogations : lien « Weelness » corrigé en « Bien-être » ; « depuis plus de 3 ans » neutralisé (daté) ; `Réserver` Wix devient une page `/reservations/` interne avec le lien Wix gardé ; formulaire d'origine refait avec `data-endpoint=""` (aucun faux envoi). Test miroir : un voisin avec le même site aurait un hero photo avec titre sur lawn ; la différence ici est le panneau papier carré qui laisse la façade et les moutons intacts, et un index de services sans photo ni icône.

## Tokens
`tokens.css` est la source de vérité.
```css
:root {
  --color-paper: oklch(24% 0.052 158); --color-paper-2: oklch(19.5% 0.045 158); --color-paper-3: oklch(29.5% 0.05 158);
  --color-ink: oklch(93% 0.022 88); --color-ink-2: oklch(81% 0.035 150); --color-muted: oklch(69% 0.045 150); --color-rule: oklch(35% 0.05 158);
  --color-accent: oklch(87% 0.19 118); --color-accent-2: oklch(92% 0.13 118); --color-accent-deep: oklch(46% 0.12 128); --color-accent-ink: oklch(22% 0.05 158); --color-focus: oklch(92% 0.13 118);
  --font-display: "Prata", Georgia, serif; --font-body: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 0; --radius-pill: 999px; --rule-hair: 1px; --shadow-card: none;
}
```

## Composants
- **Masthead** : barre pleine largeur sur papier, nom en Prata à gauche, liens Manrope 500, bouton Réserver à droite, filet `--color-muted` dessous ; sous 60 rem, les liens passent sur une seconde ligne (menu tactile en phase 2). Réf. `layout.md` § 7.
- **Hero Stage** : photo plein cadre, panneau papier carré (filet `--color-rule`), h1 de 4 mots, une phrase, deux actions. Réf. `layout.md` § 6.
- **Statement** : une phrase Prata `--text-display-s` sur 8 colonnes, texte d'appui sur 4. Mariage sur bande `--color-paper-2` (une bande, jamais deux voisines).
- **Split** : photo 7 colonnes, texte 4 colonnes ; la journée piscine est une ligne à filet chartreuse 1,5 px, prix en Prata (pas de tuile, pas de bordure + ombre).
- **Carte, remplacée par Index** : pas de carte (pas un restaurant). Services = Rows : nom en Prata `--text-2xl` colonnes 1 à 5, texte colonnes 6 à 11, filet chartreuse en tête, filets `--color-rule`. Activités et documents = même Index en table, lien externe à droite. Pas d'icône, pas de carte dans carte.
- **Horaires** : aucun horaire dans les données. Un slot `.fill` « horaires à renseigner » (`data-placeholder="true"`) dans Accueil des hôtes, un seul par page. La mise en Schedule viendra avec les vrais horaires.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, `srcset` 800/1600, hero `fetchpriority="high"`, autres lazy, légende = un fait ; carré, anneau crème 8 %, radius 0. Rail galerie : défilement horizontal, `tabindex="0"`, `scroll-snap`.
- **Pied** : index columns (le site, nous trouver, sur place), ligne de crédits `data-credits`, puis `<KywFooter />` ; pas de « Tous droits réservés », pas de newsletter.

## Controls
- Primary : pastille chartreuse, texte `--color-accent-ink`, Manrope 700, 48 px ; Secondary : même pastille contour 1,5 px chartreuse, même hauteur.

## Motion
- Character : still ; états seulement en phase 1 (fond du bouton, filet des lignes). Reveal et nav tactile en phase 2 ; sous reduced motion tout est immédiat.

## Exports
`tokens.css` dans ce projet.

## Sur-utilisation
- [x] 1. Hallmark audit lancé sur le site d'origine · preuve : `.hallmark/before.txt`, `before.json`
- [x] 2. References lues avant build (SKILL, redesign, anatomy § book, layout, themes/hedgerow, design-md, comp) · preuve : AUDIT.md, comp.md
- [x] 3. deal et draw tirés contre `$LOG` · preuve : `.hallmark/log.json` (entrée 20 sur 20)
- [x] 4. scaffold hedgerow + stamp en tête de `page.css` · preuve : `src/styles/page.css:1`
- [x] 5. Deux comps, un choisi · preuve : `comp.md`, `.hallmark/comps/c1.png`, `c2.png`
- [x] 6. Noindex et mention KYW sur chaque page · preuve : `Base.astro:27`, grep des 4 pages de `dist/` (noindex 1, kyw-signature 1, mention 1)
- [x] 7. Aucun tiret cadratin ni demi-cadratin · preuve : recherche U+2014/U+2013 dans `src/` et `dist/` vide
- [ ] 8. sloplint --render propre · en phase 3 ; `sloplint src` : FAIL 34 sur Base.astro est le faux positif connu (la règle est dans `base.css` et `page.css`)
