**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes gardées (/, /boulangerie, /patisserie, /emporter, /menu, /reservations) + 404
- **Before** · Floor 422 FAIL (noir et blanc purs surtout), Reflex 129 : un site Wix sombre et rose, façade plein écran, vignettes égales, cartes en iframes ; la façade, le rose, la serif fine, les cartes et leurs prix, les horaires et le téléphone restent
- **Keeps** · 6/6 routes (slugs ASCII, /pâtisserie devient /patisserie) · tel:+3281229602 · formulaire personnes, date, heure (+ nom, téléphone) · lien vers le formulaire Wix d'origine · Facebook, Instagram · les quatre cartes (211 lignes, 23 catégories)
- **Files** · create: sites/dumont-bouge-legacy/** · delete: none
- **Shape** · Photographic (gardée), genre editorial, job: book, l'action dans la nav, le héros, la clôture et une barre mobile
- **Theme** · Garden, dealt 3/3 (avoine, encre, Vollkorn, filets, daylight), accent déplacé du vert feuille au rose du client (#E91E77 lu dans `page.html`, oklch 61 0,234 3), polices du client (Cormorant Garamond, EB Garamond) ; écarte Vellum (blackletter, étranger à la serif fine du client) et Squeeze (vert forêt saturé, registre playful)
- **Chrome** · nav: edge-aligned (gardée : logo à gauche, liens et Réserver à droite, sticky) · footer: mast
- **Hero** · Poster (gardé) : façade plein cadre, coup de pinceau rose, bande charbon ; Banner (texte et photo) sur les pages de carte, Counter sur /reservations
- **Signature** · le coup de pinceau rose du client posé sur la façade, au-dessus de la bande charbon
- **Sections** · Hero (Poster) · Quatre maisons (Index, quatre lignes) · Vitrine (photo pleine largeur, légende) · Tea-room (Switcher petit-déjeuner / brunch sur fond paper-2) · Présentation (statement sur charbon) · Horaires et adresse (Schedule, deux colonnes Bouge / Namur)
- **Material** · real : nom, adresse, téléphone, e-mail, horaires, 211 lignes de carte et leurs prix, formules, mention d'allergie, phrase de présentation · pictures : client 4 (façade, vitrine, salade, plateau) + logo + texture ; library 2 (pains, latte, placeholder, crédités) · absent : avis, note, histoire, équipe, prix des gâteaux, photos du tea-room et du brunch
- **Comp** · pending (phase 2) · voir comp.md
- **Sweep** · phase 3

*Le draw (cc056f) proposait Split Studio, hero Ledge, nav slab, footer mast, barre de réservation sticky. Pris : footer mast, barre de réservation (mobile). Écartés : Ledge (l'original ouvre sur la façade plein écran : Poster gardé), nav slab (nav gardée), Split Studio (macrostructure photographique gardée). Test miroir : un voisin avec « boulangerie rose » n'obtiendrait pas la façade sous un pinceau rose et la bande charbon.*

# Design : Dumont Bouge, variante legacy

## System
- Genre : editorial · Shape : Photographic · Theme : Garden, accent client · Axes : light/roman-serif/chromatic-pink · posture : committed

## Tokens
`src/styles/tokens.css` fait foi (scaffold `theme.mjs scaffold garden --redesign full`, valeurs recolorées depuis les fichiers du client).
```css
:root {
  --color-paper: oklch(98% 0.011 85);   /* #FCF8F0 du client (cartes) */
  --color-paper-2: oklch(95.7% 0.018 81); --color-paper-3: oklch(92.5% 0.027 75);
  --color-ink: oklch(27% 0.008 20);     /* #282626 du client (bande de l'accueil) */
  --color-brand: oklch(61.1% 0.234 2.6); /* #E91E77, traits et aplats seulement */
  --color-accent: oklch(52% 0.215 2.6);  /* boutons et liens : 5,9:1 avec le texte crème */
  --color-accent-deep: oklch(44% 0.19 2.6);
  --font-display: "Cormorant Garamond"; --font-body: "Hanken Grotesk"; --font-outlier: "EB Garamond";
}
```
Le rose pur (#E91E77) ne porte que des traits et aplats ; tout texte et bouton passe par `--color-accent` (contraste mesuré par construction, à vérifier en phase 2).

## Composants
- **Carte** (`Carte.astro`) : Rows (nom à gauche, description en muted, prix à droite `tabular-nums`) ; les sandwichs Dagobert classiques portent cinq prix par format : table à entêtes de colonnes (1/3, 1/2, 3/4, pistolet, sandwich), défilement horizontal au téléphone. Gâteaux sans prix : « à la commande » et un slot `.fill` (prix à confirmer). Aucune tuile icône, filets et pas de bordure + ombre.
- **Switcher** (accueil) : petit-déjeuner / brunch, `role="tablist"`, premier panneau visible sans script.
- **Horaires** (`Horaires.astro`) : Schedule, `<dl>` et `<time>`, jour fermé (dimanche à Namur) en `--color-muted`, deux colonnes Bouge et Namur ; dits une fois, en clôture ; le jour courant viendra en phase 2.
- **Pied** : mast (nom, baseline, liens, réseaux, crédits `data-credits`), puis `KywFooter`.
- **Photo** (`Photo.astro`) : `<figure>`, `width`/`height`, héros `fetchpriority="high"`, autres lazy ; placeholders (`data-placeholder`, `data-slot`, `data-alt`) crédités au pied.

## Sur-utilisation
- [x] 1. Hallmark SKILL.md, redesign.md, gates et layout lus (grep ciblés) · preuve : AUDIT.md, stamp de page.css
- [x] 2. Audit `sloplint --before` · preuve : .hallmark/before.txt
- [x] 3. deal/draw/scaffold, trois thèmes pesés · preuve : DESIGN.md § Picks, .hallmark/log.json
- [x] 4. Couleur de marque lue dans les fichiers du client (page.html, embeds) · preuve : tokens.css:12
- [ ] 5. Comp c1/c2 · reporté en phase 2 · preuve : comp.md
- [x] 6. Pages statiques, build, pied KYW et noindex sur les 7 routes · preuve : grep dist/
- [ ] 7. Sloplint --render sur serveur · phase 2 (les chemins `base` empêchent le rendu depuis file://)
