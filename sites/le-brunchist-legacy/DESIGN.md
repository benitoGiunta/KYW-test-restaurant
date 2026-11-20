# Design : Le Brunchist (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 1 page (/) + 404
- **Before** · lebrunchist.com bloqué par une vérification anti-robot : rien à relever (10 FAIL sur la page de blocage, sans objet)
- **Keeps** · nom, adresse, téléphone `tel:`, horaires, liens Facebook et Instagram, plats cités par les sources
- **Files** · créés : tout `sites/le-brunchist-legacy/` ; supprimés : aucun
- **Shape** · Split Studio (draw 97d21a), genre editorial, job : venir (appeler ou s'y rendre)
- **Theme** · Vellum, dealt 1/3, seed restaurant-namur-brunch-specialty-40dd·ed6fbcfe·2026-11-20·r0, colourway parchment. Écartés : Squeeze (vert forêt, fruits : trop fraîcheur de marché, la vaisselle vintage et le café le contredisent) ; Solstice (crème et vermillon : le brunch chaleureux générique, c'est le voisin probable)
- **Chrome** · nav : barre à bords alignés (marque, trois ancres, Appeler) ; pied : mast
- **Hero** · Stage : tête sur 5 colonnes, photo sur 7
- **Signature** · le livre du jour : la semaine d'ouverture en registre sur le champ ultramarine, sous une tête gothique
- **Sections** · Stage, Carte (Switcher salé / sucré / boissons), On en parle (bande, rangées), Lieu (split), Horaires et adresse (bande ultramarine), mast
- **Material** · photographies provisoires de la bibliothèque (Wikimedia Commons), aucune du client
- **Comp** · 2 built, c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Échanges avec le draw
Le draw donnait barre de recherche, barre de réservation collante, « prochains créneaux » en boutons, carte midi/soir : la matière refuse (aucun outil de réservation connu, café de jour, pas de soir). Remplacés par : barre à bords alignés, appel et itinéraire, Switcher salé/sucré/boissons. Conservés : Split Studio, Stage, mast. Test miroir : un voisin avec « café-brunch, appel unique » aurait Settled + crème ; ici gothique + champ ultramarine.

## Tokens
Source de vérité : `src/styles/tokens.css` (Vellum). Papier `oklch(94% 0.024 82)`, encre `oklch(23% 0.025 55)`, pigment ultramarine `oklch(43% 0.17 268)`. Polices : Grenze Gotisch 600 (h1, h2, marque, jamais sous 30 px), Grenze 400 (citations), Hanken Grotesk 400/500/600 (tout le reste, h3 compris). Rayon 2 px, aucune ombre, filets 1 px et double filet 4 px.

## Composants
- **Carte** : Switcher (`role="tablist"`, tous les panneaux visibles sans script, onglets masqués sans `.js`), rangées nom à gauche, description à droite, double filet au-dessus, survol en `--color-accent-soft`. Prix absents (inconnus) : mention `.fill`. Compositions illustratives (`data-placeholder`).
- **Horaires** : Schedule en `<dl>` avec `<time>`, jours fermés en `--color-muted` (atténué, jamais barré), double filet, sur champ ultramarine. Jour courant : phase 2.
- **Pied** : mast (marque en tête gothique, trois colonnes : liens, adresse et horaires, réseaux), crédits photo `data-credits`, puis `<KywFooter>`.
- **Photo** : `<figure>` + `[data-slot][data-alt][data-credits][data-placeholder]`, `width`/`height`, hero `fetchpriority="high"`, autres `lazy`, légende hors du slot.

## Sur-utilisation
- [x] 1. Skill Hallmark lue (SKILL.md, redesign.md, layout.md, design-md.md, vellum.md) · preuve : stamp de page.css:1
- [x] 2. deal, draw, scaffold lancés · preuve : `.hallmark/log.json` (entrée le-brunchist-legacy), journaux `.logs/bl-deal.log`, `bl-draw.log`, `bl-scaffold.log`
- [x] 3. sloplint --render lancé sur une copie à chemins relatifs · preuve : `.logs/bl-sl.log` ; FAIL restants uniquement ceux du paquet `kyw-footer` (48, jamais modifié)
- [x] 4. Photos de la bibliothèque, créditées, `data-alt` = ce que la vraie photo devra montrer · preuve : `src/data/site.ts` `photos`
- [ ] 5. Références non lues en entier faute de budget : `anatomy.md`, `imagery.md`, `craft.md`, `gates.md` § 1 à 4 et `patterns.md` consultés par extraits seulement ; à relire en phase 2.
